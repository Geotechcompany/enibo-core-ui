import { FC } from "react";
import { Link } from "react-router-dom";

type urlItem = {
  name: string;
  url: string;
};
interface AdminNavigationCardProps {
  title: string;
  urlItems: urlItem[];
}

const AdminNavigationCard: FC<AdminNavigationCardProps> = ({
  title,
  urlItems,
}) => {
  return (
    <div className="flex flex-col w-full px-4 pt-2 mb-8 border border-l-4 rounded-sm shadow-md border-l-red-500">
      <div className="border-[#36459C] border-b-2 mt-2 mb-1">
        <h3 className="text-base uppercase">{title}</h3>
      </div>
      <div className="flex flex-col gap-1 mb-2">
        {urlItems.map((item, index) => (
          <>
            <Link key={index} to={item.url} className="py-1 hover:bg-gray-300">
              {item.name}
            </Link>
          </>
        ))}
      </div>
    </div>
  );
};

export default AdminNavigationCard;
