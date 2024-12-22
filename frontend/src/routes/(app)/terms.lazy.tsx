import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(app)/terms')({
  component: () => <div>Hello /terms!</div>,
})
