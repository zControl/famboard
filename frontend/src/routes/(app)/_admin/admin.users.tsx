import { PageContainer } from "@/components/common/PageContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_admin/admin/users")({
  component: AdminUsersPage,
});

function AdminUsersPage() {
  return (
    <PageContainer title="Parents | Tasks" description="Manage each kid here.">
      <section className="grid grid-cols-1 md:grid-cols-2 place-items-center border border-blue-500">
        <div>List All Users</div>
        <div>Parent Users</div>
        <div>Kid Users</div>
        <div>Kid Users</div>
      </section>
    </PageContainer>
  );
}
