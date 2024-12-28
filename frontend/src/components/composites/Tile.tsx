import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

interface TileProps {
  title: React.ReactNode;
  children: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
}
export const Tile = ({ title, description, children, footer }: TileProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  );
};
