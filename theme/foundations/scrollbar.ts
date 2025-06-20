const scrollbar = {
  "body *::-webkit-scrollbar": {
    // width: "3px",
    // height: "3px",
  },
  "body *::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "body *::-webkit-scrollbar-thumb": {
    // backgroundColor: "#ffeeee",
    borderRadius: "10px",
  },
  "body *::-webkit-scrollbar-button": {
    display: "none",
  },
  "body *::-webkit-scrollbar-corner": {
    backgroundColor: "transparent",
  },
  "body *": {
    scrollbarWidth: "thin",
    scrollbarColor: "#ffeeee transparent",
    scrollBehavior: "smooth",
  },
}

export default scrollbar
