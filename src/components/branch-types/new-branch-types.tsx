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
import CREATE_NEW_TRANSACTION_TYPE_MUTATION from "@/Pages/Branches/BranchTypeMutation";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";


export const newBranchTypeSchema = z.object({
  branchName: z.string().min(3, { message: "Branch name is required" }),
  description: z.string(),
  modifiedBy: z.string().min(3, { message: "Modified By is required" }),

  modifiedOn: z.string().min(3, { message: "Modified On is required" }),
});

type newBranchInput = z.infer<typeof newBranchTypeSchema>;

interface NewBranchTypesProps {}

const NewBranchTypes: FC<NewBranchTypesProps> = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || {
    pathname: "/administration/branches/branch-types",
  };
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<newBranchInput>({
    resolver: zodResolver(newBranchTypeSchema),
  });
  const [defaultModifiedOn, setDefaultModifiedOn] = useState(
    new Date().toISOString()
  );

  const [createBranchTypeMutation] = useMutation(
    CREATE_NEW_TRANSACTION_TYPE_MUTATION
  );


  const onSubmit = async (data: newBranchInput) => {
    try {
      const { branchName, description, modifiedBy, modifiedOn } = data;
      await createBranchTypeMutation({
        variables: {
          branchTypeName: branchName,
          description: description || "N/A"  ,
          modifiedBy,
          modifiedOn,
        },
      });
      toast({
        title: "Branch Type Created",
        description: <div className="text-black">
        <RiCheckboxCircleLine className="mr-2 inset-y-3" />
        <div className="text-lg">
          New Branch Type {" "}
          <Link to={`/administration/branch-details`} className="underline text-blue-500">
            {data.branchName}
          </Link>
           , has been successfully created
        </div>
      </div>,
      });
      reset();
      navigate("/administration/branch-details"); 

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
  return (
    <section className="w-1/2">
      <form
        className="flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div>
          <Label htmlFor="branchName">Branch Name</Label>
          <Input
            id="branchName"
            type="text"
            {...register("branchName", { required: true })}
          />
          {errors.branchName && (
            <span className="text-red-500">{errors.branchName.message}</span>
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
