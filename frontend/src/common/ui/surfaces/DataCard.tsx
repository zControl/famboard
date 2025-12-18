import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/ui/surfaces/card";
import React from "react";

interface DataCardProps {
  children?: React.ReactNode;
  label?: React.ReactNode;
  data?: React.ReactNode;
  badge?: React.ReactElement;
  message?: React.ReactNode;
}

export const DataCard = ({ label, data, badge, message }: DataCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-3xl font-bold tabular-nums">
          {data}
        </CardTitle>
        <CardAction>{badge}</CardAction>
      </CardHeader>
      {message && (
        <CardContent className="text-sm text-muted-foreground">
          {message}
        </CardContent>
      )}
    </Card>
  );
};
