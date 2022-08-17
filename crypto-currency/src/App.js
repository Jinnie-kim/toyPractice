import { useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="App">
      <h1>🤡 Cryptocurrency Calculator 🤡</h1>
      {loading ? <strong>Loading...👻</strong> : null}
      <select>
        <option></option>
      </select>
      <hr />
      <input type='number'/>
      <strong>USD</strong>
      <br />
      <input type='number'/>
      <strong>crypto단위</strong>
    </div>
  );
}

export default App;
