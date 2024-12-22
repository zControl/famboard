import { PageContainer } from "@/components/common/PageContainer";
import { LoadersExample } from "@/examples/LoadersExample";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(app)/_examples/demo/loaders")({
  component: LoadersPage,
});

function LoadersPage() {
  return (
    <PageContainer
      title="Demo - Loaders"
      description="Skeleton and Spinners used to show a loading state."
    >
      <LoadersExample />
    </PageContainer>
  );
}
