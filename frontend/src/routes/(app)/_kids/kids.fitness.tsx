import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/_kids/kids/fitness')({
  component: () => <div>Hello /(app)/_kids/kids/exersize!</div>,
})
