import {
  Button,
  Flex,
  type FlexProps,
  Grid,
  GridItem,
  Text,
  VStack,
} from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { type ReactNode, memo } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import TextInputFloating from "ui/shared/forms/TextInputFloating"
import TextareaFloating from "ui/shared/forms/TextareaFloating"
import { SALES_EMAIL } from "ui/snippets/footer/types"
import { z } from "zod"

export type IContactUsForm = {
  contact_name: string
  email: string
  message: string
}

export const contactUsSchema = z.object({
  contact_name: z
    .string()
    .min(2, { message: "Contact Name must be at least 2 characters long." }) // Length: 2-50 chars
    .max(50, { message: "Contact Name must not exceed 50 characters." }) // Length: 2-50 chars
    .regex(/^[a-zA-Z\s'-]{2,50}$/, {
      message:
        "Contact Name may only contain letters (A-Z, a-z), spaces, hyphens (-), and apostrophes (').",
    })
    .refine((data) => Boolean(data), {
      message: "Please enter your contact name.",
    }), // Allow specific characters

  email: z
    .string()
    .min(1, { message: "Please enter your email address." }) // Not typing
    .email({ message: "Invalid email format." }) // Typing incorrect email format
    .max(256, { message: "Email must not exceed 256 characters." }) // Max 256 chars
    .refine((data) => Boolean(data), { message: "Email address is required." }), // Required
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long." }) // Not typing or less than 10 characters
    .max(1000, { message: "Message must not exceed 1000 characters." }) // More than allowed number of characters
    .refine(
      (value) => {
        const xssPattern =
          /(<script.*?>.*?<\/script>|on\w+=".*?"|<.*?javascript:.*?>)/i
        return !xssPattern.test(value)
      },
      {
        message:
          "Message must not contain special characters that can be used in XSS attacks such as <, >, &, ', \", `.",
      },
    ) // Prevent XSS
    .refine((data) => Boolean(data), { message: "Please enter your message." }), // Required
})

const onValid = (data: IContactUsForm) => {
  const closing = "Thanks and best regards,"

  const body = `Hello I am ${data.contact_name}%0D%0AMy company email is ${data.email}%0D%0A${data.message}%0D%0A%0D%0A${closing}`

  window.open(
    `${SALES_EMAIL}?subject=1Mscan Insights Inquiry&body=${body}`,
    "_blank",
  )
}

const onInvalid = (errors: any) => {
  console.log(errors)
}

type Props = {
  title: ReactNode
  description: ReactNode
} & FlexProps

const ContactUs = ({ title, description, ...props }: Props) => {
  const contactForm = useForm<IContactUsForm>({
    resolver: zodResolver(contactUsSchema),
    defaultValues: {
      email: "",
      contact_name: "",
      message: "",
    },
  })

  const { control, handleSubmit } = contactForm

  return (
    <Flex
      id="contact-us"
      borderRadius="8px"
      border="1px solid"
      bgColor="neutral.light.1"
      borderColor="neutral.light.3"
      flexDirection="column"
      boxShadow="0px 16px 40px 0px rgba(0, 0, 0, 0.06)"
      width="full"
      gap="2.5rem"
      padding={{
        base: 4,
        lg: "2.5rem",
      }}
      {...props}
    >
      <VStack spacing={2}>
        <Text
          color="neutral.light.8"
          fontSize="36px"
          fontWeight={500}
          textAlign="center"
        >
          Contact Us
        </Text>
        <Text
          color="neutral.light.8"
          fontSize="18px"
          fontWeight={400}
          textAlign="center"
          mx="auto"
          display="flex"
          flexDirection="column"
        >
          <span>{title}</span>
          <span>{description}</span>
        </Text>
      </VStack>

      <FormProvider {...contactForm}>
        <Grid
          columnGap={4}
          rowGap={6}
          templateRows="repeat(1, 1fr)"
          templateColumns={{
            base: "repeat(1, 2fr)",
            md: "repeat(2, 2fr)",
          }}
        >
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <Controller
              control={control}
              name="contact_name"
              render={({
                fieldState: { error },
                field,
                formState: { isSubmitting },
              }) => {
                return (
                  <TextInputFloating
                    {...contactForm.register("contact_name")}
                    {...field}
                    isSubmitting={isSubmitting}
                    placeholder="Contact name"
                    isRequired
                    error={error}
                  />
                )
              }}
            ></Controller>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <Controller
              control={control}
              name="email"
              render={({
                fieldState: { error },
                field,
                formState: { isSubmitting },
              }) => {
                return (
                  <TextInputFloating
                    {...contactForm.register("email")}
                    {...field}
                    isSubmitting={isSubmitting}
                    placeholder="Company email address"
                    isRequired
                    error={error}
                  />
                )
              }}
            ></Controller>
          </GridItem>
          <GridItem rowSpan={1} colSpan={2}>
            <Controller
              control={control}
              name="message"
              render={({
                fieldState: { error },
                field,
                formState: { isSubmitting },
              }) => {
                return (
                  <TextareaFloating
                    {...contactForm.register("message")}
                    {...field}
                    isSubmitting={isSubmitting}
                    placeholder="Message"
                    isRequired
                    error={error}
                  />
                )
              }}
            ></Controller>
          </GridItem>
        </Grid>

        <Button
          width={{ base: "full", lg: "15rem" }}
          colorScheme="primary"
          variant="solid"
          size="lg"
          type="submit"
          fontSize="16px"
          alignSelf="center"
          onClick={handleSubmit(onValid, onInvalid)}
        >
          Send message
        </Button>
      </FormProvider>
    </Flex>
  )
}

export default memo(ContactUs, () => true)
