import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header3 } from "@/components/ui/typography";
import React from "react";

interface TileProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  menu?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
}
export const Tile = ({
  title,
  menu,
  description,
  children,
  footer,
}: TileProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            <Header3>{title}</Header3>
            <div>{menu}</div>
          </div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  );
};
