import { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_BUSINESS_KYC } from "@/types/mutations";
import queryKycTypesList from "@/components/kyc-type-list/query";
import { useAppState } from "@/store/state";
import { KYCType } from "@/types/global";

const newKYCBusinessSchema = z.object({
  kycType: z.string().min(3, { message: "KYC Type is required" }),
  legalEntityName: z
    .string()
    .min(3, { message: "Legal Entity Name is required" }),
  legalStatus: z.string().min(3, { message: "Legal Status is required" }),
  dateOfIncorporation: z
    .string()
    .min(3, { message: "Date of Incorporation is required" }),
  registrationNumber: z
    .string()
    .min(3, { message: "Registration Number is required" }),
  natureOfBusiness: z
    .string()
    .min(3, { message: "Nature of Business is required" }),
  entityNationality: z
    .string()
    .min(3, { message: "Entity Nationality is required" }),
  entityPINNumber: z
    .string()
    .min(3, { message: "Entity PIN Number is required" }),
  entityTaxNumber: z
    .string()
    .min(3, { message: "Entity Tax Number is required" }),
  telephoneNumber: z
    .string()
    .min(3, { message: "Telephone Number is required" }),
  emailAddress: z.string().min(3, { message: "Email Address is required" }),
  postalAddress: z.string().min(3, { message: "Postal Address is required" }),
  physicalAddress: z
    .string()
    .min(3, { message: "Physical Address is required" }),
  riskRating: z.string().min(3, { message: "Risk Rating is required" }),
  attachDocumentsField: z
    .string()
    .min(3, { message: "Attach Documents is required" }),
});

type NewKYCBusinessInput = z.infer<typeof newKYCBusinessSchema>;

interface NewBKYCProps {
  listType: string;
}

