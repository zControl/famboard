import { ThemeSwitch } from "@/common/theme/ThemeSwitch";
import { Button } from "@/common/ui/actions/button";
import { Separator } from "@/common/ui/display/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/common/ui/overlay/sheet";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserAvatar } from "@/features/user/components/UserAvatar";
import { UserSheetStatus } from "@/features/user/components/UserSheetStatus";
import { useProfile } from "@/features/user/hooks/useProfile";
import { useNavigate } from "@tanstack/react-router";
import { LayoutDashboardIcon, User2Icon, UserPenIcon } from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboardIcon />,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: <UserPenIcon />,
  },
];

export const ManageUserSheet = () => {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const { user } = useAuth();

  return (
    <Sheet>
      <SheetTrigger>
        {profile ? <UserAvatar url={profile?.avatarUrl} /> : <User2Icon />}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="flex justify-start items-center mr-6 gap-2">
              {profile ? (
                <UserAvatar url={profile?.avatarUrl} />
              ) : (
                <User2Icon />
              )}
              <div className="flex flex-col w-full text-left border border-muted rounded-lg p-4">
                <div className="text-md font-semibold">{profile?.username}</div>
                <div className="text-sm font-normal">
                  {user?.group.toUpperCase()}
                </div>
              </div>
            </div>
          </SheetTitle>
          <UserSheetStatus />
          <ThemeSwitch />
          <SheetDescription className="sr-only">
            User Dropdown Menu
          </SheetDescription>
        </SheetHeader>
        <Separator />

        {navItems.map((item) => (
          <Button
            key={item.href}
            size="lg"
            className="px-6 w-full flex items-center justify-start text-xl text-muted-foreground rounded-none"
            variant={"ghost"}
            onClick={() => {
              const [path, hash] = item.href.split("#");
              navigate({ to: path, hash: hash || undefined });
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </Button>
        ))}
        <Separator className="my-2" />
        <div className="px-6">
          <LogoutButton />
        </div>
        <SheetClose />
      </SheetContent>
    </Sheet>
  );
};
