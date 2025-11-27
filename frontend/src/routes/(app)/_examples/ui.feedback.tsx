import { UIFeedback } from "@/common/examples/UIFeedback";
import { PageContainer } from "@/common/layout/PageContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_examples/ui/feedback")({
  component: UIFeedbackPage,
});

function UIFeedbackPage() {
  return (
    <PageContainer
      title="UI | Feedback"
      description="Provide feedback to users via spinners, toasts, and tooltips."
      keywords="ui, feedback, spinner, toast, tooltip"
    >
      <UIFeedback />
    </PageContainer>
  );
}
