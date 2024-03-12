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
import { useMandateState } from "@/store/mandatestate";
import queryMandateList from "./mandate-type-list/query";


const mandateTypeSchema = z.object({
  // mandateTypeId: z.string().min(1, { message: "MANDATE Type ID is required" }),
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
  const { state, setState } = useMandateState();
  const navigate = useNavigate();
  const isCopyMode = !state;
  const formMode = state?.mode;
  console.log(isCopyMode, "Copy Mode");
  console.log(state, formMode, "Form")
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
  // const onSubmit = (data: MandateTypeInput) => {
  //   console.log(data);
  //   const formInput = {
  //     mandateTypeCode: data.mandateTypeCode,
  //     mandateTypeName: data.mandateTypeName,
  //     mandateTypeDescription: data.mandateTypeDescription,
  //     modifiedBy: "e170f3b7-c9bc-421a-9c9f-a15fd17e6f3d",
  //     modifiedOn: new Date(new Date().toString().split("GMT")[0] + " UTC")
  //       .toISOString()
  //       .split(".")[0],
  //   };
  //   createMandateType({ variables: formInput });
  //   toast({
  //     title: "Mandate Type Created",
  //     mandateTypeDescription: "Mandate Type has been created successfully",
  //   });
  // };
  const [defaultModifiedOn, setDefaultModifiedOn] = useState(
    new Date().toISOString()
  );
 
  const handleEdit = async (data:MandateTypeInput) => {
    try {
      console.log(data, "Checking");
      const input = {
        // mandateTypeId: data.mandateTypeId,
        mandateTypeDescription: data.mandateTypeDescription,
        mandateTypeCode: data.mandateTypeCode,
        mandateTypeName: data.mandateTypeName,
        modifiedBy: data.modifiedBy,
        modifiedOn: new Date(new Date().toString().split("GMT")[0] + " UTC")
           .toISOString()
        .split(".")[0],
      };
      console.log(input);
      const response = await updateMandateType({
        variables: input,
      });
      console.log("Updated Mandate Data", response);
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
      console.log(data, "Checking");
      const input = {
        // mandateTypeId: data.mandateTypeId,
        mandateTypeName: data.mandateTypeName,
        mandateTypeDescription: data.mandateTypeDescription,
        mandateTypeCode: data.mandateTypeCode,
        modifiedBy: data.modifiedBy,
        modifiedOn: new Date(new Date().toString().split("GMT")[0] + " UTC")
              .toISOString()
            .split(".")[0],
      };
      console.log(input);
      const response = await createMandateType({
        variables: input,
      });
      console.log("Created Ledger Data:", response);
      reset();
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
    if (formMode === "ADD" || formMode === "COPY") {
      handleCreate(data);
    } else if (formMode === "EDIT") {
      console.log("edit mode");
      handleEdit(data);
    }
  };

  const MandateTypes =
    MandateTypesData?.mandateTypes.find(
      (MandateTypes: { mandateTypeId: string | undefined }) =>
        MandateTypes.mandateTypeId === mandateTypeId
    );

  useEffect(() => {
    if (formMode === "COPY" && state) {
      const {  mandateTypeDescription, mandateTypeCode,mandateTypeName } = state;
      // setValue("mandateTypeId", mandateTypeId);
      setValue("mandateTypeCode", mandateTypeCode);
      setValue("mandateTypeName", mandateTypeName);
      setValue("mandateTypeDescription", mandateTypeDescription);
    } else if (formMode === "EDIT") {
      if (!MandateTypesLoading && MandateTypes) {
        const {
        
          // mandateTypeId,
          mandateTypeDescription,
          mandateTypeName,
          mandateTypeCode,
          modifiedBy,
          modifiedOn,
        } = MandateTypes;
   
        // setValue("mandateTypeId", mandateTypeId || "");
        setValue("mandateTypeDescription", mandateTypeDescription || "");
        setValue("mandateTypeName", mandateTypeName || "");
        setValue("mandateTypeCode", mandateTypeCode || "");
        setValue("modifiedBy", modifiedBy || "");
        setValue("modifiedOn", modifiedOn || new Date().toISOString());
      }
    }
  }, [
    formMode,
    reset,
    setValue,
    state,
    setState,
    MandateTypes,
    MandateTypesLoading,
  ]);

  const cancelForm = () => {
    setState({
      // mandateTypeId:"",
      mandateTypeName: "",
      mandateTypeCode: "",
      mandateTypeDescription: "",
    });
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
          <Link to={`/customers/account-mandate-types`}>
          <Button  onClick={cancelForm}>
            Cancel
          </Button>
          </Link>
        </div>
      </form>
   </section>
  );
};

export default NewMandateTypeForm;
