export const problems = [
  {
    id: 1,
    title: "Escrow Contract",
    description:
      "Implement an escrow contract where a buyer can deposit ETH, and the seller can withdraw it after buyer approval.",
    difficulty: "Hard",
    category: "Solidity",
    path: "sol",
    solved: false,
    codeTemplate: `
// Escrow Contract
pragma solidity ^0.8.0;

contract Escrow {
    function deposit() external payable {}
    function approveRelease() external {}
    function dispute() external {}
}`,
    Requirements:
      "The buyer deposits ETH.\nThe seller can only withdraw if the buyer approves.\nThe contract should have a dispute mechanism to refund the buyer.",
  },
  {
    id: 2,
    title: "Token Vesting Contract",
    description:
      "Create a contract that vests tokens over time for an employee.",
    difficulty: "Medium",
    category: "Solidity",
    path: "sol",
    solved: false,
    codeTemplate: `// Token Vesting Contract
pragma solidity ^0.8.0;

contract TokenVesting {
    function lockTokens(address employee, uint256 amount) external {}
    function withdrawTokens() external {}
}`,
    Requirements:
      "Employer locks tokens for the employee.\nEmployee can withdraw only after a certain time.\nTokens should be withdrawn in equal portions over time.",
  },
  {
    id: 3,
    title: "Token Vesting Contract",
    description:
      "Implement a module that locks MOVE coins for an employee and releases them over time.",
    difficulty: "Hard",
    category: "Move",
    path: "move",
    solved: false,
    codeTemplate: `// Token Vesting Contract
module vesting {
    public fun lock_tokens(employer: &signer, employee: address, amount: u64) {}
    public fun withdraw_tokens(employee: &signer) {}
}`,
    Requirements:
      "Employer deposits coins.\nEmployee can claim a portion after a set time.",
  },
  {
    id: 4,
    title: "NFT Marketplace",
    description:
      "Implement an NFT marketplace where users can list, buy, and transfer NFTs.",
    difficulty: "Hard",
    category: "Solidity",
    path: "sol",
    solved: false,
    codeTemplate: `// NFT Marketplace
pragma solidity ^0.8.0;

contract NFTMarketplace {
    function listNFT(uint256 tokenId, uint256 price) external {}
    function buyNFT(uint256 tokenId) external payable {}
    function transferOwnership(uint256 tokenId, address newOwner) external {}
}`,
    Requirements:
      "Seller lists an NFT.\nBuyer purchases it by paying ETH.\nOwnership transfers automatically.",
  },
  {
    id: 5,
    title: "NFT Marketplace",
    description: "Implement a marketplace for NFTs in Move.",
    difficulty: "Medium",
    category: "Move",
    path: "move",
    solved: false,
    codeTemplate: `// NFT Marketplace
module nft_marketplace {
    public fun list_nft(owner: &signer, token_id: u64, price: u64) {}
    public fun buy_nft(buyer: &signer, token_id: u64) {}
}
`,
    Requirements: "NFT owner can list an NFT.\nBuyer can purchase the NFT.",
  },
  {
    id: 6,
    title: "Escrow Contract",
    description:
      "Implement a simple escrow module where a buyer can lock MOVE coins, and the seller can withdraw them after buyer approval.",
    difficulty: "Hard",
    category: "Move",
    path: "move",
    solved: false,
    codeTemplate: `// Escrow Contract
module escrow {
    public fun deposit(buyer: &signer, amount: u64) {}
    public fun approve_release(buyer: &signer) {}
    public fun dispute(buyer: &signer) {}
}`,
    Requirements:
      "Buyer deposits funds.\nBuyer must approve for seller withdrawal.\nBuyer can dispute to get a refund.",
  },
  {
    id: 7,
    title: "Decentralized Voting System",
    description: " Create a contract for decentralized voting.",
    difficulty: "Medium",
    category: "Solidity",
    path: "sol",
    solved: false,
    codeTemplate: `// Decentralized Voting System
pragma solidity ^0.8.0;

contract Voting {
    function registerVoter(address voter) external {}
    function vote(uint256 candidateId) external {}
    function getResults() external view returns (uint256[] memory) {}
}`,
    Requirements:
      "Users can register to vote.\nOnly registered users can vote.\nVotes are counted automatically.",
  },
  {
    id: 8,
    title: "Decentralized Voting System",
    description:
      "Implement a voting system where registered users can vote on-chain.",
    difficulty: "Medium",
    category: "Move",
    path: "move",
    solved: false,
    codeTemplate: `//Decentralized Voting System
module voting {
    public fun register_voter(admin: &signer, voter: address) {}
    public fun vote(voter: &signer, candidate_id: u64) {}
    public fun get_results(): vector<u64> { 
        return vector[]; 
    }
}`,
    Requirements: "Users must register before voting.\nVotes are immutable.",
  },
  {
    id: 10,
    title: "Rate-Limited Faucet",
    description:
      "Create a faucet contract that allows users to claim ETH but limits how often they can claim.",
    difficulty: "Hard",
    category: "Solidity",
    path: "sol",
    solved: false,
    codeTemplate: `// Rate-Limited Faucet
pragma solidity ^0.8.0;

contract Faucet {
    function claimTokens() external {}
}`,
    Requirements:
      "Users can claim ETH once every 24 hours.\nUsers trying to claim before 24 hours should fail.",
  },
  {
    id: 11,
    title: "Rate-Limited Faucet",
    description: "Implement a rate-limited faucet in Move.",
    difficulty: "Easy",
    category: "Move",
    path: "move",
    solved: false,
    codeTemplate: `//Rate-Limited Faucet
module faucet {
    public fun claim_tokens(user: &signer) {}
}`,
    Requirements: "Users can claim MOVE coins only once per day.",
  },
];
