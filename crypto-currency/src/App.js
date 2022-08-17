import { useEffect, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  // dollar state
  const [dollar, setDollar] = useState(0);
  const [selected, setSelected] = useState(0);
  const [inverted, setInverted] = useState(true);
  const getInputDollar = (event) => {
    setDollar(event.target.value);
  };
  const getSelectedCrypto = (event) => {
    setSelected(event.target.value);
  };
  const handleInverted = () => {
    setInverted(!inverted);
  };
  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers')
      .then((response) => response.json())
      .then((json) => setCoins(json));
    setLoading(false);
  });
  return (
    <div className="App">
      <h1>🤡 Cryptocurrency Calculator 🤡</h1>
      {loading ? (
        <strong>Loading...👻</strong>
      ) : (
        <div>
          <select value={selected} onChange={getSelectedCrypto}>
            {coins.map((coin, index) => (
              <option key={coin.id} value={index}>
                {coin.name}
              </option>
            ))}
          </select>
          <hr />
          <input
            type="number"
            value={dollar}
            onChange={getInputDollar}
            disabled={!inverted}
          />
          <label>USD</label>
          <br />
          <input
            type="number"
            value={dollar}
            onChange={getInputDollar}
            disabled={inverted}
          />
          <label>crypto단위</label>
          <br />
          <button onClick={handleInverted}>Invert</button>
        </div>
      )}
    </div>
  );
}

export default App;
