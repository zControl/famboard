import { DataExamples } from "@/common/examples/DataExamples";
import { PageContainer } from "@/common/layout/PageContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_examples/examples/data")({
  component: DataExamplesPage,
});

function DataExamplesPage() {
  return (
    <PageContainer
      title="Demo - Data"
      description="Componets to display various data."
      keywords="data, table, list, item, labeled-value"
    >
      <DataExamples />
    </PageContainer>
  );
}
