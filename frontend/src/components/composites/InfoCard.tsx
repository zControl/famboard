import { Spinner } from "@/components/ui/spinner";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

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
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between items-stretch">
          <div className="flex flex-col space-y-1 flex-grow">
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
