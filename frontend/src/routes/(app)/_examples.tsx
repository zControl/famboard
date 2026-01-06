import { NotFoundPage } from "@/common/error/NotFoundPage";
import { AppLogo } from "@/common/layout/AppLogo";
import { SidebarLayout } from "@/common/layout/SidebarLayout";
import { ThemeToggle } from "@/common/theme/ThemeToggle";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
import {
  CompassIcon,
  ComponentIcon,
  DatabaseZapIcon,
  IceCream2Icon,
  ImageIcon,
  LandPlotIcon,
  MonitorCheckIcon,
  PaletteIcon,
  PictureInPicture2Icon,
  SquarePilcrowIcon,
  TextCursorInputIcon,
  ViewIcon,
  WandSparklesIcon,
} from "lucide-react";

export const Route = createFileRoute("/(app)/_examples")({
  component: ExamplesLayout,
  notFoundComponent: NotFoundPage,
});

const basics = [
  {
    title: "Overview",
    url: "/ui",
    icon: ComponentIcon,
  },
  {
    title: "Colors",
    url: "/ui/colors",
    icon: PaletteIcon,
  },
  {
    title: "Actions",
    url: "/ui/actions",
    icon: WandSparklesIcon,
  },
  {
    title: "Data",
    url: "/ui/data",
    icon: DatabaseZapIcon,
  },
  {
    title: "Display",
    url: "/ui/display",
    icon: ViewIcon,
  },
  {
    title: "Feedback",
    url: "/ui/feedback",
    icon: MonitorCheckIcon,
  },
  {
    title: "Fields",
    url: "/ui/fields",
    icon: TextCursorInputIcon,
  },
  {
    title: "Media",
    url: "/ui/media",
    icon: ImageIcon,
  },
  {
    title: "Navigation",
    url: "/ui/navigation",
    icon: CompassIcon,
  },
  {
    title: "Overlay",
    url: "/ui/overlay",
    icon: PictureInPicture2Icon,
  },
  {
    title: "Surfaces",
    url: "/ui/surfaces",
    icon: LandPlotIcon,
  },
  {
    title: "Typography",
    url: "/ui/typography",
    icon: SquarePilcrowIcon,
  },
];

function ExamplesSidebar() {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>UI PRIMITAVES</SidebarGroupLabel>
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
        <SidebarGroup>
          <SidebarGroupLabel>COMING SOON</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="More examples coming soon!" asChild>
                  <div className="flex items-center gap-2 p-2 opacity-50 cursor-not-allowed">
                    <IceCream2Icon />
                    <span>And more...</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
