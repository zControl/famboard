import { Spinner } from "@/common/ui/feedback/spinner";
import { Tile } from "@/common/ui/surfaces/Tile";
import { ApprovalListTile } from "@/features/parents/components/ApprovalListTile";
import { AssignedTasksDatatable } from "@/features/parents/components/AssignedTasksDatatable";
import { KidProfileCard } from "@/features/parents/components/KidProfileCard";
import { useUserProfile } from "@/features/user/hooks/useUserProfile";

interface KidSummaryTileProps {
  id: string;
}

export const KidSummaryTile = ({ id }: KidSummaryTileProps) => {
  const { data: userProfile, isLoading, error } = useUserProfile(id);

  if (isLoading) return <Spinner />;
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Tile
      title={userProfile?.firstName || "No Name!"}
      menu="actions can go here"
      footer="footer"
    >
      <div className="grid grid-cols-1 md:flex md:flex-row justify-center gap-2">
        <div className="min-w-1/4">
          <KidProfileCard id={id} />
        </div>
        <div className="flex flex-col gap-2">
          <ApprovalListTile userId={userProfile?.userId ?? ""} />
          <AssignedTasksDatatable userId={userProfile?.userId ?? ""} />
        </div>
      </div>
    </Tile>
  );
};
