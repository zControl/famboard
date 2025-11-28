import { PageContainer } from "@/common/layout/PageContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_examples/ui_")({
  component: UIRootPage,
});

function UIRootPage() {
  return (
    <PageContainer
      title="UI"
      description="Root page for all UI components"
      keywords="ui, page, components, cookbook"
    >
      <p>
        This should have an overview to docs, example section, and cookbook
        links.
      </p>
    </PageContainer>
  );
}
