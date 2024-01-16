import { FC, PropsWithChildren } from "react";
import 'react-toastify/dist/ReactToastify.css';

interface MainLayoutProps {
}

const MainLayout: FC<MainLayoutProps> = ({ children } : PropsWithChildren) => {
  return (
    <>
      {children}
    </>
  );
};

export default MainLayout;
