import { PageContainer } from "@/components/common/PageContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_parents/parents/")({
  component: ParentsIndexPage,
});

function ParentsIndexPage() {
  return (
    <PageContainer title="Parents" description="Parents page">
      <div className="w-full">Here is a summary of whats going on.</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-blue-500">
        <div className="max-w-md border border-red-500">Some tile</div>
        <div className="max-w-md border border-red-500">Some tile</div>
        <div className="max-w-md border border-red-500">Some tile</div>
        <div className="max-w-md border border-red-500">Some tile</div>
        <div className="max-w-md border border-red-500">Some tile</div>
        <div className="max-w-md border border-red-500">Some tile</div>
        <div className="max-w-md border border-red-500">Some tile</div>
        <div className="max-w-md border border-red-500">Some tile</div>
      </div>
    </PageContainer>
  );
}
