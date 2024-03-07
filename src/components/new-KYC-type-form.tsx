import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useMutation, useQuery } from "@apollo/client";
import {  CREATE_KYC_TYPE } from "@/types/mutations";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UPDATE_KYCType } from "./kyc-type-list/mutation";
import { useKycState } from "@/store/kyc";
import queryKycTypesList from "./kyc-type-list/query";

const kycTypeSchema = z.object({
  kycTypeId: z.string().optional(),
  kycType: z.string().min(3, { message: "KYC Type is required" }),
  kycTypeCode: z.string().min(3, { message: "KYC Type Code is required" }),
  kycTypeName: z.string().min(3, { message: "KYC Type Name is required" }),
  kycTypeDescription: z.string().min(3, { message: "Description is required" }),
  modifiedBy: z.string().min(3, { message: "Modified By is required" }),
  modifiedOn: z.string().min(3, { message: "Modified On is required" }),
});

type KYCTypeInput = z.infer<typeof kycTypeSchema>;

interface NewKYCTypeFormProps {}

const NewKYCTypeForm: FC<NewKYCTypeFormProps> = () => {
  const { kycTypeId } = useParams<{ kycTypeId: string }>();
  const { state, setState } = useKycState();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isCopyMode = !state;
  const formMode = state?.mode;
  console.log(state, formMode, "Form");
  console.log(isCopyMode, "Copy Mode");
  const [createKYCType] = useMutation(CREATE_KYC_TYPE);
  const [updateKycTypeMutation] = useMutation(UPDATE_KYCType);
  const { data: kycTypeData, loading: kycLoading } = useQuery(
    queryKycTypesList,
    {
      variables: { kycTypeId }, // Pass  as a variable to the query
    }
  );
  const {
    register,
    reset,
     setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<KYCTypeInput>({
    resolver: zodResolver(kycTypeSchema),
  });
  const onSubmit = async (data: KYCTypeInput) => {
    if (formMode === "ADD" || formMode === "COPY") {
      handleCreate(data);
    } else if (formMode === "EDIT") {
      console.log("edit mode");
      handleEdit(data);
    }
  };

  const handleEdit = async (data: KYCTypeInput) => {
    try {
      console.log(data, "Checking");
      const input = {
        kycTypeId : data.kycTypeId,
        kycTypeCode: data.kycTypeCode,
        kycTypeName: data.kycTypeName,
        kycTypeDescription: data.kycTypeDescription,
        modifiedBy: data.modifiedBy, //TODO: get user id from context
        modifiedOn: new Date(new Date().toString().split("GMT")[0] + " UTC")
       .toISOString()
         .split(".")[0],
     };
          
           
      console.log(input);
      const response = await updateKycTypeMutation({
        variables: input,
      });

      console.log("Updated kYC Type Data:", response);
      reset();
      navigate("/customers/kyc-types");

      toast({
        title: "Kyc Type Updated",
        description: (
          <div className="text-black">
            <div className="text-lg">
             Kyc Type{" "}
              <Link
                to={`/customers/kyc-types`}
                className="underline text-blue-500"
              >
                {data.kycTypeName}
              </Link>
              , has been successfully updated
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
          error.graphQLErrors[0].extensions.response.body.branchName) ||
        "Unknown error";

      toast({
        title: "Error",
        description: `"Failed ${errorMessage}. Please try again."`,
        variant: "destructive",
      });
    }
  };
  const [defaultModifiedOn,] = useState(
    new Date().toISOString()
  );
 
  const handleCreate = async (data: KYCTypeInput) => {
    try {
      console.log(data, "Checking");
      const input = {
       
        kycTypeName: data.kycTypeName,
        kycTypeDescription: data.kycTypeDescription,
        kycTypeCode: data.kycTypeCode,
        modifiedBy: data.modifiedBy, //TODO: get user id from context
        modifiedOn: new Date(new Date().toString().split("GMT")[0] + " UTC")
       .toISOString()
         .split(".")[0],
      };
      console.log(input);
      const response = await createKYCType({
        variables: input,
      });

      console.log("Created Kyc Types Data:", response);
      reset();
      navigate("/customers/kyc-types");

      toast({
        title: "KycType Created",
        description: (
          <div className="text-black">
            <div className="text-lg">
              New Kyc Type{" "}
              <Link
                to={`/customers/kyc-types`}
                className="underline text-blue-500"
              >
                {data.kycTypeCode}
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
        error.graphQLErrors[0].extensions.response.body.branchName) ||
      "Unknown error";
    
    
    console.log(errorMessage, "ERR CHECK");
      toast({
        title: "Error",
        description: `"Failed, ${errorMessage} Please try again."`,
        variant: "destructive",
      });
    }
  };
  // const onSubmit = (data: KYCTypeInput) => {
  //   console.log(data);
  //   const formInput = {
  //     kycTypeCode: data.kycTypeCode,
  //     kycTypeName: data.kycTypeName,
  //     kycTypeDescription: data.kycTypeDescription,
  //     modifiedBy: "e170f3b7-c9bc-421a-9c9f-a15fd17e6f3d", //TODO: get user id from context
  //     modifiedOn: new Date(new Date().toString().split("GMT")[0] + " UTC")
  //       .toISOString()
  //       .split(".")[0],
  //   };
  //   createKYCType({ variables: formInput });
  //   reset();
  //   navigate("/customers/kyc-types");
  //   toast({
  //     title: "New KycType Created",
  //     description: (
  //       <div className="text-black">
  //         <div className="text-lg">
  //           New kycType{" "}
  //           <Link
  //             to={`/administration/branches`}
  //             className="underline text-blue-500"
  //           >
  //             {data.kycTypeName}
  //           </Link>
  //           , has been successfully created
  //         </div>
  //       </div>
  //     ),
  //   });
  // };
  const kycTypes = kycTypeData?.kycTypes.find(
    (kycType: { kycTypeId: string | undefined }) => kycType.kycTypeId === kycTypeId
  );

  useEffect(() => {
    if (formMode === "COPY" && state) {
      const {
        // kycType,
        // kycTypeId,
       kycTypeCode,
       kycTypeName,
       kycTypeDescription,
      } = state;
    //  setValue("kycType", kycType);	
    //   setValue("kycTypeId", kycTypeId);
      setValue("kycTypeCode", kycTypeCode);
      setValue("kycTypeName", kycTypeName);
      setValue("kycTypeDescription", kycTypeDescription);
  
    } else if (formMode === "EDIT") {
      if (!kycLoading && kycTypes) {
        const {
        
          kycTypeId,
          kycTypeCode,
          kycTypeName,
          kycTypeDescription,
       
        } = kycTypes;
       
        setValue("kycTypeId", kycTypeId);
        setValue("kycTypeCode", kycTypeCode || "");
        setValue("kycTypeName", kycTypeName || "");
        setValue("kycTypeDescription", kycTypeDescription || "");
  
      }
    } else return;
  }, [formMode, reset, setValue, state, setState, kycLoading, kycTypes]);

  const cancelForm = () => {
    setState({
      kycTypeId: "",
      kycTypeName: "",
      kycTypeCode: "",
      kycTypeDescription: "",
    
    });
    toast({
      title: "KycType Form Cancelled",
    });
  };
  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)} className="w-2/3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="kycType" className="mb-2">
              KYC Type
            </Label>
            <Controller
              control={control}
              name="kycType"
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select KYC Type"
                      className="mt-1"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Individual">Individual</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.kycTypeName && (
              <div className="text-red-500">{errors.kycTypeName.message}</div>
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
            <Label htmlFor="kycTypeCode">KYC Type Code</Label>
            <Input
              id="kycTypeCode"
              type="text"
              {...register("kycTypeCode", { required: true })}
            />
            {errors.kycTypeCode && (
              <div className="text-red-500">{errors.kycTypeCode.message}</div>
            )}
          </div>
        </div>
        <div className="w-2/4 mt-4">
          <Label htmlFor="kycTypeName">KYC Type Name</Label>
          <Input
            id="kycTypeName"
            type="text"
            {...register("kycTypeName", { required: true })}
            className="mt-1"
          />
          {errors.kycTypeName && (
            <div className="text-red-500">{errors.kycTypeName.message}</div>
          )}
        </div>
        <div className="w-2/4 mt-4">
          <Label htmlFor="kycTypeDescription">Description</Label>
          <Textarea
            id="kycTypeDescription"
            {...register("kycTypeDescription", { required: true })}
            className="mt-1"
          />
          {errors.kycTypeDescription && (
            <div className="text-red-500">
              {errors.kycTypeDescription.message}
            </div>
          )}
        </div>
        <div className="flex justify-start mt-8">
          <Button type="submit">Submit</Button>
          <Link to={`/customers/kyc-types`}>
            <Button variant="outline" className="ml-2" onClick={cancelForm}>
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default NewKYCTypeForm;
