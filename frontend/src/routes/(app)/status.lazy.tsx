import { rootApi } from "@/api/rootApi";
import { AppLogo } from "@/common/layout/AppLogo";
import { HeaderContainer } from "@/common/layout/HeaderContainer";
import { PageContainer } from "@/common/layout/PageContainer";
import { Badge } from "@/common/ui/display/badge";
import { Separator } from "@/common/ui/display/separator";
import { Spinner } from "@/common/ui/feedback/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/ui/surfaces/card";
import { Header4 } from "@/common/ui/typography/typography";
import { cn } from "@/common/utils/classNames";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import {
  Activity,
  CheckCircle2,
  Database,
  Globe,
  Server,
  XCircle,
} from "lucide-react";
import { useMemo } from "react";

export const Route = createLazyFileRoute("/(app)/status")({
  component: StatusPage,
});

interface StatusItemProps {
  label: string;
  value: string | React.ReactNode;
  icon?: React.ReactNode;
  status?: "ok" | "error" | "warning" | "info";
}

function StatusItem({ label, value, icon, status }: StatusItemProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <span className="text-sm font-medium text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {status && <StatusIndicator status={status} />}
        <span className="text-sm font-semibold">{value}</span>
      </div>
    </div>
  );
}

function StatusIndicator({
  status,
}: {
  status: "ok" | "error" | "warning" | "info";
}) {
  const colors = {
    ok: "bg-success",
    error: "bg-destructive",
    warning: "bg-warning",
    info: "bg-highlight",
  };

  return (
    <span
      className={cn("h-2.5 w-2.5 rounded-full animate-pulse", colors[status])}
    />
  );
}

function ServiceCard({
  title,
  description,
  icon,
  status,
  children,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "ok" | "error" | "warning" | "info";
  children: React.ReactNode;
}) {
  const statusColors = {
    ok: "border-l-success",
    error: "border-l-destructive",
    warning: "border-l-warning",
    info: "border-l-highlight",
  };

  return (
    <Card className={cn("border-l-4", statusColors[status])}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-muted p-2">{icon}</div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          <Badge
            variant={
              status === "ok"
                ? "success"
                : status === "error"
                  ? "destructive"
                  : "warning"
            }
            className="text-xs"
          >
            {status === "ok"
              ? "Operational"
              : status === "error"
                ? "Down"
                : "Degraded"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Separator className="mb-2" />
        {children}
      </CardContent>
    </Card>
  );
}

function StatusPage() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["status"],
    queryFn: rootApi.getHealth,
  });

  const { data: rootData } = useQuery({
    queryKey: ["root"],
    queryFn: rootApi.getRoot,
  });

  const browserInfo = useMemo(() => {
    const ua = navigator.userAgent;
    const language = navigator.language;
    const cookiesEnabled = navigator.cookieEnabled;
    const onLine = navigator.onLine;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localTime = new Date().toLocaleString();

    return {
      userAgent: ua,
      language,
      cookiesEnabled,
      onLine,
      timeZone,
      localTime,
    };
  }, []);

  if (isPending || isFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="border-l-4 border-l-destructive p-6">
          <div className="flex items-center gap-3">
            <XCircle className="h-8 w-8 text-destructive" />
            <div>
              <h2 className="text-lg font-semibold">Connection Error</h2>
              <p className="text-muted-foreground">{error.message}</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const dbStatus = data?.info?.database?.status === "up" ? "ok" : "error";
  const backendStatus = data?.status === "ok" ? "ok" : "error";
  const environment = rootData?.environment || "unknown";
  const isProduction = environment === "production";

  return (
    <>
      <HeaderContainer logo={<AppLogo />} />
      <PageContainer
        title="Status Page"
        description="Show the status of the web services and API endpoints"
      >
        {/* Overall Status Banner */}
        <div
          className={cn(
            "mb-6 rounded-lg p-4 flex items-center gap-3",
            backendStatus === "ok" && dbStatus === "ok"
              ? "bg-success/30 border border-success"
              : "bg-destructive/10 border border-destructive/30",
          )}
        >
          {backendStatus === "ok" && dbStatus === "ok" ? (
            <CheckCircle2 className="h-6 w-6 text-success-foreground" />
          ) : (
            <XCircle className="h-6 w-6 text-destructive" />
          )}
          <div>
            <Header4 className="font-semibold">
              {backendStatus === "ok" && dbStatus === "ok"
                ? "All Systems Operational"
                : "Some Issues Detected"}
            </Header4>
            <p className="text-sm text-muted-foreground">
              Last checked: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Service Status Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Backend Service */}
          <ServiceCard
            title="Backend API"
            description="Core application server"
            icon={<Server className="h-5 w-5" />}
            status={backendStatus}
          >
            <StatusItem
              label="Status"
              value={backendStatus === "ok" ? "Running" : "Down"}
              status={backendStatus}
            />
            <StatusItem label="Response" value={data?.status || "N/A"} />
          </ServiceCard>

          {/* Database */}
          <ServiceCard
            title="Database"
            description="PostgreSQL connection"
            icon={<Database className="h-5 w-5" />}
            status={dbStatus}
          >
            <StatusItem
              label="Connection"
              value={dbStatus === "ok" ? "Connected" : "Disconnected"}
              status={dbStatus}
            />
            <StatusItem
              label="Details"
              value={data?.details?.database?.status || "N/A"}
            />
          </ServiceCard>

          {/* Environment */}
          <ServiceCard
            title="Environment"
            description="Deployment configuration"
            icon={<Activity className="h-5 w-5" />}
            status={isProduction ? "ok" : "info"}
          >
            <StatusItem
              label="Mode"
              value={
                <Badge variant={isProduction ? "success" : "warning"}>
                  {environment.toUpperCase()}
                </Badge>
              }
            />
            <StatusItem
              label="Timestamp"
              value={
                rootData?.timestamp
                  ? new Date(rootData.timestamp).toLocaleString()
                  : "N/A"
              }
            />
          </ServiceCard>

          {/* Browser Info */}
          <ServiceCard
            title="Browser & Session"
            description="Client environment details"
            icon={<Globe className="h-5 w-5" />}
            status={browserInfo.onLine ? "ok" : "error"}
          >
            <StatusItem
              label="Cookies"
              value={browserInfo.cookiesEnabled ? "Enabled" : "Disabled"}
              status={browserInfo.cookiesEnabled ? "ok" : "warning"}
            />
            <StatusItem label="Language" value={browserInfo.language} />
            <StatusItem label="Local Time" value={browserInfo.localTime} />
            <StatusItem label="Timezone" value={browserInfo.timeZone} />
            <span className="text-sm font-medium text-muted-foreground">
              User Agent
            </span>
            <p className="mt-1 text-xs text-muted-foreground break-all">
              {browserInfo.userAgent}
            </p>
          </ServiceCard>
        </div>
      </PageContainer>
    </>
  );
}
