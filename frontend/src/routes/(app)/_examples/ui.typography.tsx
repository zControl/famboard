import { UITypography } from "@/common/examples/UITypography";
import { PageContainer } from "@/common/layout/PageContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_examples/ui/typography")({
  component: UITypographyPage,
});

function UITypographyPage() {
  return (
    <PageContainer
      title="UI | Typography"
      description="Display text formatted in a specific way"
      keywords="ui, typography, text"
    >
      <UITypography />
    </PageContainer>
  );
}
