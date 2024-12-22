import { AppLogo } from "@/components/common/AppLogo";
import { NotFound } from "@/components/common/NotFound";
import { SidebarLayout } from "@/components/common/SidebarLayout";
import { CustomLink } from "@/components/ui/custom-link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import {
  AppWindowIcon,
  BookTextIcon,
  BoxIcon,
  ComponentIcon,
  DatabaseIcon,
  HomeIcon,
  LetterTextIcon,
  LoaderPinwheelIcon,
  PaletteIcon,
  ShipWheelIcon,
  Table2Icon,
} from "lucide-react";

export const Route = createFileRoute("/(app)/_examples")({
  component: ExamplesLayout,
  notFoundComponent: NotFound,
});

const basics = [
  {
    title: "Overview",
    url: "/demo",
    icon: HomeIcon,
  },
  {
    title: "Basic",
    url: "/demo/basic",
    icon: ComponentIcon,
  },
  {
    title: "Colors",
    url: "/demo/colors",
    icon: PaletteIcon,
  },
  {
    title: "Typography",
    url: "/demo/typography",
    icon: LetterTextIcon,
  },
  {
    title: "Containers",
    url: "/demo/containers",
    icon: BoxIcon,
  },
  {
    title: "Loaders",
    url: "/demo/loaders",
    icon: LoaderPinwheelIcon,
  },
  {
    title: "Navigation",
    url: "/demo/navigation",
    icon: ShipWheelIcon,
  },
  {
    title: "Dialogs",
    url: "/demo/dialogs",
    icon: AppWindowIcon,
  },
  {
    title: "Forms",
    url: "/demo/forms",
    icon: BookTextIcon,
  },
  {
    title: "Tables",
    url: "/demo/tables",
    icon: Table2Icon,
  },
  {
    title: "Database",
    url: "/demo/database",
    icon: DatabaseIcon,
  },
];

function ExamplesSidebar() {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {basics.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url}>
                      {<item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
function ExamplesLayout() {
  return (
    <SidebarProvider>
      <ExamplesSidebar />
      <SidebarLayout
        logo={
          <>
            <AppLogo />
          </>
        }
        mobileMenu={<div className="text-primary-foreground">Menu</div>}
        navigation={
          <div className="flex space-x-4">
            <CustomLink to="/demo" size="lg">
              Examples
            </CustomLink>
            <CustomLink to="/query" size="lg">
              Query
            </CustomLink>
            <CustomLink to="/form" size="lg">
              Form
            </CustomLink>
          </div>
        }
        actions={<div>Actions</div>}
      >
        <Outlet />
      </SidebarLayout>
    </SidebarProvider>
  );
}
