import { AppHeader } from "@/components/common/AppHeader";
import { PageContainer } from "@/components/common/PageContainer";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LandingHeader } from "@/features/landing/components/LandingHeader";
import { LandingHero } from "@/features/landing/components/LandingHero";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated ? <AppHeader /> : <LandingHeader />}
      <PageContainer
        title="FamBoard"
        description="A board to track the happenings in the family!"
        keywords="app, landing, page, family, board, famboard"
      >
        <LandingHero />
      </PageContainer>
    </>
  );
}

export default App;
