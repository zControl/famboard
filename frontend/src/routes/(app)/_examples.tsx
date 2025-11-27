import { AppLogo } from "@/common/layout/AppLogo";
import { NotFound } from "@/common/layout/NotFound";
import { SidebarLayout } from "@/common/layout/SidebarLayout";
import { ThemeToggle } from "@/common/theme/ThemeToggle";
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
} from "@/common/ui/surfaces/sidebar";
import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { DatabaseBackupIcon, HomeIcon, MagnetIcon } from "lucide-react";

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
    title: "Actions",
    url: "/examples/actions",
    icon: MagnetIcon,
  },
  {
    title: "Data",
    url: "/examples/data",
    icon: DatabaseBackupIcon,
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
                    tooltip={item.title}
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
          <div className="flex gap-1 items-center">
            <ThemeToggle />
            <AppLogo />
          </div>
        }
        mobileMenu={<div className="text-primary-foreground">Menu</div>}
      >
        <Outlet />
      </SidebarLayout>
    </SidebarProvider>
  );
}
