import { Button, Flex, Skeleton } from "@chakra-ui/react"
import React, { useState } from "react"

import moment from "moment"
import Collapse from "ui/shared/Collapse"
import DetailsInfoItemDivider from "ui/shared/DetailsInfoItemDivider"
import ExpandIcon from "ui/shared/ExpandIcon"
import { useTokenInstanceMetadataContext } from "../TokenInstanceMetadataProvider"
import MetadataAccordionItem from "./MetadataAccordionItem"
import MetadataAccordionItemTitle from "./MetadataAccordionItemTitle"
import MetadataItemPrimitive from "./MetadataItemPrimitive"

interface Props {
  name: string
  value: Array<unknown>
  level: number
}

const MetadataItemArray = ({ name, value, level }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { isLoading } = useTokenInstanceMetadataContext()
  return (
    <MetadataAccordionItem alignItems="flex-start">
      <MetadataAccordionItemTitle name={name} />
      <Collapse
        groupProps={{ width: "unset" }}
        header={
          <Skeleton isLoaded={!isLoading}>
            <Button
              variant="tertiary"
              width="fit-content"
              order={2}
              onClick={() => setIsOpen((e) => !e)}
              isDisabled={isLoading}
            >
              {isOpen ? "Hide" : "Show"} details{" "}
              <ExpandIcon
                isExpanded={isOpen}
                boxSize={4}
                marginLeft="0.375rem"
              ></ExpandIcon>
            </Button>
          </Skeleton>
        }
        order={1}
        open={isOpen}
        // marginTop={}
      >
        <Flex flexDirection="column" rowGap={2} marginY={2}>
          {value.map((item: any, index) => {
            const content = (() => {
              switch (typeof item) {
                case "string":
                case "number":
                case "boolean": {
                  return (
                    <MetadataItemPrimitive
                      value={item}
                      isItem={false}
                      level={level}
                    />
                  )
                }
                case "object": {
                  if (item) {
                    if (Array.isArray(item)) {
                      return <span>{JSON.stringify(item, undefined, 2)}</span>
                    } else {
                      if (
                        item?.["display_type"] === "date" &&
                        typeof item?.["value"] === "number"
                      ) {
                        item["value"] = moment(item["value"] * 1000).format(
                          "YYYY-MM-DD",
                        )
                      }
                      return Object.entries(item).map(
                        ([name, value], index) => {
                          return (
                            <Flex key={index} columnGap={2} alignItems="center">
                              <MetadataAccordionItemTitle
                                name={name}
                                textStyle="875"
                                color="neutral.light.6"
                                width="7.5rem"
                              />
                              <MetadataItemPrimitive
                                value={
                                  typeof value === "object"
                                    ? JSON.stringify(value, undefined, 2)
                                    : value
                                }
                                isItem={false}
                                level={level}
                                textStyle="1"
                                fontWeight={400}
                                color="neutral.light.7"
                              />
                            </Flex>
                          )
                        },
                      )
                    }
                  } else {
                    return <span>{String(item)}</span>
                  }
                }
                default: {
                  return <span>{String(item)}</span>
                }
              }
            })()

            return (
              <>
                <Flex
                  key={index}
                  // _notFirst={{ borderColor: "divider", borderTopWidth: "1px" }}
                  flexDir="column"
                  rowGap={2}
                >
                  {content}
                </Flex>
                {index !== value.length - 1 && (
                  <DetailsInfoItemDivider
                    mt={{ base: 0, lg: 0 }}
                    mb={{ base: 0, lg: 0 }}
                  ></DetailsInfoItemDivider>
                )}
              </>
            )
          })}
        </Flex>
      </Collapse>
    </MetadataAccordionItem>
  )
}

export default React.memo(MetadataItemArray)
