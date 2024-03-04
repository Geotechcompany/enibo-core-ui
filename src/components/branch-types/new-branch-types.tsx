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
import { useBranchState } from "@/store/branch";

const newBranchTypeSchema = z.object({
  branchTypeId: z.string().optional(),
  branchTypeName: z.string().min(3, { message: "Branch name is required" }),
  description: z.string(),
  modifiedBy: z.string().min(3, { message: "Modified By is required" }),

  modifiedOn: z.string().min(3, { message: "Modified On is required" }),
});

type newBranchInput = z.infer<typeof newBranchTypeSchema>;

interface NewBranchTypesProps {}

const NewBranchTypes: FC<NewBranchTypesProps> = () => {
  const { branchTypeId } = useParams<{ branchTypeId: string }>();
  const { state, setState } = useBranchState();
  const isCopyMode = !state;
  const formMode = state?.mode
  console.log(state, formMode, "Form")
  const { toast } = useToast();
  const navigate = useNavigate();
    
  console.log(isCopyMode, "Copy Mode");
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
  const [defaultModifiedOn, setDefaultModifiedOn] = useState(
    new Date().toISOString()
  );

  const [isFormModified, setIsFormModified] = useState(false);

  const [createBranchTypeMutation] = useMutation(
    CREATE_NEW_BRANCH_TYPE_MUTATION
  );
  const handleEdit =  async (data: newBranchInput) => {
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
                className="text-blue-500 underline"
              >
                {data.branchTypeName}
              </Link>, has been successfully updated
            </div>
          </div>
        ),
      });
      reset();
      navigate("/administration/branches/branch-types");
    } catch (error:any) {
      const errorMessage = error.graphQLErrors?.[0]?.extensions?.response?.body?.message || 'Unknown error';
      toast({
        title: "Error",
        description: `"Failed ${errorMessage}. Please try again."`,
        variant: 'destructive',
      });
    }
  };

  const handleCreate = async (data: newBranchInput) => {
    try {
      const { branchTypeName, description, modifiedBy, modifiedOn } = data;

      await createBranchTypeMutation({
        variables: {
          branchTypeName: branchTypeName,
          description: description || "N/A",
          modifiedBy,
          modifiedOn,
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
      setState({
        branchTypeName: "",
        description: "",
     })
      navigate("/administration/branches/branch-types");
    } catch (error: any) {
      const errorMessage = error.graphQLErrors?.[0]?.extensions?.response?.body?.message || 'Unknown error';
  
      toast({
        title: 'Error',
        description: `Failed ${errorMessage}. Please try again.`,
        variant: 'destructive',
      });
    }
  }
  const onSubmit = async (data: newBranchInput) => {
     if(formMode  === "ADD" || formMode === "COPY") {
      handleCreate(data);
     } else if(formMode === "EDIT") {
      console.log('edit mode')
      handleEdit(data);
     }
  };

  useEffect(() => {
    setDefaultModifiedOn(new Date().toISOString());
  }, []);


  const cancelForm = () =>{
    setState({
      branchTypeName: "",
      description: "",
   });
    toast({
      title: "Form Cancelled",
    })
  }
  const branchType = branchTypeData?.branchTypes.find(
    (branchType: { branchTypeId: string | undefined }) =>
      branchType.branchTypeId === branchTypeId
  );

  useEffect(() => {
    if (formMode === "COPY" && state) {
      const { branchTypeName, description } = state;

      setValue("branchTypeName", branchTypeName);
      setValue("description", description);
    } else if (formMode === "EDIT") {
      if (!branchTypeLoading && branchType) {
        const { branchTypeId, branchTypeName, description, modifiedBy, modifiedOn } =
          branchType;
        setValue("branchTypeId", branchTypeId);
        setValue("branchTypeName", branchTypeName || "");
        setValue("description", description || "");
        setValue("modifiedBy", modifiedBy || "");
        setValue("modifiedOn", modifiedOn || new Date().toISOString());
      }
    }
  }, [formMode, reset, setValue, state, setState, branchType, branchTypeLoading]);

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
            disabled={!isFormModified}
          >
            {formMode === "EDIT" ? "Update" : "Submit"}
          </Button>

          <Link to={`/administration/branches/branch-types`}>
            <Button
              size="lg"
              onClick={cancelForm}
            >
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default NewBranchTypes;
