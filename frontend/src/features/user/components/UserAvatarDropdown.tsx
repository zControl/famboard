import { Button } from "@/components/ui/button";
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
import { UserAvatar } from "@/features/user/components/UserAvatar";
import { useProfile } from "@/features/user/hooks/useProfile";
import { useNavigate } from "@tanstack/react-router";
import { IceCream2Icon } from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <IceCream2Icon />,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: <IceCream2Icon />,
  },
];

export const UserAvatarDropdown = () => {
  const navigate = useNavigate();
  const { profile } = useProfile();
  return (
    <Sheet>
      <SheetTrigger>
        <UserAvatar />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center space-x-4 ">
              <UserAvatar />
              <div className="flex flex-col">
                <div>{profile?.username}</div>
                <div>{profile?.group}</div>
              </div>
            </div>
          </SheetTitle>
          <SheetDescription>
            <span>Status (TODO)</span>
          </SheetDescription>
        </SheetHeader>
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
        OTHER THINGS
        <Separator className="my-4" />
        OTHER THINGS
        <Separator className="my-4" />
        OTHER THINGS
        <Separator className="my-4" />
        <SheetFooter>
          <LogoutButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
