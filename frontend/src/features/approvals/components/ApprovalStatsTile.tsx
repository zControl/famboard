import { Tile } from "@/common/ui/surfaces/Tile";

export const ApprovalStatsTile = () => {
  return (
    <Tile
      title="Approval Stats"
      menu="week, month, year tabs"
      footer="links to something "
    >
      <p>
        Approval Stats Here, show stuff like who completed the most tasks, how
        many total tasks were completed, how many are pending
      </p>
    </Tile>
  );
};
