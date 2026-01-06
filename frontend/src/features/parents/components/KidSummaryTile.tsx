import { ErrorCard } from "@/common/error/ErrorCard";
import { Spinner } from "@/common/ui/feedback/spinner";
import { Tile } from "@/common/ui/surfaces/Tile";
import { KidApprovalsCard } from "@/features/parents/components/KidApprovalsCard";
import { AssignedTasksDatatable } from "@/features/parents/components/KidAssignedTasksCard";
import { KidProfileCard } from "@/features/parents/components/KidProfileCard";
import { useUserProfile } from "@/features/user/hooks/useUserProfile";

interface KidSummaryTileProps {
  id: string;
}

export const KidSummaryTile = ({ id }: KidSummaryTileProps) => {
  const { data: userProfile, isLoading, error } = useUserProfile(id);

  if (isLoading) return <Spinner size="xl" />;
  if (error) {
    return (
      <ErrorCard
        error={error.message ? error : new Error("Error fetching user profile")}
      />
    );
  }
  if (!userProfile) {
    return <ErrorCard error={new Error("User not found")} />;
  }

  return (
    <Tile
      title={userProfile.firstName}
      menu="actions can go here"
      footer={userProfile.userId}
    >
      <div className="grid grid-cols-1 md:flex md:flex-row justify-center gap-2">
        <div className="min-w-1/4">
          <KidProfileCard userProfile={userProfile} />
        </div>
        <div className="min-w-3/4 flex flex-col gap-2">
          <KidApprovalsCard userProfile={userProfile} />
          <AssignedTasksDatatable userId={userProfile.userId} />
        </div>
      </div>
    </Tile>
  );
};
