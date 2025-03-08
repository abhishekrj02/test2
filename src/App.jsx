import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import "./index.css";
import { UserProvider } from "./context/userContext";
import Auth from "./pages/AuthPage/AuthPage";
import ProblemLayout from "./pages/ProblemLayout/ProblemLayout";
import Navbar from "./components/Loader/Navbar";
import ProblemsList from "./pages/ProblemsList/ProblemsList";
import { Spotlight } from "./components/ui/spotlight";
import LandingPage from "./pages/LandingPage/LandingPage";
import ProfileDashboard from "./pages/ProfilePage/Profile";

export default function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const navigate = useNavigate();

  // Check if MetaMask wallet is already connected
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.send("eth_accounts", []);
          if (accounts.length > 0) {
            setWalletConnected(true);
          } else {
            navigate("/auth"); // Redirect if no wallet is connected
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
          navigate("/auth");
        }
      } else {
        navigate("/auth"); // Redirect if MetaMask is not installed
      }
    };

    checkWalletConnection();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="bg-black overflow-y-hidden w-full min-h-screen">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

        <UserProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/problem/:lang/:id" element={<ProblemLayout />} />
            <Route path="/problems" element={<ProblemsList />} />
            <Route path="/profile" element={<ProfileDashboard />} />
          </Routes>
        </UserProvider>
      </div>
    </>
  );
}
