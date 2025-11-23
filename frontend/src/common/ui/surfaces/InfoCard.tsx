import { Spinner } from "@/common/ui/feedback/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/common/ui/surfaces/card";
import React from "react";

interface InfoCardProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactElement;
  footer?: React.ReactNode;
  loading?: boolean;
}

export const InfoCard = ({
  title,
  description,
  icon,
  children,
  footer,
  loading,
}: InfoCardProps) => {
  return (
    <Card className="p-2">
      <CardHeader className="px-1 py-2">
        <div className="flex flex-row justify-between items-stretch">
          <div className="flex flex-col space-y-1 grow">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {icon && (
            <div className="flex items-center justify-center">
              {React.cloneElement(icon, {
                className: "w-12 h-12 text-highlight",
              })}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>{loading ? <Spinner size="lg" /> : children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};
