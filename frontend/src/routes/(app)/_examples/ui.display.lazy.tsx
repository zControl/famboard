import { UIDisplay } from "@/common/examples/UIDisplay";
import { PageContainer } from "@/common/layout/PageContainer";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(app)/_examples/ui/display")({
  component: UIDisplayPage,
});

function UIDisplayPage() {
  return (
    <PageContainer
      title="UI | Display"
      description="A piece of content that presents information to the user."
      keywords="ui, display, content"
    >
      <UIDisplay />
    </PageContainer>
  );
}
