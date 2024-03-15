import { DataTable } from "@/components/dataTable/data-table";
import { Button } from "@/components/ui/button";
import { FC, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { columns } from "@/components/user-profiles/columns";
import { queryUserProfiles } from "@/types/queries";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_USER_PROFILE } from "@/types/mutations";
import { Row } from "@tanstack/react-table";
import { toast } from "@/components/ui/use-toast";
import DeleteWarning from "@/components/deleteWarning";

export type UserProfile = {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  modifiedBy: string;
  modifiedOn: string;
};

interface UsersProps {}

const UserProfile: FC<UsersProps> = () => {
  const [userProfiles, setUserProfiles] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {
    data,
    loading: queryLoading,
    error: queryError,
    refetch,
  } = useQuery(queryUserProfiles);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || {
    pathname: "/administration/user-management/profile-list/profile-form",
  };

  const [deleteUserProfile] = useMutation(DELETE_USER_PROFILE);
  const deleteRows = async (selectedRows: Row<UserProfile>[]) => {
    const deletePromises = selectedRows.map((row) => {
      return deleteUserProfile({
        variables: { deleteProfileId: row.original.id },
      });
    });

    const results = await Promise.all(deletePromises);

    if (results) {
      toast({
        title: "Profile Deleted",
        description: `"The selected user profiles(${selectedRows.length}) have been successfully deleted."`,
      });
      window.location.reload();
    }
  };
  const handleDelete = async (selectedRows: Row<UserProfile>[]) => {
    try {
      toast({
        title: "Are you sure? The operation is irreversible",
        description: (
          <DeleteWarning handleDeletion={() => deleteRows(selectedRows)} />
        ),
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error during deletion",
      });
    }
  };

  const handleCopy = (selectedRows: Row<UserProfile>[]) => {
    localStorage.setItem("profile", JSON.stringify(selectedRows[0].original));
    navigate(from, { replace: true });
  };
  const handleEdit = (selectedRows: Row<UserProfile>[]) => {
    navigate(`/administration/user-management/profile-list/${selectedRows[0].id}`);
  };

  useEffect(() => {
    if (data) {
      setUserProfiles(data.profiles);
    }
    setLoading(queryLoading);
    refetch();
    setError(queryError ? queryError.message : null);
  }, [data, queryLoading, queryError, refetch]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <div className="mx-4">
        <div className="pt-2">
          <nav className="text-sm text-blue-500" aria-label="Breadcrumb">
            <ol className="inline-flex p-0 m-0 list-none">
              <li className="flex items-center m-0">
                <Link to="/administration">Administration</Link>
                <svg
                  className="w-3 h-3 mx-3 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                </svg>
              </li>
              <li className="m-0">
                <Link to="#" className="text-gray-500" aria-current="page">
                  Users
                </Link>
              </li>
            </ol>
          </nav>
        </div>
        <div className="flex items-center justify-between my-4">
          <div className="">
            <h1 className="text-4xl text-[#36459C]">User Profiles</h1>
          </div>
          <div className="">
            <Button
              size="sm"
              className="bg-[#36459C] text-white py-5 px-8"
              onClick={() => navigate(from, { replace: true })}
            >
              <FaPlus className="mr-1 text-white" /> Add
            </Button>
          </div>
        </div>
        <div>
          {userProfiles && (
            <DataTable
              columns={columns}
              data={userProfiles}
              handleDelete={handleDelete}
              handleCopy={handleCopy}
              handleEdit={handleEdit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
