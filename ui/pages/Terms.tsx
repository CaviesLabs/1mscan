import { Box, Flex, Text, VStack } from "@chakra-ui/react"
import { getEnvValue } from "configs/hydration/utils"
import LinkExternal from "ui/shared/LinkExternal"
import LinkInternal from "ui/shared/LinkInternal"
import OptimizationImage from "ui/shared/OptimizationImage"

type Props = {
  //
}

const Terms = ({}: Props) => {
  return (
    <VStack
      marginX="auto"
      spacing={3}
      width={{ base: "full", lg: "50rem", "2lg": "56.25rem", xl: "62.5rem" }}
      backgroundColor="neutral.light.1"
      borderWidth="1px"
      borderRadius="1rem"
      borderColor="neutral.light.3"
    >
      <Box
        width="full"
        height="9.75rem"
        borderRadius="0.75rem 0.75rem 2.5rem 2.5rem"
        overflow="hidden"
        position="relative"
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
            General <br />
            Terms & Conditions
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
        paddingX={{ base: 4, lg: 8 }}
        color="neutral.light.7"
        sx={{
          "& .c3": { fontWeight: 500 },
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
          "& .c11": {
            display: "inline",
          },
        }}
      >
        <p className="c2">
          <span className="c1 c3">PREAMBLE</span>
        </p>
        <p className="c7">
          <span className="c1 c3">Application and Acceptance</span>
          <span className="c1 c3">. </span>
          <span className="c1">
            These Terms govern your access to and use of the Products provided
            by the{" "}
          </span>
          <span className="c1">Company</span>
          <span className="c1">. </span>
          <span className="c1">By accessing or using the </span>
          <span className="c1">Products</span>
          <span className="c1">
            , connecting your Wallet, registering an Account,{" "}
          </span>
          <span className="c1">
            or by clicking the button “I accept” or respective check box in
            connection with or relating to these Terms,
          </span>
          <span className="c1">
            &nbsp;you acknowledge that you have read, accept without
            modifications and agree to be bound by these Terms and all terms
            incorporated herein by reference, which form a legally binding
            agreement between you and us. If you do not accept or agree to these
            Terms, you are not allowed to access or use the{" "}
          </span>
          <span className="c1">Products</span>
          <span className="c1">
            , and must immediately discontinue any use thereof. If you are
            acting for or on behalf of an entity, you hereby represent and
            warrant that you are{" "}
          </span>
          <span className="c1">authorised</span>
          <span className="c1">
            &nbsp;to accept these Terms and enter into a binding agreement with
            us on such entity’s behalf, and you accept these Terms both on
            behalf of such entity and on your own behalf.
          </span>
        </p>
        <p className="c7">
          <span className="c1 c3">Definitions.</span>
          <span className="c1">&nbsp;</span>
          <span className="c1">
            Definitions of capitalised terms used herein are provided in{" "}
          </span>
          <span className="c1">Section</span>
          <span className="c1">&nbsp;</span>
          <span className="c1">18</span>
          <span className="c1">&nbsp;below.</span>
        </p>
        <p className="c7">
          <span className="c1 c3">Important. </span>
          <span className="c1">
            Please read these Terms carefully as they affect your obligations
            and legal rights. Note that{" "}
          </span>
          <span className="c1">Sections 14 and 15 </span>
          <span className="c1">
            contain provisions governing the choice of law, dispute resolution
            terms and class action waiver. Please read and review{" "}
          </span>
          <span className="c1">Sections 8-11 </span>
          <span className="c1">
            carefully before accepting these Terms as they provide for the
            limitation of liability, your obligations to indemnify the Company
            Parties, and contain a disclaimer of warranties as well as other
            important disclaimers with regard to the{" "}
          </span>
          <span className="c1">Products</span>
          <span className="c1">.</span>
        </p>
        <ol className="c0 lst-kix_nqvbmp5cn5ce-0 start" start={1}>
          <li className="c7 c9 li-bullet-0">
            <h3 id="h.vtixkhhx763d" style={{ display: "inline" }}>
              <span>MODIFICATION</span>
            </h3>
          </li>
        </ol>
        <p className="c7">
          <span className="c1">
            We may modify, supplement or update these Terms from time to time at
            our sole and absolute discretion. If we make changes to these Terms,
            we will notify you of such changes by updating these Terms and the
            “Last Updated” date at the top of this document. We may (but are not
            obligated to) further provide you with an additional notification of
            the amendment via one of the Communication Channels. Unless
            otherwise notified by us, updated Terms shall be effective
            immediately, and your continued use of the Products will confirm the
            acceptance of such updated Terms. If you do not agree to the amended
            Terms, you must immediately discontinue any access to or use of the{" "}
          </span>
          <span className="c1">Products</span>
          <span className="c4 c5 c1">.</span>
        </p>
        <ol className="c0 lst-kix_nqvbmp5cn5ce-0" start={2}>
          <li className="c7 c9 li-bullet-0">
            <h3 id="h.4rqyfrt6trup" style={{ display: "inline" }}>
              <span>ELIGIBILITY</span>
            </h3>
          </li>
        </ol>
        <p className="c7">
          <span className="c1 c3">Eligibility Requirements. </span>
          <span className="c4 c5 c1">
            To be eligible to access and use the Products, you must:{" "}
          </span>
        </p>
        <ol className="c0 list-item_alpha start" start={1}>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              be able to form a legally binding agreement with us on the terms
              herein set forth;
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              neither be a Prohibited Person nor use the Products for the
              benefit of a Prohibited Person;{" "}
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              if individual, be at least 18 (eighteen) years of age, or of such
              higher age required to enter into a binding agreement with us on
              the terms set out herein according to the laws of the jurisdiction
              where you reside;
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              if an individual who is acting for or on behalf of an entity, (i)
              be duly authorised by such entity to act on its behalf for the
              purpose of entering into these Terms; and (ii) represent and
              warrant that the entity is duly registered and validly existing
              under the laws of the jurisdiction where it is established; and{" "}
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c1">comply with these Terms.</span>
          </li>
        </ol>
        <p className="c7">
          <span className="c1 c3">
            Failure to Comply with the Eligibility Requirements.
          </span>
          <span className="c4 c5 c1">
            &nbsp;If you determine that you do not meet any of the
            aforementioned eligibility requirements, you must immediately
            suspend your access to and use of the Products until the respective
            restricting circumstances cease to exist.
          </span>
        </p>
        <ol className="c0 lst-kix_nqvbmp5cn5ce-0" start={3}>
          <li className="c7 c9 li-bullet-0">
            <h3 id="h.jit68yu1mm0w" style={{ display: "inline" }}>
              <span>LICENCE</span>
              <span>&nbsp;AND </span>
              <span>PROPRIETARY RIGHTS</span>
            </h3>
          </li>
        </ol>
        <p className="c7">
          <span className="c1 c3">Licence. </span>
          <span className="c4 c5 c1">
            Subject to your compliance with these Terms, we hereby grant you the
            Licence. The Licence will remain effective until terminated, which
            shall occur upon the earlier of: (i) these Terms terminate or
            expire; or (ii) you violate these Terms; or (iii) we choose to
            terminate the Licence at our sole and absolute discretion, with or
            without reason.
          </span>
        </p>
        <p className="c7">
          <span className="c1 c3">FOSS Licence. </span>
          <span className="c4 c5 c1">
            To the extent that certain items or components of the Products are
            being distributed under the FOSS Licences, such items and components
            will not be covered by the Licence granted hereunder and will be
            provided to you under the terms and conditions of the applicable
            FOSS Licence.
          </span>
        </p>
        <p className="c7">
          <span className="c1 c3">Compliance.</span>
          <span className="c1">&nbsp;Your access and use of the </span>
          <span className="c1">Products</span>
          <span className="c4 c5 c1">
            &nbsp;shall not violate the terms of the Licence and/or FOSS
            Licences, if and as applicable.
          </span>
        </p>
        <p className="c7">
          <span className="c1 c3">Ownership. </span>
          <span className="c4 c5 c1">
            You do not receive any rights, title, or interest in or to the
            Intellectual Property and the respective rights holders reserve the
            right to prohibit any use thereof at any time. You may not obscure,
            remove or alter any marks or notices used within or in connection
            with the Products. Any rights not expressly granted to you under the
            Licence and/or applicable FOSS Licences are reserved by the
            respective rights holders.{" "}
          </span>
        </p>
        <p className="c7">
          <span className="c1 c3">Feedback</span>
          <span className="c1 c3">.</span>
          <span className="c1">
            &nbsp;By providing Feedbacks in relation to the Products, you grant
            us a non-exclusive, irrevocable, royalty-free, perpetual, worldwide
            licence (right) to use, copy, edit, reproduce, translate, publicly
            display and perform, distribute, commercialise, create derivative
            works from your Feedbacks, as well as the right to assign these
            rights to third parties in whole or in part, at our sole discretion,
            without restrictions or any obligations to you.
          </span>
        </p>
        <ol className="c0 lst-kix_nqvbmp5cn5ce-0" start={4}>
          <li className="c7 c9 li-bullet-0">
            <h3 id="h.hp3ezm5b51cm" style={{ display: "inline" }}>
              <span>WALLET</span>
              <span className="c4 c1 c3">S AND ACCOUNTS</span>
            </h3>
          </li>
        </ol>
        <p className="c7">
          <span className="c1 c3">Wallets.</span>
          <span className="c1">&nbsp;Y</span>
          <span className="c1">
            ou may connect your Wallets to the Products if their functionality
            enables you to do so, and{" "}
          </span>
          <span className="c1">
            may disconnect your Wallet from any Product at any time
          </span>
          <span className="c1">.</span>
          <span className="c1">
            &nbsp;The Wallets constitute the Third-Party Services and we are
            neither responsible for, nor endorse, and shall not be held liable
            in connection therewith. We make no warranties, whether express or
            implied, as to the Wallets used by you{" "}
          </span>
          <span className="c1">in connection </span>
          <span className="c1">with the </span>
          <span className="c1">Products</span>
          <span className="c4 c5 c1">
            &nbsp;or otherwise. When using Wallets, you should review applicable
            terms and policies that govern your use thereof.
          </span>
        </p>
        <p className="c7">
          <span className="c1 c3">Accounts. </span>
          <span className="c1">The functionality of the </span>
          <span className="c1">Explorer</span>
          <span className="c1">
            &nbsp;enables you to create Accounts to personalise your user
            experience.
          </span>
          <span className="c1">
            &nbsp;To register for an Account you need to go to the registration
            page within the{" "}
          </span>
          <span className="c1">Explorer</span>
          <span className="c4 c5 c1">
            &nbsp;on the respective supported blockchain network of your
            choosing, and follow the instructions provided thereon. You hereby
            acknowledge and agree that we may suspend or terminate any of your
            Accounts at any time, regardless of reason, without notice and any
            liability whatsoever.{" "}
          </span>
        </p>
        <p className="c7 c22">
          <span className="c1 c3">Security</span>
          <span className="c1 c3">.</span>
          <span className="c1">
            &nbsp;We never receive access to or control over your Wallets or
            Digital Assets held in such Wallets. Y
          </span>
          <span className="c1">
            ou are solely responsible for securing your Digital Assets, Wallets,
            Accounts and Credentials thereto
          </span>
          <span className="c1">. </span>
          <span className="c1">
            You should not disclose your Credentials to any third person and
            allow any third person to access your Wallets and/or Accounts. You
            will be solely responsible for any use of your Wallets, Accounts and
            Credentials thereto, as well as their confidentiality. You remain
            responsible for any acts or omissions of your Accounts and all
            transactions carried out via your Wallets or using Credentials
            thereto.{" "}
          </span>
          <span className="c1">In no event shall the Company Parties </span>
          <span className="c1">
            be responsible for or held liable in connection with any losses or
            damages, including consequential, incidental, or indirect damages,
            arising from unauthorised use of your Wallets, Accounts or any
            Credentials thereto, or if you failed to ensure confidentiality of
            your Credentials.
          </span>
        </p>
        <ol className="c0 lst-kix_nqvbmp5cn5ce-0" start={5}>
          <li className="c7 c9 li-bullet-0">
            <h3 id="h.2vnwfmpzok3a" style={{ display: "inline" }}>
              <span>YOUR TRANSACTIONS</span>
            </h3>
          </li>
        </ol>
        <p className="c2">
          <span className="c1 c3">General</span>
          <span className="c1">.</span>
          <span className="c1 c3">&nbsp;</span>
          <span className="c4 c5 c1">
            The functionality of the Products may allow you to carry out certain
            transactions, involving Digital Assets. You shall solely evaluate
            any transactions carried out by you through or in relation to the
            Products. Any transactions with the Digital Assets are processed by
            the applicable Third-Party Services, such as underlying blockchain
            network(s) of the Blockchain-Based Infrastructure, that we neither
            operate nor control or influence. There is also no control or
            influence on transactions with Digital Assets and, therefore, we
            cannot cancel, reverse, block, or freeze any transactions on a
            blockchain network.
          </span>
        </p>
        <p className="c17">
          <span className="c1 c3">Non-Party Status.</span>
          <span className="c1">
            &nbsp;We do not act as a party to, nor do we participate in, any
            transactions carried out through the Products between you and any
            third person. With respect to any transactions with your
            involvement, the relevant legal relationships and obligations
            arising therefrom shall be deemed to exist solely between you and
            the corresponding counterparty. We neither assume nor intend to
            assume any role or liability as a party to such transactions, and
            shall not be held responsible for, or liable in connection with, any
            Disputes stemming from these relationships and associated
            transactions.
          </span>
        </p>
        <p className="c17">
          <span className="c1 c3">Disclaimer.</span>
          <span className="c1">&nbsp;</span>
          <span className="c1">
            We do not facilitate nor influence any transactions conducted
            through or in relation to the Products. However, we may enhance your
            experience of interacting with underlying blockchain networks and
            Third-Party Services by automatically configuring the parameters of
            your desired transactions or other interactions on the respective
            blockchain network. Consequently, we make no representations or
            warranties regarding the amount of time, transaction fees or other
            requirements that may be required for the respective transaction to
            be completed or processed. Also, we make no representations or
            warranties that any transaction will be completed or processed.
          </span>
        </p>
        <ol className="c0 lst-kix_nqvbmp5cn5ce-0" start={6}>
          <li className="c7 c9 li-bullet-0">
            <h3 id="h.c52hg3orsyhz" style={{ display: "inline" }}>
              <span>YOUR </span>
              <span>WARRANTIES AND REPRESENTATIONS</span>
            </h3>
          </li>
        </ol>
        <p className="c7">
          <span className="c1">By entering into these Terms, y</span>
          <span className="c1">ou </span>
          <span className="c1">expressly </span>
          <span className="c4 c5 c1">represent and warrant to us that:</span>
        </p>
        <ol className="c0 list-item_alpha start" start={1}>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              you have read and understand these Terms, including all documents
              and items incorporated herein by reference;
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              you have the necessary authority to accept these Terms, enter into
              a binding agreement with us, and perform the obligations set out
              herein;
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              the acceptance of these Terms shall not result in any breach of,
              be in conflict with, or constitute a breach or default under: (i)
              any provision of any judgement, decree or order imposed on you by
              any court, or governmental or regulatory authority; and/or (ii)
              any material agreement, obligation, duty or commitment to which
              you are a party or by which you are bound;
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c1">
              if you are acting for or on behalf of an entity, (i) such entity
              is duly incorporated, registered, validly existing and in good
              standing under the applicable laws of the jurisdiction in which
              the entity is established, and in each jurisdiction where it
              conducts business, and (ii) such entity shall be responsible for a
              breach of these Terms by you or any other employee or agent of
              such entity, unless you or any other employee or agent of such
              entity are responsible under the applicable law, and (iii){" "}
            </span>
            <span className="c1">
              the acceptance of these Terms shall not result in any breach of,
              be in conflict with, or constitute a breach or default under any
              provision of your statutory or organisational documents
            </span>
            <span className="c1">;</span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              you have sufficient understanding of the functionality, usage,
              storage, transmission mechanisms and intricacies associated with
              Digital Assets, Digital Asset storage facilities, including
              Wallets, and distributed ledger technology, including blockchain,
              in general;
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              any Wallet used by you in connection with the Products is either
              owned by you, or that you are validly authorised to carry out
              actions using such Wallet;
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c1">
              any funds or Digital Assets used by you in connection with the
              Products
            </span>
            <span className="c1">&nbsp;</span>
            <span className="c4 c5 c1">
              are from legitimate sources and were lawfully acquired;
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c1">you are not </span>
            <span className="c1">
              a Prohibited Person nor use the Products for the benefit of a
              Prohibited Person
            </span>
            <span className="c4 c5 c1">;</span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              you acknowledge and agree that we do not act as your agent or
              fiduciary, and that we do not control or custody your Digital
              Assets or other funds in any manner;
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c1">accessing and/or using the </span>
            <span className="c1">Products</span>
            <span className="c1">
              &nbsp;is not unlawful or prohibited under the laws of your
              jurisdiction or under the laws of any other jurisdiction to which
              you may be subject, and your access to and use of the{" "}
            </span>
            <span className="c1">Products</span>
            <span className="c1">
              &nbsp;shall be in full compliance with all applicable laws;
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              you will comply with and bear sole responsibility for any tax
              obligations applicable to you and arising in connection with your
              use of the Products, as well as any transactions made in
              connection therewith;
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              you acknowledge that the use of the Products may not be
              profitable, fit for a particular purpose, or be suitable for you;
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              you will carefully evaluate, check, and verify any Third-Party
              Content before you use it or rely upon it in any manner;
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c1">
              your use of the Materials is at your own risk, and{" "}
            </span>
            <span className="c4 c5 c1">
              you shall not make any decisions based solely on the Materials,
              and shall conduct your own substantial research and analysis
              before making any decision; and
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              all of the above representations and warranties are true,
              complete, accurate, and non-misleading from the time when you
              accept these Terms, and for the whole period of your use of the
              Products.
            </span>
          </li>
        </ol>
        <ol className="c0 lst-kix_nqvbmp5cn5ce-0" start={7}>
          <li className="c7 c9 li-bullet-0">
            <h3 id="h.byvlidhcknl9" style={{ display: "inline" }}>
              <span>PROHIBITED USE</span>
            </h3>
          </li>
        </ol>
        <p className="c7">
          <span className="c4 c5 c1">
            You agree that you shall not conduct or participate in any of the
            following activities when accessing or using the Products, or in
            connection with such access or use:
          </span>
        </p>
        <ol className="c0 list-item_alpha start" start={1}>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              disrupting, interfering with, or inhibiting other users from using
              the Products, Third-Party Services, or carrying out activities
              that could disable, impair, or harm the functioning of the
              Products, Third-Party Services, servers, or underlying software;
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c1">using the </span>
            <span className="c1">Products </span>
            <span className="c4 c5 c1">for any illegal purposes; </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c1">
              without prejudice to the terms of the FOSS Licences, circumventing
              or attempting to circumvent any access or functionality
              restrictions or limitations with respect to the{" "}
            </span>
            <span className="c1">Products </span>
            <span className="c4 c5 c1">
              using malware, harmful code or software, undertaking hacker
              attacks or similar activities;
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              taking advantage of any technical glitch, malfunction, failure,
              delay, default, or security breach on or of the Products;
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              uploading or transmitting any viruses or any other type of
              malicious code that will or may be used in any way that will
              affect the functionality or operation of the Products, Third-Party
              Services, servers, or underlying software;
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c1">use the </span>
            <span className="c1">Products</span>
            <span className="c1">
              &nbsp;or related information for any purpose that is harmful or
              detrimental to us, Affiliates, the{" "}
            </span>
            <span className="c1">Products, </span>
            <span className="c1">
              Third-Party Services, or other users of the{" "}
            </span>
            <span className="c1">Products</span>
            <span className="c4 c5 c1">&nbsp;or Third-Party Services;</span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              violating any rights of any third person, including trademark or
              intellectual property rights;
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              conducting fraudulent activities, providing any false, inaccurate,
              or misleading information in order to unlawfully obtain the
              Digital Assets or property of any person;
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              subject and without prejudice to the terms of the applicable FOSS
              Licences, copying, reproducing, or cloning any Product as a whole,
              or duplicating its essential elements without our prior written
              consent; or
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              carrying out any other unlawful activities, or activities that
              violate any applicable regulations, rules, orders, etc.
            </span>
          </li>
        </ol>
        <ol className="c0 lst-kix_nqvbmp5cn5ce-0" start={8}>
          <li className="c7 c9 li-bullet-0">
            <h3 id="h.ql1yvg7z9jwf" style={{ display: "inline" }}>
              <span>NO </span>
              <span>WARRANTIES OR REPRESENTATIONS</span>
            </h3>
          </li>
        </ol>
        <p className="c7">
          <span className="c1 c3">Provided “As Is”.</span>
          <span className="c1">
            &nbsp;The Products are provided on an “as is” and “as available”
            basis. You are solely responsible for determining whether to use the
            Products, as well as for the use thereof and any losses, damages and
            other consequences arising from such use. The Company makes no
            warranty of any kind, express or implied, including, but not limited
            to, the implied warranties of title, non-infringement, integration,
            merchantability, fitness for a particular purpose or any warranties
            implied by any course of performance or usage of trade, with respect
            to the Products,
          </span>
          <span className="c1">
            &nbsp;all of which are expressly disclaimed and denied
          </span>
          <span className="c4 c5 c1">. </span>
        </p>
        <p className="c7">
          <span className="c1 c3">Disclaimer.</span>
          <span className="c1">&nbsp;</span>
          <span className="c1">In particular,</span>
          <span className="c1">&nbsp;w</span>
          <span className="c4 c5 c1">
            e do not warrant, whether expressly or impliedly, and hereby
            expressly disclaim any warranty and/or representation that:
          </span>
        </p>
        <ol className="c0 list-item_alpha start" start={1}>
          <li className="c7 c19 li-bullet-1">
            <span className="c4 c5 c1">
              any Product will work as expected or represented;
            </span>
          </li>
          <li className="c7 c19 li-bullet-2">
            <span className="c1">
              any data or information displayed in or communicated via the
              Products will be timely, accurate, reliable, true or correct
            </span>
            <span className="c4 c5 c1">;</span>
          </li>
          <li className="c7 c19 li-bullet-1">
            <span className="c1">the </span>
            <span className="c1">Products</span>
            <span className="c4 c5 c1">
              &nbsp;will be secure, uninterrupted, or available at any
              particular time or place, or will continue working, operating or
              functioning for any period of time;
            </span>
          </li>
          <li className="c7 c15 li-bullet-2">
            <span className="c1">any </span>
            <span className="c1">Product</span>
            <span className="c1">
              &nbsp;will meet your expectations and/or fit for a particular
              purpose, or that use of any{" "}
            </span>
            <span className="c1">Product</span>
            <span className="c4 c5 c1">
              &nbsp;will be profitable, beneficial or suitable for you;
            </span>
          </li>
          <li className="c7 c19 li-bullet-1">
            <span className="c1">
              any defects, flaws, bugs or errors in the{" "}
            </span>
            <span className="c1">Products </span>
            <span className="c4 c5 c1">will be corrected or fixed; </span>
          </li>
          <li className="c7 c19 li-bullet-1">
            <span className="c1">any </span>
            <span className="c1">Product</span>
            <span className="c4 c5 c1">
              &nbsp;will be supported, developed, or facilitated in any manner;
              or
            </span>
          </li>
          <li className="c7 c19 li-bullet-2">
            <span className="c1">the</span>
            <span className="c1">&nbsp;</span>
            <span className="c1">Products</span>
            <span className="c4 c5 c1">
              &nbsp;and/or related software will be free of viruses, bugs,
              trojan horses, defects, flaws, malfunctions, or other harmful
              components, or properly protected from hacker, malware or other
              attacks, or third-party hostile interferences.
            </span>
          </li>
        </ol>
        <ol className="c0 lst-kix_nqvbmp5cn5ce-0" start={9}>
          <li className="c7 c9 li-bullet-0">
            <h3 id="h.9l66bprvv608" style={{ display: "inline" }}>
              <span>IMPORTANT DISCLAIMERS</span>
            </h3>
          </li>
        </ol>
        <p className="c2">
          <span className="c1 c3">Blockchain-Based Infrastructure.</span>
          <span className="c1">&nbsp;</span>
          <span className="c1">
            Although the Products may rely on and interact with the
            Blockchain-Based Infrastructure, they are distinct from it. The
            components of Blockchain-Based Infrastructure constitute independent
            software and are deployed on blockchain network(s) that operate
            autonomously. The underlying blockchain network(s) of the
            Blockchain-Based Infrastructure and any software through which such
            networks are formed are out of our control. Any malfunction,
            breakdown or abandonment of the underlying blockchain network(s) may
            have a material adverse effect on the Products. In no event shall
            the Company Parties be responsible for or held liable in connection
            with the underlying blockchain networks, their operation,
            functioning, implementation, or use, and you hereby assume and
            accept any and all related risks, including the risk of possible
            losses and damages that you may incur in connection with the use
            thereof. You should always do your own thorough research before
            interacting with the Blockchain-Based Infrastructure, and any use of
            its components shall be at your own risk.
          </span>
          <span className="c1">&nbsp;</span>
        </p>
        <p className="c2">
          <span className="c1 c3">Materials.</span>
          <span className="c1">
            &nbsp;No part of the Materials is intended to be, or should be
            considered or construed as, business, legal, financial, investment,
            trading, or any other sort of advice, or advice of a broker
            regarding any matters to which all or any part of such Materials
            relates. Before making the decision to use any{" "}
          </span>
          <span className="c1">Product or </span>
          <span className="c1">
            carry out any transactions, you should consult your own legal,
            financial, tax, or other professional advisors.{" "}
          </span>
          <span className="c1">
            In each case, you shall solely make an informed decision whether to
            rely on any Materials, and/or sell, buy, hold or otherwise transact
            with the Digital Assets relying thereon.{" "}
          </span>
          <span className="c4 c5 c1">
            We shall not be responsible for the accuracy, completeness or
            timeliness of the Materials, therefore any use of or reliance
            thereon will always be at your own discretion and risk, and you
            shall be solely responsible for any possible damages or losses
            arising therefrom.
          </span>
        </p>
        <p className="c2">
          <span className="c1 c3">No Custody</span>
          <span className="c1">.</span>
          <span className="c1 c3">&nbsp;</span>
          <span className="c4 c5 c1">
            We do not provide nor intend to provide any custodial or similar
            services, custodial solutions or software, do not act as your agent
            or representative, and do not control, manage, or custody any of
            your Digital Assets or Wallets.
          </span>
        </p>
        <p className="c2" id="h.acnot4q13fco">
          <span className="c1 c3">No Solicitation.</span>
          <span className="c1">
            &nbsp;These Terms, Products and any Materials{" "}
          </span>
          <span className="c1">do not constitute and </span>
          <span className="c1">
            are not intended to constitute an offer of securities, financial
            instruments, Digital Assets, or a solicitation for investment in or
            purchase of securities, financial instruments, or Digital Assets in
            any jurisdiction, nor they are intended to constitute a prospectus
            or offer document of any type.{" "}
          </span>
          <span className="c1">
            Nothing contained herein or in the Materials shall be construed as
            recommendation, endorsement or solicitation to use any Product, or
            carry out any transaction, involving the Digital Assets.
          </span>
          <span className="c5 c20">&nbsp;</span>
          <span className="c1">Any access or use of the </span>
          <span className="c1">Products </span>
          <span className="c4 c1 c5">
            shall always be at your own risk and discretion.
          </span>
        </p>
        <p className="c7 c22">
          <span className="c1 c3">No Fiduciary Relationship.</span>
          <span className="c1">&nbsp;The </span>
          <span className="c1">Products</span>
          <span className="c4 c5 c1">
            &nbsp;and these Terms are not intended to create or impose any
            fiduciary duty on us with respect to you. Notwithstanding anything
            to the contrary contained in these Terms, to the maximum extent
            permitted by the applicable law, we shall owe no fiduciary duties to
            you, provided, however, that we shall have the duty to act in
            accordance with these Terms and the implied contractual covenant of
            good faith and fair dealing to the extent required by the law.
          </span>
        </p>
        <p className="c7 c22">
          <span className="c1 c3">No Broker or Fund Manager Relationship</span>
          <span className="c1 c3">.</span>
          <span className="c4 c5 c1">
            &nbsp;The Company is not your broker, fund manager, or any
            intermediary to any broker or fund manager. Nothing contained in
            these Terms shall be considered as a broker, financial, advisory
            and/or fund management services, or any intermediation services
            thereto.
          </span>
        </p>
        <p className="c2">
          <span className="c1 c3">No Partnership or Agency</span>
          <span className="c1">
            . Nothing in these Terms is intended to, or shall be deemed to,
            establish any partnership, joint venture, or employment relations.
            Nothing in these Terms and no action taken by you or us pursuant to
            these Terms shall constitute, or be deemed to constitute, any
            Company Party as your agent for any purpose, and{" "}
          </span>
          <span className="c1 c16">vice versa</span>
          <span className="c4 c5 c1">.</span>
        </p>
        <p className="c2">
          <span className="c1 c3">Blockchain Data</span>
          <span className="c1 c3">. </span>
          <span className="c1">
            The Products rely on certain information, derived from the
            blockchain network(s) and related software in an automated manner,
            such as information about blockchain transactions, blocks,
            smart-contracts, balances and other data. You hereby acknowledge
            that such information is not verified or checked manually.
          </span>
          <span className="c1">
            &nbsp;Consequently, there is no assurance that any such information
            is correct, complete, up-to-date, accurate or sufficient.{" "}
          </span>
          <span className="c1">
            In each case, you should solely evaluate whether to use or rely on
            any{" "}
          </span>
          <span className="c1">information made available through the </span>
          <span className="c1">
            Products, and we shall not be responsible or held liable in
            connection with any of your decisions made relying thereon, as well
            as for any consequences arising therefrom.
          </span>
        </p>
        <p className="c2">
          <span className="c1 c3">Third-Party Products. </span>
          <span className="c4 c5 c1">
            We are not responsible for and shall not be held liable in
            connection with, and make no warranties, whether express or implied,
            as to the Third-Party Products. Nothing contained herein or in the
            Materials, including the fact that any Third-Party Product is
            developed by relying on or with the use of the Underlying
            Infrastructure, shall be construed as our endorsement,
            recommendation, or solicitation to use any Third-Party Products, and
            you hereby acknowledge and agree that any use of such Third-Party
            Products shall always be at your own risk and discretion. We are not
            a developer, manager, or operator of any Third-Party Product, and
            have no influence on or control over the Third-Party Products, their
            development, functionality and/or performance. We make no warranties
            or representations of any kind, express or implied, with regard to
            any Third-Party Product, including that the Third-Party Product will
            be developed, continue its operations, or carry out any other
            activities. Any use of the Third-Party Product will be governed by
            its respective documentation, and we encourage you to read it before
            using or interacting with any Third-Party Product.
          </span>
        </p>
        <p className="c2">
          <span className="c1 c3">Third-Party Content and Services.</span>
          <span className="c4 c5 c1">
            &nbsp;When using the Products, you may view or interact with the
            Third-Party Content and Third-Party Services. We are not responsible
            for and shall not be held liable in connection with, and make no
            warranties, whether express or implied, as to the Third-Party
            Content or Third-Party Services, do not endorse, recommend or
            solicit to use, and are not responsible for any such Third-Party
            Content or Third-Party Services, as well as any information,
            materials, content, services or tools on or available through such
            Third-Party Content or Third-Party Services. You hereby affirm and
            acknowledge that your use of Third-Party Content or Third-Party
            Services, and your interactions with third parties that are linked
            to or from the Products, are at your own risk. To the maximum extent
            permitted by the applicable law, in no event shall we be responsible
            for or held liable in connection with any loss or damage of any sort
            incurred by you as the result of, or in connection with accessing or
            using any Third-Party Content or Third-Party Services.
          </span>
        </p>
        <p className="c7 c22">
          <span className="c1 c3">Digital Assets.</span>
          <span className="c4 c5 c1">
            &nbsp;We do not provide or make any representations or warranties of
            any kind with respect to the Digital Assets, whether express or
            implied, including implied warranties of merchantability, fitness
            for a particular purpose or non-infringement, all of which are
            hereby expressly disclaimed and denied. You hereby acknowledge and
            agree that the Digital Assets may not: (i)&nbsp;meet your
            expectations or work as intended, (ii) have the intended
            functionality, (iii) have a market, or (iv) have any specific price
            or hold any particular value, or have any value at all. Any receipt,
            storage, use, and disposition of the Digital Assets shall always be
            at your own risk.
          </span>
        </p>
        <p className="c7">
          <span className="c1 c3">Liquidity and Market.</span>
          <span className="c4 c5 c1">
            &nbsp;Digital Assets and the crypto market as a whole are highly
            volatile, the prices of Digital Assets may change dramatically over
            short periods of time, and in no event shall we be responsible or
            held liable in connection with the foregoing. The volatility and
            unpredictability of the value of Digital Assets relative to
            stablecoins, meaning Digital Assets pegged to fiat currencies or
            other assets, and/or fiat currencies, meaning the government-issued
            currencies that are designated as legal tender through government
            decree, regulation, or the law, may result in significant or
            complete losses over a short period of time.
          </span>
        </p>
        <p className="c7">
          <span className="c1 c3">Interaction with the Third Parties</span>
          <span className="c4 c5 c1">
            . You should always be diligent when interacting with third parties
            regarding your Digital Assets, including counterparties to a
            transaction and other Third-Party Services providers. There is
            always a risk of losing Digital Assets when interacting with third
            parties, including due to fraud, insolvency, breach of contract,
            trust, or security, and we shall not be responsible or held liable
            in connection with any act or omission of such third parties.
          </span>
        </p>
        <ol className="c0 lst-kix_nqvbmp5cn5ce-0" start={10}>
          <li className="c7 c9 li-bullet-0">
            <h3 id="h.tqqimgkrf8x6" style={{ display: "inline" }}>
              <span>LIMITATION OF LIABILITY</span>
            </h3>
          </li>
        </ol>
        <p className="c7">
          <span className="c1 c3">Limitation of Liability</span>
          <span className="c1 c3">.</span>
          <span className="c1 c3">&nbsp;</span>
          <span className="c4 c5 c1">
            To the maximum extent permitted under the applicable law, in no
            event shall:{" "}
          </span>
        </p>
        <ol className="c0 list-item_alpha start" start={1}>
          <li className="c7 c10 li-bullet-0">
            <span className="c1">
              the Company Parties be liable or responsible for any indirect,
              punitive, exemplary, incidental, or consequential damages of any
              kind, nor shall they be liable for the loss of goodwill, loss of
              profits (including expected), loss of data, diminution of value,
              and business interruption arising out of or in connection with (i)
              these Terms or their violation, (ii) the use or inability to use
              the{" "}
            </span>
            <span className="c1">Products</span>
            <span className="c1">, and/or (iii) the failure of the </span>
            <span className="c1">Products</span>
            <span className="c4 c5 c1">
              &nbsp;to perform as represented or expected, whether based upon
              breach of warranty or contract, negligence, strict liability,
              tort, or any other legal theory, regardless of whether any Company
              Party has been advised of the possibility of such damages;
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c1">
              the Company’ or Affiliates’ respective officers, directors,
              employees, consultants and shareholders be held personally liable
              in connection with (i) these Terms or their violation, (ii) the
              use or inability to use the{" "}
            </span>
            <span className="c1">Products</span>
            <span className="c1">, and/or (iii) the failure of the </span>
            <span className="c1">Products</span>
            <span className="c4 c5 c1">
              &nbsp;to perform as represented or expected, provided that this
              item “b” shall not limit our liability as an entity;
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c1">
              the Company Parties be responsible for or held liable in
              connection with any inaccuracy, error, delay in, or omission of
              any Materials, or your reliance thereon; and
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c1">
              the aggregate liability of the Company Parties to you for all
              damages and losses whatsoever arising out of or in connection with
              these Terms, their undue performance or violation, the{" "}
            </span>
            <span className="c1">Products,</span>
            <span className="c1">
              &nbsp;and use or inability to use thereof,{" "}
            </span>
            <span className="c1">exceed </span>
            <span className="c1">USD </span>
            <span className="c1">$</span>
            <span className="c1">100 (one hundred U.S. dollars)</span>
            <span className="c1">&nbsp;or equivalent.</span>
          </li>
        </ol>
        <p className="c2">
          <span className="c1 c3">Exclusion of Liability</span>
          <span className="c1 c3">.</span>
          <span className="c1">
            &nbsp;In no event shall the Company Parties be responsible for or
            held liable in connection with any products, services, software or
            technical infrastructure which they do not control, manage, or
            operate, or occurrence of any events or other circumstances that are
            beyond their control, as well as consequences thereof. Accordingly,
            to the maximum extent permitted under the applicable law, in no
            event shall{" "}
          </span>
          <span className="c1">
            the Company Parties be responsible for or held liable in connection
            w
          </span>
          <span className="c1">ith</span>
          <span className="c1">:</span>
        </p>
        <ol className="c0 list-item_alpha start" start={1}>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              any damages or losses of any kind, whether direct or indirect,
              special, punitive, exemplary, incidental, or consequential, nor
              shall the Company Parties be responsible for or held liable in
              connection with the loss of goodwill, loss of profits (including
              expected), loss of data, diminution of value, and business
              interruption arising out of or in connection with (i) the
              Blockchain-Based Infrastructure, its underlying blockchain
              network(s), as well as your use or inability to use thereof, (ii)
              the Digital Assets, including your acquisition, storage, transfer,
              use of, or inability to transfer or use thereof, and/or (iii) any
              failure of the Blockchain-Based Infrastructure, Digital Assets or
              their underlying blockchain network(s) to perform as represented
              or expected, in each case whether based upon breach of warranty or
              contract, negligence, strict liability, tort, or any other legal
              theory, and regardless of whether any Company Party has been
              advised of the possibility of such damages or losses;
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              any damages or losses arising out of or in connection with a
              hacker attack, phishing attack, malware attack, viruses, or trojan
              horses, whether affecting or transmitted via the Products or
              otherwise, or any other unauthorised third-party intervention in
              the operation thereof;
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c1">
              any loss or damage of any sort incurred by you as the result of,
              or in connection with your use or reliance on any information
              derived from{" "}
            </span>
            <span className="c1">
              the blockchain network(s) and related software
            </span>
            <span className="c4 c5 c1">
              , and made available to you through the Explorer, as well as any
              consequences of your decisions made by relying thereon, including
              possible losses and damages;
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              the Third-Party Services and Third-Party Content, in each case
              including for any direct, indirect, special, punitive, exemplary,
              incidental, or consequential damages of any kind, loss of
              goodwill, loss of profits (including expected), loss of data,
              diminution of value, and business interruption; and
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              any loss or damage caused by or arising from the Force Majeure
              Circumstances.
            </span>
          </li>
        </ol>
        <p className="c7">
          <span className="c1 c3">Waiver. </span>
          <span className="c4 c5 c1">
            You shall not, and to the maximum extent permitted under the law
            hereby waive any right to, seek to recover the damages listed above
            in this Section 10 from the Company Parties and/or persons specified
            above.{" "}
          </span>
        </p>
        <p className="c7">
          <span className="c1 c3">Exceptions</span>
          <span className="c1 c3">.</span>
          <span className="c1 c3">&nbsp;</span>
          <span className="c1">
            Inasmuch as some jurisdictions do not allow the exclusions or
            limitations as set forth herein, the above exclusions and
            limitations shall apply to the maximum extent permitted by the
            applicable law.{" "}
          </span>
          <span className="c1">
            Notwithstanding anything to the contrary contained therein, these
            Terms
          </span>
          <span className="c1">
            &nbsp;do not limit our liability for fraud, intentional misconduct,
            gross negligence,{" "}
          </span>
          <span className="c1">
            death or personal injury arising from negligence
          </span>
          <span className="c1">.</span>
        </p>
        <ol className="c0 lst-kix_nqvbmp5cn5ce-0" start={11}>
          <li className="c7 c9 li-bullet-0">
            <h3 id="h.r7hk3zgp8byr" style={{ display: "inline" }}>
              <span>INDEMNIFICATION</span>
            </h3>
          </li>
        </ol>
        <p className="c7">
          <span className="c4 c5 c1">
            To the fullest extent permitted under the applicable law, you shall
            indemnify, defend, and hold harmless the Company Parties from and
            against any and all claims, demands, actions, damages, losses,
            costs, and expenses (including reasonable professional and legal
            fees) that arise from or relate to (i) your violation of these
            Terms, including making untrue or false representations or
            warranties, (ii) your access to or use of the Products, (iii)
            exercising, enforcing, or preserving our rights, powers or remedies
            (or considering doing so) with respect to you in connection with
            these Terms, and (iv) your tax obligations arising from or in
            connection with any use of the Products, if any. We reserve the
            right to exercise sole control over the defence, at your sole cost
            and expense, of any claim subject to an indemnity set out in this
            Section 11. The indemnity set out in this Section 11 is in addition
            to, and not in lieu of, any other remedies that may be available to
            us under the applicable law.
          </span>
        </p>
        <ol className="c0 lst-kix_nqvbmp5cn5ce-0" start={12}>
          <li className="c7 c9 li-bullet-0">
            <h3 id="h.q73g6awmn2on" style={{ display: "inline" }}>
              <span>UPDATES, AVAILABILITY, AND ACCESS</span>
            </h3>
          </li>
        </ol>
        <p className="c7">
          <span className="c1 c3">Updates and Modifications. </span>
          <span className="c4 c5 c1">
            We may from time to time and without prior notice make certain
            updates, improvements, or modifications to the Products, including,
            but not limited to, updates to the underlying software,
            infrastructure, security protocols, technical configurations,
            functionality, financial structure, or service features, and we
            shall not be in any case held liable with respect to any such
            update.
          </span>
        </p>
        <p className="c7">
          <span className="c1 c3">Availability. </span>
          <span className="c1">The </span>
          <span className="c1">Products</span>
          <span className="c1">
            &nbsp;may be inaccessible or inoperable from time to time for any
            reason, including, for example, equipment malfunctions, maintenance
            procedures or repairs, Force Majeure Circumstances, disruptions,
            sophisticated hacker or malware attacks, temporary or permanent
            unavailability of the underlying software or Blockchain-Based
            Infrastructure, and/or unavailability of the respective Third-Party
            Services. In the aforementioned cases, access to or use of the{" "}
          </span>
          <span className="c1">Products</span>
          <span className="c1">
            &nbsp;may be prevented or limited without notice and any liability
            whatsoever. Notwithstanding anything to the contrary contained
            herein, we may, at any time and at our sole and absolute discretion,
            without prior notice and liability, terminate or discontinue the{" "}
          </span>
          <span className="c1">Products</span>
          <span className="c4 c5 c1">&nbsp;or any of their components.</span>
        </p>
        <p className="c7">
          <span className="c1 c3">Access to the Products. </span>
          <span className="c1">
            If technically possible, we may limit, suspend or restrict access to
            the{" "}
          </span>
          <span className="c1">Products</span>
          <span className="c1">
            &nbsp;or any of their components with immediate effect and without
            notification and liability, regardless of reason, including if we,
            acting at our sole discretion, determine that (i) you have violated
            or may likely violate these Terms, applicable laws or regulations;
            or (ii) you or your actions create or may create legal exposure for
            us, Affiliates, or the{" "}
          </span>
          <span className="c1">Products</span>
          <span className="c4 c5 c1">
            ; or (iii) you are or likely to be a Prohibited Person or act on
            behalf of a Prohibited Person. You hereby agree to comply with such
            limitations and not to circumvent or bypass them in any way. You
            hereby agree that we may install and utilise certain software,
            solutions and/or tools (for example, geo-blocking solutions)
            allowing us to identify users from the Prohibited Jurisdictions or
            certain restricted jurisdictions, or those who have violated these
            Terms or the laws, and restrict their access to and use of the
            Products.
          </span>
        </p>
        <ol className="c0 lst-kix_nqvbmp5cn5ce-0" start={13}>
          <li className="c7 c9 li-bullet-0">
            <h3 id="h.xwpd9icpaxli" style={{ display: "inline" }}>
              <span>ASSOCIATED COSTS</span>
            </h3>
          </li>
        </ol>
        <p className="c7">
          <span className="c1 c3">Fees.</span>
          <span className="c1">&nbsp;</span>
          <span className="c1">
            We reserve the right to introduce and charge certain Fees for the
            access to and use of the Products
          </span>
          <span className="c1">
            . You hereby agree and acknowledge that it is your sole obligation
            to review the applicable Fees each time you access the Products. If
            you do not agree to any Fees, you reserve the right to discontinue
            any access to or use of the respective Product at any time.
          </span>
        </p>
        <p className="c7">
          <span className="c1 c3">Third-Party Costs.</span>
          <span className="c4 c5 c1">
            &nbsp;When you conduct transactions through or in relation to the
            Third-Party Services certain Third-Party Costs may arise. You shall
            at all times independently verify all applicable Third-Party Costs,
            and we are not responsible for nor be in any way liable in
            connection therewith.
          </span>
        </p>
        <p className="c7">
          <span className="c1 c3">Taxes.</span>
          <span className="c1">&nbsp;</span>
          <span className="c1">
            You are solely responsible for determining what, if any, Taxes apply
            to your activities and any transactions carried out through or in
            relation to the Products. It is also your responsibility to
            withhold, collect, report, and remit all applicable Taxes to the
            appropriate tax authorities, and we are not responsible for
            withholding, collecting, reporting, or remitting any such Taxes. The
            Company Parties will not bear any liability or responsibility with
            respect to any tax consequences to you associated with or arising
            from any transactions carried out through or in relation to the
            Products.
          </span>
        </p>
        <ol className="c0 lst-kix_nqvbmp5cn5ce-0" start={14}>
          <li className="c7 c9 li-bullet-0">
            <h3 id="h.y8zg0u1n75sy" style={{ display: "inline" }}>
              <span>APPLICABLE LAW</span>
              <span>&nbsp;</span>
            </h3>
          </li>
        </ol>
        <p className="c7">
          <span className="c1">
            Without prejudice the mandatory provisions of the applicable law, t
          </span>
          <span className="c1">
            hese Terms, as well as any and all relationship between you and us
            relating to the{" "}
          </span>
          <span className="c1">Products, </span>
          <span className="c1">
            or any transaction contemplated in these Terms shall be governed by
            and construed and enforced in accordance with the laws of{" "}
          </span>
          <span className="c1">England and Wales,</span>
          <span className="c4 c5 c1">
            &nbsp;without regard to conflict of law rules or principles that
            would cause the application of the laws of any other jurisdiction.
            The United Nations Convention on Contracts for the International
            Sale of Goods shall not apply to these Terms.
          </span>
        </p>
        <ol className="c0 lst-kix_nqvbmp5cn5ce-0" start={15}>
          <li className="c7 c9 li-bullet-0">
            <h3 id="h.luiym72a6a8" style={{ display: "inline" }}>
              <span>DISPUTES RESOLUTION</span>
            </h3>
          </li>
        </ol>
        <p className="c7">
          <span className="c1 c3">Opt-Out.</span>
          <span className="c1">
            &nbsp;Notwithstanding anything to the contrary contained herein, you
            are entitled to opt out of the settlement and resolution of the
            Disputes in the binding arbitration as prescribed in this Section 15
            by sending written notice to us via email at{" "}
          </span>
          <LinkExternal
            noIcon
            className="c6 c1 c11"
            href="mailto:contact@cavies.xyz"
          >
            contact@cavies.xyz
          </LinkExternal>
          <span className="c1">
            &nbsp;within thirty (30) days after your acceptance of these Terms.
            Your notice shall include your name, residence address, email
            address, telephone number and an obvious and unequivocal statement
            of your willingness to opt out of the settlement and resolution of
            the Disputes in the binding arbitration as outlined herein. If you
            exercise your opt-out right within the term established herein all
            other parts of these Terms will remain in full force and will
            continue to apply to you. The exercise of your opt-out right as
            prescribed herein has no effect on any other arbitration agreements
            that we and you may execute in the future.
          </span>
        </p>
        <p className="c7">
          <span className="c1 c3">Dispute Resolution.</span>
          <span className="c1">
            &nbsp;For any Dispute that you have against us or relating in any
            way to these Terms, or the Products, you shall first contact us and
            attempt to resolve the Dispute informally by sending a Notice to us
            via email at{" "}
          </span>
          <LinkExternal
            noIcon
            className="c6 c1 c11"
            href="mailto:contact@cavies.xyz"
          >
            contact@cavies.xyz
          </LinkExternal>
          <span className="c1">.</span>
          <span className="c1">
            &nbsp;The Notice must include your name, residence address, email
            address and telephone number, describe the nature and basis of the
            Dispute and set forth the specific relief sought. If we and you
            cannot reach an agreement to resolve the Dispute within thirty (30)
            days after such Notice is received, then either, you or we, w
          </span>
          <span className="c1">
            ithout prejudice the mandatory provisions of the applicable law,
          </span>
          <span className="c4 c5 c1">
            &nbsp;may submit the dispute to, as and to the extent applicable:{" "}
          </span>
        </p>
        <ol className="c0 list-item_alpha start" start={1}>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              the binding arbitration administered by the LCIA, in accordance
              with the terms set forth in this Section 15. Binding arbitration
              is the referral of a Dispute to a qualified person(s) who will
              review the Dispute and make a final and binding determination, by
              making an order, to resolve the Dispute; or
            </span>
          </li>
          <li className="c7 c10 li-bullet-0">
            <span className="c4 c5 c1">
              courts of England and Wales having competent jurisdiction,
              provided that you opt out of the settlement and resolution of the
              Disputes in the binding arbitration as prescribed herein.
            </span>
          </li>
        </ol>
        <p className="c7">
          <span className="c1 c3">
            Waiver of Court Proceedings and Jury Trial.{" "}
          </span>
          <span className="c1">
            Unless you opt out of the settlement and resolution of the Disputes
            in the binding arbitration as prescribed herein and except for any
            Disputes in which either we or you seek injunctive or other
            equitable relief for the alleged unlawful use of Intellectual
            Property, you and we hereby waive your and our respective rights (i)
            to have any Dispute arising from or related to these Terms and the
            Products resolved in a court, and (ii) to a jury trial.
          </span>
        </p>
        <p className="c7">
          <span className="c1 c3">Binding Arbitration.</span>
          <span className="c1 c3">&nbsp;</span>
          <span className="c1">Unless</span>
          <span className="c1 c3">&nbsp;</span>
          <span className="c1">
            otherwise expressly outlined in these Terms, any
          </span>
          <span className="c1">
            &nbsp;Disputes arising out of or in connection with these Terms, the
          </span>
          <span className="c1">&nbsp;Products</span>
          <span className="c1">
            , including any question regarding the existence, validity, or
            termination of these Terms, shall be referred to and finally
            resolved by the binding arbitration under the
          </span>
          <span className="c1">
            &nbsp;London Court of International Arbitration Rules, which are
            deemed to be incorporated herein by reference. Any arbitration will
            occur in London, UK. The number of arbitrators shall be one (1). The
            language to be used in the arbitral proceedings shall be English.
            Any and all notices, requests, demands, and other communications
            which are required or may be given in connection with the
            arbitration shall be sent in electronic form, either via email or
            other electronic means including via any electronic filing system
            operated by the LCIA. Any and all notices, requests, demands, and
            other communications sent by electronic means shall be treated as
            having been received by a recipient on the day it is transmitted
            (such time to be determined by reference to the recipient’s time
            zone).
          </span>
        </p>
        <p className="c7">
          <span className="c1 c3">Confidentiality. </span>
          <span className="c4 c5 c1">
            Unless otherwise required by the applicable law, and to the maximum
            extent permitted and possible, you, the Company, and the arbitrators
            shall maintain the confidentiality of any arbitration or litigation
            proceedings, judgments and awards, including, but not limited to,
            all information gathered, prepared and presented for purposes of the
            arbitration or related to the Disputes. Unless prohibited under the
            law, the arbitrator will have the authority to make appropriate
            rulings to safeguard confidentiality.{" "}
          </span>
        </p>
        <p className="c7">
          <span className="c1 c3">No Class Arbitrations. </span>
          <span className="c4 c5 c1">
            Any Dispute arising out of or related to these Terms is personal to
            you and us and will be resolved solely through individual
            arbitration or litigation, as the case may be, and will not be
            brought as a class arbitration, class action, or any other type of
            representative proceeding in any circumstances. There will be no
            class or other type of representative action, whether within or
            outside of arbitration or litigation where an individual attempts to
            resolve a Dispute as a representative of another individual or group
            of individuals.
          </span>
        </p>
        <p className="c7">
          <span className="c1 c3">Statutes of Limitation</span>
          <span className="c1 c3">.</span>
          <span className="c1 c3">&nbsp;</span>
          <span className="c1">
            To the maximum extent permitted under the law, you and we hereby
            agree that any claim arising out of or related to these Terms,
          </span>
          <span className="c1">&nbsp;the Products</span>
          <span className="c4 c5 c1">
            &nbsp;shall be filed within one (1) year after the ground for such
            claim arose; if the claim is not filed within this term, such claim
            shall be permanently barred, which means that neither you, nor we
            will have the right to assert such claim.
          </span>
        </p>
        <ol className="c0 lst-kix_nqvbmp5cn5ce-0" start={16}>
          <li className="c7 c9 li-bullet-0">
            <h3 id="h.94pp20fpdgrd" style={{ display: "inline" }}>
              <span>COMMUNICATION</span>
            </h3>
          </li>
        </ol>
        <p className="c7">
          <span className="c1 c3">Communication Channels</span>
          <span className="c1 c3">. </span>
          <span className="c1">
            You agree and consent to receive electronically all Communications
            that we provide in connection with these Terms and
          </span>
          <span className="c1">&nbsp;the Products</span>
          <span className="c1">
            . You agree that we may provide Communications to you{" "}
          </span>
          <span className="c1">through any of the Communication Channels</span>
          <span className="c1">
            , provided that only those postings shall be deemed to constitute
            Communication that are expressly marked as relating to these Terms.
            If you provide us with your email address, we may (but will not be
            obliged to) send Communications to you by email. All Communications
            specified in this paragraph shall be deemed in writing, valid and of
            full legal force, and delivered to you on the day following the day
            when they are published{" "}
          </span>
          <span className="c1">or transmitted, as the case may be</span>
          <span className="c4 c5 c1">.</span>
        </p>
        <p className="c7">
          <span className="c1 c3">Contact Details. </span>
          <span className="c1">
            You may electronically communicate with us by sending Communications
            to the following email addresses, in which case we may require you
            to provide additional data or documents that will allow us to
            identify you:{" "}
          </span>
          <span className="c6 c1">
            <LinkExternal
              noIcon
              className="c11"
              href="mailto:contact@1mscan.com"
            >
              contact@1mscan.com
            </LinkExternal>
          </span>
          <span className="c1">&nbsp;(for Explorer-related requests) and </span>
          <LinkExternal
            noIcon
            className="c1 c13 c11"
            href="mailto:contact@1mscan.com"
          >
            contact@cavies.xyz
          </LinkExternal>
          <span className="c4 c5 c1">
            &nbsp;(for requests relating to other Products).
          </span>
        </p>
        <ol className="c0 lst-kix_nqvbmp5cn5ce-0" start={17}>
          <li className="c7 c9 li-bullet-0">
            <h3 id="h.4chthp18v4ya" style={{ display: "inline" }}>
              <span>MISCELLANEOUS</span>
            </h3>
          </li>
        </ol>
        <p className="c7">
          <span className="c1 c3">No Waiver.</span>
          <span className="c1">&nbsp;</span>
          <span className="c1">
            No failure or delay by us to exercise any right or remedy provided
            under these Terms or by law shall constitute a waiver of that or any
            other right or remedy, nor shall it preclude or restrict the further
            exercise of that or any other right or remedy. No single or partial
            exercise of such right or remedy shall preclude or restrict the
            further exercise of that or any other right or remedy.
          </span>
        </p>
        <p className="c7">
          <span className="c1 c3">Entire Agreement.</span>
          <span className="c1">
            &nbsp;These Terms, together with any documents incorporated herein
            by reference, contain the entire agreement with respect to the
            subject matter hereof and supersedes all prior and contemporaneous
            understandings, writings, letters, statements or promises relating
            to the same subject matter. You hereby agree and acknowledge that by
            entering into these Terms, you have not relied on, and shall have no
            right or remedy in respect of, any statement, representation,
            assurance, or warranty (whether made negligently or innocently)
            other than as expressly set forth in these Terms.
          </span>
        </p>
        <p className="c7">
          <span className="c1 c3">Personal Data.</span>
          <span className="c1">&nbsp;</span>
          <span className="c1">We collect and process your personal data</span>
          <span className="c1">&nbsp;in accordance with our </span>
          <LinkInternal href="/privacy" className="c1 c27">
            Privacy Notice
          </LinkInternal>
          <span className="c1">.</span>
        </p>
        <p className="c7">
          <span className="c1 c3">Survival.</span>
          <span className="c1">&nbsp;</span>
          <span className="c1">
            Sections 5, 8 through 11, and 13 through 18 shall survive any
            expiration or termination of your access to or use of the Products,
            regardless of reason.
          </span>
        </p>
        <p className="c7">
          <span className="c1 c3">Language.</span>
          <span className="c1">&nbsp;</span>
          <span className="c4 c5 c1">
            Currently, only the English version of the Products’ interface and
            any Communications is considered official. The English version shall
            prevail in case of differences in translation of any Materials,
            Communications, or other content.
          </span>
        </p>
        <p className="c7">
          <span className="c1 c3">Assignability.</span>
          <span className="c1">&nbsp;</span>
          <span className="c1">
            You shall not assign or transfer any rights or obligations under
            these Terms without our prior written consent. We may transfer or
            assign these Terms, including any rights and obligations hereunder,
            to any third person{" "}
          </span>
          <span className="c1">
            at any time and no such transfer or assignment shall require your
            additional consent or approval
          </span>
          <span className="c1">.</span>
        </p>
        <p className="c7">
          <span className="c1 c3">Validity and Enforceability.</span>
          <span className="c1">&nbsp;</span>
          <span className="c4 c5 c1">
            The invalidity or unenforceability of any provision or
            part-provision of these Terms shall not affect the validity or
            enforceability of any other provisions of these Terms, all of which
            shall remain in full force and effect.
          </span>
        </p>
        <ol className="c0 lst-kix_nqvbmp5cn5ce-0" start={18}>
          <li className="c7 c9 li-bullet-0">
            <h3 id="h.duswujqickou" style={{ display: "inline" }}>
              <span>DEFINITIONS</span>
              <span className="c4 c1 c3">&nbsp;AND INTERPRETATION</span>
            </h3>
          </li>
        </ol>
        <p className="c7">
          <span className="c1 c3">Definitions.</span>
          <span className="c4 c5 c1">
            &nbsp;In these Terms, unless the context requires otherwise, the
            capitalised terms shall have the following meaning:
          </span>
        </p>
        <p className="c7">
          <span className="c1">“</span>
          <span className="c1 c3">Account</span>
          <span className="c4 c5 c1">
            ” means an account registered with the Explorer.
          </span>
        </p>
        <p className="c7">
          <span className="c1">“</span>
          <span className="c1 c3">Affiliate</span>
          <span className="c4 c5 c1">
            ” means a person controlling, controlled by, or under the same
            control as the Company.
          </span>
        </p>
        <p className="c7">
          <span className="c1">“</span>
          <span className="c1 c3">Blockchain-Based Infrastructure</span>
          <span className="c4 c5 c1">
            ” means certain blockchain infrastructures and blockchain-based
            software, including protocols, modules and smart-contracts, the
            Products may rely on and/or interact with.
          </span>
        </p>
        <p className="c17">
          <span className="c1">“</span>
          <span className="c1 c3">Company</span>
          <span className="c1">”, “</span>
          <span className="c1 c3">we</span>
          <span className="c1">”, “</span>
          <span className="c1 c3">us</span>
          <span className="c1">”, “</span>
          <span className="c1 c3">our</span>
          <span className="c1">” m</span>
          <span className="c1">eans </span>
          <span className="c4 c5 c1">Cavies Ltd, a BVI business company.</span>
        </p>
        <p className="c7">
          <span className="c1">“</span>
          <span className="c1 c3">Company Parties</span>
          <span className="c1">” means</span>
          <span className="c4 c5 c1">
            &nbsp;the Company, Affiliates, and their respective shareholders,
            directors, officers, employees, agents, advisors, contractors, and
            assignees.
          </span>
        </p>
        <p className="c7">
          <span className="c1">“</span>
          <span className="c1 c3">Communications</span>
          <span className="c4 c5 c1">
            ” means any communications, agreements, documents, receipts,
            notices, and disclosures related to these Terms.
          </span>
        </p>
        <p className="c2">
          <span className="c1">“</span>
          <span className="c1 c3">Communication Channels</span>
          <span className="c1">” means the Website, our X (</span>
          <span className="c1">Twitter) account</span>
          <span className="c4 c5 c1">
            , Notion blog, Youtube channel and other communication channels as
            may be indicated within the Products’ web-based interfaces from time
            to time.
          </span>
        </p>
        <p className="c7">
          <span className="c1">“</span>
          <span className="c1 c3">Credentials</span>
          <span className="c1">
            ” means the data that can be used to access and manage your Wallets
            and/or Accounts, including username, passwords, seed phrases,
            private cryptographic keys, signing keys or any other type of keys,
            PINs, etc.
          </span>
        </p>
        <p className="c7">
          <span className="c1">“</span>
          <span className="c1 c3">Digital Assets</span>
          <span className="c1">
            ” means cryptocurrencies and other digital tokens implemented on
            blockchain, such as, for example,{" "}
          </span>
          <span className="c1">Ether (ETH)</span>
          <span className="c4 c5 c1">
            , USD Tether (USDT), USD Coin (USDC), etc.
          </span>
        </p>
        <p className="c7">
          <span className="c1">“</span>
          <span className="c1 c3">Dispute</span>
          <span className="c1">
            ” means any dispute, claim, suit, action, causes of action, demand,
            or proceeding.
          </span>
        </p>
        <p className="c2">
          <span className="c1">“</span>
          <span className="c1 c3">Explorer</span>
          <span className="c1">
            ” means 1Mscan blockchain explorer available at{" "}
          </span>
          <span className="c6 c1">
            {getEnvValue("NEXT_PUBLIC_APP_ENV") !== "prd" ? (
              <LinkExternal noIcon className="c11" href="https://1mscan.com">
                https://1mscan.com
              </LinkExternal>
            ) : (
              <LinkInternal className="c11" href="/">
                https://1mscan.com
              </LinkInternal>
            )}
          </span>
          <span className="c1">
            , as further described in the Materials, that is operated by us.
          </span>
          <span className="c4 c5 c1">&nbsp;</span>
        </p>
        <p className="c2">
          <span className="c1">“</span>
          <span className="c1 c3">Feedback</span>
          <span className="c4 c5 c1">
            ” means any comments, suggestions, recommendations, or other
            feedback, provided by you in connection with or relating to the
            Products.
          </span>
        </p>
        <p className="c17">
          <span className="c1">“</span>
          <span className="c1 c3">Fees</span>
          <span className="c1">
            ” means certain fees that may be charged in connection with your
            access and/or use of the Products.
          </span>
        </p>
        <p className="c2">
          <span className="c1">“</span>
          <span className="c1 c3">FOSS Licence</span>
          <span className="c4 c5 c1">
            ” means a free (as defined by the Free Software Foundation) and
            open-source software (as defined by the Open Source Initiative)
            licence that allows software to be freely used, modified, and
            shared.
          </span>
        </p>
        <p className="c2">
          <span className="c1">“</span>
          <span className="c1 c3">Force Majeure Circumstances</span>
          <span className="c4 c5 c1">
            ” means any circumstances that are out of our control, which
            include, without limitation, (i) fire, flood, hostility, pandemic,
            the act of God, explosion, strike, (ii) war, undeclared war, civil
            war, revolution, riot, act of terrorism, military actions and
            operations, (iii) epidemic, pandemic, insurrection, riot, labour
            dispute, accident, (iv) sanctions, government actions, embargoes,
            (v) injunctions, cease and desist orders, restraining or similar
            orders, other actions of a court, governmental or other authorities,
            (vi) weaknesses, vulnerabilities and bugs in the software,
            blockchain networks, smart-contracts, other technologies used in
            connection with the Products, 51% attacks or similar attacks on
            Digital Assets’ underlying blockchain networks; (vii) loss or theft
            of Digital Assets or other funds, including as a result of a hacker,
            malware, or other attack or third-party hostile interference; (viii)
            actions, failures to act or inactions of Third-Party Service
            providers or other third parties; (ix) system interference and/or
            destruction by any malicious programs; (x) power failure, equipment
            or software malfunction or error; and (xi) other circumstances
            beyond our control interfering the performance hereof.
          </span>
        </p>
        <p className="c2">
          <span className="c1">“</span>
          <span className="c1 c3">Intellectual Property</span>
          <span className="c4 c5 c1">
            ” means any names of services and products, logotypes, trademarks
            and other marks, copyrighted content, designs, drawings, videos,
            pictures etc., which may be demonstrated within the Products,
            contained in the Materials, or otherwise provided by us or on our
            behalf.
          </span>
        </p>
        <p className="c7">
          <span className="c1">“</span>
          <span className="c1 c3">LCIA</span>
          <span className="c4 c5 c1">
            ” means the London Court of International Arbitration.
          </span>
        </p>
        <p className="c7">
          <span className="c1">“</span>
          <span className="c1 c3">Licence</span>
          <span className="c4 c5 c1">
            ” means a limited, temporary, non-transferable, non-exclusive,
            revocable, non-sublicensable licence (right) to access and use the
            Products for their intended purposes on the terms set forth herein.
          </span>
        </p>
        <p className="c7">
          <span className="c1">“</span>
          <span className="c1 c3">Materials</span>
          <span className="c4 c5 c1">
            ” means any information, statements, announcements, data, content
            and other materials relating to the Products provided by us or on
            our behalf, whether through the Communications Channels or
            otherwise.
          </span>
        </p>
        <p className="c7">
          <span className="c1">“</span>
          <span className="c1 c3">Notice</span>
          <span className="c1">
            ” means a written notice of your claim to any of the Company
            Parties.
          </span>
        </p>
        <p className="c2">
          <span className="c1">“</span>
          <span className="c1 c3">Products</span>
          <span className="c1">” means the Website, Explorer, the </span>
          <span className="c1">Underlying Infrastructure, as well as </span>
          <span className="c4 c5 c1">
            other products and services developed and/or operated by the
            Company, as may be introduced in the Materials from time to time.
          </span>
        </p>
        <p className="c7">
          <span className="c1">“</span>
          <span className="c1 c3">Prohibited Jurisdiction</span>
          <span className="c1">
            ” means any of the following jurisdictions and territories:
          </span>
          <span className="c1">&nbsp;</span>
          <span className="c1">
            Democratic People’s Republic of North Korea, Islamic Republic of
            Iran, Republic of Cuba, Syrian Arab Republic, Myanmar, Sevastopol
            and the Crimea Region of Ukraine, Donetsk People’s Republic and
            Luhansk People’s Republic regions of Ukraine
          </span>
          <span className="c1">, the Russian Federation </span>
          <span className="c4 c5 c1">
            and any jurisdiction or territory, in which the use of the Products
            is prohibited by applicable laws or regulations, or which is subject
            to a country-wide or territory-wide sanction imposed by any country,
            government, or international authority.
          </span>
        </p>
        <p className="c7">
          <span className="c1">“</span>
          <span className="c1 c3">Prohibited Person</span>
          <span className="c1">
            ” means any citizen or resident of, or person subject to
            jurisdiction of, any Prohibited Jurisdiction, or person subject to
            any sanctions administered or enforced by any country, government or
            international authority.
          </span>
        </p>
        <p className="c2">
          <span className="c1">“</span>
          <span className="c1 c3">Taxes</span>
          <span className="c4 c5 c1">
            ” means any income, earnings, capital gains, sales, use,
            value-added, or similar tax, arising from your transactions carried
            out on or in relation to the Products.
          </span>
        </p>
        <p className="c7">
          <span className="c1">“</span>
          <span className="c1 c3">Terms</span>
          <span className="c4 c5 c1">
            ” means these General Terms &amp; Conditions.
          </span>
        </p>
        <p className="c7">
          <span className="c1">“</span>
          <span className="c1 c3">Third-Party Content</span>
          <span className="c4 c5 c1">
            ” means any content, information, materials and items provided by
            any third person, other than the Company, including (i) the
            description of, links to or elements of the Third-Party Services,
            (ii) promotional materials and advertisements, (iii) third-party
            websites and resources, and links thereto, and (iv) any information
            produced or derived from Third-Party Services or other third-party
            sources.
          </span>
        </p>
        <p className="c7">
          <span className="c1">“</span>
          <span className="c1 c3">Third-Party Costs</span>
          <span className="c4 c5 c1">
            ” mean any costs, fees or expenses that are charged by third parties
            or third-party technologies, including, for example, blockchain gas
            costs, commissions and fees related to or charged by the Third-Party
            Services, etc.
          </span>
        </p>
        <p className="c2">
          <span className="c1">“</span>
          <span className="c1 c3">Third-Party Products</span>
          <span className="c4 c5 c1">
            ” means any developments, decentralised applications, web-based
            interfaces, and any other products and projects, developed,
            launched, and/or offered by any person other than the Company or
            Affiliates, whether based on or with the use of the Underlying
            Infrastructure.
          </span>
        </p>
        <p className="c7">
          <span className="c1">“</span>
          <span className="c1 c3">Third-Party Services</span>
          <span className="c1">”</span>
          <span className="c1">
            &nbsp;means any third-party websites, applications, software,
            services, items, and solutions that are not provided by us, such as,
            for example, Third-Party Products, Digital Assets, Wallets, software
            or hardware wallets, blockchain smart-contracts, etc.
          </span>
        </p>
        <p className="c7">
          <span className="c1">“</span>
          <span className="c1 c3">Wallet</span>
          <span className="c4 c5 c1">
            ” means a pair of public and private cryptographic keys that can be
            used to track ownership of, receive or spend Digital Assets on a
            blockchain network.{" "}
          </span>
        </p>
        <p className="c7">
          <span className="c1">“</span>
          <span className="c1 c3">Website</span>
          <span className="c1">” means the website(s) available at </span>
          <span className="c6 c1">
            <LinkExternal className="c11" href="https://cavies.xyz" noIcon>
              https://cavies.xyz
            </LinkExternal>
          </span>
          <span className="c1">, </span>
          <span className="c1 c6">
            {getEnvValue("NEXT_PUBLIC_APP_ENV") !== "prd" ? (
              <LinkExternal noIcon className="c11" href="https://1mscan.com">
                https://1mscan.com
              </LinkExternal>
            ) : (
              <LinkInternal className="c11" href="/">
                https://1mscan.com
              </LinkInternal>
            )}
          </span>
          <span className="c4 c5 c1">
            &nbsp;including any of its subdomains.
          </span>
        </p>
        <p className="c7">
          <span className="c1">“</span>
          <span className="c1 c3">Underlying Infrastructure</span>
          <span className="c4 c5 c1">
            ” means certain software, technical infrastructure, smart-contracts,
            modules, Application Programming Interface (API), software
            development kit (SDK) and other tools provided by the Company.
          </span>
        </p>
        <p className="c7">
          <span className="c1">“</span>
          <span className="c1 c3">you</span>
          <span className="c1">”, “</span>
          <span className="c1 c3">your</span>
          <span className="c1">
            ” means the person who accepts these Terms; if you are acting on
            behalf of an entity, “
          </span>
          <span className="c1 c3">your</span>
          <span className="c1">” and “</span>
          <span className="c1 c3">you</span>
          <span className="c4 c5 c1">
            ” shall refer to both you as an individual using the Products, and
            the entity on whose behalf you are acting.
          </span>
        </p>
        <p className="c7">
          <span className="c1 c3">Interpretation.</span>
          <span className="c4 c5 c1">
            &nbsp;Unless the context otherwise requires, a reference to one
            gender shall include a reference to the other genders; words in the
            singular shall include the plural and in the plural shall include
            the singular; any words following the terms including, include, in
            particular, for example or any similar expression shall be construed
            as illustrative and shall not limit the sense of the words,
            description, definition, phrase or term preceding those terms;
            Section headings do not affect the interpretation of these Terms.
            You hereby agree that a rule of construction does not apply to our
            disadvantage because we were responsible for the preparation of
            these Terms.
          </span>
        </p>
        <div>
          <p className="c25">
            <span className="c4 c5 c23" />
          </p>
        </div>
      </Flex>
    </VStack>
  )
}

export default Terms
