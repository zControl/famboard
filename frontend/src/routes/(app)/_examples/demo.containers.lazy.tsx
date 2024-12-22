import { PageContainer } from "@/components/common/PageContainer";
import { ContainerExample } from "@/examples/ContainerExample";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(app)/_examples/demo/containers")({
  component: ContainersPage,
});

function ContainersPage() {
  return (
    <PageContainer
      title="Demo - Conainers"
      description="Containers are used to wrap content in different sections."
      keywords="card, tile, container, section, wrapper"
    >
      <ContainerExample />
    </PageContainer>
  );
}
