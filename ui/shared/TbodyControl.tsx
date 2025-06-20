import type { TableBodyProps, TableCellProps } from "@chakra-ui/react"
import { Center, Tbody, Td, Tr } from "@chakra-ui/react"
import { AnimatePresence } from "framer-motion"
import Empty from "./Empty"
import Loading from "./Loading"

type Props = Partial<TableBodyProps> & {
  isLoading?: boolean
  notFoundText?: string
  tdProps?: Partial<TableCellProps>
}

const TbodyControl = ({
  children,
  isLoading,
  notFoundText,
  tdProps,
  ...props
}: Props) => {
  // console.log(Array.isArray(children) ? children.length : Boolean(children));
  return (
    <Tbody {...props}>
      {isLoading ? (
        <Tr
          _hover={{
            backgroundColor: "unset !important",
            cursor: "unset !important",
          }}
        >
          <Td
            colSpan={"100%" as any}
            height="30.75rem"
            textAlign="center"
            {...tdProps}
          >
            <Center width="full" height="full">
              <Loading boxSize={10}></Loading>
            </Center>
          </Td>
        </Tr>
      ) : (Array.isArray(children) ? children.length : Boolean(children)) ? (
        <AnimatePresence initial={false}>{children}</AnimatePresence>
      ) : (
        <Tr
          _hover={{
            backgroundColor: "unset !important",
            cursor: "unset !important",
          }}
        >
          <Td colSpan={"100%" as any} height="30.75rem" {...tdProps}>
            <Empty text={notFoundText}></Empty>
          </Td>
        </Tr>
      )}
    </Tbody>
  )
}

export default TbodyControl
