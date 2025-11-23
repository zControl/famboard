import { ColorsExample } from "@/common/examples/ColorsExample";
import { PageContainer } from "@/common/layout/PageContainer";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(app)/_examples/demo/colors")({
  component: ColorsPage,
});

function ColorsPage() {
  return (
    <PageContainer title="Demo - Colors" description="Colors used in the app">
      <ColorsExample />
    </PageContainer>
  );
}
