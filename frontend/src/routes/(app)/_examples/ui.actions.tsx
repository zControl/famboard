import { UIActions } from "@/common/examples/UIActions";
import { PageContainer } from "@/common/layout/PageContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_examples/ui/actions")({
  component: UIActionsPage,
});

function UIActionsPage() {
  return (
    <PageContainer
      title="UI | Actions"
      description="Componets for user actions."
      keywords="ui, actions, button, button-link"
    >
      <UIActions />
    </PageContainer>
  );
}
