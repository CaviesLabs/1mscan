import type {
  BoxProps,
  ChakraProps,
  FlexProps,
  MergeWithAs,
} from "@chakra-ui/react"
import { Box, Flex, forwardRef, useSafeLayoutEffect } from "@chakra-ui/react"
import type { PanInfo } from "framer-motion"
import { motion, useAnimation, useMotionValue } from "framer-motion"
import { useWatchState } from "lib/hooks/useWatchState"
import type {
  DetailedHTMLProps,
  Dispatch,
  ElementType,
  ForwardRefExoticComponent,
  ForwardedRef,
  HTMLAttributes,
  SetStateAction,
} from "react"
import { useCallback, useMemo, useRef } from "react"
import { multipleRef } from "ui/utils/dom"

const MotionFlex = motion.create(
  Flex as ForwardRefExoticComponent<
    MergeWithAs<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
      any,
      FlexProps,
      ElementType
    >
  >,
)

const transitionProps = {
  stiffness: 400,
  type: "spring",
  damping: 60,
  mass: 3,
}

type ITabItem = {
  props?: FlexProps
  component: React.ReactNode
}

type Props = {
  tabs: ITabItem[]
  // perpage?: number;
  draggable?: boolean
  activeIndex?: number
  gap?: string
} & BoxProps

const Carousel = (
  { tabs, draggable, activeIndex = 0, gap = "0px", ...props }: Props,
  ref: ForwardedRef<
    HTMLDivElement & {
      setActiveItem: Dispatch<SetStateAction<number>>
      onDecrement: () => void
      onIncrement: () => void
    }
  >,
) => {
  const [activeItem, setActiveItem] = useWatchState(activeIndex, [])

  const count = useMemo(() => tabs.length, [tabs])

  const onDecrement = useCallback(() => {
    setActiveItem((prev) => prev - 1)
  }, [activeItem])

  const onIncrement = useCallback(() => {
    setActiveItem((prev) => prev + 1)
  }, [activeItem])

  return (
    <Track
      setActiveItem={setActiveItem}
      activeItem={activeItem}
      draggable={draggable}
      count={count}
      gap={gap}
      {...props}
      ref={(el) => {
        multipleRef(
          {
            ...el,
            setActiveItem,
            onDecrement,
            onIncrement,
          } as HTMLDivElement & {
            setActiveItem: Dispatch<SetStateAction<number>>
            onDecrement: () => void
            onIncrement: () => void
          },
          ref,
        )
      }}
    >
      {tabs.map(({ component, props }, index) => (
        <Item
          {...props}
          index={index}
          key={index}
          setActiveItem={setActiveItem}
          activeItem={activeItem}
          count={count}
        >
          {component}
        </Item>
      ))}
    </Track>
  )
}

// function findElementIndexByOffset(arr: number[], offset: number) {
//   let sum = 0;

//   for (let i = 0; i < arr.length; i++) {
//     sum += arr[i];
//     if (sum > offset) {
//       return i; // Phần tử mà offset đang nằm ở đó
//     }
//   }

//   return -1; // Trường hợp không tìm thấy
// }

const Track = forwardRef<
  {
    setActiveItem: Dispatch<SetStateAction<number>>
    activeItem: number
    count: number
    children: React.ReactNode
    draggable?: boolean
    gap: ChakraProps["gap"]
  } & BoxProps,
  "div"
>(
  (
    { setActiveItem, activeItem, children, draggable, count, gap, ...props },
    ref,
  ) => {
    // const activeItemRef = useShallowLayoutMemoRef(() => activeItem, [activeItem]);
    const controls = useAnimation()
    const x = useMotionValue(0)
    const node = useRef<HTMLDivElement>(null)

    const handleDragEnd: (
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo,
    ) => void = (_, info) => {
      const containerElement = node.current
      if (!containerElement) return

      const offsetX = info.offset.x

      const absoluteIndex = Math.abs(
        Math.floor(offsetX / containerElement.offsetWidth),
      )
      // console.log(absoluteIndex);
      setActiveItem(absoluteIndex)
    }

    const handleScroll = useCallback(
      ({ activeItem }: { activeItem: number }) => {
        controls?.start({
          x: `calc((50% * ${-activeItem}) - calc(${activeItem === 0 ? "0px" : gap} / 2))`,
          transition: {
            ...transitionProps,
          },
        })
      },
      [controls],
    )

    useSafeLayoutEffect(() => {
      handleScroll({ activeItem })
    }, [activeItem])

    // useEffect(() => {
    //   if (!node.current) return;
    //   const resizeHandler = debounce(() => {
    //     handleScroll({ activeItem: activeItemRef.current });
    //   }, 50);

    //   const resizeObserver = new ResizeObserver(resizeHandler);

    //   resizeObserver.observe(node.current);
    //   return function () {
    //     if (!node.current) return;
    //     resizeObserver.unobserve(node.current);
    //   };
    // }, [node.current]);

    return (
      <Box
        ref={(el) => {
          multipleRef(el, ref, node)
        }}
        overflow="hidden"
        pos="relative"
        width="full"
        {...props}
      >
        <MotionFlex
          dragConstraints={node}
          // onDragStart={() => {}}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{ x }}
          drag={draggable ? "x" : undefined}
          _active={{ cursor: draggable ? "grabbing" : undefined }}
          minWidth="min-content"
          width={`calc((100% * ${count}) + (${gap} * ${count - 1}))`}
          flexWrap="nowrap"
          cursor={draggable ? "grab" : undefined}
          gap={gap}
        >
          {children}
        </MotionFlex>
      </Box>
    )
  },
)

const Item = ({
  children,
  // count,
  ...props
}: {
  setActiveItem: Dispatch<SetStateAction<number>>
  activeItem: number
  count: number
  children: React.ReactNode
  index: number
} & FlexProps) => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="stretch"
      {...props}
      w="full"
    >
      {children}
    </Flex>
  )
}

export default forwardRef(Carousel)
