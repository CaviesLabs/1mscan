import moment from "./moment"

describe("[moment]: test", () => {
  it("[moment:test]: should < 2 days to hours", () => {
    expect(moment().subtract(1, "second").fromNow()).toEqual("a few sec ago")
    expect(moment().subtract(10, "second").fromNow()).toEqual("a few sec ago")
    expect(moment().subtract(1, "minute").fromNow()).toEqual("1 min ago")
    expect(moment().subtract(9, "minutes").fromNow()).toEqual("9 mins ago")
    expect(moment().subtract(10, "minutes").fromNow()).toEqual("10 mins ago")
    expect(moment().subtract(1, "hour").fromNow()).toEqual("1 hr ago")
    expect(moment().subtract(2, "hours").fromNow()).toEqual("2 hrs ago")
    expect(moment().subtract(24, "hours").fromNow()).toEqual("24 hrs ago")
    expect(moment().subtract(30, "days").fromNow()).toEqual("30 days ago")
    expect(moment().subtract(60, "days").fromNow()).toEqual("60 days ago")
    expect(moment().subtract(365, "days").fromNow()).toEqual("365 days ago")
    expect(moment().subtract(47, "hours").fromNow()).toEqual("47 hrs ago")
    expect(moment().subtract(48, "hours").fromNow()).toEqual("2 days ago")
  })
})
