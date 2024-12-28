import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_parents/parents/")({
  component: ParentsIndexPage,
});

function ParentsIndexPage() {
  return (
    <div>
      <p>This is the parents page. Only parents have access.</p>
    </div>
  );
}
