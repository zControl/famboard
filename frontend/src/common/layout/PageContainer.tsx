import { cn } from "@/common/utils/classNames";
import React from "react";

export interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  className?: string;
}

export const PageContainer = ({
  children,
  className,
  title,
  description,
  keywords,
}: PageContainerProps) => {
  return (
    <>
      <main
        className={cn(
          "max-w-[1680px] w-[90%] mx-auto p-1 md:p-2 lg:p-4 flex-1",
          className,
        )}
      >
        <title>{title ? `${title}` : "FamBoard"}</title>
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
        {children}
      </main>
    </>
  );
};
