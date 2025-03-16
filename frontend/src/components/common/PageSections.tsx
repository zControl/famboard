import { PageSectionNav, type PageSection } from "./PageSectionNav";

interface PageSectionsProps {
  sections: PageSection[];
  layout?: "flex" | "grid";
  columns?: number;
}
export const PageSections = ({
  sections,
  layout = "flex",
  columns,
}: PageSectionsProps) => {
  const layoutClass =
    layout === "flex"
      ? "flex flex-col gap-4"
      : `grid grid-cols-1 md:grid-cols-${columns} gap-4`;
  return (
    <div className="flex justify-between max-w-[100rem] mx-auto">
      <div className="flex-grow">
        <div className={layoutClass}>
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              {section.children}
            </section>
          ))}
        </div>
      </div>
      <div className="hidden lg:block">
        <div className="sticky top-4 max-w-56 min-w-32">
          <PageSectionNav sections={sections} />
        </div>
      </div>
    </div>
  );
};
