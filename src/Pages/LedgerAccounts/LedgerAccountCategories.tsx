import { DataTable } from "@/components/datatable/data-table";
import { columns } from "@/components/ledger-categories-list/columns";
import { Button } from "@/components/ui/button";
import { LedgerCategory } from "@/types/global";
import { FC, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { FaPlus } from "react-icons/fa";
import queryaccountcategoriesList from "@/components/ledger-categories-list/query";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_ACCOUNT_CATEGORY_TYPE } from "@/types/mutations";
import {  useLedgerState } from "@/store/ledger";
interface LedgerAccountCategoriesProps {}

const LedgerAccountCategories: FC<LedgerAccountCategoriesProps> = () => {
  const { setState} = useLedgerState();
  const [ledgerAccountCategory, setledgerAccountCategories] = useState<
    LedgerCategory[]
  >([]);
  const [sorting] = useState([{ id: "modifiedOn", desc: true }]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || {
    pathname:
      "/administration/ledger-management/ledger-account-categories/new-ledger-account-category",
  };
  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(queryaccountcategoriesList);
  console.log(data);
  const [deleteAccountCategory] = useMutation(DELETE_ACCOUNT_CATEGORY_TYPE);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    if (data) {
      setledgerAccountCategories(data.accountCategories);
    }
    setLoading(queryLoading);
    setError(queryError ? queryError.message : null);
  }, [data, queryLoading, queryError]);

  const handleDelete = async () => {
    if (selected.length) {
      // Show confirmation dialog
      if (window.confirm(`Confirm deletion of selected record/s`)) {
        try {
          // Extracting Account Categories type IDs from selected array
          const selectedledgerAccountCategoriesIds = selected.map(
            (accountCategoriesIndex) =>
              ledgerAccountCategory[accountCategoriesIndex].id
          );

          // Deleting selected Account Categories types
          await Promise.all(
            selectedledgerAccountCategoriesIds.map(async (id) => {
              await deleteAccountCategory({
                variables: { deleteAccountCategoryId: id },
              });
            })
          );

          // Filter out deleted items from UI
          const updatedaccountCategories = ledgerAccountCategory.filter(
            (ledgerAccountCategory) =>
              !selectedledgerAccountCategoriesIds.includes(
                ledgerAccountCategory.id
              )
          );
          setledgerAccountCategories(updatedaccountCategories);
          setSelected([]);
          window.location.reload();
        } catch (error) {
          console.error("Error deleting Account Category types:", error);
        }
      }
    }
  };
  const handleEdit = async () => {
    if (selected.length === 1) {
      navigateToEditPage();
    }
  };
  const handleCopy = () => {
    if (selected.length === 1) {
      const selectedRecord = ledgerAccountCategory[selected[0]];
      setState({
        ledgerCategory: selectedRecord.ledgerCategory,
        description: selectedRecord.description,
        categoryNumber: selectedRecord.categoryNumber
      });
      navigate("/administration/ledger-management/ledger-account-categories/new-ledger-account-category", {
        state: {
          from: from,
          ledgerCategory: selectedRecord,
          description: selectedRecord.ledgerCategory,
          categoryNumber: selectedRecord.categoryNumber
        },
      });
    }
  };

  const navigateToEditPage = () => {
    if (selected.length === 1) {
      const selectedRecord = ledgerAccountCategory[selected[0]];
      const ledgerCategory = selectedRecord.ledgerCategory;
      navigate(`/edit-Ledger-Account-Category/${selectedRecord.ledgerCategory}`, {
        state: { from: from, LedgerAccountCategories: selectedRecord, ledgerCategory: ledgerCategory },
      });
    }
  };
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
              <li className="flex items-center m-0">
                <Link to="#">Ledger Management</Link>
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
                  Ledger Account Categories
                </Link>
              </li>
            </ol>
          </nav>
        </div>
        <div className="flex items-center justify-between my-4">
          <div className="">
            <h1 className="text-4xl text-[#36459C]">
              Ledger Account Categories
            </h1>
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
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <DataTable
              columns={columns}
              data={ledgerAccountCategory}
              sorting={sorting}
              onRowSelect={setSelected}
            />
          )}
        </div>
        <div className="flex items-center my-4">
          <div className="mr-2">
          <Button
              size="sm"
              variant="outline"
              className={`${selected.length !== 1 ? "hidden" : "border-[#36459C] "}`}
              onClick={handleEdit}
            >
              Edit
            </Button>
          </div>

          <div className="mr-2">
          <Button
              size="sm"
              variant="outline"
              className={`${selected.length !== 1 ? "hidden" : "border-[#36459C] "}`}
              onClick={handleCopy}
            >
              Copy
            </Button>
          </div>

          <div className="mr-2">
            <Button
              size="sm"
              variant="outline"
              className={`${
                selected.length === 0 ? "hidden" : "border-[#36459C] "
              }`}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LedgerAccountCategories;
