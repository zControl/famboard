import { apiStatus } from "@/api/apiStatus";
import { useEffect, useState } from "react";

export const StatusBar = () => {
  const [apiVersion, setApiVersion] = useState<string | null>(null);

  useEffect(() => {
    apiStatus.getVersion().then((data) => {
      setApiVersion(data.version);
    });
  }, []);

  return (
    <div className="w-full flex flex-col space-y-4">
      <div>API:</div>
      <div>DB:</div>
      <div>Version: {apiVersion}</div>
    </div>
  );
}