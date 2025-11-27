import { rootApi } from "@/api/rootApi";
import { AppLogo } from "@/common/layout/AppLogo";
import { HeaderContainer } from "@/common/layout/HeaderContainer";
import { PageContainer } from "@/common/layout/PageContainer";
import { Spinner } from "@/common/ui/feedback/spinner";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(app)/status")({
  component: StatusPage,
});

function StatusPage() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["status"],
    queryFn: rootApi.getHealth,
  });

  if (isPending || isFetching) return <Spinner size="xl" />;

  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <>
      <HeaderContainer logo={<AppLogo />} />
      <PageContainer
        title="Status Page"
        description="Show the status of the web services and API endpoints"
      >
        {data.status === "error" && <div className="h-10 w-full bg-danger" />}
        {data.status === "ok" && (
          <div className="h-10 w-full bg-secondary">OK</div>
        )}
        <div>SHOW STATUS MARTIX HERE</div>
      </PageContainer>
    </>
  );
}
