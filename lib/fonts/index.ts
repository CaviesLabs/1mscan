import { Inter, Kode_Mono, Rubik } from "next/font/google"

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
})

const kodeMono = Kode_Mono({
  subsets: ["latin"],
  variable: "--font-kode-mono",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export { inter, kodeMono, rubik }
