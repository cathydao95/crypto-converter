import { useState, useEffect } from "react";

function Main() {
  const [inputAmount, setInputAmount] = useState(1);
  const [currency, setCurrency] = useState("USD");
  const [wuc, setWuc] = useState();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetch(`https://api.frontendeval.com/fake/crypto/${currency}`)
        .then((res) => res.json())
        .then((data) => setWuc(data.value.toFixed(2) * inputAmount));
    }

    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    fetchData();
    return () => clearInterval(interval);
  }, [currency, inputAmount]);

  function handleCurrency(event) {
    setCurrency(event.target.value);
  }

  function handleInput(event) {
    setTimeout(() => {
      setInputAmount(event.target.value);
    }, 1000);
  }

  //   console.log("history", history);
  //   console.log("wuc", wuc);

  return (
    <div>
      <form className="form-container">
        <input type="number" name="input" onChange={handleInput} />
        <select
          id="currency"
          name="currency"
          onChange={handleCurrency}
          value={currency}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="CNY">CNY</option>
          <option value="JPY">JPY</option>
        </select>
      </form>
      <h2>{wuc} WUC</h2>
    </div>
  );
}

export default Main;
