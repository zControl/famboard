import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/_kids/kids/play')({
  component: () => <div>Hello /(app)/_kids/kids/games!</div>,
})