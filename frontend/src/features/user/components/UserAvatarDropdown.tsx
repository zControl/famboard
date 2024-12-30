import { ThemeToggle } from "@/components/common/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserAvatar } from "@/features/user/components/UserAvatar";
import { useProfile } from "@/features/user/hooks/useProfile";
import { useNavigate } from "@tanstack/react-router";
import { LayoutDashboardIcon, UserPenIcon } from "lucide-react";

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

export const UserAvatarDropdown = () => {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const { user } = useAuth();
  return (
    <Sheet>
      <SheetTrigger>
        <UserAvatar />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="flex justify-start items-center mr-6 gap-2">
              <UserAvatar />
              <div className="flex flex-col w-full text-left border border-muted rounded-lg p-2">
                <div className="text-md font-semibold">{profile?.username}</div>
                <div className="text-sm font-normal">{user?.group}</div>
              </div>
            </div>
          </SheetTitle>
          <SheetTitle>
            <div>Status shows up here.</div>
            <Input
              type="text"
              placeholder="Change status"
              className="w-full my-2"
            />
          </SheetTitle>
          <SheetDescription className="sr-only">
            User Dropdown Menu
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        <div className="flex justify-between items-center">
          <span>Light / Dark Mode: </span>
          <ThemeToggle />
        </div>
        <Separator className="my-4" />
        {navItems.map((item) => (
          <SheetClose asChild key={item.href}>
            <Button
              size="lg"
              className="px-2 w-full flex items-center justify-start text-md text-muted-foreground"
              variant={"ghost"}
              onClick={() => {
                const [path, hash] = item.href.split("#");
                navigate({ to: path, hash: hash || undefined });
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </Button>
          </SheetClose>
        ))}
        <Separator className="my-4" />
        <SheetFooter>
          <LogoutButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
