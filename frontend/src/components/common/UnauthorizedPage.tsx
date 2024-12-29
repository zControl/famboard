import { useNavigate } from "@tanstack/react-router";
import { XCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PageContainer } from "./PageContainer";

export const UnauthorizedPage = () => {
  const navigate = useNavigate();
  return (
    <PageContainer title="Unauthorized" description="Unauthorized">
      <div className="flex items-center justify-center flex-1">
        <Card>
          <CardHeader className="bg-destructive text-destructive-foreground text-center py-4">
            <CardTitle className="text-4xl font-semibold">Nope!</CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-center">
            <div>
              <XCircleIcon
                size={140}
                className="text-destructive mx-auto my-4"
              />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Unauthorized</h2>
            <p className="text-card-foreground mb-6">
              You are not allowed to view this page.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={() => window.history.back()}>
                Go Back
              </Button>
              <Button variant="outline" onClick={() => navigate({ to: "/" })}>
                Go Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};
