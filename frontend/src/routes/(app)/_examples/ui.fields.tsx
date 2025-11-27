import { UIFields } from "@/common/examples/UIFields";
import { PageContainer } from "@/common/layout/PageContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_examples/ui/fields")({
  component: UIFieldsPage,
});

function UIFieldsPage() {
  return (
    <PageContainer
      title="UI | Fields"
      description="Allow the user to input various types of data."
      keywords="ui, fields, input, form"
    >
      <UIFields />
    </PageContainer>
  );
}
