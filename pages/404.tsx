import type { JSX } from 'react'
import ErrorLayout from 'components/Misc/ErrorLayout'

const NotFoundPage = (): JSX.Element => (
  <ErrorLayout
    code="404"
    title="Page not found"
    message="Looks like you wandered off the map. The page you're looking for doesn't exist or has moved."
  />
)

export default NotFoundPage
