import { PageContainer } from "@/components/common/PageContainer";
import { PageSections } from "@/components/common/PageSections";
import { UserAvatarCard } from "@/features/user/components/UserAvatarCard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const sections = [
    { id: "settings", title: "Settings", children: <>Settings</> },
    { id: "projects", title: "Projects", children: <>Projects</> },
    { id: "avatar", title: "Avatar", children: <UserAvatarCard /> },
    { id: "earnings", title: "Earnings", children: <>Earnings</> },
  ];
  return (
    <PageContainer title="Profile" description="Profile page">
      <PageSections sections={sections} />
    </PageContainer>
  );
}
