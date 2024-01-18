import { cn } from "@/lib/utils";
import { FC } from "react";
import { Link } from "react-router-dom";

const Navigation: FC<React.HTMLAttributes<HTMLElement>> = ({
  className,
  ...props
}) => {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link to="/dashboard" className="text-base font-medium text-white transition-colors hover:text-red-200">
        Dashboard
      </Link>
      <Link to="/customers" className="text-base font-medium text-white transition-colors text-muted-foreground hover:text-red-200">
        Customers
      </Link>
      <Link to="/administration" className="text-base font-medium text-white transition-colors text-muted-foreground hover:text-red-200">
        Administration
      </Link>
      <Link to="/administration" className="text-base font-medium text-white transition-colors text-muted-foreground hover:text-red-200">
        Reporting
      </Link>
    </nav>
  );
};

export default Navigation;
