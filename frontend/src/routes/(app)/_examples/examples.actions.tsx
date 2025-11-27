import { ActionsExamples } from "@/common/examples/ActionsExamples";
import { PageContainer } from "@/common/layout/PageContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_examples/examples/actions")({
  component: ActionsExamplesPage,
});

function ActionsExamplesPage() {
  return (
    <PageContainer
      title="Demo - Actions"
      description="Componets for user actions."
      keywords="button, button-link"
    >
      <ActionsExamples />
    </PageContainer>
  );
}
