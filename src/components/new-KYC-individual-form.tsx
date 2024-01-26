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

/**
 * 
 *  designation: string;
    firstName: string;
    middleName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
    postalAddress: string;
    physicalAddress: string;
    country: string;
    taxNumber: string;
    idType: string;
    idNumber: string;
    sex: "Male" | "Female" | "Other";
    nationality: string;
    riskRating: string;
    attachDocumentsField: string[];
    signature: string;
 */
const newKYCIndividualSchema = z.object({
  designation: z.string().min(3, { message: "Designation is required" }),
  firstName: z.string().min(3, { message: "First Name is required" }),
  middleName: z.string().min(3, { message: "Middle Name is required" }),
  lastName: z.string().min(3, { message: "Last Name is required" }),
  phoneNumber: z.string().min(3, { message: "Phone Number is required" }),
  emailAddress: z.string().min(3, { message: "Email Address is required" }),
  country: z.string().min(3, { message: "Country is required" }),
  taxNumber: z.string().min(3, { message: "Entity Tax Number is required" }),
  idType: z.string().min(3, { message: "Id Type is required" }),
  idNumber: z.string().min(3, { message: "Id Number is required" }),
  sex: z.string().min(3, { message: "Sex is required" }),
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

interface NewKYCIndividualFormProps {}

const NewKYCIndividualForm: FC<NewKYCIndividualFormProps> = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewKYCIndividualInput>({
    resolver: zodResolver(newKYCIndividualSchema),
  });
  const onSubmit = (data: NewKYCIndividualInput) => {
    toast({
      title: "New KYC Individual Created",
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
              <h3>PERSONAL DETAILS</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="designation">Designation</Label>
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
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  type="text"
                  {...register("country", { required: true })}
                  className="mt-1"
                />
                {errors.country && (
                  <div className="text-red-500">{errors.country.message}</div>
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
                <Label htmlFor="idType">ID Type</Label>
                <Controller
                    control={control}
                    name="idType"
                    render={({ field: { onChange, value } }) => (
                      <Select>
                        <SelectTrigger
                          className="mt-1"
                          value={value}
                          onChange={onChange}
                        >
                          <SelectValue placeholder="Select Id Type"/>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="passport">Passport</SelectItem>
                          <SelectItem value="national-id">National ID</SelectItem>
                          <SelectItem value="drivers-license">Drivers License</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                />
                {errors.idType && (
                  <div className="text-red-500">{errors.idType.message}</div>
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
                  <div className="text-red-500">{errors.idNumber.message}</div>
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
                  <div className="text-red-500">{errors.taxNumber.message}</div>
                )}
              </div>
              <div>
                <Label htmlFor="sex">Sex</Label>
                <Input 
                 id="sex"
                 type="text"
                 {...register("sex", { required: true })}
                    className="mt-1"
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
                    <div className="text-red-500">{errors.nationality.message}</div>
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

export default NewKYCIndividualForm;