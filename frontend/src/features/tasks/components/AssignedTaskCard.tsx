import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { UserAssignedTaskResponse } from "@/types/task";
import React from "react";

interface AssignedTaskCardProps {
  task: UserAssignedTaskResponse;
  icon?: React.ReactElement;
  loading?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const AssignedTaskCard = ({
  task,
  icon,
  loading,
  children,
  footer,
}: AssignedTaskCardProps) => {
  return (
    <Card className="p-2">
      <CardHeader className="px-1 py-2">
        <div className="flex flex-row justify-between items-stretch">
          <div className="flex flex-col space-y-1 grow">
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>{task.category}</CardDescription>
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
