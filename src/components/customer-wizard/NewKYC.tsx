import { FC,useEffect, useState } from "react";
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
import { CREATE_INDIVIDUAL_KYC } from "@/types/mutations";
import queryKycTypesList from "@/components/kyc-type-list/query";
import { KYCType } from "@/types/global";
import { useAppState } from "@/store/state";

const newKYCIndividualSchema = z.object({
  kycType: z.string().min(3, { message: "KYC Type is required" }),
  designation: z.string().min(2, { message: "Designation is required" }),
  firstName: z.string().min(3, { message: "First Name is required" }),
  middleName: z.string().min(3, { message: "Middle Name is required" }),
  lastName: z.string().min(3, { message: "Last Name is required" }),
  phoneNumber: z.string().min(3, { message: "Phone Number is required" }),
  emailAddress: z.string().min(3, { message: "Email Address is required" }),
  country: z.string().min(3, { message: "Country is required" }),
  taxNumber: z.string().min(3, { message: "Entity Tax Number is required" }),
  idType: z.string().min(3, { message: "Id Type is required" }),
  idNumber: z.string().min(3, { message: "Id Number is required" }),
  sex: z.string().min(3, { message: "Demographic data required" }),
  nationality: z.string().min(3, { message: "Nationality is required" }),
  postalAddress: z.string().min(3, { message: "Postal Address is required" }),
  physicalAddress: z
    .string()
    .min(3, { message: "Physical Address is required" }),
  riskRating: z.string().min(3, { message: "Risk Rating is required" }),
  attachDocumentsField: z
    .string()
    .min(3, { message: "Attach Documents is required" }),
  signature: z.string().min(3, { message: "Signature is required" }),
});

type NewKYCIndividualInput = z.infer<typeof newKYCIndividualSchema>;

interface NewKYCProps {
  listType: string;
}

