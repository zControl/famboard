import { Skeleton } from "@/components/ui/skeleton";

interface LoadingProps {
  count?: number;
  className?: string;
}
export const LoadingRows = ({ count = 5, className }: LoadingProps) => {
  return (
    <div className="space-y-2 max-w-2xl mx-auto">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className={`h-4 w-full ${className}`} />
      ))}
    </div>
  );
};

export const LoadingBox = ({ count = 1, className }: LoadingProps) => {
  return (
    <div className="space-y-2 max-w-2xl h-80 mx-auto">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className={`h-full w-full ${className}`} />
      ))}
    </div>
  );
};
