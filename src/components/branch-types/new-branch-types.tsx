/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "../ui/use-toast";
import { useMutation, useQuery } from "@apollo/client";
import CREATE_NEW_BRANCH_TYPE_MUTATION from "@/Pages/Branches/BranchTypeMutation";
import { UPDATE_BRANCH_TYPE } from "@/components/branch-types/mutation";
import queryBranchTypesList from "@/components/branch-types/query";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

const newBranchTypeSchema = z.object({
  branchTypeId: z.string().optional(),
  branchTypeName: z.string().min(3, { message: "Branch name is required" }),
  description: z.string(),
  modifiedBy: z.string().min(3, { message: "Modified By is required" }),
});

type newBranchInput = z.infer<typeof newBranchTypeSchema>;

interface NewBranchTypesProps {}

const NewBranchTypes: FC<NewBranchTypesProps> = () => {
  const { branchTypeId } = useParams<{ branchTypeId: string }>();
  const isEditMode = branchTypeId ? true : false;
  const storedBranchType = localStorage.getItem("branchTypes");
  const isCopyMode = storedBranchType ? true : false;
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
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

  const [isFormModified, setIsFormModified] = useState(false);

  const [createBranchTypeMutation] = useMutation(
    CREATE_NEW_BRANCH_TYPE_MUTATION
  );
  const handleEdit = async (data: newBranchInput) => {
    try {
      await updateBranchTypeMutation({
        variables: {
          branchTypeId: data.branchTypeId,
          branchTypeName: data.branchTypeName,
          description: data.description,
          modifiedBy: data.modifiedBy,
          modifiedOn: new Date().toISOString(),
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
                className="text-blue-500 underline"
              >
                {data.branchTypeName}
              </Link>
              , has been successfully updated
            </div>
          </div>
        ),
      });
      reset();
      navigate("/administration/branches/branch-types");
    } catch (error: any) {
      const errorMessage =
        error.graphQLErrors?.[0]?.extensions?.response?.body?.message ||
        "Unknown error";
      toast({
        title: "Error",
        description: `"Failed ${errorMessage}. Please try again."`,
        variant: "destructive",
      });
    }
  };

  const handleCreate = async (data: newBranchInput) => {
    try {
      const { branchTypeName, description, modifiedBy } = data;

      await createBranchTypeMutation({
        variables: {
          branchTypeName: branchTypeName,
          description: description || "N/A",
          modifiedBy,
          modifiedOn: new Date().toISOString(),
        },
      });
      toast({
        title: "Branch Type Created",
        description: (
          <div className="text-black">
            <div className="text-lg">
              New Branch Type{" "}
              <Link
                to={`/administration/branches/branch-types`}
                className="text-blue-500 underline"
              >
                {data.branchTypeName}
              </Link>
              , has been successfully created
            </div>
          </div>
        ),
      });
      reset();
      localStorage.removeItem("branchTypes");
      navigate("/administration/branches/branch-types");
    } catch (error: any) {
      const errorMessage =
        error.graphQLErrors?.[0]?.extensions?.response?.body?.message ||
        "Unknown error";

      toast({
        title: "Error",
        description: `Failed ${errorMessage}. Please try again.`,
        variant: "destructive",
      });
    }
  };
  const onSubmit = async (data: newBranchInput) => {
    if (isEditMode) {
      handleEdit(data);
    } else {
      handleCreate(data);
    }
  };

  const cancelForm = () => {
    localStorage.removeItem("branchTypes");
    toast({
      title: "Form Cancelled",
    });
    navigate("/administration/branches/branch-types");
  };
  const branchType = branchTypeData?.branchTypes.find(
    (branchType: { branchTypeId: string | undefined }) =>
      branchType.branchTypeId === branchTypeId
  );

  useEffect(() => {
    if (isCopyMode && storedBranchType !== null) {
      const { branchTypeName, description } = JSON.parse(storedBranchType);

      setValue("branchTypeName", branchTypeName);
      setValue("description", description);
    }
    if (isEditMode) {
      if (!branchTypeLoading && branchType) {
        const { branchTypeId, branchTypeName, description, modifiedBy } =
          branchType;
        setValue("branchTypeId", branchTypeId);
        setValue("branchTypeName", branchTypeName || "");
        setValue("description", description || "");
        setValue("modifiedBy", modifiedBy || "");
      }
    }
  }, [
    reset,
    setValue,
    branchType,
    branchTypeLoading,
    storedBranchType,
    isEditMode,
    isCopyMode,
    branchTypeId,
  ]);

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
            <span className="text-red-500">
              {errors.branchTypeName.message}
            </span>
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
        <div className="flex gap-2">
          <Button
            type="submit"
            size="lg"
            className="bg-[#36459C] hover:bg-[#253285]"
            disabled={!isFormModified}
          >
            Submit
          </Button>
          <Button size="lg" onClick={() => cancelForm()}>
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};

export default NewBranchTypes;
