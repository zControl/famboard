import { DisplayExamples } from "@/common/examples/DisplayExamples";
import { PageContainer } from "@/common/layout/PageContainer";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(app)/_examples/demo/display")({
  component: DemoDisplayPage,
});

function DemoDisplayPage() {
  return (
    <PageContainer
      title="Demo - Display"
      description="A piece of content that presents information to the user."
    >
      <DisplayExamples />
    </PageContainer>
  );
}
