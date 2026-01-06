import { useApiStatus } from "@/api/useApiStatus";
import { Button } from "@/common/ui/actions/button";
import { Spinner } from "@/common/ui/feedback/spinner";
import { DisplayModal } from "@/common/ui/overlay/DisplayModal";
import { ScrollArea } from "@/common/ui/surfaces/scroll-area";
import { Header4 } from "@/common/ui/typography/typography";
import {
  AlertCircleIcon,
  DatabaseIcon,
  WebhookIcon,
  XCircleIcon,
} from "lucide-react";

const ApiRoot = () => {
  const { apiRoot } = useApiStatus();
  if (apiRoot.isFetching) return <Spinner size="sm" color="highlight" />;
  if (apiRoot.isError)
    return (
      <div>
        <AlertCircleIcon color="red" />
      </div>
    );

  return (
    <>
      <DisplayModal
        trigger={<Button>Hit ROOT endpoint</Button>}
        title="BLAM!"
        description="You just hit the root endpoint of the API."
      >
        <Header4>Response:</Header4>
        <ScrollArea className="max-h-[300px] w-full">
          <pre className="whitespace-pre-wrap break-words">
            {JSON.stringify(apiRoot.data, null, 2)}
          </pre>
        </ScrollArea>
      </DisplayModal>
    </>
  );
};

const ApiHealth = () => {
  const { apiHealth } = useApiStatus();
  if (apiHealth.isFetching) return <Spinner size="sm" color="highlight" />;
  if (apiHealth.isError)
    return (
      <div>
        <XCircleIcon />
      </div>
    );

  const apiStatusColor = apiHealth.data?.status === "ok" ? "green" : "red";
  const dbStatusColor =
    apiHealth.data?.details.database.status === "up" ? "green" : "red";

  return (
    <div className="flex flex-row space-x-4">
      <DisplayModal
        trigger={
          <WebhookIcon color={apiStatusColor} className="cursor-pointer" />
        }
        title="API Health Details"
        description="Detailed information about the API health."
      >
        {apiHealth.data?.status === "ok" && (
          <ScrollArea className="max-h-[300px] w-full">
            <div>Be cool, the API status is ok!</div>
          </ScrollArea>
        )}
      </DisplayModal>
      <DisplayModal
        trigger={
          <DatabaseIcon color={dbStatusColor} className="cursor-pointer" />
        }
        title="Database Health Details"
        description="Detailed information about the Database health."
      >
        <ScrollArea className="max-h-[300px] w-full">
          <pre className="whitespace-pre-wrap break-words">
            {JSON.stringify(apiHealth.data?.details.database, null, 2)}
          </pre>
        </ScrollArea>
      </DisplayModal>
    </div>
  );
};

const AppVersion = () => {
  const { apiVersion } = useApiStatus();
  if (apiVersion.isFetching) return <Spinner size="sm" color="highlight" />;
  if (apiVersion.isError)
    return (
      <div>
        <XCircleIcon />
      </div>
    );

  return (
    <div className="grid grid-rows-2 gap-2 px-2 font-mono font-bold text-xs leading-tight">
      <div>API: {apiVersion.data?.version}</div>
      <div>UI: {import.meta.env.VITE_UI_VERSION || "0.d.e.v"}</div>
    </div>
  );
};

export const StatusBar = () => {
  return (
    <div className="w-full p-2 mb-2 flex flex-row items-center space-x-4 justify-between border-2 border-highlight">
      <ApiRoot />
      <div className="flex flex-row space-x-4 items-center">
        <ApiHealth />
        <AppVersion />
      </div>
    </div>
  );
};
