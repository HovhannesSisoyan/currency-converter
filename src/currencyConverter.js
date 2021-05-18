import { useState, useEffect, useCallback } from 'react';

const BASE_URL = 'https://ec2-3-19-209-48.us-east-2.compute.amazonaws.com'

function CurrencyConverter() {

  const [allCurrences, setAllCurrences] = useState({});
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState('AMD');
  const [toCurrency, setToCurrency] = useState('USD');

  async function getAllCurrences() {
    await fetch(BASE_URL)
      .then(res => res.json())
      .then(res => setAllCurrences(res))
  }

  const getConvertedValue = useCallback(
    async (amount) => {
    const url = `${BASE_URL}/converter/?amount=${amount}&convertFrom=${fromCurrency}&convertTo=${toCurrency}`;
    await fetch(url)
      .then(res => res.json())
      .then(res => setConvertedAmount(parseFloat(res)))
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    getAllCurrences();
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => { getConvertedValue(amount)}, 1000);
    return () => {
      clearTimeout(timerId);
    }
  }, [amount, fromCurrency, toCurrency, getConvertedValue]);

  const handleInputChange = (event) => {
    setAmount(event.target.value);
  }

  const handleSelectChange = (event, option) => {
    if (option === 'from') {
      setFromCurrency(event.target.value)
    } else {
      setToCurrency(event.target.value);
    }
  }

  return (
    <section>
      <header className="App-header">
        Currency Converter
      </header>
      <p>
        <input type='number' value={amount} onChange={event => handleInputChange(event)}/>
        <select value={fromCurrency}onChange={event => handleSelectChange(event, 'from')}>
          {Object.keys(allCurrences).map(currency => <option key={currency}>{currency}</option>)}
        </select>
          =
        <input type='number' disabled={true} value={convertedAmount.toFixed(2)}/>
        <select value={toCurrency} onChange={event => handleSelectChange(event, 'to')}>
          {Object.keys(allCurrences).map(currency => <option key={currency}>{currency}</option>)}
        </select>
      </p>
    </section>
  )
}

export default CurrencyConverter;