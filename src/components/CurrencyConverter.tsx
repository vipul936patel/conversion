import React, { useState, useEffect } from 'react';
import './CurrencyConveter.css'
import Card from './Card';
interface Conversion {
  rate: number;
  override: number | null;
  orgAmount: number;
  orgCurrency: string;
  newAmount: number;
  newCurrency: string;
}

const CurrencyCoverter = () => {
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('EUR');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [isEuro, setIsEuro] = useState<boolean>(true);
  const [rate, setRate] = useState<number>(1.1);
  const [override, setOverride] = useState<number | null>(null);
  const [historicalData, setHistoricalData] = useState<Conversion[]>([]);
   

  useEffect(() => {
    const interval = setInterval(() => {
      const randomValue = Math.random() * 0.1 - 0.05;
      setRate((prevRate) => prevRate + randomValue);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
      const conversion = convert(amount, isEuro?'EUR' : 'USD', isEuro?'USD' : 'EUR', rate);
      setConvertedAmount(conversion.newAmount);
      setHistoricalData((prevHistoricalData) => [...prevHistoricalData.slice(-4), conversion]);
  }, [amount, currency, rate, isEuro, override]);


  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  const handleCurrencyToggle = () => {
    setIsEuro(!isEuro);
    !!isEuro? setCurrency('USD') : setCurrency('EUR')
  
  };

  const handleOverrideChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOverride(Number(e.target.value));
  };

  const convert = (amount: number, from: string, to: string, rate: number) => {
    const newAmount = from === 'EUR' ? amount * rate : amount / rate;
    return {
      rate,
      override,
      orgAmount: amount,
      orgCurrency: from,
      newAmount,
      newCurrency: to,
    };
  };

  
  return (
    <div> 
      <div className='flex-container'>
      <Card>
        <div>
        <input  type="number" value={amount} onChange={handleAmountChange}  />
        </div>
        <div>
        <select value={currency} onChange={handleCurrencyChange} className='padding' >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
        </select>
        </div>
        <div>
        <button className='padding'  onClick={handleCurrencyToggle}>{isEuro ? 'Switch to USD' : 'Switch to EUR' }</button>
        </div>
        <div>
          <label>
          Override FX Rate:
          </label>
        </div>
        <div>
        <label>
          <input  className='inputStyle' type="number" value={override ?? ''} onChange={handleOverrideChange} />
        </label>
        </div>
        <div>
        <p>Converted Amount: {convertedAmount.toFixed(2)}</p>
        </div>
        </Card> 
         </div>
         <div className='flex-container'>  
      <Card>
        <div>
         <table>
          <thead>
          <tr>
          <th>FX Rate</th>
          <th>Override</th>
          <th>Initial Amount</th>
          <th>Initial Currency</th>
          <th>Converted Amount</th>
          <th>Converted Currency</th>
        </tr>
      </thead>
      <tbody>
        {historicalData.map((data, index) => (
          <tr key={index}>
            <td  className='td-align-right'>{data.rate.toFixed(2)}</td>
            <td  className='td-align-left'> {data.override ?? '-'}</td>
            <td  className='td-align-right'>{data.orgAmount.toFixed(2)}</td>
            <td  className='td-align-left'>{data.orgCurrency}</td>
            <td  className='td-align-right'>{data.newAmount.toFixed(2)}</td>
            <td  className='td-align-left'>{data.newCurrency}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </Card>
  </div>
  </div>

);
};

export default CurrencyCoverter;

