import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { OrbitingCirclesDemo } from "./Orbits";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { HeroScrollDemo } from "./showcase";
import { FeaturesSectionDemo } from "./Feature";
import FeaturesHeading from "./featuresHeading";
import { UserContext } from "../../context/userContext";

export default function LandingPage() {
  const [walletAddress, setWalletAddress] = useState("");
  const { loginUser } = useContext(UserContext);

  // Check if MetaMask is already connected
  useEffect(() => {
    const checkIfWalletConnected = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.send("eth_accounts", []);
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            await loginUser({ address: accounts[0] });
          }
        } catch (error) {
          console.error("Error checking MetaMask connection:", error);
        }
      }
    };
    checkIfWalletConnected();
  }, [loginUser]);

  // MetaMask Login Function
  const loginWithMetaMask = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install MetaMask.");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];
      setWalletAddress(address);
      await loginUser({ address });
      console.log("Logged in with MetaMask:", address);
    } catch (error) {
      console.error("Error logging in with MetaMask:", error);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <div className="flex px-8 pt-16 gap-12 h-[550px]">
        <div className="flex-1 flex items-center justify-center">
          <DotPattern className={cn("[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]")} />
          <OrbitingCirclesDemo />
        </div>
        <div className="p-4 flex-1 mx-auto relative z-10 w-full pt-32 md:pt-0 pb-0">
          <DotPattern className={cn("[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]")} />
          <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            One Stop
            <br /> Destination to
            <br />
            Practice and <br/> Learn Development
          </h1>
          <p className="mt-4 font-normal text-base text-[20px] text-neutral-300/60 max-w-lg">
            Connect your MetaMask wallet and get started with development.
          </p>
          {!walletAddress ? (
            <RainbowButton className="mt-8 text-xl py-8 rounded-2xl italic" onClick={loginWithMetaMask}>
              <b>Login with MetaMask</b>
            </RainbowButton>
          ) : (
            <p className="mt-4 text-lg text-green-500">✅ Connected: {walletAddress}</p>
          )}
        </div>
      </div>
      <HeroScrollDemo />
      <FeaturesHeading />
      <FeaturesSectionDemo />
    </div>
  );
}
