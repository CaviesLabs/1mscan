import { Center, Flex, chakra } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { getLanguage } from "languages/useLanguage"
import { isAddressTest } from "lib/getOSType"
import { useMemoEffect, useShallowLayoutMemoRef } from "lib/hooks/useShallow"
import { LocalStorageProvider } from "lib/providers/storage.provider"
import { memo, useCallback, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import IconSvg from "ui/shared/IconSvg"
import TextInputFloating from "ui/shared/forms/TextInputFloating"
import TooltipV2 from "ui/shared/tootltip/TooltipV2"
import { z } from "zod"
import PackItem from "../components/PackItem"
import ToolButton from "../components/ToolButton"

type Props = {
  setHash: (hash: string) => void
}

const schema = z.object({
  search: z
    .string({
      required_error: getLanguage("profile_checker_page.address_is_required"),
    })
    .transform((value) => value ?? "")
    .refine((value) => Boolean(value), {
      message: getLanguage("profile_checker_page.address_is_required"),
    })
    .refine((value) => isAddressTest(value), {
      message: getLanguage("profile_checker_page.invalid_address"),
    }),
})

export type IForm = z.infer<typeof schema>

const ProfileCheckerInput = ({ setHash }: Props) => {
  const { control, handleSubmit, trigger } = useForm<IForm>({
    defaultValues: {
      search: "",
    },
    criteriaMode: "all",
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  })

  const storage = LocalStorageProvider.getInstance()

  const [counter, setCounter] = useState(
    Number(storage.getItem("profile_checker_counter") ?? "0"),
  )

  const counterRef = useShallowLayoutMemoRef(() => counter, [counter])

  const timer = useCallback((initTick: number) => {
    let tick = initTick
    setCounter(tick)
    storage.setItem("profile_checker_counter", tick.toFixed())

    const interval = setInterval(() => {
      if (tick <= 0) {
        clearInterval(interval)
        storage.removeItem("profile_checker_counter")
      } else {
        setCounter(--tick)
        storage.setItem("profile_checker_counter", tick.toFixed())
      }
    }, 1000)
  }, [])

  const onValid = useCallback((data: IForm) => {
    if (!data.search) return

    if (counterRef.current <= 0) {
      timer(10)
      setHash(data.search)
    }
  }, [])

  useMemoEffect(() => {
    const tick = Number(storage.getItem("profile_checker_counter") ?? "0")
    setCounter(tick)

    timer(tick)
  }, [])

  useEffect(() => {
    trigger("search")
  }, [])

  return (
    <PackItem
      childrenProps={{
        paddingX: 5,
        paddingTop: 5,
        paddingBottom: "2.5rem",
      }}
    >
      <PackItem
        as={chakra.form}
        onSubmit={handleSubmit(onValid)}
        titleProps={{
          color: "neutral.light.7",
        }}
        spacing={5}
        title={getLanguage(
          "profile_checker_page.input_a_wallet_address_and_check_its_profile",
        )}
        childrenProps={{
          paddingX: 0,
          paddingY: 0,
          alignItems: {
            base: "stretch",
            lg: "flex-start",
          },
          borderWidth: 0,
          spacing: {
            base: 5,
            lg: 3,
          },
          flexDirection: {
            base: "column",
            lg: "row",
          },
        }}
      >
        <Flex flex={1} gap={2}>
          <Center boxSize="3rem">
            <IconSvg boxSize={6} color="neutral.light.7" name="tools/wallet" />
          </Center>
          <Controller
            control={control}
            name="search"
            render={({
              field: { ref, value, onChange },
              fieldState: { error },
            }) => {
              return (
                <TextInputFloating
                  parentContentProps={{
                    w: "full",
                  }}
                  ref={ref}
                  placeholder={getLanguage(
                    "profile_checker_page.enter_wallet_address_0x_or_sei",
                  )}
                  value={value}
                  onChange={onChange}
                  error={
                    error?.message &&
                    error?.message !==
                      getLanguage("profile_checker_page.address_is_required")
                      ? error
                      : undefined
                  }
                  labelProps={{
                    height: "3rem",
                  }}
                  rightElement={
                    <IconSvg
                      hidden={Boolean(error)}
                      color="secondary.02.text"
                      name="verified"
                      boxSize={5}
                    />
                  }
                />
              )
            }}
          />
        </Flex>

        <Controller
          control={control}
          name="search"
          render={({ fieldState: { error }, formState: { isSubmitting } }) => {
            return (
              <TooltipV2
                label={`${getLanguage(
                  "profile_checker_page.please_wait",
                )} ${counterRef.current}${counterRef.current !== 1 ? "s" : ""} ${getLanguage(
                  "profile_checker_page.between_searches",
                )}`}
                isDisabled={counter <= 0}
              >
                <Center
                  flex={{
                    base: 1,
                    lg: "unset",
                  }}
                >
                  <ToolButton
                    flex={1}
                    height="3rem"
                    isDisabled={Boolean(error) || counter > 0}
                    isLoading={isSubmitting}
                    minWidth="9.375rem"
                    maxWidth="unset"
                    width="unset"
                    type="submit"
                  >
                    {counter <= 0
                      ? getLanguage("profile_checker_page.check_profile")
                      : `${getLanguage(
                          "profile_checker_page.wait",
                        )} ${counter}${counter !== 1 ? "s" : ""}...`}
                  </ToolButton>
                </Center>
              </TooltipV2>
            )
          }}
        />
      </PackItem>
    </PackItem>
  )
}

export default memo(ProfileCheckerInput, () => true)
