import { FC, PropsWithChildren } from "react";
import 'react-toastify/dist/ReactToastify.css';
import SiteHeader from "./site-header";

interface MainLayoutProps {
}

const MainLayout: FC<MainLayoutProps> = ({ children } : PropsWithChildren) => {
  return (
    <>
      <SiteHeader/>
      {children}
    </>
  );
};

export default MainLayout;
