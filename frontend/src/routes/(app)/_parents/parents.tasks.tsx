import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/_parents/parents/tasks')({
  component: () => <div>Hello /(app)/_parents/parents/tasks!</div>,
})
