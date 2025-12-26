import { Skeleton } from "@/common/ui/feedback/skeleton";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/ui/surfaces/card";
import { cn } from "@/common/utils/classNames";
import React from "react";

interface DataCardProps {
  label?: React.ReactNode;
  data?: React.ReactNode;
  badge?: React.ReactNode;
  message?: React.ReactNode;
  loading?: boolean;
  className?: string;
}

export const DataCard = ({
  label,
  data,
  badge,
  message,
  loading = false,
  className,
}: DataCardProps) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardDescription>
          {loading ? <Skeleton className="h-4 w-24" /> : label}
        </CardDescription>
        <CardTitle className="text-3xl font-bold tabular-nums">
          {loading ? <Skeleton className="h-9 w-16" /> : data}
        </CardTitle>
        <CardAction>
          {loading ? <Skeleton className="size-16 rounded-full" /> : badge}
        </CardAction>
      </CardHeader>
      {(message || loading) && (
        <CardContent className="text-sm text-muted-foreground">
          {loading ? <Skeleton className="h-4 w-32" /> : message}
        </CardContent>
      )}
    </Card>
  );
};
