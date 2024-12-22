import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/_examples/demo/testing')({
  component: () => <div>Hello /(app)/_examples/demo/testing!</div>,
})
