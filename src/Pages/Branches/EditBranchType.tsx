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
              Branch Type {data.branchTypeName}, has been successfully updated
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
       <div className="flex items-center justify-between my-4">
        <div className=""><h1 className="text-4xl text-[#36459C]"> Edit Branch Details</h1></div>
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
          <Button size="lg"
          >Cancel</Button>

          </Link>
        </div>
      </form>
    </section>
  );
};

export default EditBranchTypes;