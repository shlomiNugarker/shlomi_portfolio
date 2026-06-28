import React from 'react'

// Previously a reveal-on-scroll wrapper; now a transparent pass-through so all
// sections render fully visible with no entrance animation.
const FadeInWhenVisible = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
)

export default FadeInWhenVisible
