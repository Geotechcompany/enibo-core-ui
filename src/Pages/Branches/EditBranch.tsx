import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery } from "@apollo/client";
import { useLocation, useNavigate } from "react-router";
import { useToast } from "@/components/ui/use-toast";
import { UPDATE_BRANCH_TYPE } from "@/components/branch-types/mutation";
import queryBranchTypesList from "@/components/branch-types/query";

export const newBranchTypeSchema = z.object({
  branchTypeName: z.string().min(3, { message: "Branch name is required" }),
  description: z.string(),
  modifiedBy: z.string().min(3, { message: "Modified By is required" }),
  modifiedOn: z.string().min(3, { message: "Modified On is required" }),
});

type newBranchInput = z.infer<typeof newBranchTypeSchema>;

interface NewBranchTypesProps {
  branchTypeName: string; // Add prop to receive branch type ID
}

const EditBranchTypes: FC<NewBranchTypesProps> = ({ branchTypeName }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { state: locationState } = location;
  const from = locationState?.from || "/administration/branches/branch-types"; // Define the 'from' variable

  const {
    register,
    handleSubmit,
    reset,
    setValue, // Add setValue from useForm
    formState: { errors },
  } = useForm<newBranchInput>({
    resolver: zodResolver(newBranchTypeSchema),
  });
  const [defaultModifiedOn, setDefaultModifiedOn] = useState(
    new Date().toISOString()
  );

  const { data: branchTypeData, loading: branchTypeLoading } = useQuery(queryBranchTypesList, {
    variables: { branchTypeName },
  });

  const [updateBranchTypeMutation] = useMutation(UPDATE_BRANCH_TYPE);

  const onSubmit = async (data: newBranchInput) => {
    try {
      await updateBranchTypeMutation({
        variables: {
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

  useEffect(() => {
    setDefaultModifiedOn(new Date().toISOString());
  }, []);

  useEffect(() => {
    if (!branchTypeLoading && branchTypeData) {
      // Set default form values based on fetched branch type data
      const { branchTypeName, description, modifiedBy, modifiedOn } = branchTypeData;
      setValue("branchTypeName", branchTypeName);
      setValue("description", description);
      setValue("modifiedBy", modifiedBy);
      setValue("modifiedOn", modifiedOn);
    }
  }, [branchTypeData, branchTypeLoading, setValue]);

  return (
    <section className="w-1/2">
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
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>
        <div className="hidden">
          <Label htmlFor="modifiedBy" className="text-[#36459C] text-base">
            Modified By
          </Label>
          <Input
            {...register("modifiedBy")}
            placeholder="Modified By"
            type="text"
            className="h-12 text-base bg-blue-50"
            autoComplete="false"
            defaultValue={"User"}
          />
          {errors.modifiedBy && (
            <span className="text-red-500">{errors.modifiedBy.message}</span>
          )}
        </div>
        <div className="hidden">
          <Label htmlFor="modifiedOn" className="text-[#36459C] text-base">
            Modified On
          </Label>
          <Input
            {...register("modifiedOn")}
            placeholder="Modified On (YYYY-MM-DDTHH:MM:SSZ)"
            type="text"
            className="h-12 text-base bg-blue-50"
            autoComplete="false"
            defaultValue={defaultModifiedOn}
          />
          {errors.modifiedOn && (
            <span className="text-red-500">{errors.modifiedOn.message}</span>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            type="submit"
            size="lg"
            className="bg-[#36459C] hover:bg-[#253285]"
          >
            Submit
          </Button>
          <Button size="lg" onClick={() => navigate(from, { replace: true })}>
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};

export default EditBranchTypes;