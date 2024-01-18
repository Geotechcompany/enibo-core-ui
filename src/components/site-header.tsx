import BranchSwitcher from "./branch-switcher";
import { ModeToggle } from "./mode-toggle";
import Navigation from "./navigation";
import { Input } from "./ui/input";
import UserNav from "./user-nav";
import logo from "@/assets/enibo-white-sm.svg";

const SiteHeader = () => {
  return (
    <>
      <div className="border-b bg-[#EB001B] text-white">
        <div className="flex items-center h-16 px-4">
          <div className="flex items-center pr-2">
            <img src={logo} alt="Enibo" className="w-auto h-8" />
          </div>
          <BranchSwitcher />
          <Navigation className="mx-6" />
          <div className="flex items-center ml-auto space-x-4">
            <div>
              <Input
                type="search"
                placeholder="Search..."
                className="md:w-[100px] lg:w-[300px] bg-red-500 text-white"
              />
            </div>
            <div>
              <ModeToggle />
            </div>
            <UserNav />
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteHeader;
