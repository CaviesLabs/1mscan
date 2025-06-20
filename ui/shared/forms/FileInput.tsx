import type { InputProps } from "@chakra-ui/react"
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  VisuallyHiddenInput,
  useToken,
} from "@chakra-ui/react"
import _, { throttle } from "lodash"
import type { ChangeEvent, DragEvent, ForwardedRef } from "react"
import React, { forwardRef, useCallback, useRef } from "react"
import type { FieldError } from "react-hook-form"
import { Controller, useForm } from "react-hook-form"
import { multipleRef, newOnChangeEvent } from "ui/utils/dom"
import ErrorMessage from "./ErrorMessage"
import FileSnippet from "./FileSnippet"
import {
  convertFileEntryToFile,
  getAllFileEntries,
  getFileExtension,
} from "./utils/files"

interface InjectedProps {
  isDragOver: boolean
}

interface Props extends Partial<Omit<InputProps, "children" | "placeholder">> {
  children: React.ReactNode | ((props: InjectedProps) => React.ReactNode)
  files: File[]
  placeholder?: React.ReactNode
  onDelete?: (index: number) => void
  error?: FieldError
  isSubmitting?: boolean
}

const FileInput = (
  {
    children,
    accept,
    isDisabled,
    onChange,
    files = [],
    multiple,
    onBlur,
    placeholder,
    onDelete,
    error,
    isSubmitting,
    ...props
  }: Props,
  parentRef: ForwardedRef<HTMLInputElement>,
) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLInputElement | null>(null)

  const primaryLight2 = useToken("colors", "primary.light.2")
  const neutralLight4 = useToken("colors", "neutral.light.4")
  const { control, setValue } = useForm({
    defaultValues: { isDragOver: false },
  })

  // React.useEffect(() => {
  //   if (!multiple && files?.length === 0 && ref.current?.value) {
  //     ref.current.value = "";
  //   }
  // }, [files?.length, multiple]);

  const validateFiles = useCallback(
    (newFiles: File[]) => {
      const allowedExtensions = accept?.split(",") || [] // List of allowed extensions

      if (!allowedExtensions.length) return true
      for (let i = 0; i < newFiles.length; i++) {
        const file = newFiles[i]

        const fileExtension = getFileExtension(file)

        if (!allowedExtensions.some((allow) => allow.includes(fileExtension))) {
          return false
        }
      }
      return true
    },
    [accept],
  )

  const handleInputChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files

      if (!fileList) {
        return
      }
      const newFiles = Array.from(fileList)

      if (validateFiles(newFiles)) {
        if (multiple) {
          const newEvent = newOnChangeEvent(
            _.uniqBy([...files, ...newFiles], (e) => e.name),
          )

          onChange?.(newEvent)
        } else {
          const newEvent = newOnChangeEvent(newFiles)
          onChange?.(newEvent)
        }
      }
    },
    [onChange, files],
  )

  const handleClick = React.useCallback(() => {
    ref.current?.click()
  }, [])

  const handleDrop = React.useCallback(
    async (event: DragEvent<HTMLDivElement>) => {
      try {
        event.preventDefault()

        if (isDisabled) {
          return
        }

        const fileEntries = await getAllFileEntries(event.dataTransfer.items)
        const newFiles = await Promise.all(
          fileEntries.map(convertFileEntryToFile),
        )

        if (!multiple && newFiles.length > 1) {
          return
        }

        if (validateFiles(newFiles)) {
          if (multiple) {
            const event = newOnChangeEvent(
              _.uniqBy([...files, ...newFiles], (e) => e.name),
            )
            onChange?.(event)
          } else {
            const event = newOnChangeEvent(newFiles)

            onChange?.(event)
          }
        }
      } finally {
        containerRef.current!.style.borderColor = neutralLight4
      }
    },
    [isDisabled, files],
  )

  const handleDragOver = React.useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      throttle(() => {
        if (!containerRef.current) return
        containerRef.current.style.borderColor = primaryLight2
        setValue("isDragOver", true)
      }, 50)()
    },
    [],
  )

  const handleDragEnter = React.useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault()
    },
    [],
  )

  const handleDragLeave = React.useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      setValue("isDragOver", false)
      if (!containerRef.current) return
      containerRef.current.style.borderColor = neutralLight4
    },
    [],
  )

  return (
    <FormControl
      isInvalid={Boolean(error)}
      isDisabled={isSubmitting || isDisabled}
    >
      <InputGroup
        as={FormLabel}
        onClick={handleClick}
        onBlur={onBlur}
        ref={containerRef}
        borderWidth="1px"
        borderColor={files?.length ? "accent.blue" : "neutral.light.4"}
        borderRadius="base"
        borderStyle="dashed"
        cursor="pointer"
        textAlign="center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        transition="all 0.2s ease-in-out"
        height="7.5rem"
        width="full"
        backgroundColor="neutral.light.1"
        padding={3}
        display="flex"
        _hover={{ borderStyle: "solid" }}
        _disabled={{
          borderColor: "neutral.light.3",
          backgroundColor: "neutral.light.3",
          pointerEvents: "none",
          borderStyle: "solid",
          _hover: { borderColor: "neutral.light.3" },
        }}
        flexDirection="column"
        _invalid={{ borderColor: "accent.red !important" }}
      >
        <VisuallyHiddenInput
          name={props.name}
          ref={(node) => {
            if (node) {
              multipleRef(node, ref, parentRef)
            }
          }}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          disabled={isDisabled}
          display="none"
          {...props}
        ></VisuallyHiddenInput>
        <Flex
          _empty={{ display: "none" }}
          gap={3}
          height="max-content"
          overflowX="auto"
        >
          {files?.map((file, index) => (
            <FileSnippet
              key={file.name}
              file={file}
              onDelete={() => {
                // TODO: implement for multiple
                onDelete?.(index)
              }}
              isDisabled={isSubmitting || isDisabled}
            ></FileSnippet>
          ))}
        </Flex>
        {(multiple || !files?.length) && placeholder}
        {typeof children === "function" ? (
          <Controller
            control={control}
            name="isDragOver"
            render={({ field: { value: isDragOver } }) => {
              return <>{children({ isDragOver })}</>
            }}
          ></Controller>
        ) : (
          children
        )}
      </InputGroup>

      <ErrorMessage as={FormErrorMessage}>{error?.message}</ErrorMessage>
    </FormControl>
  )
}

export default forwardRef(FileInput)
