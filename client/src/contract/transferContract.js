export const contractABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "address", name: "from", type: "address" },
      { indexed: false, internalType: "address", name: "to", type: "address" },
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "TransferToContract",
    type: "event",
    signature: "0x7d4e64485497e4e512210a79d8c8eb0fa0f85677b0dbce7eccdd742b36c16739",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "address", name: "from", type: "address" },
      { indexed: false, internalType: "address", name: "to", type: "address" },
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "TransferToOwner",
    type: "event",
    signature: "0x6810a44383363f6c655b7b4bd827e3395efa504e1df1c94de2f077f101e21445",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "buyerBalances",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0xd1cb5df0",
  },
  { stateMutability: "payable", type: "receive", payable: true },
  {
    inputs: [{ internalType: "address", name: "_owner", type: "address" }],
    name: "transferToContract",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
    signature: "0xec11a00d",
  },
  {
    inputs: [
      { internalType: "address payable", name: "_owner", type: "address" },
      { internalType: "address", name: "_buyer", type: "address" },
    ],
    name: "transferToOwner",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
    signature: "0x73155d33",
  },
  {
    inputs: [],
    name: "getBalanceOfContract",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0x22968885",
  },
];

export const contractAddress = "0xf38bd627356987d6cbdb4adbfc5412a87f921075";
