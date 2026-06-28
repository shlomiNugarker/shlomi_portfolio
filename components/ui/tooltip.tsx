import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from 'lib/utils'

const TooltipProvider = TooltipPrimitive.Provider
const TooltipRoot = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, children, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 max-w-xs rounded-md bg-kl-inverse px-3 py-1.5 text-xs text-kl-inverse-fg shadow-md',
        className
      )}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className="fill-kl-inverse" />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

// Convenience wrapper matching the old `content`-based API used in Detail.tsx.
export interface TooltipProps {
  content: React.ReactNode
  children: React.ReactNode
}

export const Tooltip = ({ content, children }: TooltipProps) => (
  <TooltipProvider delayDuration={200}>
    <TooltipRoot>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </TooltipRoot>
  </TooltipProvider>
)

export {
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
}
