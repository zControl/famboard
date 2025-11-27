import { UINavigation } from "@/common/examples/UINavigation";
import { PageContainer } from "@/common/layout/PageContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_examples/ui/navigation")({
  component: UINavigationPage,
});

function UINavigationPage() {
  return (
    <PageContainer
      title="UI | Navigation"
      description="Component to move around the app"
      keywords="ui, navigation, menu, sidebar"
    >
      <UINavigation />
    </PageContainer>
  );
}
