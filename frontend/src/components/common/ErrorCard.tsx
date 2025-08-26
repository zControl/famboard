import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BanIcon } from "lucide-react";

interface ErrorCardProps {
  title?: string;
  message?: string;
  error?: Error;
}

export const ErrorCard = ({ title, message, error }: ErrorCardProps) => {
  return (
    <Card className="border-2 border-dashed border-destructive">
      <CardHeader>
        <div className="flex flex-row items-center space-x-4">
          <BanIcon size={48} className="text-destructive" />
          <div className="flex flex-col space-y-1 flex-grow">
            <CardTitle className="text-destructive text-xl font-bold">
              {title ? title : "Something went wrong..."}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <p>{message}</p>
          <p>{error?.message}</p>
        </div>
      </CardContent>
    </Card>
  );
};
