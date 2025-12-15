import { NAV_ITEMS_BY_GROUP } from "@/common/layout/headerNavigation";
import { Button } from "@/common/ui/actions/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/common/ui/overlay/sheet";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ManageUserSheet } from "@/features/user/components/ManageUserSheet";
import { Link } from "@tanstack/react-router";
import { MenuIcon } from "lucide-react";

export const MobileMenu = () => {
  const { user } = useAuth();

  const items = user?.group ? NAV_ITEMS_BY_GROUP[user.group] : [];

  return (
    <div className="flex gap-1 items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="top" className="p-0 gap-0">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="grid grid-cols-2 gap-2 px-2 pb-4">
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <SheetClose asChild key={item.href}>
                  <Link
                    to={item.href}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-lg"
                  >
                    {Icon ? (
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    ) : null}
                    <span>{item.label}</span>
                  </Link>
                </SheetClose>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
      <ManageUserSheet />
    </div>
  );
};
