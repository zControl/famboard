import { AppFooter } from "./AppFooter";
import { HeaderContainer, HeaderContainerProps } from "./HeaderContainer";

interface SidebarLayoutProps extends HeaderContainerProps {
  children: React.ReactNode;
}

export const SidebarLayout = ({ children, ...props }: SidebarLayoutProps) => {
  return (
    <div id="content-layout" className="w-full flex flex-col">
      <HeaderContainer {...props} />
      {children}
      <AppFooter />
    </div>
  );
};
