/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface Country {
  code: string;
  name: string;
  flag: string; 
}

interface CountrySelectorProps {
  control: any;
  defaultValue?: string;
  name: string;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ control, defaultValue = '', name }) => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetchCountries().then(setCountries);
  }, []);

  const fetchCountries = async (): Promise<Country[]> => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');

      if (!response.ok) {
        throw new Error('Failed to fetch country data');
      }

      const data = await response.json();
      const countries: Country[] = data.map((country: any) => ({
        code: country.alpha3Code,
        name: country.name.common,
        flag: country.flags?.svg // Retrieve flag URL
      }));

      return countries;
    } catch (error) {
      console.error('Error fetching countries:', error);
      return [];
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Select onValueChange={field.onChange} value={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Select Country" defaultValue={field.value} />
          </SelectTrigger>
          <SelectContent>
            {countries.map(country => (
             <SelectItem key={country.name} value={country.name}>
    {/* <img src={country.flag} alt={`${country.name} flag`} style={{ width: '14px', marginRight: '2px' }} /> */}
    {country.name}
           </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default CountrySelector;