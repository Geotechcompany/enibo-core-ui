/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_BUSINESS_KYC } from "@/types/mutations";

import queryKycTypesList from "./kyc-type-list/query";

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

interface NewKYCBusinessFormProps {}

const NewKYCBusinessForm: FC<NewKYCBusinessFormProps> = () => {
  const { toast } = useToast();
  const [createBusinessKyc] = useMutation(CREATE_BUSINESS_KYC);
  const [KYCTypes, setKycsTypes] = useState<any[]>([]); // State to track the selected KYC type
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewKYCBusinessInput>({
    resolver: zodResolver(newKYCBusinessSchema),
  });
  const onSubmit = (data: NewKYCBusinessInput) => {
   
    const input = {
      kycType: data.kycType, //TODO: get kyc type id from context
      legalEntityName: data.legalEntityName,
      legalStatus: data.legalStatus,
      dateOfIncorporation: data.dateOfIncorporation,
      registrationNumber: data.registrationNumber,
      natureOfBusiness: data.natureOfBusiness,
      entityNationality: data.entityNationality,
      entityPINNumber: data.entityPINNumber,
      entityTaxNumber: data.entityTaxNumber,
      telephoneNumber: data.telephoneNumber,
      emailAddress: data.emailAddress,
      postalAddress: data.postalAddress,
      physicalAddress: data.physicalAddress,
      riskRating: data.riskRating,
      attachDocumentsField: data.attachDocumentsField,
      modifiedBy: "e170f3b7-c9bc-421a-9c9f-a15fd17e6f3d", //TODO: get user id from context
      modifiedOn: new Date(new Date().toString().split("GMT")[0] + " UTC")
        .toISOString()
        .split(".")[0],
    };
    createBusinessKyc({ variables: input });
    toast({
      title: "New KYC Business Created",
      description: "Successfully created new business KYC",
    });
  };
  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(queryKycTypesList);

  useEffect(() => {
    if (data) {
      setKycsTypes(data.kycTypes);
    }
  }, [data, queryLoading, queryError]);

  return (
    <section>
      <div className="pt-2 ml-4">
        <nav className="text-sm text-blue-500" aria-label="Breadcrumb">
          <ol className="inline-flex p-0 m-0 list-none">
            <li className="flex items-center m-0">
              <Link to="/customers/customer-kycs">Customer Management</Link>
              <svg
                className="w-3 h-3 mx-3 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
              </svg>
            </li>
            <li className="m-0">
              <Link to="#" className="text-gray-500" aria-current="page">
                Customer KYC Details
              </Link>
            </li>
          </ol>
        </nav>
        <div className="flex items-center justify-between my-4">
          <div className="">
            <h1 className="text-4xl text-[#36459C]">Customer KYC Details</h1>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
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
          <div className="flex flex-col gap-4 border border-b-red-50">
            <div className="p-4">
              <h3>IDENTIFICATION DETAILS</h3>
            </div>
            <div className="grid grid-cols-3 gap-4 mx-4 mb-8 -mt-4 ">
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
            <div className="p-4">
              <h3>ATTACHMENT DETAILS</h3>
            </div>
            <div className="grid grid-cols-3 gap-4 mx-4 mb-8 -mt-4">
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
          <Button className="ml-2">Cancel</Button>
        </div>
      </form>
    </section>
  );
};

export default NewKYCBusinessForm;
