"use client"
import { useEffect } from "react"
import AOS from "aos"

export default function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    })
  }, [])

  return null
}
