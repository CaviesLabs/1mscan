import type { BoxProps } from "@chakra-ui/react"
import { Skeleton, chakra, forwardRef } from "@chakra-ui/react"
import _omit from "lodash/omit"
import { memo, useRef } from "react"

import { route } from "nextjs-routes"

import { set } from "lodash"
import IconSvg from "ui/shared/IconSvg"
import * as EntityBase from "ui/shared/entities/base/components"

type LinkProps = EntityBase.LinkBaseProps & Pick<EntityProps, "hash">

const Link = chakra(
  forwardRef((props: LinkProps, ref) => {
    const defaultHref = route({
      pathname: "/tx/[hash]",
      query: { hash: props.hash },
    })

    return (
      <EntityBase.Link ref={ref} {...props} href={props.href ?? defaultHref}>
        {props.children}
      </EntityBase.Link>
    )
  }),
)

type IconProps = Omit<EntityBase.IconBaseProps, "name"> & {
  name?: EntityBase.IconBaseProps["name"]
} & Partial<BoxProps>

const Icon = ({ isLoading, ...props }: IconProps) => {
  return (
    <Skeleton
      isLoaded={!isLoading}
      width={4}
      height={4}
      borderRadius="100%"
      flexShrink={0}
      {...props}
    >
      <IconSvg name="exchange" alt="transaction" boxSize={4} {...props} />
    </Skeleton>
  )
}

type ContentProps = Omit<EntityBase.ContentBaseProps, "text"> &
  Pick<EntityProps, "hash" | "text"> & {
    isFullAddress?: boolean
    headLength?: number
    tailLength?: number
  }

const Content = chakra((props: ContentProps) => {
  return <EntityBase.Content text={props.hash} {...props} />
})

type CopyProps = Omit<EntityBase.CopyBaseProps, "text"> &
  Pick<EntityProps, "hash">

const Copy = (props: CopyProps) => {
  return (
    <EntityBase.Copy
      {...props}
      text={props.hash}
      // by default we don't show copy icon, maybe this should be revised
      noCopy={props.noCopy ?? true}
    />
  )
}

const Container = EntityBase.Container

export interface EntityProps extends EntityBase.EntityBaseProps {
  hash: string
  text?: string
  noIcon?: boolean
  iconProps?: IconProps
  linkProps?: Partial<LinkProps>
  contentProps?: Partial<ContentProps>
}

const TxEntity = ({ iconProps, ...props }: EntityProps) => {
  const linkProps = set(_omit(props, ["className"]), "isNa", !props.hash)
  const partsProps = _omit(props, [
    "className",
    "onClick",
    "linkProps",
    "contentProps",
  ])
  const ref = useRef<HTMLDivElement | null>(null)
  const contentBoxRef = useRef<HTMLDivElement | null>(null)

  return (
    <Container
      ref={ref}
      gap={2}
      alignItems="center"
      className={props.className}
    >
      {props.noIcon !== true && <Icon {...iconProps} />}

      <Link ref={contentBoxRef} {...linkProps} {...props.linkProps}>
        <Content
          entityRef={ref}
          contentBoxRef={contentBoxRef}
          {...partsProps}
          {...props.contentProps}
        />
      </Link>

      <Copy {...partsProps} />
    </Container>
  )
}

export default memo(chakra(TxEntity))

export { Container, Content, Copy, Icon, Link }
