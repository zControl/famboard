import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const ButtonLink = ({ href, children, icon }: ButtonLinkProps) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="link"
      className="flex items-center mx-0 p-2 text-lg"
      onClick={() => navigate({ to: href })}
    >
      {icon}
      {children}
    </Button>
  );
};
