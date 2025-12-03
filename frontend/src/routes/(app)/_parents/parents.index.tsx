import { ErrorCard } from "@/common/error/ErrorCard";
import { PageContainer } from "@/common/layout/PageContainer";
import { Spinner } from "@/common/ui/feedback/spinner";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/common/ui/surfaces/tabs";
import { KidSummaryTile } from "@/features/parents/components/KidSummaryTile";
import { useKidManager } from "@/features/parents/hooks/useKidManager";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_parents/parents/")({
  component: ParentsIndexPage,
});

function ParentsIndexPage() {
  const { kidIds, kidProfiles, isLoadingIds, idsError } = useKidManager();

  if (isLoadingIds) return <Spinner size="xl" />;
  if (idsError)
    return (
      <PageContainer title="Error">
        <ErrorCard
          error={
            idsError.message ? idsError : new Error("Error fetching kid Ids")
          }
        />
      </PageContainer>
    );
  return (
    <PageContainer title="Parents" description="Parents page">
      {kidIds && kidIds.length > 0 ? (
        <Tabs defaultValue={kidIds[0]} className="w-full max-w-6xl mx-auto">
          <TabsList className="w-full flex justify-center gap-2 rounded-none h-12">
            {kidProfiles?.map((profile) => (
              <TabsTrigger
                key={`trigger-${profile.profile.userId}`}
                value={profile.profile.userId}
                className="flex-1 font-medium text-2xl"
              >
                {profile.profile.firstName || profile.profile.username}
              </TabsTrigger>
            ))}
          </TabsList>

          {kidIds.map((kidId) => (
            <TabsContent
              key={`content-${kidId}`}
              value={kidId}
              className="mt-2"
            >
              <KidSummaryTile id={kidId} />
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div>No kids found</div>
      )}
    </PageContainer>
  );
}
