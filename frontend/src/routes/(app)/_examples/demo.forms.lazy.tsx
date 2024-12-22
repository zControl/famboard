import { PageContainer } from "@/components/common/PageContainer";
import { FormsExample } from "@/examples/FormExample";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(app)/_examples/demo/forms")({
  component: DemoFormsPage,
});

function DemoFormsPage() {
  return (
    <PageContainer
      title="Demo - Forms"
      description="Form handling, validation, and submission."
    >
      <FormsExample />
    </PageContainer>
  );
}
