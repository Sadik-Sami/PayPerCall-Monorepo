import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@workspace/ui/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    data-slot="slider"
    className={cn(
      "relative flex w-full touch-manipulation select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="bg-muted relative h-2 w-full grow overflow-hidden rounded-full">
      <SliderPrimitive.Range className="bg-primary absolute h-full transition-[width]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className="border-primary bg-background ring-ring/50 block size-5 rounded-full border-[5px] shadow-sm transition-[transform,box-shadow,border-color] hover:scale-105 focus-visible:outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
      aria-label="Slider Handle"
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
