import BranchSwitcher from "./branch-switcher";
import { ModeToggle } from "./mode-toggle";
import Navigation from "./navigation";
import { Search } from "./search";
import UserNav from "./user-nav";
import logo from "@/assets/enibo-white-sm.svg";

const SiteHeader = () => {
  return (
    <>
      <div className="border-b bg-[#F91B19] text-white dark:bg-[#BF0000]">
        <div className="flex items-center h-16 px-4">
          <div className="flex items-center pr-2">
            <img src={logo} alt="Enibo" className="w-auto h-8" />
          </div>
          <BranchSwitcher />
          <Navigation className="mx-6" />
          <div className="flex items-center ml-auto ">
            <Search />
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteHeader;
