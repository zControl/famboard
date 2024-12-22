import { PageContainer } from "@/components/common/PageContainer";
import { DialogExample } from "@/examples/DialogExample";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_examples/demo/dialogs")({
  component: DemoDialogsPage,
});

function DemoDialogsPage() {
  return (
    <PageContainer
      title="Demo - Dialogs"
      description="Any kind of user interfacemodal that is not part of the main page content."
    >
      <DialogExample />
    </PageContainer>
  );
}