const NewKYC: FC<NewKYCProps> = ({listType}) => {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const {appState, setAppState} = useAppState();
  const [createIndividualKyc] = useMutation(CREATE_INDIVIDUAL_KYC);
  const [KYCTypes, setKycsTypes] = useState<KYCType[]>([]); // State to track the selected KYC type
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewKYCIndividualInput>({
    resolver: zodResolver(newKYCIndividualSchema),
  });
  const onSubmit = async (data: NewKYCIndividualInput) => {
    console.log(data);
    const formInput = {
      kycType: data.kycType,
      designation: data.designation,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      emailAddress: data.emailAddress,
      postalAddress: data.postalAddress,
      physicalAddress: data.physicalAddress,
      country: data.country,
      taxNumber: data.taxNumber,
      idType: data.idType,
      idNumber: data.idNumber,
      sex: data.sex,
      nationality: data.nationality,
      riskRating: data.riskRating,
      attachDocumentsField: data.attachDocumentsField,
      signature: data.signature,
      modifiedBy: user.id,
      modifiedOn: new Date(new Date().toString().split("GMT")[0] + " UTC")
        .toISOString()
        .split(".")[0],
    };

    const response = await createIndividualKyc({ variables: formInput });
    console.log(response);
    const individualData = {
      kycId : response.data.createIndividualKYC.IndividualKYCId,
      createdBy: user.id,
      kycType: response.data.createIndividualKYC.kycType,
      status: "Pending",
    }
    if(listType === "business"){
      setAppState({
        ...appState,
        businesses: [...appState.businesses, individualData]
      })
    } else if(listType === "retail") {
      setAppState({
        ...appState,
        individuals: [...appState.individuals, individualData]
      })
    }
    
    toast({
      title: "New KYC Individual Created",
      description: "New KYC Individual has been created successfully",
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
    if (step === 1) {
      return (
        <div className="flex justify-end mt-4">
          <Button onClick={nextFormStep}>Next</Button>
        </div>
      )
    }
    if (step === 4) {
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
          <Button>New Individual KYC</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[80%]">
          <DialogTitle className="">New Individual KYC</DialogTitle>
          <section>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col">
                {/* {step === 0 && (
                <>
                <div className="flex flex-col gap-4 border">
                  <div className="flex items-center justify-center p-4">
                    
                  </div>
                </div>
                </>
                )} */}
                {step === 1 && (
                <>
                <div className="flex flex-col gap-4 border">
                  <div className="p-4">
                    <h3>PERSONAL DETAILS</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mx-4 mb-8 -mt-4 ">
                  <div className="w-full">
                      <Label htmlFor="kycType">KYC TYPE</Label>
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
                      <Label htmlFor="designation">
                        Designation e.g. Mr, Mrs, Dr, Rev, etc
                      </Label>
                      <Input
                        id="designation"
                        type="text"
                        {...register("designation", { required: true })}
                        className="mt-1"
                      />
                      {errors.designation && (
                        <div className="text-red-500">
                          {errors.designation.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        type="text"
                        {...register("firstName", { required: true })}
                        className="mt-1"
                      />
                      {errors.firstName && (
                        <div className="text-red-500">
                          {errors.firstName.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="middleName">Middle Name</Label>
                      <Input
                        id="middleName"
                        type="text"
                        {...register("middleName", { required: true })}
                        className="mt-1"
                      />
                      {errors.middleName && (
                        <div className="text-red-500">
                          {errors.middleName.message}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        {...register("lastName", { required: true })}
                        className="mt-1"
                      />
                      {errors.lastName && (
                        <div className="text-red-500">
                          {errors.lastName.message}
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
                    <div>
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        type="text"
                        {...register("phoneNumber", { required: true })}
                        className="mt-1"
                      />
                      {errors.phoneNumber && (
                        <div className="text-red-500">
                          {errors.phoneNumber.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                </>
                )}
                {step === 2 && (
                <>
                <div className="flex flex-col gap-4 border">
                  <div className="p-4">
                    <h3>LOCATION DETAILS</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mx-4 mb-8 -mt-4">
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
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        type="text"
                        {...register("country", { required: true })}
                        className="mt-1"
                      />
                      {errors.country && (
                        <div className="text-red-500">
                          {errors.country.message}
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
                  <div className="p-4">
                    <h3>IDENTIFICATION DETAILS</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mx-4 mb-8 -mt-4 ">
                    <div>
                      <Label htmlFor="idType">ID Type</Label>
                      <Controller
                        control={control}
                        name="idType"
                        render={({ field: { onChange, value } }) => (
                          <Select value={value} onValueChange={onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Id Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="passport">Passport</SelectItem>
                              <SelectItem value="national-id">
                                National ID
                              </SelectItem>
                              <SelectItem value="drivers-license">
                                Drivers License
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.idType && (
                        <div className="text-red-500">
                          {errors.idType.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="idNumber">ID Number</Label>
                      <Input
                        id="idNumber"
                        type="text"
                        {...register("idNumber", { required: true })}
                        className="mt-1"
                      />
                      {errors.idNumber && (
                        <div className="text-red-500">
                          {errors.idNumber.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="taxNumber">Tax Number</Label>
                      <Input
                        id="taxNumber"
                        type="text"
                        {...register("taxNumber", { required: true })}
                        className="mt-1"
                      />
                      {errors.taxNumber && (
                        <div className="text-red-500">
                          {errors.taxNumber.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="sex">Sex</Label>
                      <Controller
                        control={control}
                        name="sex"
                        render={({ field: { onChange, value } }) => (
                          <Select value={value} onValueChange={onChange}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="male">Male</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.sex && (
                        <div className="text-red-500">{errors.sex.message}</div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="nationality">Nationality</Label>
                      <Input
                        id="nationality"
                        type="text"
                        {...register("nationality", { required: true })}
                        className="mt-1"
                      />
                      {errors.nationality && (
                        <div className="text-red-500">
                          {errors.nationality.message}
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
                {step === 4 && (
                <>
                <div className="flex flex-col gap-4 border">
                  {/* TODO: add custom file upload */}
                  <div className="p-4">
                    <h3>ATTACHMENT DETAILS</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-10 mx-4 mb-8 -mt-4">
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
                    <div>
                      <Label htmlFor="signature">Signature</Label>
                      <Input
                        id="signature"
                        type="text"
                        {...register("signature", { required: true })}
                        className="mt-1"
                      />
                      {errors.signature && (
                        <div className="text-red-500">
                          {errors.signature.message}
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

export default NewKYC;
