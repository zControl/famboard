import { UIMedia } from "@/common/examples/UIMedia";
import { PageContainer } from "@/common/layout/PageContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_examples/ui/media")({
  component: UIMediaPage,
});

function UIMediaPage() {
  return (
    <PageContainer
      title="UI | Media"
      description="Components to display media"
      keywords="ui, media, image, video"
    >
      <UIMedia />
    </PageContainer>
  );
}
