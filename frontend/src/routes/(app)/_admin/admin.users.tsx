import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/_admin/admin/users')({
  component: () => <div>Hello /(app)/_admin/admin/users!</div>,
})
