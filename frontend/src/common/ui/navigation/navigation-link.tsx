import { cn } from "@/common/utils/classNames";
import { Link } from "@tanstack/react-router";
import { LucideIcon } from "lucide-react";

interface NavigationLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  active?: boolean;
}

export const NavigationLink = ({
  href,
  children,
  icon: Icon,
  active = false,
}: NavigationLinkProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center mx-0 py-1 px-3 text-lg",
        "text-foreground hover:text-highlight hover:bg-accent/50",
        active && "font-semibold border-b-3 border-highlight",
      )}
    >
      {Icon ? <Icon className="mr-2 h-4 w-4 text-muted-foreground" /> : null}
      {children}
    </Link>
  );
};
