import { useState, useEffect } from "react";

function Main() {
  const [inputAmount, setInputAmount] = useState(1);
  const [currency, setCurrency] = useState("USD");
  const [wuc, setWuc] = useState();
  const [testArray, setTestArray] = useState([0]);

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

  useEffect(() => {
    wuc && setTestArray((prevArray) => [wuc, ...prevArray]);
  }, [wuc]);

  function handleCurrency(event) {
    setCurrency(event.target.value);
  }

  function handleInput(event) {
    setTimeout(() => {
      setInputAmount(event.target.value);
    }, 500);
  }

  //   console.log("wuc", wuc);
  console.log("test", testArray);

  const change = (testArray[0] - testArray[1]).toFixed(2);
  console.log("CHANGE", change);
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
      <h2 className="price-info">
        <div>{wuc} </div>
        <div>WUC</div>
        <div className={change > 0 ? "green" : "red"}>
          {testArray.length > 1 && change > 0 ? "↑" : "↓"}
          {testArray.length > 1 && change}
        </div>
      </h2>
    </div>
  );
}

export default Main;
