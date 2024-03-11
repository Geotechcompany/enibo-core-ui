import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";
import { useMutation, useQuery } from "@apollo/client";
import CREATE_FEE_TYPE_MUTATION from "@/Pages/FeeTypes/FeeTypesMutation";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UPDATE_FEE_TYPE_MUTATION } from "./fee-type-list/mutation";
import queryFeeTypesList from "./fee-type-list/query";
import { useFeeState } from "@/store/feestate";
import { z } from "zod";

const feeTypeSchema = z.object({
  // feeTypeId: z.string().min(3, { message: "Fee id is required" }),
  feeTypeName: z.string().min(3, { message: "Fee Name is required" }),
  description: z.string().min(3, { message: "Description is required" }),
  transactionTypes: z
    .string()
    .min(3, { message: "Transaction Type is required" }),
  paymentFrequency: z
    .string()
    .min(3, { message: "Payment Frequency is required" }),
  effectiveDate: z.string().min(3, { message: "Effective Date is required" }),
  // fixedRate: z.string().min(3, { message: "Fixed Rate is required" }),
  fixedRate: z.string().min(1, { message: "Fixed Rate is required" }),
  modifiedBy: z.string().min(3, { message: "Modified By is required" }),
  modifiedOn: z.string().min(3, { message: "Modified On is required" }),
});

type FeeTypeInput = z.infer<typeof feeTypeSchema>;

interface NewFeeTypesFormProps {}

