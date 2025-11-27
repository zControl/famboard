import { NotFoundPage } from "@/common/error/NotFoundPage";
import { PageContainer } from "@/common/layout/PageContainer";
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
  notFoundComponent: NotFoundPage,
});
