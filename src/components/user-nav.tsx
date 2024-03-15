import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { FC } from "react";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu";
// import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface UserNavProps {}

const UserNav: FC<UserNavProps> = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <div>
            <p className="text-base font-medium leading-none uppercase">{user && user.username}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
      <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user && user.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user && user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/"> Log Out</Link>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
