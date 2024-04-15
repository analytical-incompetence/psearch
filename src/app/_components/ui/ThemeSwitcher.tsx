// app/components/ThemeSwitcher.tsx
"use client";

import { Button, Image } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function Sun({width = 20, height = 20}) {
    return (
        <Image
            src="sun-svgrepo-com.svg"
            alt="Sun"
            width={width}
            height={height}
            radius={"none"}
            style={{
                maxWidth: `${width}px`,
            }}
        />
    )
}

function Moon({width = 20, height = 20}) {
    return (
        <Image
            src="moon-svgrepo-com.svg"
            alt="Moon"
            width={width}
            height={height}
            radius={"none"}
            style={{
                maxWidth: `${width}px`,
            }}
        />
    )
}

 export function Logo({width = 20, height = 20}) {
  return (
      <Image
          src="search-svgrepo-com.svg"
          alt="Moon"
          width={width}
          height={height}
          radius={"none"}
          style={{
              maxWidth: `${width}px`,
          }}
      />
  )
}

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <div>
      {theme == "dark" ? <Button isIconOnly variant="light" color="primary" onClick={() => setTheme('light')}><Sun/></Button> :
      <Button isIconOnly variant="faded" color="secondary" onClick={() => setTheme('dark')}><Moon/></Button>}
    </div>
  )
};