import { PageContainer } from "@/components/common/PageContainer";
import { NavigationExample } from "@/examples/NavigationExample";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(app)/_examples/demo/navigation")({
  component: DemoNavigationPage,
});

function DemoNavigationPage() {
  return (
    <PageContainer
      title="Demo - Navigation"
      description="Navigation options for sidebar, header, menu, and popovers."
    >
      <NavigationExample />
    </PageContainer>
  );
}
