import type { BoxProps } from "@chakra-ui/react"
import { Box, Flex, Text, VStack } from "@chakra-ui/react"
import { getEnvValue } from "configs/hydration/utils"
import LinkExternal from "ui/shared/LinkExternal"
import LinkInternal from "ui/shared/LinkInternal"
import OptimizationImage from "ui/shared/OptimizationImage"

type Props = {
  //
}

const WithScroll = ({ children, ...props }: BoxProps) => {
  return (
    <Box overflowX="scroll" width="90vw" {...props}>
      {children}
    </Box>
  )
}

const Privacy = ({}: Props) => {
  return (
    <VStack
      marginX="auto"
      spacing={3}
      width={{ base: "full", lg: "50rem", "2lg": "56.25rem", xl: "62.5rem" }}
      backgroundColor="neutral.light.1"
      borderWidth="1px"
      borderColor="neutral.light.3"
      borderRadius="1rem"
    >
      <Box
        width="full"
        height="9.75rem"
        borderRadius="0.75rem 0.75rem 2.5rem 2.5rem"
        overflow="hidden"
        position="relative"
        backgroundColor="neutral.light.1"
        borderWidth="1px"
        borderColor="neutral.light.3"
      >
        <OptimizationImage
          zIndex={1}
          alt="terms_conditions"
          src="/images/home_background.jpeg"
          objectPosition="bottom left"
          background="linear-gradient(135deg, #2d294d, #c12f26)"
        ></OptimizationImage>
        <VStack
          position="absolute"
          zIndex={2}
          top="50%"
          transform="translate(0, -50%)"
          left={0}
          right={0}
          gap={3}
        >
          <Text
            as="h1"
            textStyle="175"
            color="neutral.light.1"
            letterSpacing="-0.035rem"
            textAlign="center"
          >
            Privacy Notice
          </Text>
          <Text
            as="span"
            textStyle="8125"
            color="neutral.light.3"
            textAlign="center"
          >
            Last updated: June 21, 2024
          </Text>
        </VStack>
      </Box>

      <Flex
        flexDirection="column"
        flexWrap="wrap"
        gap={6}
        textStyle="1"
        paddingY={8}
        maxWidth="full"
        paddingX={{ base: 4, lg: 8 }}
        color="neutral.light.7"
        sx={{
          "> *": {
            maxWidth: "full",
          },
          // "& .c3": { fontWeight: 500 },
          "& h3": { fontWeight: 500 },
          "& .list-item_alpha": {
            counterReset: "item",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            "& li": {
              listStyleType: "none",
              _before: {
                content: `"(" counter(item, lower-alpha) ") "`,
                counterIncrement: "item",
              },
            },
          },
          "& .c9": {
            fontWeight: 500,
          },
          "& li": {
            listStylePosition: "inside",
          },
          "& .c16": {
            fontStyle: "italic",
          },
          "& .c32": {
            display: "inline",
          },
          "& .c87": {
            textDecoration: "underline",
            display: "inline",
          },
          "& .c6": {
            fontWeight: 500,
            fontStyle: "italic",
          },
          "& .table-title": {
            fontWeight: 500,
            backgroundColor: "neutral.light.4",
            verticalAlign: "middle",
            textAlign: "center",
          },
          "& .table-row_title": {
            backgroundColor: "neutral.light.4",
          },
          "& .table-title_italic": {
            fontWeight: 500,
            fontStyle: "italic",
            backgroundColor: "neutral.light.4",
            verticalAlign: "middle",
            textAlign: "center",
          },

          "& table": {
            minWidth: "46rem",
            tr: {
              _last: {
                td: {
                  borderBottomWidth: "1px",
                },
              },
            },
            td: {
              // width: "33%",
              padding: 3,
              borderColor: "neutral.light.8",
              borderTopWidth: "1px",
              borderLeftWidth: "1px",
              verticalAlign: "top",
              gap: 4,
              _last: {
                borderRightWidth: "1px",
              },
              p: {
                _first: {
                  marginTop: 0,
                },
                marginTop: 4,
              },
            },
            ".table-span": {
              width: "66%",
            },
          },
        }}
      >
        <ol className="c23 lst-kix_hkndm29z20uu-0 start" start={1}>
          <li className="c34 c26 c75 li-bullet-0 c9">
            <span className="c48 c9">Why Do You Need this Privacy Notice?</span>
            <span className="c44 c60 c9">&nbsp;</span>
          </li>
        </ol>
        <p className="c34 c26">
          <span className="c2">
            We encourage you to carefully read this Privacy Notice as it
            provides you with information about your personal data being
            processed in connection with your access to and use of the Products.
          </span>
        </p>
        <p className="c34 c26">
          <span className="c2">
            In this Privacy Notice, personal data and personal information are
            used as synonyms and mean any information that directly or
            indirectly identifies you as an individual. In this Privacy Notice
            we explain which types of personal data we hold on you, how we
            collect and process such data, how long we keep it, and so on.
          </span>
        </p>
        <ol className="c23 lst-kix_hkndm29z20uu-0" start={2}>
          <li className="c34 c26 c75 li-bullet-0 c9">
            <span className="c29 c9">Where Can You Find the Definitions?</span>
          </li>
        </ol>
        <p className="c34 c26">
          <span className="c3">
            Unless otherwise provided in this Privacy Notice, capitalised terms
            used in this Privacy Notice have the meaning determined in our{" "}
          </span>
          {getEnvValue("NEXT_PUBLIC_APP_ENV") !== "prd" ? (
            <LinkExternal
              noIcon
              href="https://1mscan.com/terms"
              // color="inherit"
              className="c3 c87"
            >
              General Terms &amp; Conditions
            </LinkExternal>
          ) : (
            <LinkInternal href="/terms" color="inherit" className="c3 c87">
              General Terms &amp; Conditions
            </LinkInternal>
          )}
          <span className="c3">&nbsp;(the “</span>
          <span className="c9 c3">Terms</span>
          <span className="c2">
            ”). We encourage you to read the Terms carefully as they affect your
            obligations and legal rights.
          </span>
        </p>
        <ol className="c23 lst-kix_hkndm29z20uu-0" start={3}>
          <li className="c34 c26 c75 li-bullet-0 c9">
            <span className="c29 c9">Who Are We and How to Reach Us?</span>
          </li>
        </ol>
        <p className="c34 c26">
          <span className="c3">When we say “</span>
          <span className="c9 c3">we</span>
          <span className="c3">”, “</span>
          <span className="c9 c3">us</span>
          <span className="c3">”, or “</span>
          <span className="c9 c3">our</span>
          <span className="c3">”, we mean Cavies Ltd, a</span>
          <span className="c3">&nbsp;</span>
          <span className="c2">
            BVI business company. With respect to personal data collected when
            you access and use the Products, we act as a data controller,
            meaning that we solely determine what data collected, as well as the
            purposes and means of data processing.
          </span>
        </p>
        <p className="c34 c26">
          <span className="c2">
            We process your personal data in accordance with this Privacy Notice
            and we endeavour to comply with the applicable data protection
            legislation.{" "}
          </span>
        </p>
        <p className="c34 c26">
          <span className="c3">
            If you have any questions regarding this Privacy Notice or the
            processing of your personal data, do not hesitate to contact us via
            the following contact details:{" "}
          </span>
          <span className="c64 c3">
            <LinkExternal
              className="c32"
              noIcon
              href="mailto:contact@1mscan.com"
            >
              contact@1mscan.com
            </LinkExternal>
          </span>
          <span className="c3"> (for Explorer-related requests) and </span>
          <LinkExternal className="c32" noIcon href="mailto:contact@cavies.xyz">
            contact@cavies.xyz
          </LinkExternal>{" "}
          <span className="c3">(for requests relating to other Products).</span>
        </p>
        <ol className="c23 lst-kix_hkndm29z20uu-0" start={4}>
          <li className="c70 c26 li-bullet-0 c9">
            <span className="c48 c9">What Personal Data Do We Collect?</span>
          </li>
        </ol>
        <p className="c34 c26">
          <span className="c2">
            The categories of personal data we collect depend on how you
            interact with us, use the Products, and the requirements of the
            applicable laws. We collect and process the following types of
            personal data as outlined below. Please note that we may also
            collect certain other information, which may be required under the
            applicable laws.
          </span>
        </p>
        <WithScroll className="c25">
          <table>
            <tbody>
              <tr className="c43">
                <td
                  className="c52 c42 table-title_italic"
                  colSpan={3}
                  rowSpan={1}
                >
                  <p className="c12">
                    <span>Category of Data</span>
                  </p>
                </td>
              </tr>
              <tr className="c43">
                <td
                  width="25%"
                  className="c10 table-title_italic"
                  colSpan={1}
                  rowSpan={1}
                >
                  <p className="c12">
                    <span className="">Examples</span>
                  </p>
                </td>
                <td
                  width="37%"
                  className="table-title_italic"
                  colSpan={1}
                  rowSpan={1}
                >
                  <p className="c12">
                    <span className="">Description</span>
                  </p>
                </td>
                <td
                  width="37%"
                  className="table-title_italic"
                  colSpan={1}
                  rowSpan={1}
                >
                  <p className="c12">
                    <span className="">Other Comments</span>
                  </p>
                </td>
              </tr>
              <tr className="c43">
                <td className="c52 c42 table-title" colSpan={3} rowSpan={1}>
                  <p className="c26 c53">
                    <span className="c9 c3">Account Data</span>
                  </p>
                </td>
              </tr>
              <tr className="c43">
                <td className="c10 table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c39 c26">
                    <span className="c2">email address</span>
                  </p>
                </td>
                <td className="c7" colSpan={1} rowSpan={1}>
                  <p className="c31 c26">
                    <span className="c3">–</span>
                  </p>
                </td>
                <td className="c45" colSpan={1} rowSpan={1}>
                  <p className="c0">
                    <span className="c3">Email </span>
                    <span className="c3">address</span>
                    <span className="c3">
                      &nbsp;may be considered personal data.
                    </span>
                  </p>
                </td>
              </tr>
              <tr className="c15">
                <td className="c10 table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c26 c39">
                    <span className="c2">password</span>
                  </p>
                </td>
                <td className="c7" colSpan={1} rowSpan={1}>
                  <p className="c31 c26">
                    <span className="c2">–</span>
                  </p>
                </td>
                <td className="c45" colSpan={1} rowSpan={1}>
                  <p className="c31 c26">
                    <span className="c2">–</span>
                  </p>
                </td>
              </tr>
              <tr className="c15">
                <td className="c10 table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c39 c26">
                    <span className="c2">username</span>
                  </p>
                </td>
                <td className="c7" colSpan={1} rowSpan={1}>
                  <p className="c56">
                    <span className="c2">
                      This does not have to be personal data.
                    </span>
                  </p>
                </td>
                <td className="c45" colSpan={1} rowSpan={1}>
                  <p className="c0">
                    <span className="c2">
                      The username is generated automatically based on the email
                      address.
                    </span>
                  </p>
                </td>
              </tr>
              <tr className="c15">
                <td className="c52 c42 table-title" colSpan={3} rowSpan={1}>
                  <p className="c12 c26">
                    <span className="c44 c9 c3">Wallet Data</span>
                  </p>
                </td>
              </tr>
              <tr className="c15">
                <td className="c10 table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c0">
                    <span className="c3">Wallet Address(es)</span>
                  </p>
                </td>
                <td className="c7" colSpan={1} rowSpan={1}>
                  <p className="c0">
                    <span className="c2">
                      A public address on the respective blockchain network
                      associated with the relevant Wallet. It constitutes a
                      random set of symbols assigned by the respective
                      blockchain network.
                    </span>
                  </p>
                </td>
                <td className="c45" colSpan={1} rowSpan={3}>
                  <p className="c50 c26">
                    <span className="c2">
                      While processing the Wallet Addresses and associated
                      transactions, we can not identify you as an individual
                      since it is impossible to identify you having only a
                      random set of symbols.
                    </span>
                  </p>
                  <p className="c39 c26">
                    <span className="c2">
                      Therefore, generally, this data is not personal. However,
                      under the applicable data protection legislation, if such
                      data is combined with certain other data (such as a
                      username, email address, etc.) it may become possible to
                      identify you as an individual and thus, such a set of data
                      may be deemed personal information.
                    </span>
                  </p>
                </td>
              </tr>
              <tr className="c85">
                <td className="c10 table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c26 c31">
                    <span className="c2">Wallet balances</span>
                  </p>
                </td>
                <td className="c7" colSpan={1} rowSpan={1}>
                  <p className="c0">
                    <span className="c2">
                      As the Wallet Address is publicly available, any person,
                      including us, may see the amount of Digital Assets stored
                      in the respective Wallet.
                    </span>
                  </p>
                </td>
              </tr>
              <tr className="c74">
                <td className="c10 table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c39 c26">
                    <span className="c3">
                      information about transactions associated with the Wallet
                      Address
                    </span>
                  </p>
                </td>
                <td className="c7" colSpan={1} rowSpan={1}>
                  <p className="c39 c26">
                    <span className="c2">
                      This may include: transaction amount, time and date,
                      status, Wallet Addresses of sender and recipient, etc.
                    </span>
                  </p>
                </td>
              </tr>
              <tr className="c15">
                <td className="c42 c52 table-title" colSpan={3} rowSpan={1}>
                  <p className="c12 c26">
                    <span className="c9 c3">Analytical Data</span>
                  </p>
                </td>
              </tr>
              <tr className="c15">
                <td className="c10 table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c0">
                    <span className="c3">internet protocol (IP) address</span>
                  </p>
                </td>
                <td className="c7" colSpan={1} rowSpan={1}>
                  <p className="c57 c26 c33">
                    <span className="c2">
                      A unique address of a device, which may help to identify
                      your approximate location (country, city, region, ZIP
                      code). For better understanding, IP addresses are
                      expressed as a set of numbers, for instance: 194.150.2.33.
                    </span>
                  </p>
                  <p className="c0 c33">
                    <span className="c3">According to the </span>
                    <span className="c47 c3">
                      <LinkExternal
                        className="c32"
                        noIcon
                        href="https://support.google.com/analytics/answer/2763052?hl=en"
                      >
                        Google Analytics documentation
                      </LinkExternal>
                    </span>
                    <span className="c2">
                      , the IP address is anonymised (masked), so neither we nor
                      Google can identify the IP address and precise location of
                      a particular visitor.
                    </span>
                  </p>
                </td>
                <td className="c45" colSpan={1} rowSpan={5}>
                  <p className="c20">
                    <span className="c9 c3">Google</span>
                    <span className="c3">
                      . Analytical Data are collected via Google Analytics,
                      operated by Google Ireland Limited and its affiliates,
                      including Google LLC (“
                    </span>
                    <span className="c9 c3">Google</span>
                    <span className="c3">
                      ”). More information regarding Google Analytics is
                      available{" "}
                    </span>
                    <span className="c64 c3">
                      <LinkExternal
                        className="c32"
                        noIcon
                        href="https://marketingplatform.google.com/about/analytics/"
                      >
                        here
                      </LinkExternal>
                    </span>
                    <span className="c2">.</span>
                  </p>
                  <p className="c20">
                    <span className="c9 c3">Cookies.</span>
                    <span className="c2">
                      &nbsp;Google gathers information by means of cookies.
                      Cookies are, in effect, small data files that are placed
                      on your device and by which it is possible to recognise
                      this device when you interact with or return to the
                      respective Product.
                    </span>
                  </p>
                  <p className="c20">
                    <span className="c9 c3">Aggregated Data.</span>
                    <span className="c2">
                      &nbsp;Google creates reports, which contain the aggregated
                      information about the use of the Products, where we do not
                      see any data pertaining to a particular person. In other
                      words, we cannot identify you and your actions from the
                      other visitors and their actions.
                    </span>
                  </p>
                  <p className="c0 c59">
                    <span className="c9 c3">Role</span>
                    <span className="c3">. With respect </span>
                    <span className="c3">to </span>
                    <span className="c3">
                      Analytical Data, Google acts as our data processor.
                      However, Google may use such personal data for any of its
                      own purposes, in which case, Google acts as an independent
                      data controller, and we shall not be related to or liable
                      for such processing. You can learn more about how Google
                      processes personal data in{" "}
                    </span>
                    <span className="c47 c3">
                      <LinkExternal
                        noIcon
                        className="c32"
                        href="https://policies.google.com/privacy"
                      >
                        Google’s privacy policy
                      </LinkExternal>
                    </span>
                    <span className="c2">.</span>
                  </p>
                </td>
              </tr>
              <tr className="c15">
                <td className="c10 table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c31 c26">
                    <span className="c3">browser details</span>
                  </p>
                </td>
                <td className="c7" colSpan={1} rowSpan={1}>
                  <p className="c0 c33">
                    <span className="c2">
                      This includes information about the browser type and its
                      version.
                    </span>
                  </p>
                </td>
              </tr>
              <tr className="c15">
                <td className="c10 table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c31 c26">
                    <span className="c2">device details</span>
                  </p>
                </td>
                <td className="c7" colSpan={1} rowSpan={1}>
                  <p className="c0 c33">
                    <span className="c2">
                      This includes information about the type of device (e.g.,
                      computer, tablet, or smartphone).
                    </span>
                  </p>
                </td>
              </tr>
              <tr className="c15">
                <td className="c10 table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c31 c26">
                    <span className="c2">operating system</span>
                  </p>
                </td>
                <td className="c7" colSpan={1} rowSpan={1}>
                  <p className="c0 c33">
                    <span className="c2">
                      This includes information about the type and version of
                      the operating system on your device (e.g., Windows 10,
                      macOS version 12.4, etc.).
                    </span>
                  </p>
                </td>
              </tr>
              <tr className="c15">
                <td className="c10 table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c0 c27">
                    <span className="c2">
                      other information regarding the use of the Products
                    </span>
                  </p>
                </td>
                <td className="c7" colSpan={1} rowSpan={1}>
                  <p className="c0 c33">
                    <span className="c2">
                      For instance, when you clicked a certain button or made
                      some input.
                    </span>
                  </p>
                </td>
              </tr>
              <tr className="c15">
                <td className="c52 c42 table-title" colSpan={3} rowSpan={1}>
                  <p className="c12 c26 c27">
                    <span className="c9 c3">Contact Data</span>
                  </p>
                </td>
              </tr>
              <tr className="c15">
                <td className="c10 table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c0">
                    <span className="c3">full name</span>
                  </p>
                </td>
                <td className="c7" colSpan={1} rowSpan={1}>
                  <p className="c39 c26">
                    <span className="c2">
                      This may include your first name, last name and middle
                      name, if any.
                    </span>
                  </p>
                </td>
                <td className="c45" colSpan={1} rowSpan={1}>
                  <p className="c0">
                    <span className="c2">
                      Please do not provide it unless it is reasonably necessary
                      or requested by us.
                    </span>
                  </p>
                </td>
              </tr>
              <tr className="c15">
                <td className="c10 table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c0">
                    <span className="c3">contact details</span>
                  </p>
                </td>
                <td className="c7" colSpan={1} rowSpan={1}>
                  <p className="c0">
                    <span className="c2">
                      This may include your email address or social media
                      contacts.
                    </span>
                  </p>
                </td>
                <td className="c45" colSpan={1} rowSpan={1}>
                  <p className="c0">
                    <span className="c2">–</span>
                  </p>
                </td>
              </tr>
              <tr className="c15">
                <td className="c10 table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c0 c27">
                    <span className="c3">
                      any other data requested by us or data that you choose to
                      provide us with
                    </span>
                  </p>
                </td>
                <td className="c7" colSpan={1} rowSpan={1}>
                  <p className="c0">
                    <span className="c2">–</span>
                  </p>
                </td>
                <td className="c45" colSpan={1} rowSpan={1}>
                  <p className="c0">
                    <span className="c2">
                      Please do not provide personal data unless it is
                      reasonably necessary or requested by us.
                    </span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </WithScroll>
        <ol className="c23 lst-kix_hkndm29z20uu-0" start={5}>
          <li className="c26 c70 li-bullet-0 c9">
            <span className="c48 c9">How Do We Use Personal Data?</span>
          </li>
        </ol>

        <WithScroll className="c11">
          <table>
            <tbody>
              <tr className="c35">
                <td
                  width="25%"
                  className="c37 table-title_italic"
                  colSpan={1}
                  rowSpan={1}
                >
                  <p className="c12 c79">
                    <span>Category of Data</span>
                  </p>
                </td>
                <td
                  width="35%"
                  className="c36 c42 table-title_italic"
                  colSpan={1}
                  rowSpan={1}
                >
                  <p className="c12 c58">
                    <span>Description</span>
                  </p>
                </td>
                <td
                  width="35%"
                  className="c22 c42 table-title_italic"
                  colSpan={1}
                  rowSpan={1}
                >
                  <p className="c12 c62">
                    <span>Lawful Basis for Processing</span>
                  </p>
                </td>
              </tr>
              <tr className="c15">
                <td className="table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c31">
                    <span className="c44 c9 c3">Account Data</span>
                  </p>
                </td>
                <td className="c36" colSpan={1} rowSpan={1}>
                  <p className="c0 c77">
                    <span className="c2">
                      To create and register an Account to access and use
                      certain functionality of the Explorer.
                    </span>
                  </p>
                </td>
                <td className="c22" colSpan={1} rowSpan={1}>
                  <p className="c38 c26">
                    <span className="c3">To perform a </span>
                    <span className="c9 c3">contract</span>
                    <span className="c2">&nbsp;with you.</span>
                  </p>
                  <p className="c0 c62">
                    <span className="c3">
                      If you act on behalf of a legal entity 一 our{" "}
                    </span>
                    <span className="c9 c3">legitimate interest</span>
                    <span className="c2">
                      &nbsp;to ensure the access and use of Explorer by the
                      legal entity you represent.
                    </span>
                  </p>
                </td>
              </tr>
              <tr className="c15">
                <td className="table-row_title" colSpan={1} rowSpan={2}>
                  <p className="c39 c26">
                    <span className="c44 c9 c3">Wallet Data</span>
                  </p>
                </td>
                <td className="c36" colSpan={1} rowSpan={2}>
                  <p className="c39 c26">
                    <span className="c3">
                      To ensure the operation of the respective Products and
                      enable you to use their functionality.
                    </span>
                  </p>
                </td>
                <td className="c22" colSpan={1} rowSpan={2}>
                  <p className="c0 c62">
                    <span className="c3">To perform a </span>
                    <span className="c9 c3">contract</span>
                    <span className="c2">&nbsp;with you.</span>
                  </p>
                </td>
              </tr>
              <tr className="c15" />
              <tr className="c15">
                <td className="table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c5">
                    <span className="c44 c9 c3">Contact Data</span>
                  </p>
                </td>
                <td className="c36" colSpan={1} rowSpan={1}>
                  <p className="c57 c26 c58">
                    <span className="c3">To respond to your inquiry.</span>
                  </p>
                </td>
                <td className="c22" colSpan={1} rowSpan={1}>
                  <p className="c0 c62">
                    <span className="c3">Our </span>
                    <span className="c9 c3">legitimate interest</span>
                    <span className="c3">
                      &nbsp;to respond to your inquiry.
                    </span>
                  </p>
                </td>
              </tr>
              <tr className="c15">
                <td className="table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c5">
                    <span className="c44 c9 c3">Analytical Data</span>
                  </p>
                </td>
                <td className="c36" colSpan={1} rowSpan={1}>
                  <p className="c0 c62">
                    <span className="c2">
                      To analyse the use of the Products and provide a better
                      user experience by improving their functionality,
                      usability, user flow and interface.
                    </span>
                  </p>
                </td>
                <td className="c22" colSpan={1} rowSpan={1}>
                  <p className="c26 c38">
                    <span className="c3">Your </span>
                    <span className="c9 c3">consent</span>
                    <span className="c2">.</span>
                  </p>
                  <p className="c0 c62">
                    <span className="c3">
                      When you visit the respective Product, you are able to opt
                      out from using Google Analytics. You also may object to
                      the collection of personal data by Google Analytics by
                      downloading and installing a{" "}
                    </span>
                    <span className="c3 c64">
                      <LinkExternal
                        className="c32"
                        noIcon
                        href="https://tools.google.com/dlpage/gaoptout"
                      >
                        browser add-on from Google
                      </LinkExternal>
                    </span>
                    <span className="c2">.</span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </WithScroll>
        <ol className="c23 lst-kix_hkndm29z20uu-0" start={6}>
          <li className="c70 c26 li-bullet-0 c9">
            <span className="c48 c9">How Long Do We Process Your Data?</span>
          </li>
        </ol>
        <p className="c17">
          <span className="c2">
            As a general rule, we keep personal data as long as it is necessary
            for the purposes it was collected. We may process certain personal
            data longer than outlined below, if it is necessary:
          </span>
        </p>
        <p className="c17 c54">
          <span className="c2">
            (a) &nbsp;to meet our legal obligations under the applicable law;
          </span>
        </p>
        <p className="c17 c54">
          <span className="c2">
            (b) &nbsp;in relation to anticipated or pending legal proceedings;
            or{" "}
          </span>
        </p>
        <p className="c17 c54">
          <span className="c2">
            (c) &nbsp;to protect our rights and legitimate interests or those of
            third parties.
          </span>
        </p>

        <WithScroll className="c11">
          <table>
            <tbody>
              <tr className="c35">
                <td
                  width="25%"
                  className="table-title_italic"
                  colSpan={1}
                  rowSpan={1}
                >
                  <p>
                    <span>Category of Data</span>
                  </p>
                </td>
                <td
                  width="37%"
                  className="table-title_italic"
                  colSpan={1}
                  rowSpan={1}
                >
                  <p>
                    <span>Storage Period</span>
                  </p>
                </td>
                <td
                  width="37%"
                  className="table-title_italic"
                  colSpan={1}
                  rowSpan={1}
                >
                  <p>
                    <span>Rationale</span>
                  </p>
                </td>
              </tr>
              <tr className="c67">
                <td
                  className="table-row_title table-row_title"
                  colSpan={1}
                  rowSpan={1}
                >
                  <p className="c0">
                    <span className="c44 c9 c3">Account Data</span>
                  </p>
                </td>
                <td className="c66" colSpan={1} rowSpan={1}>
                  <p className="c57 c26">
                    <span className="c2">
                      As long as you keep your Account within the Explorer.
                    </span>
                  </p>
                </td>
                <td className="c86" colSpan={1} rowSpan={1}>
                  <p className="c56">
                    <span className="c2">
                      We process your Account Data as long as it is necessary
                      for the operation of your Account.
                    </span>
                  </p>
                </td>
              </tr>
              <tr className="c8">
                <td className="table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c0">
                    <span className="c44 c9 c3">Wallet Data</span>
                  </p>
                </td>
                <td className="c80" colSpan={1} rowSpan={1}>
                  <p className="c26 c21 c50">
                    <span className="c2">
                      As long as you keep your Wallet connected to the
                      respective Product.
                    </span>
                  </p>
                  <p className="c39 c26 c21">
                    <span className="c2">
                      Please note that due to the nature of a blockchain, the
                      Wallet Data may be stored permanently on the applicable
                      blockchain (not by us).
                    </span>
                  </p>
                </td>
                <td className="c69" colSpan={1} rowSpan={1}>
                  <p className="c26 c57">
                    <span className="c2">
                      We need such data for the purposes outlined above.
                    </span>
                  </p>
                </td>
              </tr>
              <tr className="c13">
                <td className="table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c56">
                    <span className="c44 c9 c3">Contact Data</span>
                  </p>
                </td>
                <td className="c83" colSpan={1} rowSpan={1}>
                  <p className="c0 c21">
                    <span className="c3">For </span>
                    <span className="c3">one (1) year</span>
                    <span className="c2">
                      &nbsp;from the last date when you contacted us regarding
                      the same matter.
                    </span>
                  </p>
                </td>
                <td className="c69" colSpan={1} rowSpan={1}>
                  <p className="c0 c65">
                    <span className="c2">
                      We set this retention period due to the statutes of
                      limitations established in the Terms.
                    </span>
                  </p>
                </td>
              </tr>
              <tr className="c13">
                <td className="table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c56">
                    <span className="c44 c9 c3">Analytical Data</span>
                  </p>
                </td>
                <td className="c55" colSpan={1} rowSpan={1}>
                  <p className="c39 c26 c49">
                    <span className="c2">
                      We do not establish any storage period as the Analytical
                      Data is anonymous, aggregated, and does not allow for
                      identifying any particular person against the visitors of
                      the Products.
                    </span>
                  </p>
                </td>
                <td className="c72" colSpan={1} rowSpan={1}>
                  <p className="c39 c26 c49">
                    <span className="c2">
                      If and to the extent we become able to identify any
                      particular person, we will promptly update this Privacy
                      Notice and establish a certain limitation period for
                      processing the Analytical Data.
                    </span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </WithScroll>
        <ol className="c23 lst-kix_hkndm29z20uu-0" start={7}>
          <li className="c30 c26 c63 li-bullet-0 c9">
            <h1 id="h.iqm7tudu7pd" style={{ display: "inline" }}>
              <span className="c48 c9">How Do We Share Your Data?</span>
            </h1>
          </li>
        </ol>
        <p className="c17 c63">
          <span className="c9 c3">General.</span>
          <span className="c2">
            &nbsp;We do not sell or rent out your data. However, we may share
            your personal data in accordance with this Privacy Notice,
            applicable legislation, or with your consent, in each case for the
            purposes of and if it is reasonably necessary:{" "}
          </span>
        </p>
        <ol className="c23 list-item_alpha start" start={1}>
          <li className="c17 c28 li-bullet-1">
            <span className="c2">
              to provide you with access to the Products and performance of our
              undertakings with you;
            </span>
          </li>
          <li className="c17 c28 li-bullet-1">
            <span className="c2">
              for compliance with the applicable laws and regulations; or
            </span>
          </li>
          <li className="c17 c28 li-bullet-1">
            <span className="c2">
              for our legitimate interest to maintain, improve and develop the
              Products.{" "}
            </span>
          </li>
        </ol>
        <p className="c17 c63">
          <span className="c2">
            Please note that if we share any portion of your personal data with
            third persons, we will endeavour to secure such transfer using
            appropriate legal, organisational, and technical measures.
          </span>
        </p>
        <p className="c17 c63">
          <span className="c9 c3">Recipients.</span>
          <span className="c3">
            &nbsp;Given the purposes outlined above, your personal information
            is shared with the following categories of recipients:
          </span>
        </p>
        <ol className="c23 list-item_alpha start" start={1}>
          <li className="c17 c28 li-bullet-2">
            <span className="c2">Affiliates;</span>
          </li>
          <li className="c34 c26 c78 li-bullet-1">
            <span className="c3">analytical solution providers, such as </span>
            <span className="c64 c3">
              <LinkExternal
                noIcon
                className="c32"
                href="https://marketingplatform.google.com/about/analytics/"
              >
                Google Analytics
              </LinkExternal>
            </span>
            <span className="c2">;</span>
          </li>
          <li className="c17 c28 li-bullet-2">
            <span className="c2">support and technical teams;</span>
          </li>
          <li className="c17 c28 li-bullet-1">
            <span className="c2">hosting service providers; </span>
          </li>
          <li className="c17 c28 li-bullet-2">
            <span className="c2">
              government authorities, upon their request, or if necessary to
              comply with our legal obligations;
            </span>
          </li>
          <li className="c17 c28 li-bullet-2">
            <span className="c3">
              another entity if we sell or otherwise transfer the Products or
              their parts; and
            </span>
          </li>
          <li className="c17 c28 li-bullet-2">
            <span className="c2">
              other third-party solutions, which may be from time to time
              integrated in relation to the Products.
            </span>
          </li>
        </ol>
        <ol className="c23 lst-kix_hkndm29z20uu-0" start={8}>
          <li className="c26 c30 li-bullet-0 c9">
            <h1 id="h.fk3swu18k8gy" style={{ display: "inline" }}>
              <span className="c9 c29">
                What Are the Features of Blockchain Data Processing?
              </span>
            </h1>
          </li>
        </ol>
        <p className="c34 c26">
          <span className="c2">
            Please note that Wallet Data may interact with public decentralised
            blockchain infrastructures and blockchain-based software, including
            smart-contracts, that work autonomously. The data entered in a
            public decentralised blockchain is distributed via the nodes that
            simultaneously store all records entered into the blockchain.
          </span>
        </p>
        <p className="c34 c26">
          <span className="c2">
            By design, blockchain records cannot be changed or deleted and are
            said to be “immutable”. Please be aware that any transaction within
            a blockchain may be irreversible and information entered into a
            blockchain cannot be deleted or changed. Therefore, your ability to
            exercise certain data protection rights or abilities may be limited.{" "}
          </span>
        </p>
        <p className="c26 c34">
          <span className="c2">
            In addition, due to the blockchain’s nature, the information that
            was entered in a blockchain will be publicly available and we
            neither control such information nor manage access to it.
          </span>
        </p>
        <ol className="c23 lst-kix_hkndm29z20uu-0" start={9}>
          <li className="c30 c26 li-bullet-0 c9">
            <h1 id="h.wdv9fj752oo2" style={{ display: "inline" }}>
              <span className="c9 c48">
                Are You Subject to Automated Decision-Making?
              </span>
            </h1>
          </li>
        </ol>
        <p className="c17 c63">
          <span className="c2">
            Automated decision-making is the process of making a decision by
            automated means without any human influence on the outcomes. We do
            not make any automated decisions based on your personal data. If we
            intend to process your personal data by any automated means, we will
            do our best to inform you about the same prior to such processing.
          </span>
        </p>
        <ol className="c23 lst-kix_hkndm29z20uu-0" start={10}>
          <li className="c30 c26 li-bullet-0 c9">
            <h1 id="h.kwrsewsfhpb" style={{ display: "inline" }}>
              <span className="c48 c9">
                What About Interacting with Third-Party Links?
              </span>
            </h1>
          </li>
        </ol>
        <p className="c34 c26">
          <span className="c3">
            The Products may include links and social media plugins to
            third-party websites and applications. Clicking on those links or
            enabling those connections may allow third parties to collect or
            share certain data about you. We do not control these third-party
            websites and applications, and are not responsible for their privacy
            statements. When you leave any Product, we encourage you to read the
            privacy policy/notice/statement of every website or application you
            visit.
          </span>
        </p>
        <ol className="c23 lst-kix_hkndm29z20uu-0" start={11}>
          <li className="c30 c26 li-bullet-0 c9">
            <h1 id="h.fcm301shb17h" style={{ display: "inline" }}>
              <span className="c48 c9">
                What Data Subject Rights Do You Have?
              </span>
            </h1>
          </li>
        </ol>
        <p className="c17">
          <span className="c9 c3">General.</span>
          <span className="c2">
            &nbsp;According to the applicable data protection legislation, you
            may have the rights outlined below. In order to exercise your rights
            as a data subject, we may request certain information from you to
            verify your identity and confirm that you have the right to exercise
            such rights.
          </span>
        </p>
        <p className="c71 c26">
          <span className="c9 c3">Blockchain Data Processing.</span>
          <span className="c2">
            &nbsp;Please note that when you interact with a blockchain, we may
            not be able to exercise certain rights that you may have pursuant to
            the applicable data protection legislation with respect to the
            Wallet Data. For instance, we may not be able to ensure that such
            data is deleted, corrected, or restricted. You may learn more above
            in the “What Are the Features of Blockchain Data Processing?”
            section of this Privacy Notice.
          </span>
        </p>
        <p className="c26 c71">
          <span className="c9 c3">Data Subject Rights.</span>
          <span className="c2">
            &nbsp;According to the applicable legislation, you may have the
            following rights:
          </span>
        </p>

        <WithScroll className="c11">
          <table>
            <tbody>
              <tr className="c35">
                <td
                  width="35%"
                  className="table-title_italic"
                  colSpan={1}
                  rowSpan={1}
                >
                  <p>
                    <span>Rights</span>
                  </p>
                </td>
                <td
                  width="65%"
                  className="table-title_italic table-span"
                  colSpan={1}
                  rowSpan={1}
                >
                  <p>
                    <span className="c9 c3 c76">Description</span>
                  </p>
                </td>
              </tr>
              <tr className="c35">
                <td className="table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c57 c26 c27">
                    <span className="c3">Right to </span>
                    <span className="c9 c3">access </span>
                    <span className="c2">your personal data </span>
                  </p>
                </td>
                <td className="c41" colSpan={1} rowSpan={1}>
                  <p className="c0 c1">
                    <span className="c2">
                      This enables you to ask us whether we process your
                      personal data. If we process your data, you may request
                      certain information about the processing activity and/or a
                      copy of the personal data we hold about you, and check
                      that we are lawfully processing it.
                    </span>
                  </p>
                </td>
              </tr>
              <tr className="c35">
                <td className="table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c57 c26 c27">
                    <span className="c3">Right to </span>
                    <span className="c9 c3">rectification</span>
                    <span className="c2">&nbsp;of the personal data</span>
                  </p>
                </td>
                <td className="c41" colSpan={1} rowSpan={1}>
                  <p className="c0 c1">
                    <span className="c2">
                      This enables you to have any incomplete or inaccurate data
                      we hold about you completed or rectified, though we may
                      need to verify the accuracy of the new data you provide to
                      us.
                    </span>
                  </p>
                </td>
              </tr>
              <tr className="c35">
                <td className="table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c0 c27">
                    <span className="c3">Right to </span>
                    <span className="c9 c3">erasure</span>
                    <span className="c3">
                      &nbsp;of your personal data (commonly known as a “
                    </span>
                    <span className="c9 c3">right to be forgotten</span>
                    <span className="c2">”)</span>
                  </p>
                </td>
                <td className="c41" colSpan={1} rowSpan={1}>
                  <p className="c57 c26 c1">
                    <span className="c2">
                      This enables you to ask us to delete or remove personal
                      data where there is no good reason for us to continue
                      processing it. You also have the right to ask us to delete
                      or remove your personal data where you have successfully
                      exercised your right to object to processing (see below),
                      where we may have processed your information unlawfully or
                      where we are required to erase your personal data to
                      comply with local law.{" "}
                    </span>
                  </p>
                  <p className="c0 c1">
                    <span className="c2">
                      Note, however, that we may not always be able to comply
                      with your request of erasure for specific legal or
                      technical reasons which will be notified to you, if
                      applicable, at the time of your request
                    </span>
                  </p>
                </td>
              </tr>
              <tr className="c35">
                <td className="table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c57 c26 c27">
                    <span className="c3">Right to </span>
                    <span className="c9 c3">object</span>
                    <span className="c2">
                      &nbsp;to processing of your personal data
                    </span>
                  </p>
                </td>
                <td className="c41" colSpan={1} rowSpan={1}>
                  <p className="c0 c1">
                    <span className="c2">
                      This enables you to object to processing of your personal
                      data where we are relying on a legitimate interest and
                      there is something about your particular situation which
                      makes you want to object to processing on this ground as
                      you feel it impacts your fundamental rights and freedoms.
                      You also have the right to object where we are processing
                      your personal data for direct marketing purposes. In some
                      cases, we may demonstrate that we have compelling
                      legitimate grounds to process your information which
                      override your rights and freedoms.
                    </span>
                  </p>
                </td>
              </tr>
              <tr className="c35">
                <td className="table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c57 c26 c27">
                    <span className="c3">Right to </span>
                    <span className="c9 c3">restrict</span>
                    <span className="c2">
                      &nbsp;the processing of your personal data
                    </span>
                  </p>
                </td>
                <td className="c41" colSpan={1} rowSpan={1}>
                  <p className="c0 c1">
                    <span className="c2">
                      This enables you to ask us to suspend the processing of
                      your personal data in the following scenarios: (i) if you
                      want us to establish the data’s accuracy, (ii) where our
                      use of the data is unlawful but you do not want us to
                      erase it, (iii) where you need us to hold the data even if
                      we no longer require it as you need it to establish,
                      exercise or defend legal claims, (iv) you have objected to
                      our use of your data but we need to verify whether we have
                      overriding legitimate grounds to use it.
                    </span>
                  </p>
                </td>
              </tr>
              <tr className="c35">
                <td className="table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c57 c26 c27">
                    <span className="c3">Request the </span>
                    <span className="c9 c3">transfer</span>
                    <span className="c3">
                      &nbsp;of your personal data (commonly known as a “
                    </span>
                    <span className="c9 c3">right to the data portability</span>
                    <span className="c2">”)</span>
                  </p>
                </td>
                <td className="c41" colSpan={1} rowSpan={1}>
                  <p className="c0 c1">
                    <span className="c2">
                      We will provide to you, or a third party you have chosen,
                      your personal data in a structured, commonly used,
                      machine-readable format. Note that this right only applies
                      to automated information which you initially provided
                      consent for us to use or where we used the information to
                      perform a contract with you
                    </span>
                  </p>
                </td>
              </tr>
              <tr className="c35">
                <td className="table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c57 c26 c27">
                    <span className="c3">Right to</span>
                    <span className="c9 c3">&nbsp;withdraw consent</span>
                  </p>
                </td>
                <td className="c41" colSpan={1} rowSpan={1}>
                  <p className="c0 c1">
                    <span className="c2">
                      You may withdraw your consent at any time where we are
                      relying on consent to process your personal data.
                    </span>
                  </p>
                </td>
              </tr>
              <tr className="c35">
                <td className="table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c57 c26 c27">
                    <span className="c3">Right not to be subject to </span>
                    <span className="c9 c3">automated decision-making</span>
                  </p>
                </td>
                <td className="c41" colSpan={1} rowSpan={1}>
                  <p className="c0 c1">
                    <span className="c2">
                      If and to the extent applicable, you reserve the right not
                      to be subject to a decision based solely on automated
                      processing of data, including profiling, which produces
                      legal effects concerning you or similarly significantly
                      affecting you.
                    </span>
                  </p>
                </td>
              </tr>
              <tr className="c35">
                <td className="table-row_title" colSpan={1} rowSpan={1}>
                  <p className="c57 c26 c27">
                    <span className="c3">Right to</span>
                    <span className="c9 c3">&nbsp;file a complaint</span>
                  </p>
                </td>
                <td className="c41" colSpan={1} rowSpan={1}>
                  <p className="c0 c1">
                    <span className="c2">
                      You may file a complaint with a relevant supervisory
                      authority in case we violate your rights or obligations
                      imposed on us under the applicable legislation. The
                      relevant supervisory authority will particularly depend on
                      where you are located.{" "}
                    </span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </WithScroll>
        <ol className="c23 lst-kix_hkndm29z20uu-0" start={12}>
          <li className="c30 c26 li-bullet-0 c9">
            <h1 id="h.wmm57qwut84f" style={{ display: "inline" }}>
              <span className="c48 c9">
                Do We Process Children’s Personal Data?
              </span>
            </h1>
          </li>
        </ol>
        <p className="c17">
          <span className="c2">
            The Products are not intended for the use of children (under 18
            years old or older, if the country of your residence determines a
            higher age restriction). We do not knowingly market to, solicit,
            process, collect, or use personal data of children.
          </span>
        </p>
        <p className="c17">
          <span className="c2">
            If we become aware that a child has provided us with personal
            information, we will use commercially reasonable efforts to delete
            such information from our database. If you are the parent or legal
            guardian of a child and believe that we have collected personal
            information from your child, please contact us.
          </span>
        </p>
        <ol className="c23 lst-kix_hkndm29z20uu-0" start={13}>
          <li className="c30 c26 li-bullet-0 c9">
            <h1 id="h.kgf09ewmtxej" style={{ display: "inline" }}>
              <span className="c48 c9">
                Can We Modify and Update this Privacy Notice?
              </span>
            </h1>
          </li>
        </ol>
        <p className="c17">
          <span className="c2">
            We keep our Privacy Notice under regular review and we may update it
            at any time. If we make any changes to this document, we will change
            the “Last Updated” date above. Please review this Privacy Notice to
            check for the updates. If we make substantial changes to the way we
            treat your personal data, we will display a notice on the Website.
          </span>
        </p>
        <p className="c0 c18">
          <span className="c44 c61" />
        </p>
      </Flex>
    </VStack>
  )
}

export default Privacy
