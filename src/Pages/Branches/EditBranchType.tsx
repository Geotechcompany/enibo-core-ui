import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router";
import { useToast } from "@/components/ui/use-toast";
import { UPDATE_BRANCH_TYPE } from "@/components/branch-types/mutation";
import queryBranchTypesList from "@/components/branch-types/query";
import { Link } from "react-router-dom";

export const newBranchTypeSchema = z.object({
  branchTypeId: z.string(),
  branchTypeName: z.string().min(3, { message: "Branch name is required" }),
  description: z.string(),
  modifiedBy: z.string().min(3, { message: "Modified By is required" }),
  modifiedOn: z.string().min(3, { message: "Modified On is required" }),
});

type newBranchInput = z.infer<typeof newBranchTypeSchema>;

const EditBranchTypes: FC = () => {
  const { branchTypeId } = useParams<{ branchTypeId: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isFormModified, setIsFormModified] = useState(false);
  

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<newBranchInput>({
    resolver: zodResolver(newBranchTypeSchema),
  });

  const { data: branchTypeData, loading: branchTypeLoading } = useQuery(
    queryBranchTypesList,
    {
      variables: { branchTypeId }, // Pass branchTypeId as a variable to the query
    }
  );

  const [updateBranchTypeMutation] = useMutation(UPDATE_BRANCH_TYPE);

  const onSubmit = async (data: newBranchInput) => {
    try {
      await updateBranchTypeMutation({
        variables: {
          branchTypeId: data.branchTypeId,
          branchTypeName: data.branchTypeName,
          description: data.description,
          modifiedBy: data.modifiedBy,
          modifiedOn: data.modifiedOn,
        },
      });
      toast({
        title: "Branch Type Updated",
        description: (
          <div className="text-black">
            <div className="text-lg">
              Branch Type{" "} 
              <Link
                to={`/administration/branches/branch-types`}
                className="underline text-blue-500"
              >
                {data.branchTypeName}
              </Link>, has been successfully updated
            </div>
          </div>
        ),
      });
      reset();
      navigate("/administration/branches/branch-types");
    } catch (error) {
      console.error("Error updating branch type:", error);
      toast({
        title: "Error",
        description: "Failed to update branch type. Please try again.",
      });
    }
  };

  const branchType = branchTypeData?.branchTypes.find(
    (branchType: { branchTypeId: string | undefined }) =>
      branchType.branchTypeId === branchTypeId
  );

  useEffect(() => {
    if (!branchTypeLoading && branchType) {
      const { branchTypeId, branchTypeName, description, modifiedBy, modifiedOn } =
        branchType;
      setValue("branchTypeId", branchTypeId);
      setValue("branchTypeName", branchTypeName || "");
      setValue("description", description || "");
      setValue("modifiedBy", modifiedBy || "");
      setValue("modifiedOn", modifiedOn || new Date().toISOString());
    }
  }, [branchType, branchTypeLoading, setValue]);

  useEffect(() => {
    const handleFormChange = () => {
      setIsFormModified(true);
    };

    window.addEventListener("input", handleFormChange);

    return () => {
      window.removeEventListener("input", handleFormChange);
    };
  }, []);


  return (
    <section className="w-1/2 px-4">
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
              <Link to="/administration/branches/branch-types">Branch Types</Link>
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
                Branch Type Details
              </Link>
            </li>
          </ol>
        </nav>
      </div>
       <div className="flex items-center justify-between my-4">
        <div className=""><h1 className="text-4xl text-[#36459C]"> Branch Type Details</h1></div>
      </div>
      <form
        className="flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div>
          <Label htmlFor="branchTypeName">Branch Name</Label>
          <Input
            id="branchTypeName"
            type="text"
            {...register("branchTypeName", { required: true })}
            defaultValue={branchType?.branchTypeName || ""}
          />
          {errors.branchTypeName && (
            <span className="text-red-500">{errors.branchTypeName.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description", { required: true })}
            defaultValue={branchType?.description || ""}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>
        <div className="flex gap-2">
        <Button
            type="submit"
            size="lg"
            className="bg-[#36459C] hover:bg-[#253285]"
            disabled={!isFormModified}
          >
            Update
          </Button>
          <Link to={`/administration/branches/branch-types`}>
          <Button size="lg" onClick={
            () => 
            toast({
              title: 'Updated Cancelled',
            })
          }
          >Cancel

          
          </Button>

          </Link>
        </div>
      </form>
    </section>
  );
};

export default EditBranchTypes;