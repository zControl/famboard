import { PageContainer } from "@/components/common/PageContainer";
import { BasicExample } from "@/examples/BasicExample";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(app)/_examples/demo/basic")({
  component: BasicPage,
});

function BasicPage() {
  return (
    <PageContainer
      title="Demo - Basic"
      description="Basic UI components used in the app."
      keywords="avatar, badge, button, checkbox, collapsible, command, context-menu, hover-card, label, popover, progress, separator, spinner"
    >
      <BasicExample />
    </PageContainer>
  );
}
