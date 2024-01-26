import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";


const newKYCBusinessSchema = z.object({
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

interface NewKYCBusinessFormProps {}

const NewKYCBusinessForm: FC<NewKYCBusinessFormProps> = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewKYCBusinessInput>({
    resolver: zodResolver(newKYCBusinessSchema),
  });
  const onSubmit = (data: NewKYCBusinessInput) => {
    toast({
      title: "New KYC Business Created",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };
  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <div className="flex flex-col gap-4 border">
            <div>
              <h3>BUSINESS DETAILS</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
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
                        <SelectItem value="Partnership">Partnership</SelectItem>
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
                <Label htmlFor="natureOfBusiness">Nature of Business</Label>
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
          <div className="flex flex-col gap-4 border">
            <div>
              <h3>LOCATION DETAILS</h3>
            </div>
            <div className="grid grid-cols-3">
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
                <Label htmlFor="entityNationality">Entity Nationality</Label>
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
          <div className="flex flex-col gap-4 border">
            <div>
              <h3>IDENTIFICATION DETAILS</h3>
            </div>
            <div className="grid grid-cols-3">
              <div>
                <Label htmlFor="registrationNumber">Registration Number</Label>
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
          <div className="flex flex-col gap-4 border">
            {/* TODO: add custom file upload */}
            <div>
              <h3>ATTACHMENT DETAILS</h3>
            </div>
            <div className="grid grid-cols-1">
              <div>
                <Label htmlFor="attachDocumentsField">Attach Documents</Label>
                <Input
                  id="attachDocumentsField"
                  type="text"
                  {...register("attachDocumentsField", { required: true })}
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
        </div>
        <div className="flex justify-end mt-4">
          <Button type="submit">Submit</Button>
          <Button variant="outline" className="ml-2">
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};

export default NewKYCBusinessForm;
