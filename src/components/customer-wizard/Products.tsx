import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductType } from "@/types/global";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useAppState } from "@/store/state";

const businessRetailSchema = z.object({
  productTypes: z.string().min(3, { message: "Product Types is required" }),
  accountCurrency: z
    .string()
    .min(3, { message: "Account Currency is required" }),
  riskRating: z.string().min(3, { message: "Risk Rating is required" }),
});

type BusinessRetailInput = z.infer<typeof businessRetailSchema>;

const GET_PRODUCT_TYPES = gql`
  query ProductTypes {
    productTypes {
      productTypeId
      productTypeName
    }
  }
`;

interface ProductsProps {}

const Products: FC<ProductsProps> = () => {
  const [ProductTypes, setProductTypes] = useState<ProductType[]>([]);
  const {state, setState} = useAppState();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessRetailInput>({
    resolver: zodResolver(businessRetailSchema),
  });

  const saveData = (data: BusinessRetailInput) => { 
    setState({
      ...state,
      product: {
        productTypes: data.productTypes,
        accountCurrency: data.accountCurrency,
        riskRating: data.riskRating,
      }
    })
  }
  const navigate = useNavigate();
  const { data } = useQuery(GET_PRODUCT_TYPES);
  useEffect(() => {
    if (data && data.productTypes) {
      setProductTypes(data.productTypes);
    }
  }, [data]);
  return (
    <div>
      <form onSubmit={handleSubmit(saveData)}>
        <div className="flex flex-col px-2 pt-1 pb-4 border">
          <div>
            <h3>ACCOUNT DETAILS</h3>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="productTypes">Product Types</Label>
              <Controller
                control={control}
                name="productTypes"
                render={({ field: { onChange, value } }) => (
                  <Select onValueChange={onChange} value={value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Product Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Map over productTypes state to render select options */}
                      {ProductTypes.map((type) => (
                        <SelectItem
                          key={type.productTypeId}
                          value={type.productTypeId}
                        >
                          {type.productTypeName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.productTypes && (
                <div className="text-red-500">
                  {errors.productTypes.message}
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="accountCurrency">Account Currency</Label>
              <Controller
                control={control}
                name="accountCurrency"
                render={({ field: { onChange, value } }) => (
                  <Select onValueChange={onChange} value={value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Account Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="CAD">CAD</SelectItem>
                      <SelectItem value="AUD">AUD</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.accountCurrency && (
                <div className="text-red-500">
                  {errors.accountCurrency.message}
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="riskRating">Risk Rating</Label>
              <Controller
                control={control}
                name="riskRating"
                render={({ field: { onChange, value } }) => (
                  <Select onValueChange={onChange} value={value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.riskRating && (
                <div className="text-red-500">{errors.riskRating.message}</div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-start gap-2 mt-4">
          <Button type="submit">Save</Button>
          <Button
            type="button"
            onClick={() => navigate("/customers/customer-wizard/")}
          >
            Back
          </Button>
          <Button 
          type="button"
          onClick={() => navigate("/customers/customer-wizard/mandates")}
          >Next</Button>
        </div>
      </form>
    </div>);
};

export default Products;
