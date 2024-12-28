import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_kids/kids/")({
  component: () => <div>Hello /(app)/_kids/kids/!</div>,
});
