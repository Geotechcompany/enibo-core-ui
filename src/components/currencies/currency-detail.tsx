import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { countrySchema } from "../countries/schema";
import { useToast } from "../ui/use-toast";
import { z } from "zod";
import Select from "react-select";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";


export const newCurrencySchema = z.object({
    currencyCode: z.string().min(3, { message: "Currency Code is required" }),
    currencyDescription: z.string().max(100, { message: "Description is required" }),
    country: z.string().min(3, { message: "Country is required" }),
  });

interface CurrencyOption {
  currencyCode: string;
  currencyDescription: string;
  country: string;
}

interface CurrencyApiResponse {
  numericCode: string;
  name: { common: string };
  alpha2Code: string;
  flags: { svg: string };
  idd: {
    root: string;
    suffixes: [string];
  };
  symbol: string;
  currencies: { [key: string]: { name: string; symbol: string } };
}

type NewcCurrencyInput = z.infer<typeof newCurrencySchema>

interface NewCurrencyProps {}

const NewCurrency: FC<NewCurrencyProps> = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<NewcCurrencyInput>({
    resolver: zodResolver(countrySchema),
  });

  const [countriesData, setCountriesData] = useState<CurrencyOption[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CurrencyOption | null>(
    null
  );

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get<CurrencyApiResponse[]>(
          "https://restcountries.com/v3.1/all"
        );
        setCountriesData(
          response.data.map((country) => ({
            currencyCode: country.idd.root + country.idd.suffixes,
            currencyDescription: country.name.common,
            flag: country.flags.svg,
            country: country.name.common,
          }))
        );
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const onSubmit = (data: NewcCurrencyInput) => {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <section className="w-1/2">
      <form
        className="flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div>
          <Label htmlFor="currencyCode">Currency Code</Label>
          <Select
            id="currencyCode"
            {...register("currencyCode", { required: true })}
            options={countriesData}
            value={selectedCountry}
            onChange={(option) => {
              setValue("currencyCode", option ? option.currencyCode : "");
              setValue("currencyDescription", option ? option.currencyDescription : "");
              setValue("country", option ? option.country : "");
              setSelectedCountry(option);
            }}
            isSearchable
          />
          {errors.currencyCode && (
            <span className="text-red-500">{errors.currencyCode.message}</span>
          )}
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col">
            <Label htmlFor="currencyDescription">Currency Description</Label>
            <Input
              id="currencyDescription"
              type="text"
              {...register("currencyDescription", { required: true })}
              readOnly
              className="mt-1"
            />
            {errors.currencyDescription && (
              <span className="text-red-500 mt-1">{errors.currencyDescription.message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              type="text"
              {...register("country", { required: true })}
              className="mt-1"
            />
            {errors.country && (
              <span className="text-red-500 mt-1">
                {errors.country.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            type="submit"
            size="lg"
            className="bg-[#36459C] hover:bg-[#253285]"
          >
            Submit
          </Button>
          <Button variant="outline" size="lg">
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};

export default NewCurrency;
