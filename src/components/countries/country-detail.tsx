import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { countrySchema } from "./schema";
import { useToast } from "../ui/use-toast";
import { Link, useNavigate } from "react-router-dom";


interface CountryOption {
  value: string;
  label: string;
  flag: string;
  code: string;
}

interface CountryApiResponse {
  cca2: string;
  name: { common: string };
  flags: { svg: string };
  idd: {
    root: string,
    suffixes: [string],
  },
}

type NewCountryInput = z.infer<typeof countrySchema>;

interface NewCountryProps {}

const NewCountry: FC<NewCountryProps> = () => {
  const { toast } = useToast();
  const navigate  = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<NewCountryInput>({
    resolver: zodResolver(countrySchema),
  });

  const [countriesData, setCountriesData] = useState<CountryOption[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(
    null
  );

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get<CountryApiResponse[]>("https://restcountries.com/v3.1/all");
        setCountriesData(
          response.data.map((country) => ({
            value: country.cca2,
            label: country.name.common,
            flag: country.flags.svg,
            code: country.idd.root + country.idd.suffixes,
          }))
        );
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const onSubmit = (data: NewCountryInput) => {
    console.log(data);
    try{
      toast({
        title: "Country Created",
        description: <div className="text-black">
        <div className="text-lg">
          New Country Created {" "}
          <Link to={`/administration/countries-list`} className="underline text-blue-500">
            {data.name}
          </Link>
           , has been successfully created
        </div>
      </div>,
      });
      reset();
      navigate("/administration/countries-list"); 
    } catch (error) {
      console.error("Error creating country:", error);
      toast({
        title: "Error",
        description: "Failed to create country. Please try again.",
      });
    }
  };

  return (
    <section className="w-1/2">
      <form
        className="flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div>
          <Label htmlFor="name">Country Name</Label>
          <Select
            id="name"
            {...register("name", { required: true })}
            options={countriesData}
            value={selectedCountry}
            onChange={(option) => {
              setValue("name", option ? option.label : "");
              setValue("code", option ? option.code : "");
              setValue("flag", option ? option.flag : "");
              setSelectedCountry(option);
            }}
            isSearchable
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="flex gap-4">
        

        <div className="flex flex-col">
          <Label htmlFor="countryFlag"> Flag</Label>
          <div className="flex items-center">
            {selectedCountry && selectedCountry.flag && (
              <img
                src={selectedCountry.flag}
                alt="Country Flag"
                className="w-6 h-6 mr-2 mt-3"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <Label htmlFor="code">Country Code</Label>
          <Input
            id="code"
            type="text"
            {...register("code", { required: true })}
            readOnly
            className="mt-1"
          />
          {errors.code && (
            <span className="text-red-500 mt-1">{errors.code.message}</span>
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
          <Button  size="lg">
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};

export default NewCountry;