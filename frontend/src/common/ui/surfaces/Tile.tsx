import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/common/ui/surfaces/card";
import { Header3 } from "@/common/ui/typography/typography";
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
