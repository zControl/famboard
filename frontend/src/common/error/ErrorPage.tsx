import { PageContainer } from "@/common/layout/PageContainer";
import { ReactNode } from "react";

export const ErrorPage = ({ children }: { children: ReactNode }) => {
  return (
    <PageContainer title="Oops!" description="Something went wrong, try again">
      {children}
    </PageContainer>
  );
};
