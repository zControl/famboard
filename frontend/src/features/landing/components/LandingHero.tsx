import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Header1,
  Header2,
  Header3,
  Paragraph,
} from "@/components/ui/typography";
import { Link } from "@tanstack/react-router";

const LandingCard = ({
  header,
  content,
}: {
  header: React.ReactNode;
  content: React.ReactNode;
}) => {
  return (
    <Card>
      <CardHeader>
        <Header3 className="text-center">{header}</Header3>
      </CardHeader>
      <CardContent>
        <Paragraph className="text-secondary/60">{content}</Paragraph>
      </CardContent>
    </Card>
  );
};

export const LandingHero = () => {
  return (
    <>
      <section className="container w-full mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
          <Header1 className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            FamBoard: Turning tasks into treasure!
          </Header1>
          <Paragraph className="text-blue-500">
            FamBoard is a fun and interactive app that helps kids manage their
            chores while earning points that can be redeemed for rewards.
          </Paragraph>
          <div className="my-8 flex flex-row justify-center items-center space-x-8">
            <Button variant={"primary"} size={"huge"}>
              Explore the Features
            </Button>
            <Button variant={"outline"} size={"huge"}>
              See what other are saying
            </Button>
          </div>
        </div>
        <div className="md:w-1/2">
          <img
            src="avatars/avatar-1.jpg"
            alt="Hero image"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </section>
      <section className="bg-background py-16">
        <div className="mb-8 w-1/3">
          <Header2 className="text-3xl">Be a super hero!</Header2>
          <Paragraph>
            Explore the great features and see how fun it can be to manage daily
            and weekly chores!
          </Paragraph>
        </div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <LandingCard
              header="Chores Tracker"
              content="Take care of your responsibilities with ease!"
            />
            <LandingCard
              header="Stay Fit"
              content="Stay fit and active to get bonus points!"
            />
            <LandingCard
              header="Earn Rewards"
              content="Each day, you can earn points towards a weekly payout!"
            />
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto flex flex-col items-center gap-6">
          <Header2>Ready to get started?</Header2>
          <Link
            to="/login"
            className="bg-highlight text-highlight-foreground py-3 px-6 rounded-lg inline-block transition duration-300"
          >
            Login
          </Link>
        </div>
      </section>
    </>
  );
};
