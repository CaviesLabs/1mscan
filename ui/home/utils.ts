const justifyMap = {
  base: "flex-start",
  sm: ["flex-start", "flex-start"],
  ssssm: ["flex-start", "center", "flex-end"],
  md: ["flex-start", "center", "center", "flex-end"],
  lg: ["flex-start", "center", "flex-end"],
  xl: ["flex-start", "center", "center", "flex-end"],
}

export const getJustify = (bp: keyof typeof justifyMap, index: number) => {
  const arr = justifyMap[bp]
  if (Array.isArray(arr)) {
    return arr[index % arr.length] // Vị trí trong hàng hiện tại
  }
  return arr
}
