import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface KidSummaryTileProps {
  id: string;
}

const KidProfileSummary = () => {
  return (
    <div className="mx-auto flex flex-col items-center">
      <div>profile</div>
      <div>name</div>
      <div>badges</div>
    </div>
  );
};

const KidActiveTasks = () => {
  return (
    <Card>
      <CardContent>
        <div>active tasks table</div>
      </CardContent>
    </Card>
  );
};

const KidNeedsApproval = () => {
  return (
    <Card>
      <CardContent>
        <div>needs approval table</div>
      </CardContent>
    </Card>
  );
};

export const KidSummaryTile = ({ id }: KidSummaryTileProps) => {
  return (
    <>
      <div>Kid Summary for id: {id}</div>
      <Card>
        <CardHeader>
          <div className="flex flex-row justify-between items-center">
            <div>
              <CardTitle>Title</CardTitle>
              <CardDescription>Description</CardDescription>
            </div>
            <div>actions</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4">
            <div>
              <KidProfileSummary />
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
          <div className="w-full mx-auto text-center">
            Some summary info or more action buttons?
          </div>
        </CardFooter>
      </Card>
    </>
  );
};
