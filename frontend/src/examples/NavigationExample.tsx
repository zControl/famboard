import { PageSections } from "@/components/common/PageSections";

function SidebarTile() {
  return <div>sidebar tile</div>;
}

function BreadcrumbTile() {
  return <div>breadcrum tile</div>;
}

function MenubarTile() {
  return <div>header navigation tile</div>;
}

function ContextMenuTile() {
  return <div>menubar tile</div>;
}

function TabContentTile() {
  return <div>tab content tile</div>;
}

const sections = [
  { id: "sidebar", title: "Sidebar", children: <SidebarTile /> },
  { id: "breadcrumb", title: "Breadcrumb", children: <BreadcrumbTile /> },
  { id: "menubar", title: "Menubar", children: <MenubarTile /> },
  { id: "context-menu", title: "Context Menu", children: <ContextMenuTile /> },
  { id: "tab-content", title: "Tab Content", children: <TabContentTile /> },
];
export const NavigationExample = () => {
  return <PageSections sections={sections} />;
};
