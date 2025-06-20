import { type BoxProps, Flex, chakra, useDisclosure } from "@chakra-ui/react"
import {
  FloatingPortal,
  type Padding,
  type Placement,
  type UseFloatingReturn,
  autoPlacement,
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useInteractions,
  useTransitionStyles,
} from "@floating-ui/react"
import { useShallowIsMounted } from "lib/hooks/useShallow"
import { debounce, omit } from "lodash"
import {
  type CSSProperties,
  type ReactNode,
  type RefObject,
  memo,
  useCallback,
  useEffect,
} from "react"
import { multipleRef } from "ui/utils/dom"
import type { PopoverFlexiableTriggerProps } from "./PopoverFlexiableTrigger"
import PopoverFlexiableTrigger from "./PopoverFlexiableTrigger"

type Props = {
  content:
    | ReactNode
    | ((props: {
        isOpen: boolean
        onClose: () => void
        isMounted: boolean
        isOpenWithMounted: boolean
      }) => ReactNode)
  children:
    | ReactNode
    | ((props: {
        isOpen: boolean
        onClose: () => void
        onOpen: () => void
      }) => ReactNode)
  isDisabled?: boolean
  toggle?: boolean
  isDisabledMobilePlacement?: boolean
  allowedPlacements?: Placement[]
  buttonProps?: BoxProps
  autoResize?: boolean
  isFlipped?: boolean
  isShifted?: boolean
  isLazy?: boolean
  paddingSize?: Padding
  matchWidth?: boolean
  gutter?: number
  ref?: RefObject<{
    setIsMounted: (isMounted: boolean) => void
    setIsOpen: (isOpen: boolean) => void
  }>
} & Omit<BoxProps, "children" | "content" | "ref"> &
  PopoverFlexiableTriggerProps

