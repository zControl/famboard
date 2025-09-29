import { Tile } from "@/components/composites/Tile";
import { Spinner } from "@/components/ui/spinner";
import { KidActiveTasksCard } from "@/features/parents/components/KidActiveTasksCard";
import { KidApprovalsCard } from "@/features/parents/components/KidApprovalsCard";
import { KidProfileSummaryCard } from "@/features/parents/components/KidProfileSummaryCard";
import { useKidManager } from "@/features/parents/hooks/useKidManager";

interface KidSummaryTileProps {
  id: string;
}

export const KidSummaryTile = ({ id }: KidSummaryTileProps) => {
  //TODO: this summary tile, just needs the profile for the name
  //TODO: The other components will just get the id, and do their own data logic.
  const { getKidProfile } = useKidManager();
  const {
    data: kid,
    isLoading: isLoadingProfile,
    error: isErrorProfile,
  } = getKidProfile(id);

  if (isLoadingProfile) return <Spinner />;
  if (isErrorProfile) return <div>Error fetching kid profile</div>;

  return (
    <Tile title={kid?.firstName || "No Name!"} menu="actions" footer="footer">
      <div className="grid grid-cols-1 md:flex md:flex-row justify-center">
        <div className="w-1/4 mx-auto p-4">
          {/* TODO For example here, we should just pass the id, and the profile summary should get the data. */}
          {kid && <KidProfileSummaryCard kid={kid} />}
        </div>
        <div className="flex flex-row justify-around w-full gap-x-4">
          <KidActiveTasksCard userId={kid?.userId ?? ""} />
          <KidApprovalsCard userId={kid?.userId ?? ""} />
        </div>
      </div>
    </Tile>
  );
};
