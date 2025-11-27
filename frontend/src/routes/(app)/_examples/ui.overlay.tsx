import { UIOverlay } from "@/common/examples/UIOverlay";
import { PageContainer } from "@/common/layout/PageContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_examples/ui/overlay")({
  component: UIOverlayPage,
});

function UIOverlayPage() {
  return (
    <PageContainer
      title="UI | Overlay"
      description="Component that is not part of page but requires user interaction."
      keywords="ui, overlay, modal, popover"
    >
      <UIOverlay />
    </PageContainer>
  );
}
