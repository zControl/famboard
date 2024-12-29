import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/_admin/admin/analytics')({
  component: () => <div>Hello /(app)/_admin/admin/analytics!</div>,
})
