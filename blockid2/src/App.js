import blockid from './Assets/blockid_logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <img src={blockid} className="app-logo" alt="BlockID logo" />
        <h1>Welcome to BlockID</h1>
      </header>
      <main>
        <p>Create and manage your blockchain identity securely.</p>
        <button>Connect Wallet</button>
      </main>
    </div>
  );
}

export default App;
