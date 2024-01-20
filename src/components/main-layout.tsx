import { FC, PropsWithChildren } from "react";
import "react-toastify/dist/ReactToastify.css";
import SiteHeader from "./site-header";
import { Toaster } from "./ui/toaster";

interface MainLayoutProps {}

const MainLayout: FC<MainLayoutProps> = ({ children }: PropsWithChildren) => {
  return (
    <>
      <SiteHeader />
      {children}
      <Toaster />
    </>
  );
};

export default MainLayout;
