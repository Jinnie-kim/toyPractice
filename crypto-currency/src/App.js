import { useEffect, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
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
          <select>
            {coins.map((coin) => (
              <option key={coin.id}>{coin.name}</option>
            ))}
          </select>
          <hr />
          <input type="number" />
          <label>USD</label>
          <br />
          <input type="number" />
          <label>crypto단위</label>
        </div>
      )}
    </div>
  );
}

export default App;
