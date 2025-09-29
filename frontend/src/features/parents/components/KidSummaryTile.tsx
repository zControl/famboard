import { Tile } from "@/components/composites/Tile";
import { Spinner } from "@/components/ui/spinner";
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
      menu="actions"
      footer="footer"
    >
      <div className="grid grid-cols-1 md:flex md:flex-row justify-center">
        <div className="w-1/4 mx-auto p-4">
          {/* <KidProfileSummaryCard id={id} /> */}
          <div>Summary</div>
        </div>
        <div className="flex flex-row justify-around w-full gap-x-4">
          <div>Active Tasks</div>
          <div>Approvals</div>
          {/* <KidActiveTasksCard userId={userProfile?.userId ?? ""} />
          <KidApprovalsCard userId={userProfile?.userId ?? ""} /> */}
        </div>
      </div>
    </Tile>
  );
};
