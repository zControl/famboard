import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface InfoCardProps {
    children: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    footer?: React.ReactNode;
}

export const InfoCard = ({title, description, icon, children}:InfoCardProps) => {
    return(
        <Card>
            <CardHeader>
                <div className="flex flex-row space-y-2 justify-between">
                    <div className="flex flex-col space-y-1 flex-grow">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
                    </div>
                    <div>{icon}</div>
                </div>
            </CardHeader>
            <CardContent>
                        {children}
            </CardContent>
        </Card>
    )
}