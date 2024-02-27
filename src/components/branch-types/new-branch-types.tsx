import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "../ui/use-toast";
import { useMutation } from "@apollo/client";
import CREATE_NEW_BRANCH_TYPE_MUTATION from "@/Pages/Branches/BranchTypeMutation";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useBranchState } from "@/store/branch";


export const newBranchTypeSchema = z.object({
  branchTypeName: z.string().min(3, { message: "Branch name is required" }),
  description: z.string(),
  modifiedBy: z.string().min(3, { message: "Modified By is required" }),

  modifiedOn: z.string().min(3, { message: "Modified On is required" }),
});

type newBranchInput = z.infer<typeof newBranchTypeSchema>;

interface NewBranchTypesProps {}

const NewBranchTypes: FC<NewBranchTypesProps> = () => {
  const { state } = useBranchState();
  const  isCopyMode  = !state;
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || {
    pathname: "/administration/branches/branch-types",
  };
  
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<newBranchInput>({
    resolver: zodResolver(newBranchTypeSchema),
  });
  const [defaultModifiedOn, setDefaultModifiedOn] = useState(
    new Date().toISOString()
  );

  const [createBranchTypeMutation] = useMutation(
    CREATE_NEW_BRANCH_TYPE_MUTATION
  );


  const onSubmit = async (data: newBranchInput) => {
    try {
      const { branchTypeName, description, modifiedBy, modifiedOn } = data;
      await createBranchTypeMutation({
        variables: {
          branchTypeName: branchTypeName,
          description: description || "N/A"  ,
          modifiedBy,
          modifiedOn,
        },
      });
      toast({
        title: "Branch Type Created",
        description: <div className="text-black">
        <div className="text-lg">
          New Branch Type {" "}
          <Link to={`/administration/branches/branch-types`} className="underline text-blue-500">
            {data.branchTypeName}
          </Link>
           , has been successfully created
        </div>
      </div>,
      });
      reset();
      navigate("/administration/branches/branch-types"); 

    } catch (error) {
      console.error("Error creating branch type:", error);
      toast({
        title: "Error",
        description: "Failed to create branch type. Please try again.",
      });
    }
  };

  useEffect(() => {
    setDefaultModifiedOn(new Date().toISOString());
  }, []);


  useEffect(() => {
    if (!isCopyMode && state) {
      const { branchTypeName, description } = state;

      setValue("branchTypeName", branchTypeName);
      setValue("description", description);

    }
  }, [])
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
          <Button size="lg"
           onClick={() => navigate(from, { replace: true })}
          >Cancel</Button>
        </div>
      </form>
    </section>
  );
};

export default NewBranchTypes;
