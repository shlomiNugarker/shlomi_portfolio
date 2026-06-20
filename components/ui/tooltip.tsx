import { Tooltip as ChakraTooltip, Portal } from '@chakra-ui/react'
import * as React from 'react'

// Tooltip snippet for Chakra UI v3 (compound Tooltip API), exposing a simple
// `content`-based API similar to the v2 `label` prop the app used.
export interface TooltipProps extends ChakraTooltip.RootProps {
  showArrow?: boolean
  portalled?: boolean
  content: React.ReactNode
  contentProps?: ChakraTooltip.ContentProps
  disabled?: boolean
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(props, ref) {
    const {
      showArrow = true,
      children,
      disabled,
      portalled = true,
      content,
      contentProps,
      ...rest
    } = props

    if (disabled) return children

    return (
      <ChakraTooltip.Root {...rest}>
        <ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
        <PortalWrapper portalled={portalled}>
          <ChakraTooltip.Positioner>
            <ChakraTooltip.Content ref={ref} {...contentProps}>
              {showArrow && (
                <ChakraTooltip.Arrow>
                  <ChakraTooltip.ArrowTip />
                </ChakraTooltip.Arrow>
              )}
              {content}
            </ChakraTooltip.Content>
          </ChakraTooltip.Positioner>
        </PortalWrapper>
      </ChakraTooltip.Root>
    )
  }
)

const PortalWrapper = ({
  portalled,
  children,
}: {
  portalled: boolean
  children: React.ReactNode
}) => (portalled ? <Portal>{children}</Portal> : <>{children}</>)
