"use client";
import { useMetamask } from "../hooks/useMetamask";

const ConnectWallet = () => {
  const { account, connectWallet, error } = useMetamask();

  return (
    <div className="wallet-connector">
      {account ? (
        <p>Connected: {account}</p>
      ) : (
        <button onClick={connectWallet} className="connect-button">
          Connect MetaMask
        </button>
      )}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default ConnectWallet;