import { PageContainer } from "@/common/layout/PageContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_admin/admin/users")({
  component: AdminUsersPage,
});

function AdminUsersPage() {
  return (
    <PageContainer
      title="Admin | Users"
      description="User administration page."
    >
      <section className="grid grid-cols-1 md:grid-cols-2 place-items-center">
        <div>Kid Users Tile</div>
        <div>Parent Users Tile</div>
      </section>
    </PageContainer>
  );
}