const NewFeeTypesForm: FC<NewFeeTypesFormProps> = () => {
  const { toast } = useToast();
  const { feeTypeId } = useParams<{ feeTypeId: string }>();
  const { state, setState } = useFeeState();
  const isCopyMode = !state;
  console.log(isCopyMode, "Copy Mode");
  const formMode = state?.mode;
  console.log(state, formMode, "Form");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<FeeTypeInput>({
    resolver: zodResolver(feeTypeSchema),
  });
  const [createfeetypeMutation] = useMutation(CREATE_FEE_TYPE_MUTATION);
  const [updatefeetypeMutation] = useMutation(UPDATE_FEE_TYPE_MUTATION);

  const { data: FeeTypesData, loading: FeeTypesLoading } = useQuery(
    queryFeeTypesList,
    {
      variables: { feeTypeId }, //
    }
  );
  const [defaultModifiedOn, setDefaultModifiedOn] = useState(
    new Date().toISOString()
  );

  // const onSubmit = (async (data: FeeTypeInput) => {
  //     try {
  //       await createfeetypeMutation({
  //         variables: {
  //           feeTypeName: data.feeTypeName,
  //           description: data.description,
  //           transactionTypes: [data.transactionType],
  //           paymentFrequency: data.paymentFrequency,
  //           effectiveDate: data.effectiveDate,
  //           fixedRate: parseFloat(data.fixedRate),
  //           modifiedBy: "tester",
  //           modifiedOn: data.modifiedOn,
  //         },
  //       });
  //       toast({
  //         title: "Fee Type Created",
  //         description: <div className="text-black">
  //         <div className="text-lg">
  //           New Fee Type {" "}
  //           <Link to={`/administration/static-data/fee-types`} className="underline text-blue-500">
  //             {data.feeTypeName}
  //           </Link>
  //            , has been successfully created
  //         </div>
  //       </div>,
  //       });
  //       reset();
  //       navigate("/administration/static-data/fee-types");
  //     } catch (error) {
  //       console.error("Error creating fee type:", error);
  //       toast({
  //         title: "Error",
  //         description: "Failed to create fee type. Please try again.",
  //       });
  //     }
  //   });

  //   const [defaultModifiedOn, setDefaultModifiedOn] = useState(
  //     new Date().toISOString()
  //   );
  //   useEffect(() => {
  //     setDefaultModifiedOn(new Date().toISOString());
  //   }, []);

  const handleEdit = async (data: FeeTypeInput) => {
    try {
      console.log(data, "Checking");
      const input = {
        feeTypeName: data.feeTypeName,
        description: data.description,
        paymentFrequency: data.paymentFrequency,
        transactionTypes: data.transactionTypes,
        effectiveDate: data.effectiveDate,
        fixedRate: parseFloat(data.fixedRate),
        modifiedBy: data.modifiedBy,
        modifiedOn: data.modifiedOn,
      };
      console.log(input);
      const response = await updatefeetypeMutation({
        variables: input,
      });
      console.log("Updated feeType Data", response);
      reset();
      navigate(`/administration/static-data/fee-types`);

      toast({
        title: "Fee Types Updated",
        description: (
          <div className="text-black">
            <div className="text-lg">
              Fee Types{" "}
              <Link
                to={`/administration/static-data/fee-types`}
                className="text-blue-500 underline"
              >
                {data.feeTypeName}
              </Link>
              , has been successfully updated
            </div>
          </div>
        ),
      });
      reset();
      navigate("/administration/static-data/fee-types");
    } catch (error: any) {
      const errorMessage =
        (error.graphQLErrors &&
          error.graphQLErrors[0] &&
          error.graphQLErrors[0].extensions &&
          error.graphQLErrors[0].extensions.response &&
          error.graphQLErrors[0].extensions.response.body &&
          error.graphQLErrors[0].extensions.response.body.feeTypeName) ||
        "Unknown error";

      toast({
        title: "Error",
        description: `"Failed ${errorMessage}. Please try again."`,
        variant: "destructive",
      });
    }
  };

  const handleCreate = async (data: FeeTypeInput) => {
    try {
      console.log(data, "Checking");
      const input = {
        feeTypeName: data.feeTypeName,
        description: data.description,
        transactionTypes: data.transactionTypes,
        paymentFrequency: data.paymentFrequency,
        effectiveDate: data.effectiveDate,
        fixedRate: parseFloat(data.fixedRate),
        modifiedBy: data.modifiedBy,
        modifiedOn: data.modifiedOn,
      };
      console.log(input);
      const response = await createfeetypeMutation({
        variables: input,
      });
      console.log("Created FeeType Data:", response);
      reset();
      navigate(`/administration/static-data/fee-types`);

      toast({
        title: "Fee Types Created",
        description: (
          <div className="text-black">
            <div className="text-lg">
              Fee Types{" "}
              <Link
                to={`/administration/static-data/fee-types`}
                className="text-blue-500 underline"
              >
                {data.feeTypeName}
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
          error.graphQLErrors[0].extensions.response.body.feeTypeName) ||
        "Unknown error";

      console.log(errorMessage, "ERR CHECK");
      toast({
        title: "Error",
        description: "Failed, ${errorMessage} Please try again.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: FeeTypeInput) => {
    if (formMode === "ADD" || formMode === "COPY") {
      handleCreate(data);
    } else if (formMode === "EDIT") {
      console.log("edit mode");
      handleEdit(data);
    }
  };

  const FeeTypes = FeeTypesData?.feeTypes.find(
    (FeeTypes: { feeTypeId: string | undefined }) =>
      FeeTypes.feeTypeId === feeTypeId
  );

  useEffect(() => {
    setDefaultModifiedOn(new Date().toISOString());
  }, []);

  useEffect(() => {
    if (formMode === "COPY" && state) {
      const {
        feeTypeId,
        fixedRate,
        feeTypeName,
        effectiveDate,
        description,
        paymentFrequency,
        transactionTypes,
      } = state;
      // setValue("feeTypeId", feeTypeId);
      setValue("fixedRate", fixedRate.toString());
      setValue("feeTypeName", feeTypeName);
      setValue("transactionTypes", transactionTypes.toString());
      setValue("paymentFrequency", paymentFrequency);
      setValue("effectiveDate", effectiveDate || "");
      setValue("description", description);
    } else if (formMode === "EDIT") {
      if (!FeeTypesLoading && FeeTypes) {
        const {
          // feeTypeId,
          feeTypeName,
          description,
          transactionTypes,
          paymentFrequency,
          effectiveDate,
          fixedRate,
          modifiedBy,
          modifiedOn,
        } = FeeTypes;
        // setValue("feeTypeId", feeTypeId);
        setValue("feeTypeName", feeTypeName || "");
        setValue("description", description || "");
        setValue("transactionTypes", transactionTypes || "");
        setValue("paymentFrequency", paymentFrequency || "");
        setValue(
          "effectiveDate",
          effectiveDate ? effectiveDate.split("T")[0] : ""
        ); // Format the effectiveDate here
        setValue("fixedRate", fixedRate || "");
        setValue("modifiedBy", modifiedBy || "");
        setValue("modifiedOn", modifiedOn || new Date().toISOString());
      }
    }
  }, [formMode, reset, setValue, state, setState, FeeTypes, FeeTypesLoading]);

  const cancelForm = () => {
    setState({
      feeTypeId: "",
      feeTypeName: "",
      description: "",
      transactionTypes: [""],
      paymentFrequency: "",
      effectiveDate: "",
      fixedRate: 0.0,
    });
    toast({
      title: "FeeTypes Form Cancelled",
    });
  };
  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 w-[30%]">
          {/* <div>
            <Label htmlFor="feeCode">Fee Code</Label>
            <Input
              id="feeCode"
              type="text"
              placeholder="Fee Code"
              {...register("feeCode")}
            />
            {errors.feeCode && (
              <span className="text-red-500">{errors.feeCode.message}</span>
            )}
          </div> */}
          <div>
            <Label htmlFor="feeTypeName">Fee Name</Label>
            <Input
              id="feeTypeName"
              type="text"
              placeholder="Fee Name"
              {...register("feeTypeName")}
            />
            {errors.feeTypeName && (
              <span className="text-red-500">{errors.feeTypeName.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Description"
              {...register("description")}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="transactionTypes">
              Corresponding Transaction Type
            </Label>
            <Controller
              name="transactionTypes"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Customer">Customer</SelectItem>
                    <SelectItem value="Internal">Internal</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.transactionTypes && (
              <span className="text-red-500">
                {errors.transactionTypes.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="paymentFrequency">Payment Frequency</Label>
            <Controller
              name="paymentFrequency"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Daily">Daily</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.paymentFrequency && (
              <span className="text-red-500">
                {errors.paymentFrequency.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="effectiveDate">Effective Date</Label>
            <Input
              id="effectiveDate"
              type="date"
              placeholder="Effective Date"
              {...register("effectiveDate")}
            />
            {errors.effectiveDate && (
              <span className="text-red-500">
                {errors.effectiveDate.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="fixedRate">Fixed Rate (%)</Label>
            <Input
              id="fixedRate"
              type="number"
              placeholder="Fixed Rate"
              {...register("fixedRate")}
            />
            {errors.fixedRate && (
              <span className="text-red-500">{errors.fixedRate.message}</span>
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
        </div>
        <div className="flex gap-2 mt-4">
          <Button type="submit">Submit</Button>
          <Link to={`/administration/static-data/fee-types`}>
            <Button onClick={cancelForm}>Cancel</Button>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default NewFeeTypesForm;
