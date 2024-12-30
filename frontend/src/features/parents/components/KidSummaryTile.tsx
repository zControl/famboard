import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useKidManager } from "@/features/parents/hooks/useKidManager";
import { firstInitial } from "@/utils/utils";

const KidProfileSummary = ({ id }: { id: string }) => {
  const { getKidProfile } = useKidManager();
  const { data: kid, isLoading, error } = getKidProfile(id);

  // TODO: how does this work?
  if (isLoading) return <Spinner />;
  if (error) return <div>Error fetching kid profile</div>;

  return (
    <div className="mx-auto flex flex-col items-center gap-2">
      <Avatar className="h-24 w-24">
        <AvatarImage src={kid?.avatarUrl} alt="Avatar" />
        <AvatarFallback>{firstInitial(kid?.username ?? "")}</AvatarFallback>
      </Avatar>
      <div>{kid?.bio}</div>
      <div>badges</div>
      <div>{kid?.email}</div>
    </div>
  );
};

const KidActiveTasks = () => {
  return (
    <Card className="rounded-none">
      <CardContent>
        <div>active tasks table</div>
      </CardContent>
    </Card>
  );
};

const KidNeedsApproval = () => {
  return (
    <Card className="rounded-none">
      <CardContent>
        <div>needs approval table</div>
      </CardContent>
    </Card>
  );
};

/**
 * The component that renders this will get all of the kid ids.
 * So each tile can then be responsible for getting the individual kid data.
 *
 */
interface KidSummaryTileProps {
  id: string;
}

export const KidSummaryTile = ({ id }: KidSummaryTileProps) => {
  const { getKidProfile } = useKidManager();
  const { data: kid } = getKidProfile(id);
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-row justify-between items-center">
            <div>
              <CardTitle className="text-xl">
                {kid?.firstName || "No Name!"}
              </CardTitle>
              <CardDescription>
                {kid?.username || "No Username!"}
              </CardDescription>
            </div>
            <div>actions</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4">
            <div>
              <KidProfileSummary id={id} />
            </div>
            <div>
              <KidActiveTasks />
            </div>
            <div>
              <KidNeedsApproval />
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
