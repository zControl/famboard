import { PageContainer } from "@/components/common/PageContainer";
import { TypographyExample } from "@/examples/TypographyExample";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(app)/_examples/demo/typography")({
  component: TypographyPage,
});

function TypographyPage() {
  return (
    <PageContainer
      title="Demo - Typography"
      description="Typography used in the app"
    >
      <TypographyExample />
    </PageContainer>
  );
}