const PopoverFlexiable = ({
  content,
  children,
  isDisabled,
  toggle = false,
  isDisabledMobilePlacement,
  allowedPlacements,
  buttonProps,
  autoResize = true,
  isFlipped = true,
  isShifted = true,
  sx,
  disabledBodyScrollOn,
  overlayOn,
  isLazy,
  paddingSize,
  gutter,
  maxHeight,
  ref,
  matchWidth,
  width,
  ...props
}: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure({
    defaultIsOpen: false,
  })

  // const arrowRef = useRef<HTMLDivElement>(null);

  const { refs, floatingStyles, context, update, elements } = useFloating({
    open: !isDisabled && isOpen,
    strategy: "absolute",
    onOpenChange: (e) => {
      if (e) {
        onOpen()
      } else {
        onClose()
      }
    },

    middleware: [
      offset(gutter ?? 8, [gutter]),
      isFlipped ? flip({}, []) : undefined,
      isShifted ? shift({}, []) : undefined,
      autoPlacement(
        {
          allowedPlacements,
        },
        [allowedPlacements],
      ),
      autoResize
        ? size(
            {
              padding: paddingSize ?? 16,
              boundary: document.body,

              altBoundary: true,
              // rootBoundary: "document",
              apply({ availableHeight, elements, availableWidth }) {
                if (maxHeight) {
                  elements.floating.style.setProperty(
                    "--max-height",
                    `${maxHeight}px`,
                  )
                } else {
                  elements.floating.style.setProperty(
                    "--max-height",
                    `clamp(10rem, ${availableHeight}px, 30rem)`,
                  )
                }
                elements.floating.style.setProperty(
                  "--max-width",
                  `${availableWidth}px`,
                )
                if (matchWidth) {
                  elements.floating.style.setProperty(
                    "--parent-width",
                    `${elements.reference.getBoundingClientRect().width}px`,
                  )
                }
              },
            },
            [paddingSize, matchWidth],
          )
        : undefined,
      // arrow(
      //   {
      //     element: arrowRef,
      //   },
      //   [arrowRef.current],
      // ),
    ],
  })

  const click = useClick(context, {
    toggle: Boolean(toggle),
    stickIfOpen: true,
  })

  const focus = useFocus(context, {
    enabled: toggle,
  })

  const dismiss = useDismiss(context, {
    outsidePress: true,
    outsidePressEvent: "click",
    escapeKey: true,
  })

  const { getReferenceProps } = useInteractions([dismiss, focus, click])

  // Hook to get transition styles
  const { styles: transitionStyles } = useTransitionStyles(context, {
    duration: 200,
    initial: {
      opacity: 0,
      scale: 0.9,
    },
    open: {
      opacity: 1,
      scale: 1,
    },
    close: {
      opacity: 0,
      scale: 0.9,
    },
  })

  const [isMounted, isMountedRef] = useShallowIsMounted([!isDisabled, isOpen], {
    disabled: !isLazy,
  })

  const setFloating = useCallback(
    debounce((el: HTMLDivElement | null, refs: UseFloatingReturn["refs"]) => {
      // if (!isMounted) {
      //   if (refs.floating.current) {
      //     refs.setFloating(null);
      //   }
      //   return;
      // }

      if (el === refs.floating.current) {
        return
      }

      refs.setFloating(el)
    }, 50),
    [],
  )

  // const removeFloating = useCallback((refs: UseFloatingReturn["refs"]) => {
  //   refs.setFloating(null);
  // }, []);

  const setButton = useCallback(
    debounce(
      (el: HTMLButtonElement | null, refs: UseFloatingReturn["refs"]) => {
        if (el === refs.reference.current) {
          return
        }

        refs.setReference(el)
      },
      10,
    ),
    [],
  )

  const updateDebounce = useCallback(
    debounce(update, 50, {
      leading: false,
      trailing: true,
    }),
    [],
  )

  useEffect(() => {
    if (isOpen && elements.reference && elements.floating) {
      const cleanup = autoUpdate(
        elements.reference,
        elements.floating,
        updateDebounce,
      )
      return cleanup
    }
  }, [isOpen, elements])

  useEffect(() => {
    multipleRef(
      {
        setIsMounted: (isMounted: boolean) => {
          isMountedRef.current = isMounted
        },
        setIsOpen: (isOpen: boolean) => {
          if (isOpen) {
            onOpen()
          } else {
            onClose()
          }
        },
      },
      ref,
    )
  }, [isMountedRef])

  return (
    <>
      <chakra.button
        width="full"
        _empty={{
          display: "none",
        }}
        overflow="hidden"
        ref={(el) => {
          setButton(el, refs)
        }}
        data-state={isOpen ? "open" : "close"}
        {...getReferenceProps()}
        {...buttonProps}
      >
        {typeof children === "function"
          ? children({ isOpen, onClose, onOpen })
          : children}
      </chakra.button>
      <FloatingPortal root={document.body}>
        {isMounted && isOpen && isDisabledMobilePlacement && (
          <PopoverFlexiableTrigger
            disabledBodyScrollOn={disabledBodyScrollOn}
            overlayOn={overlayOn}
          />
        )}

        {isMounted && (
          <Flex
            ref={(el) => {
              setFloating(el, refs)
              // return () => {
              //   removeFloating(refs);
              // };
            }}
            hidden={!isOpen}
            willChange="transform, opacity, scale, max-height"
            zIndex={998}
            position={{
              base: "fixed",
              lg: "absolute",
            }}
            style={
              {
                ...omit(transitionStyles, [
                  "scale",
                  "position",
                  "height",
                  "maxHeight",
                ]),
                ...omit(floatingStyles, [
                  "top",
                  "right",
                  "bottom",
                  "left",
                  "transform",
                  "position",
                  "height",
                  "maxHeight",
                ]),
                "--top": floatingStyles.top,
                "--right": floatingStyles.right,
                "--bottom": floatingStyles.bottom,
                "--left": floatingStyles.left,
                "--translate": floatingStyles.transform
                  ?.match(/translate\((.*)\)/)?.[1]
                  ?.replace(",", " "),
                "--scale": transitionStyles.scale,
              } as CSSProperties
            }
            transform="none"
            sx={{
              top: {
                base: "1rem",
                [isDisabledMobilePlacement ? "lg" : "base"]:
                  "var(--top, unset) !important",
              },
              right: {
                base: "1rem",
                [isDisabledMobilePlacement ? "lg" : "base"]:
                  "var(--right, unset) !important",
              },
              bottom: {
                base: "1rem",
                [isDisabledMobilePlacement ? "lg" : "base"]:
                  "var(--bottom, unset) !important",
              },
              left: {
                base: "1rem",
                [isDisabledMobilePlacement ? "lg" : "base"]:
                  "var(--left, unset) !important",
              },
              translate: {
                [isDisabledMobilePlacement ? "lg" : "base"]:
                  "var(--translate, unset) !important",
              },
              maxHeight: {
                [isDisabledMobilePlacement ? "lg" : "base"]:
                  "var(--max-height)",
              },
              // maxWidth: {
              //   [isDisabledMobilePlacement ? "lg" : "base"]: "var(--max-width)",
              // },
              width: width ?? {
                [isDisabledMobilePlacement ? "lg" : "base"]: matchWidth
                  ? "var(--parent-width)"
                  : undefined,
              },
              scale: "var(--scale)",
              ...sx,
              transitionProperty:
                "transform, opacity, scale, max-height !important",
            }}
            height={{
              base: isDisabledMobilePlacement
                ? "calc(100dvh - 2rem)"
                : "max-content",
              lg: "max-content",
            }}
            // maxHeight={{
            //   base: isDisabledMobilePlacement ? "calc(100dvh - 2rem)" : "auto",
            //   lg: "auto",
            // }}
            overflow="hidden"
            boxSizing="border-box"
            borderColor="neutral.light.3"
            borderWidth="1px"
            alignItems="stretch"
            borderRadius="0.75rem"
            backgroundColor="neutral.light.1"
            transformOrigin="top center"
            boxShadow="2xl"
            {...props}
          >
            {/* <Box
              ref={arrowRef}
              position="absolute"
              left={middlewareData.arrow?.x}
              top={middlewareData.arrow?.y}
              width="8px"
              height="8px"
              transform="rotate(45deg)"
              data-placement={placement}
              sx={{
                [isDisabledMobilePlacement ? "lg" : "base"]: {
                  ["&[data-placement='top']"]: {
                    backgroundColor: "neutral.light.1",
                    boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                    zIndex: -1,
                    bottom: "-4px",
                  },
                  ["&[data-placement='right']"]: {
                    backgroundColor: "neutral.light.1",
                    boxShadow: "-1px 1px 1px rgba(0, 0, 0, 0.1)",
                    zIndex: 1,
                    left: "-4px",
                  },
                  [`&[data-placement="bottom"]`]: {
                    backgroundColor: "neutral.light.1",
                    boxShadow: "-1px -1px 1px rgba(0, 0, 0, 0.1)",
                    zIndex: 1,
                    top: "-4px",
                  },
                  [`&[data-placement="bottom-start"]`]: {
                    backgroundColor: "neutral.light.1",
                    boxShadow: "-1px -1px 1px rgba(0, 0, 0, 0.1)",
                    zIndex: 1,
                    top: "-4px",
                  },
                  ["&[data-placement='left']"]: {
                    backgroundColor: "neutral.light.1",
                    boxShadow: "1px -1px 1px rgba(0, 0, 0, 0.1)",
                    zIndex: 1,
                    right: "-4px",
                  },
                },
              }}
            /> */}

            {typeof content === "function"
              ? content({
                  isOpen,
                  onClose,
                  isMounted,
                  isOpenWithMounted: isOpen && isMounted,
                })
              : content}
          </Flex>
        )}
      </FloatingPortal>
    </>
  )
}

export type PopoverFlexiableRef = {
  setIsMounted: (isMounted: boolean) => void
  setIsOpen: (isOpen: boolean) => void
}

export default memo(PopoverFlexiable)
