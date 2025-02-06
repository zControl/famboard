import { PageContainer } from "@/components/common/PageContainer";
import { Coin } from "@/components/ui/coin";
import { ProgressStep } from "@/components/ui/progress-step";
import { Header2 } from "@/components/ui/typography";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_kids/kids/")({
  component: KidsIndexPage,
});

function KidsIndexPage() {
  return (
    <PageContainer
      title="USER Dashboard"
      description="This is the dashbaord for a kid user!"
    >
      <section>
        <article className="flex flex-row items-center gap-4">
          <ProgressStep value={50} />
          <Coin value={100} />
        </article>
      </section>
      <section>
        <article>
          <Header2>Todays Tasks</Header2>
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
