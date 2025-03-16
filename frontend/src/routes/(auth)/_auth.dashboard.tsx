import { PageContainer } from "@/components/common/PageContainer";
import { PageSections } from "@/components/common/PageSections";
import { ChoresTile } from "@/features/dashboard/components/ChoresTile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const sections = [
    { id: "chores1", title: "Chores1", children: <ChoresTile /> },
    { id: "chores2", title: "Chores2", children: <ChoresTile /> },
    { id: "chores3", title: "Chores3", children: <ChoresTile /> },
    { id: "chores4", title: "Chores4", children: <ChoresTile /> },
    { id: "chores5", title: "Chores5", children: <ChoresTile /> },
    { id: "chores6", title: "Chores6", children: <ChoresTile /> },
  ];

  return (
    <>
      <PageContainer
        title="Dashboard"
        description="User dashboard with widgets."
        keywords="widgets, dashboard, user, famboard"
      >
        <PageSections sections={sections} layout="grid" columns={2} />
      </PageContainer>
    </>
  );
}
