import { ErrorCard } from "@/common/error/ErrorCard";
import { ErrorPage } from "@/common/error/ErrorPage";
import { PageContainer } from "@/common/layout/PageContainer";
import { Separator } from "@/common/ui/display/separator";
import { Spinner } from "@/common/ui/feedback/spinner";
import { DashboardDataCards } from "@/features/kids/components/DashboardDataCards";
import { KidActiveTasksCard } from "@/features/kids/components/KidActiveTasksCard";
import { KidApprovalsCard } from "@/features/kids/components/KidApprovalsCard";
import { KidShowcaseCard } from "@/features/kids/components/KidShowcaseCard";
import { useProfile } from "@/features/user/hooks/useProfile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_kids/kids/")({
  component: KidsIndexPage,
});

function KidsIndexPage() {
  const { profile, isLoading: profileLoading, error } = useProfile();
  const userId = profile?.userId;

  // make sure profile is loaded
  if (error) {
    return (
      <ErrorPage>
        <ErrorCard
          title="Error loading profile"
          message="There was an error from the server when trying to load the user profile."
          error={error}
        />
      </ErrorPage>
    );
  }

  return (
    <PageContainer
      title={profile?.firstName || "Dashboard"}
      description="This is the dashboard for a kid user!"
    >
      {profileLoading ? <Spinner size="lg" /> : <DashboardDataCards />}
      <Separator className="my-4" />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="shrink-0">
          {userId && <KidShowcaseCard userId={userId} />}
        </div>
        <div className="flex-1 min-w-0">
          {userId && <KidActiveTasksCard userId={userId} />}
          {userId && <KidApprovalsCard userId={userId} />}
        </div>
      </div>
    </PageContainer>
  );
}
