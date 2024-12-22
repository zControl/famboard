import { Tile } from "@/components/composites/Tile";

const TileExample = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Tile title="Title" description="Description" footer="Footer">
        Content
      </Tile>
      <Tile
        title="Tile Component"
        description="<Tile> is used as a content container for basically any kind of content.  It can be used in a modal, on a page, or as part of another component."
      >
        <div>
          <p>MAIN CONTENT HERE</p>
          <p>
            If more control is needed, you can use a Card component instead.
          </p>
        </div>
      </Tile>
    </div>
  );
};

export { TileExample };