const NewBKYC: FC<NewBKYCProps> = ({listType}) => {
  const { state, setState } = useAppState();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  console.log(user.id);
  const [createBusinessKyc] = useMutation(CREATE_BUSINESS_KYC);
  const [KYCTypes, setKycsTypes] = useState<KYCType[]>([]); // State to track the selected KYC type
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewKYCBusinessInput>({
    resolver: zodResolver(newKYCBusinessSchema),
  });
  const onSubmit = async (data: NewKYCBusinessInput) => {
    const input = {
      kycType: data.kycType, 
      legalEntityName: data.legalEntityName,
      legalStatus: data.legalStatus,
      dateOfIncorporation: data.dateOfIncorporation,
      registrationNumber: data.registrationNumber,
      natureOfBusiness: data.natureOfBusiness,
      entityNationality: data.entityNationality,
      entityPinNumber: data.entityPINNumber,
      entityTaxNumber: data.entityTaxNumber,
      telephoneNumber: data.telephoneNumber,
      emailAddress: data.emailAddress,
      postalAddress: data.postalAddress,
      physicalAddress: data.physicalAddress,
      riskRating: data.riskRating,
      attachDocumentsField: data.attachDocumentsField,
      modifiedBy: user.id, //TODO: get user id from context
      modifiedOn: new Date(new Date().toString().split("GMT")[0] + " UTC")
        .toISOString()
        .split(".")[0],
    };
    const response = await createBusinessKyc({ variables: input });
    console.log(response.data.createBusinessKYC);
    const individualData = {
      kycId: response.data.createBusinessKYC.businessKYCId,
      createdBy: user.id,
      kycType: response.data.createBusinessKYC.kycType,
      status: "Pending",
    }
    if(listType === "business"){
      setState({
        ...state,
        businesses: [...state.businesses, individualData]
      })
    } else if(listType === "retail") {
      setState({
        ...state,
        individuals: [...state.individuals, individualData]
      })
    }
    toast({
      title: "New KYC Business Created",
      description: "Successfully created new business KYC",
    });
    setOpen(false);
  };
  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(queryKycTypesList);

  const nextFormStep = () => {
    setStep(cur => cur + 1);
}
const prevFormStep = () => {
    setStep(cur => cur - 1);
}
const stepButtons = () => {
  if (step === 0) {
    return (
      <div className="flex justify-end mt-4">
        <Button onClick={nextFormStep}>Next</Button>
      </div>
    )
  }
  if (step === 3) {
    return (
      <div className="flex justify-between mt-4">
        <Button onClick={prevFormStep}>Previous</Button>
        <div>
        <Button type="submit">Submit</Button>
        <Button 
        className="ml-2"
        onClick={() => setOpen(false)}
        >Cancel</Button>
        </div>
      </div>
    )
  }
  return (
    <div className="flex justify-between mt-4">
      <Button onClick={prevFormStep}>Previous</Button>
      <Button onClick={nextFormStep}>Next</Button>
    </div>
  )
}

  useEffect(() => {
    if (data) {
      setKycsTypes(data.kycTypes);
    }
  }, [data, queryLoading, queryError]);

  return (
    <div>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <Button>New Business KYC</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[80%]">
          <DialogTitle className="">New Individual KYC</DialogTitle>
          <section>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col">
              {step === 0 && (
                <>
                <div className="flex flex-col gap-4 border border-b-0">
                  <div className="p-4">
                    <h3>BUSINESS DETAILS</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mx-4 mb-8 -mt-4 ">
                    <div>
                      <Label htmlFor="kycType">KYC Type</Label>
                      <Controller
                        control={control}
                        name="kycType"
                        render={({ field: { onChange, value } }) => (
                          <Select onValueChange={onChange} value={value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select KYC Type" />
                            </SelectTrigger>
                            <SelectContent>
                              {KYCTypes.map((type) => (
                                <SelectItem
                                  key={type.kycTypeId}
                                  value={type.kycTypeId}
                                >
                                  {type.kycTypeName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor="legalEntityName">Legal Entity Name</Label>
                      <Input
                        id="legalEntityName"
                        type="text"
                        {...register("legalEntityName", { required: true })}
                        className="mt-1"
                      />
                      {errors.legalEntityName && (
                        <div className="text-red-500">
                          {errors.legalEntityName.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="legalStatus">Legal Status</Label>
                      <Controller
                        control={control}
                        name="legalStatus"
                        render={({ field: { onChange, value } }) => (
                          <Select onValueChange={onChange} value={value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select legal status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Sole Proprietor">
                                Sole Proprietor
                              </SelectItem>
                              <SelectItem value="Partnership">
                                Partnership
                              </SelectItem>
                              <SelectItem value="Limited Company">
                                Limited Company
                              </SelectItem>
                              <SelectItem value="Government Entity">
                                Government Entity
                              </SelectItem>
                              <SelectItem value="Society/Association/Club/Trust">
                                Society/Association/Club/Trust
                              </SelectItem>
                              <SelectItem value="NGO/International Charity">
                                NGO/International Charity
                              </SelectItem>
                              <SelectItem value="Other (specify)">
                                Other (specify)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.legalStatus && (
                        <div className="text-red-500">
                          {errors.legalStatus.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="dateOfIncorporation">
                        Date of Incorporation
                      </Label>
                      <Input
                        id="dateOfIncorporation"
                        type="date"
                        {...register("dateOfIncorporation", { required: true })}
                        className="mt-1"
                      />
                      {errors.dateOfIncorporation && (
                        <div className="text-red-500">
                          {errors.dateOfIncorporation.message}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="natureOfBusiness">
                        Nature of Business
                      </Label>
                      <Input
                        id="natureOfBusiness"
                        type="text"
                        {...register("natureOfBusiness", { required: true })}
                        className="mt-1"
                      />
                      {errors.natureOfBusiness && (
                        <div className="text-red-500">
                          {errors.natureOfBusiness.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="emailAddress">Email Address</Label>
                      <Input
                        id="emailAddress"
                        type="text"
                        {...register("emailAddress", { required: true })}
                        className="mt-1"
                      />
                      {errors.emailAddress && (
                        <div className="text-red-500">
                          {errors.emailAddress.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                </>
                )}
                {step === 1 && (
                <>
                <div className="flex flex-col gap-4 border border-b-0 ">
                  <div className="p-4">
                    <h3>LOCATION DETAILS</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mx-4 mb-8 -mt-4 ">
                    <div>
                      <Label htmlFor="postalAddress">Postal Address</Label>
                      <Input
                        id="postalAddress"
                        type="text"
                        {...register("postalAddress", { required: true })}
                        className="mt-1"
                      />
                      {errors.postalAddress && (
                        <div className="text-red-500">
                          {errors.postalAddress.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="physicalAddress">Physical Address</Label>
                      <Input
                        id="physicalAddress"
                        type="text"
                        {...register("physicalAddress", { required: true })}
                        className="mt-1"
                      />
                      {errors.physicalAddress && (
                        <div className="text-red-500">
                          {errors.physicalAddress.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="entityNationality">
                        Entity Nationality
                      </Label>
                      <Input
                        id="entityNationality"
                        type="text"
                        {...register("entityNationality", { required: true })}
                        className="mt-1"
                      />
                      {errors.entityNationality && (
                        <div className="text-red-500">
                          {errors.entityNationality.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                </>
                )}
                {step === 2 && (
                <>
                <div className="flex flex-col gap-4 border border-b-red-50">
                  <div className="p-4">
                    <h3>IDENTIFICATION DETAILS</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mx-4 mb-8 -mt-4 ">
                    <div>
                      <Label htmlFor="registrationNumber">
                        Registration Number
                      </Label>
                      <Input
                        id="registrationNumber"
                        type="text"
                        {...register("registrationNumber", { required: true })}
                        className="mt-1"
                      />
                      {errors.registrationNumber && (
                        <div className="text-red-500">
                          {errors.registrationNumber.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="entityPINNumber">Entity PIN Number</Label>
                      <Input
                        id="entityPINNumber"
                        type="text"
                        {...register("entityPINNumber", { required: true })}
                        className="mt-1"
                      />
                      {errors.entityPINNumber && (
                        <div className="text-red-500">
                          {errors.entityPINNumber.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="entityTaxNumber">Entity Tax Number</Label>
                      <Input
                        id="entityTaxNumber"
                        type="text"
                        {...register("entityTaxNumber", { required: true })}
                        className="mt-1"
                      />
                      {errors.entityTaxNumber && (
                        <div className="text-red-500">
                          {errors.entityTaxNumber.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="telephoneNumber">Telephone Number</Label>
                      <Input
                        id="telephoneNumber"
                        type="text"
                        {...register("telephoneNumber", { required: true })}
                        className="mt-1"
                      />
                      {errors.telephoneNumber && (
                        <div className="text-red-500">
                          {errors.telephoneNumber.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="riskRating">Risk Rating</Label>
                      <Input
                        id="riskRating"
                        type="text"
                        {...register("riskRating", { required: true })}
                        className="mt-1"
                      />
                      {errors.riskRating && (
                        <div className="text-red-500">
                          {errors.riskRating.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                </>
                )}
                {step === 3 && (
                <>
                <div className="flex flex-col gap-4 border">
                  {/* TODO: add custom file upload */}
                  <div className="p-4">
                    <h3>ATTACHMENT DETAILS</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mx-4 mb-8 -mt-4">
                    <div>
                      <Label htmlFor="attachDocumentsField">
                        Attach Documents
                      </Label>
                      <Input
                        id="attachDocumentsField"
                        type="text"
                        {...register("attachDocumentsField", {
                          required: true,
                        })}
                        className="mt-1"
                      />
                      {errors.attachDocumentsField && (
                        <div className="text-red-500">
                          {errors.attachDocumentsField.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                </>
                )}
              </div>
              {
                stepButtons()
              }
            </form>
          </section>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewBKYC;
