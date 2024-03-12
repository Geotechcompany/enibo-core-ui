/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface Currency {
  code: string;
  name: string;
}

interface CurrencySelectorProps {
  control: any;
  defaultValue?: string;
  name: string;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ control, defaultValue = '', name }) => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    fetchCurrencies().then(setCurrencies);
  }, []);

  const fetchCurrencies = async (): Promise<Currency[]> => {
    try {
      const apiKey = 'YOUR_API_KEY';
      const response = await fetch(`https://openexchangerates.org/api/currencies.json?app_id=${apiKey}`);

      if (!response.ok) {
        throw new Error('Failed to fetch currency data');
      }

      const data = await response.json();
      const currencies: Currency[] = Object.entries(data).map(([code, name]) => ({
        code,
        name: name as string 
      }));

      return currencies;
    } catch (error) {
      console.error('Error fetching currencies:', error);
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
            <SelectValue placeholder="Select Currency" defaultValue={field.value} />
          </SelectTrigger>
          <SelectContent>
            {currencies.map(currency => (
              <SelectItem key={currency.code} value={currency.code}>
                {currency.name} - {currency.code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default CurrencySelector;