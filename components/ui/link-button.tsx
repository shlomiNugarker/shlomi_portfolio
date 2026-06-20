import { Button, ButtonProps } from '@chakra-ui/react'
import type { AnchorHTMLAttributes } from 'react'

// A Chakra Button rendered as an anchor. In Chakra UI v3 the polymorphic `as`
// prop no longer forwards anchor attributes (href/target/rel) through the
// Button's types, so this thin wrapper restores that ergonomics while keeping
// the runtime behaviour identical (Button still renders an <a>).
export type LinkButtonProps = ButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement>

export const LinkButton = (props: LinkButtonProps) => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <Button as="a" {...(props as any)} />
)
