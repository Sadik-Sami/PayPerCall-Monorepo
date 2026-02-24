import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  pauseOnHover?: boolean
  direction?: "left" | "right"
  speed?: number
  vertical?: boolean
}

export function Marquee({
  children,
  pauseOnHover = false,
  direction = "left",
  speed = 30,
  vertical = false,
  className,
  ...props
}: MarqueeProps) {
  if (vertical) {
    return (
      <div
        className={cn(
          "overflow-hidden",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "flex flex-col animate-marquee-vertical",
            pauseOnHover && "hover:paused"
          )}
          style={{ "--duration": `${speed}s` } as React.CSSProperties}
        >
          {children}
          {children}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "w-full overflow-hidden sm:mt-24 mt-10 z-10",
        className
      )}
      {...props}
    >
      <div className="relative flex max-w-[90vw] overflow-hidden py-5">
        <div
          className={cn(
            "flex w-max animate-marquee",
            pauseOnHover && "hover:paused",
            direction === "right" && "animate-marquee-reverse"
          )}
          style={{ "--duration": `${speed}s` } as React.CSSProperties}
        >
          {children}
          {children}
        </div>
      </div>
    </div>
  )
}