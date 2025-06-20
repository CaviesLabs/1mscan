import type { IconName } from "public/icons/name"

export type IContact = {
  text: string
  name: IconName
  href: string
  type: "email" | "x" | "telegram"
  metadata?: Record<string, string>
}

export const CONTACTS: IContact[] = [
  {
    type: "email",
    text: "Gmail",
    name: "social/email",
    href: "mailto:support@1mscan.com",
  },
  {
    type: "x",
    text: "X",
    name: "social/x",
    href: "https://x.com/seitrace_",
  },
  // {
  //   text: "Telegram",
  //   type: "telegram",
  //   name: "social/telegram",
  //   href: "https://t.me/seitrace_",
  // },
]
