import { ethers } from "ethers";
import TempleRegistryABI from "@/app/abis/TempleRegistry.json"; // Path to your ABI

const CONTRACT_ADDRESS = "0x5EE178dAB6Aa2e90a847C117f0F925d4aC45E4E2"; // Replace with deployed address

export const getTempleRegistryContract = (signerOrProvider: ethers.Signer | ethers.Provider) => {
  return new ethers.Contract(CONTRACT_ADDRESS, TempleRegistryABI, signerOrProvider);
};

export const SUPER_ADMIN = "0x2973CCafB0A9b0439a80d082d9c5ACf254033dF7";
