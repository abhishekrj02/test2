import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

const WalletAuth = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if MetaMask is installed
  const checkMetaMask = async () => {
    if (!window.ethereum) {
      setError("MetaMask is not installed!");
      return false;
    }
    return true;
  };

  // Connect to MetaMask
  const connectWallet = async () => {
    if (!(await checkMetaMask())) return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const walletAddress = accounts[0];

      setAccount(walletAddress);
      getBalance(walletAddress, provider);

      // Redirect to homepage on successful login
      navigate("/");
    } catch (err) {
      setError("Failed to connect wallet.");
    }
  };

  // Fetch balance
  const getBalance = async (walletAddress, provider) => {
    try {
      const balance = await provider.getBalance(walletAddress);
      setBalance(ethers.formatEther(balance));
    } catch (err) {
      setError("Failed to fetch balance.");
    }
  };

  // Auto-connect if already authorized
  useEffect(() => {
    const autoConnect = async () => {
      if (window.ethereum && window.ethereum.selectedAddress) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setAccount(window.ethereum.selectedAddress);
        getBalance(window.ethereum.selectedAddress, provider);

        // Redirect to homepage if already logged in
        navigate("/");
      }
    };
    autoConnect();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-6">
      <div className="bg-zinc-900 p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">MetaMask Login</h2>
        {account ? (
          <>
            <p className="text-lg font-mono bg-gray-700 p-2 rounded">{account}</p>
            <p className="mt-3 text-lg">
              <span className="font-semibold text-green-400">Balance:</span> {balance} ETH
            </p>
          </>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition"
          >
            Login with MetaMask
          </button>
        )}
        {error && <p className="mt-4 text-red-400">{error}</p>}
      </div>
    </div>
  );
};

export default WalletAuth;
