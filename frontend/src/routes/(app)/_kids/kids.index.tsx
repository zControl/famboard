import { PageContainer } from "@/components/common/PageContainer";
import { ProgressStep } from "@/components/ui/progress-step";
import { Header2 } from "@/components/ui/typography";
import { useUserAssignedTasks } from "@/features/tasks/hooks/useUserAssignedTasks";
import { useProfile } from "@/features/user/hooks/useProfile";
import { useUserProfile } from "@/features/user/hooks/useUserProfile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_kids/kids/")({
  component: KidsIndexPage,
});

function KidsIndexPage() {
  const { profile } = useProfile();
  const userProfile = useUserProfile(profile?.userId || "");
  const { assignedTasks } = useUserAssignedTasks(profile?.userId || "");

  return (
    <PageContainer
      title="USER Dashboard"
      description="This is the dashbaord for a kid user!"
    >
      <section>
        <article className="flex flex-row items-center gap-4">
          <ProgressStep value={50} />
        </article>
      </section>
      <section>
        <article>
          <Header2>Todays Tasks</Header2>
          <p>Status: {userProfile.data?.status}</p>

          {assignedTasks?.map((task) => (
            <p key={task.sequenceNumber}>
              {task.sequenceNumber} - {task.title}
            </p>
          ))}
        </article>
      </section>
      <section>
        <article>
          <Header2>Weekly Tasks</Header2>
        </article>
      </section>
      <section>
        <article>
          <Header2>Completed Tasks</Header2>
        </article>
      </section>
    </PageContainer>
  );
}
