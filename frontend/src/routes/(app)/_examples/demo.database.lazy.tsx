import { DatabaseExample } from "@/common/examples/DatabaseExample";
import { PageContainer } from "@/common/layout/PageContainer";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(app)/_examples/demo/database")({
  component: DemoDatabasePage,
});

function DemoDatabasePage() {
  return (
    <PageContainer
      title="Demo - Database"
      description="Database handling, validation, and submission."
    >
      <DatabaseExample />
    </PageContainer>
  );
}
