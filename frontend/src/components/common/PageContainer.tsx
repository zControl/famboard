import { cn } from "@/lib/utils";
import React from "react";
import { Helmet } from "react-helmet-async";

export interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  className?: string;
}

export const PageContainer = ({
  children,
  title,
  description,
  keywords,
  className,
}: PageContainerProps) => {
  return (
    <>
      <Helmet>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
      </Helmet>
      <main
        className={cn(
          "max-w-[1680px] w-[90%] mx-auto p-1 md:p-2 lg:p-4 flex-1 border border-teal-500",
          className,
        )}
      >
        {children}
      </main>
    </>
  );
};
