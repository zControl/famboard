import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/_kids/kids/help')({
  component: () => <div>Hello /(app)/_kids/kids/tasks!</div>,
})
