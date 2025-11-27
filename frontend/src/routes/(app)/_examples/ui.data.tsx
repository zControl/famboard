import { UIData } from "@/common/examples/UIData";
import { PageContainer } from "@/common/layout/PageContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_examples/ui/data")({
  component: UIDataPage,
});

function UIDataPage() {
  return (
    <PageContainer
      title="UI | Data"
      description="Componets to display various data."
      keywords="data, table, list, item, labeled-value"
    >
      <UIData />
    </PageContainer>
  );
}
