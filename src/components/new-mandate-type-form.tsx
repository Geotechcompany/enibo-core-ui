import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";
import { CREATE_MANDATE_TYPE, UPDATE_MANDATE_TYPE } from "@/types/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { Link, useNavigate, useParams } from "react-router-dom";

import queryMandateList from "./mandate-type-list/query";


const mandateTypeSchema = z.object({
  mandateTypeCode: z.string().min(3, { message: "MANDATE Type Code is required" }),
  mandateTypeName: z.string().min(3, { message: "MANDATE Type Name is required" }),
  mandateTypeDescription: z.string().min(3, { message: "Description is required" }),
  modifiedBy: z.string().min(3, { message: "Modified By is required" }),
  modifiedOn: z.string().min(3, { message: "Modified On is required" }),
});

type MandateTypeInput = z.infer<typeof mandateTypeSchema>;

interface NewMandateTypeFormProps {}

const NewMandateTypeForm: FC<NewMandateTypeFormProps> = () => {
  const { toast } = useToast();
  const { mandateTypeId } = useParams<{ mandateTypeId: string }>();
  const isEditMode = mandateTypeId ? true : false;
  const storedMandateType = localStorage.getItem("mandateType");
  const isCopyMode = storedMandateType ? true : false;
  const navigate = useNavigate();
  const [createMandateType] = useMutation(CREATE_MANDATE_TYPE);
  const [updateMandateType] = useMutation(UPDATE_MANDATE_TYPE);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<MandateTypeInput>({
    resolver: zodResolver(mandateTypeSchema),
  });

  const {
    data: MandateTypesData,
    loading: MandateTypesLoading,
  } = useQuery(queryMandateList, {
    variables: {  mandateTypeId }, //
  });
  useEffect(() => {
    setDefaultModifiedOn(new Date().toISOString());
  }, []);
  
  const [defaultModifiedOn, setDefaultModifiedOn] = useState(
    new Date().toISOString()
  );
 
  const handleEdit = async (data:MandateTypeInput) => {
    try {
      const input = {
        mandateTypeId: mandateTypeId,
        mandateTypeDescription: data.mandateTypeDescription,
        mandateTypeCode: data.mandateTypeCode,
        mandateTypeName: data.mandateTypeName,
        modifiedBy: data.modifiedBy,
        modifiedOn: new Date(new Date().toString().split("GMT")[0] + " UTC")
           .toISOString()
        .split(".")[0],
      };
      await updateMandateType({
        variables: input,
      });
      reset();
      navigate(`/customers/account-mandate-types`);

      toast({
        title: "Mandate Type Updated",
        description: (
          <div className="text-black">
            <div className="text-lg">
              Mandate Type{" "}
              <Link
                to={`/customers/account-mandate-types`}
                className="text-blue-500 underline"
              >
                {data.mandateTypeName}
              </Link>
              , has been successfully updated
            </div>
          </div>
        ),
      });
      reset();
      navigate("/customers/account-mandate-types");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage =
        (error.graphQLErrors &&
          error.graphQLErrors[0] &&
          error.graphQLErrors[0].extensions &&
          error.graphQLErrors[0].extensions.response &&
          error.graphQLErrors[0].extensions.response.body &&
          error.graphQLErrors[0].extensions.response.body.ledgerCategory) ||
        "Unknown error";

      toast({
        title: "Error",
        description: `"Failed ${errorMessage}. Please try again."`,
        variant: "destructive",
      });
    }
  };
  const handleCreate = async (data: MandateTypeInput) => {
    try {
   
      const input = {
        mandateTypeName: data.mandateTypeName,
        mandateTypeDescription: data.mandateTypeDescription,
        mandateTypeCode: data.mandateTypeCode,
        modifiedBy: data.modifiedBy,
        modifiedOn: new Date(new Date().toString().split("GMT")[0] + " UTC")
              .toISOString()
            .split(".")[0],
      };
      await createMandateType({
        variables: input,
      });
   
      reset();
      localStorage.removeItem("mandateType");
      navigate(`/customers/account-mandate-types`);
    
     
      toast({
        title: "Mandate Type Created",
        description: (
          <div className="text-black">
            <div className="text-lg">
              mandate Type{" "}
              <Link
                to={`/customers/account-mandate-types`}
                className="text-blue-500 underline"
              >
                {data.mandateTypeName}
              </Link>
              , has been successfully created
            </div>
          </div>
        ),
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage =
        (error.graphQLErrors &&
          error.graphQLErrors[0] &&
          error.graphQLErrors[0].extensions &&
          error.graphQLErrors[0].extensions.response &&
          error.graphQLErrors[0].extensions.response.body &&
          error.graphQLErrors[0].extensions.response.body.mandateTypeId) ||
        "Unknown error";

      console.log(errorMessage, "ERR CHECK");
      toast({
        title: "Error",
        description: "Failed, ${errorMessage} Please try again.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: MandateTypeInput) => {
    if (isEditMode) {
      handleEdit(data);
    } else  {
      handleCreate(data);
    }
  };

  const MandateTypes =
    MandateTypesData?.mandateTypes.find(
      (MandateTypes: { mandateTypeId: string | undefined }) =>
        MandateTypes.mandateTypeId === mandateTypeId
    );

  useEffect(() => {
    if (isCopyMode && storedMandateType !== null) {
      const {  mandateTypeDescription, mandateTypeCode,mandateTypeName } = JSON.parse(storedMandateType);
      setValue("mandateTypeCode", mandateTypeCode);
      setValue("mandateTypeName", mandateTypeName);
      setValue("mandateTypeDescription", mandateTypeDescription);
    }
     if (isEditMode) {
      if (!MandateTypesLoading && MandateTypes) {
        const {
          mandateTypeDescription,
          mandateTypeName,
          mandateTypeCode,
          modifiedBy,
          modifiedOn,
        } = MandateTypes;
        setValue("mandateTypeDescription", mandateTypeDescription || "");
        setValue("mandateTypeName", mandateTypeName || "");
        setValue("mandateTypeCode", mandateTypeCode || "");
        setValue("modifiedBy", modifiedBy || "");
        setValue("modifiedOn", modifiedOn || new Date().toISOString());
      }
    }
  }, [
    reset,
    setValue,
    MandateTypes,
    MandateTypesLoading,
    isEditMode,
    isCopyMode,
    storedMandateType,
  ]);

  const cancelForm = () => {
    localStorage.removeItem("mandateType");
    toast({
      title: "MandateType Form Cancelled",
    });
  };
  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="mandateTypeCode">Mandate Type Code</Label>
            <Input
              id="mandateTypeCode"
              type="text"
              {...register("mandateTypeCode", { required: true })}
              className="mt-1"
            />
            {errors.mandateTypeCode && (
              <div className="text-red-500">{errors.mandateTypeCode.message}</div>
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
              defaultValue={"modifiedBy"}
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
          <div>
            <Label htmlFor="mandateTypeName">Mandate Type Name</Label>
            <Input
              id="mandateTypeName"
              type="text"
              {...register("mandateTypeName", { required: true })}
              className="mt-1"
            />
            {errors.mandateTypeName && (
              <div className="text-red-500">{errors.mandateTypeName.message}</div>
            )}
          </div>
          <div>
            <Label htmlFor="mandateTypeDescription">Description</Label>
            <Textarea
              id="mandateTypeDescription"
              {...register("mandateTypeDescription", { required: true })}
              className="mt-1"
            />
            {errors.mandateTypeDescription && (
              <div className="text-red-500">
                {errors.mandateTypeDescription.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2 pt-4">
          <Button type="submit">Submit</Button>   
          <Button  onClick={cancelForm}>
            Cancel
          </Button>
        </div>
      </form>
   </section>
  );
};

export default NewMandateTypeForm;
