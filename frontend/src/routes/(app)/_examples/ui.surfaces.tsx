import { UISurfaces } from "@/common/examples/UISurfaces";
import { PageContainer } from "@/common/layout/PageContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_examples/ui/surfaces")({
  component: UISurfacesPage,
});

function UISurfacesPage() {
  return (
    <PageContainer
      title="UI | Surfaces"
      description="A wrapper for a piece of content"
      keywords="ui, surfaces, card, panel, tile"
    >
      <UISurfaces />
    </PageContainer>
  );
}
