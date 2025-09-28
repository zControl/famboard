import { Tile } from "@/components/composites/Tile";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { KidActiveTasksCard } from "@/features/parents/components/KidActiveTasksCard";
import { KidProfileSummaryCard } from "@/features/parents/components/KidProfileSummaryCard";
import { useKidManager } from "@/features/parents/hooks/useKidManager";

interface KidSummaryTileProps {
  id: string;
}

export const KidSummaryTile = ({ id }: KidSummaryTileProps) => {
  const { getKidProfile } = useKidManager();
  const {
    data: kid,
    isLoading: isLoadingProfile,
    error: isErrorProfile,
  } = getKidProfile(id);

  if (isLoadingProfile) return <Spinner />;
  if (isErrorProfile) return <div>Error fetching kid profile</div>;

  const NeedsApprovalCard = () => {
    return <Card className="w-full">approvals</Card>;
  };

  return (
    <Tile title={kid?.firstName || "No Name!"} menu="actions" footer="footer">
      <div className="grid grid-cols-1 md:flex md:flex-row justify-center">
        <div className="w-1/4 mx-auto p-4">
          {kid && <KidProfileSummaryCard kid={kid} />}
        </div>
        <div className="flex flex-row justify-around w-full gap-x-4">
          <KidActiveTasksCard userId={kid?.userId ?? ""} />
          <NeedsApprovalCard />
        </div>
      </div>
    </Tile>
  );
};
