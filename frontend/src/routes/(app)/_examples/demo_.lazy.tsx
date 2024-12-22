import { NotFound } from "@/components/common/NotFound";
import { PageContainer } from "@/components/common/PageContainer";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(app)/_examples/demo_")({
  component: () => (
    <PageContainer
      title="Demo - Overview"
      description="Cookbook of UI components used in the app."
      keywords="demo, ui, components, cookbook, app"
    >
      <div>Hello /_examples/demo!</div>
      <div>Put links to docs here.</div>
    </PageContainer>
  ),
  notFoundComponent: NotFound,
});
