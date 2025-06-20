import type { FlexProps } from "@chakra-ui/react"
import { Button, Flex, useDisclosure } from "@chakra-ui/react"
import useApiQuery from "lib/api/useApiQuery"
import { useWatchState } from "lib/hooks/useWatchState"
import _, { omit } from "lodash"
import { type MutableRefObject, memo, useCallback } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import IconSvg from "ui/shared/IconSvg"
import {
  PopoverModal,
  PopoverModalContent,
  PopoverModalTrigger,
} from "ui/shared/PopoverModal"
import type { PopoverModalContentProps } from "ui/shared/PopoverModal/PopoverModalContent"
import type { SearchInputProps } from "./SearchInput"
import SearchInput from "./SearchInput"
import SearchMenu from "./SearchMenu"
import type { IForm } from "./types"

type Props = {
  isFullscreen?: boolean
  searchInputProps?: SearchInputProps
  contentProps?: PopoverModalContentProps
  searchRef?: MutableRefObject<{
    onOpen: AnyFunction
  }>
} & FlexProps

const SearchBarTop = ({
  searchInputProps,
  isFullscreen,
  contentProps,
  searchRef,
  ...props
}: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const [q, setQ] = useWatchState("", [], {
    debounce: 300,
    transform(value) {
      return value?.trim()
    },
  })

  const formApi = useForm<IForm>({
    defaultValues: { search: "", recents: [] },
  })

  const { control, setValue } = formApi

  const {
    data,
    isFetching: isLoading,
    isError,
  } = useApiQuery("quick_search", {
    queryParams: { q: q },
    queryOptions: {
      enabled: Boolean(q),
      retry: false,
      staleTime: 1000 * 60 * 2, // 2 minutes
    },
  })

  const setSearch = useCallback((keyword: string) => {
    setValue("search", keyword)
    setQ(keyword)
  }, [])

  return (
    <FormProvider {...formApi}>
      {!(isFullscreen === false) && (
        <Button
          order={2}
          variant="primary"
          boxSize={9}
          display={{ base: "flex", lg: "none" }}
          alignItems="center"
          justifyContent="center"
          padding={0}
          onClick={() => {
            searchRef?.current?.onOpen?.()
            document.body.style.overflowY = "hidden"
            onOpen()
          }}
        >
          <IconSvg name="search" boxSize={5} color="neutral.light.6" />
        </Button>
      )}
      <PopoverModal
        isOpen={isOpen}
        onClose={onClose}
        zIndex={isFullscreen === false ? 2 : 998}
        isFullscreen={isFullscreen}
        backgroundColor={isFullscreen === false ? undefined : "neutral.light.1"}
        {...props}
      >
        <PopoverModalTrigger
          as={Flex}
          alignItems="center"
          gap={3}
          marginTop={{
            base: isFullscreen === false ? "unset" : 2,
            lg: "unset",
          }}
          marginX={{ base: isFullscreen === false ? "unset" : 4, lg: "unset" }}
        >
          {!(isFullscreen === false) && (
            <Button
              variant="unstyled"
              boxSize={6}
              display={{ base: "flex", lg: "none" }}
              justifyContent="center"
              alignItems="center"
              onClick={() => {
                onClose?.()
                document.body.style.overflowY = null as any
              }}
            >
              <IconSvg
                name="arrows/east-left"
                color="neutral.light.6"
                boxSize="1.125rem"
              ></IconSvg>
            </Button>
          )}
          <Controller
            control={control}
            name="search"
            render={({ field: { value, onChange } }) => {
              return (
                <SearchInput
                  flex={1}
                  size="xs"
                  onChange={(e) => {
                    onChange(e.target.value)
                    setQ(e.target.value)
                  }}
                  value={value}
                  onClick={(e) => {
                    onOpen()
                    searchInputProps?.onClick?.(e)
                  }}
                  {...{
                    ...omit(searchInputProps, "onClick"),
                    groupProps: _.merge(
                      {
                        order: { lg: 3 },
                        width: {
                          base: "full",
                          // md: "10rem",
                          lg: isFullscreen === false ? "full" : "20rem",
                          "2lg": isFullscreen === false ? "full" : "25rem",
                        },
                        maxWidth: "full",
                        backgroundColor: "neutral.light.1",
                      },
                      searchInputProps?.groupProps,
                    ),
                  }}
                />
              )
            }}
          ></Controller>
        </PopoverModalTrigger>

        <PopoverModalContent overflow="hidden" {...contentProps}>
          {/* <SearchPromotion width="full" paddingY={3} paddingX={4} mt={2} /> */}
          <SearchMenu
            data={data}
            isLoading={isLoading}
            isError={isError}
            q={q}
            setSearch={setSearch}
            onClose={onClose}
          />
        </PopoverModalContent>
      </PopoverModal>
    </FormProvider>
  )
}

export default memo(SearchBarTop)
