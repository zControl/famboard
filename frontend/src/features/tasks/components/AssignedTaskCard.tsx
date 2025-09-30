import { Badge } from "@/components/ui/badge";
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
  footer?: React.ReactNode;
}

export const AssignedTaskCard = ({
  task,
  icon,
  loading,
  footer,
}: AssignedTaskCardProps) => {
  return (
    <Card className="p-2 gap-0 h-full">
      <CardHeader className="px-1">
        <div className="flex flex-col lg:flex-row justify-between gap-1">
          <div className="flex flex-col space-y-1 grow">
            <CardTitle className="p-0">{task.title}</CardTitle>
            <CardDescription>
              <Badge variant="secondary">{task.category}</Badge>
            </CardDescription>
          </div>
          {icon && (
            <div>
              {React.cloneElement(icon, {
                className: "w-12 h-12 text-highlight",
              })}
            </div>
          )}
        </div>
      </CardHeader>
      {loading ? (
        <Spinner size="lg" />
      ) : (
        <CardContent className="flex flex-col p-0">
          <CardDescription className="overflow-x-auto max-h-20 overflow-y-auto">
            {task.description}
          </CardDescription>
        </CardContent>
      )}
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};
