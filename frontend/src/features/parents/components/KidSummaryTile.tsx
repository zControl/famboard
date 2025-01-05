import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    return <Card className="rounded-none w-full">approvals</Card>;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-row justify-between items-center">
            <div>
              <CardTitle className="text-xl">
                {kid?.firstName || "No Name!"}
              </CardTitle>
            </div>
            <div>actions</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4">
            <div>{kid && <KidProfileSummaryCard kid={kid} />}</div>
            <div>
              <KidActiveTasksCard />
            </div>
            <div>
              <NeedsApprovalCard />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full mx-auto text-center">{kid?.userId}</div>
        </CardFooter>
      </Card>
    </>
  );
};
