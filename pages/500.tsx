import type { JSX } from 'react'
import ErrorLayout from 'components/Misc/ErrorLayout'

const ServerErrorPage = (): JSX.Element => (
  <ErrorLayout
    code="500"
    title="Something went wrong"
    message="An unexpected error occurred on our end. Try refreshing, or head back home."
  />
)

export default ServerErrorPage
