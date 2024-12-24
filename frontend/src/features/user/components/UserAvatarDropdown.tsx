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
import { UserAvatar } from "@/features/user/components/UserAvatar";
import { useNavigate } from "@tanstack/react-router";
import { IceCream2Icon } from "lucide-react";

export const UserAvatarDropdown = () => {
  const navigate = useNavigate();
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
                <div>Name</div>
                <div>Username</div>
              </div>
            </div>
          </SheetTitle>
          <SheetDescription>
            <div className="py-2">
              <span>Status</span>
            </div>
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        <SheetClose asChild>
          <Button
            size="lg"
            className="px-2 w-full flex items-center justify-start text-md text-muted-foreground"
            variant={"ghost"}
            onClick={() => navigate({ to: "/profile" })}
          >
            <IceCream2Icon />
            <span>Your profile</span>
          </Button>
        </SheetClose>
        <Separator className="my-4" />
        <SheetFooter>
          <SheetClose>Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
