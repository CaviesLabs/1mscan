import * as Sentry from "@sentry/nextjs"
import Error, {
  type ErrorProps,
  default as NextErrorComponent,
} from "next/error"

const CustomErrorComponent = ({ statusCode, title }: ErrorProps) => {
  return (
    <NextErrorComponent
      statusCode={statusCode}
      title={title}
      withDarkMode={false}
    />
  )
}

CustomErrorComponent.getInitialProps = async (contextData) => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData)

  // This will contain the status code of the response
  return Error.getInitialProps(contextData)
}

export default CustomErrorComponent
