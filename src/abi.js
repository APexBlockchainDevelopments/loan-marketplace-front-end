export const abi = [
    {
        "type": "constructor",
        "inputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "fallback",
        "stateMutability": "payable"
    },
    {
        "type": "receive",
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "approvedOrDenyCollateralToken",
        "inputs": [
            {
                "name": "_token",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "_approval",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "calculateInterest",
        "inputs": [
            {
                "name": "_amount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_apr",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_duration",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "calculatePlatformFees",
        "inputs": [
            {
                "name": "_collateralAmount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "checkIfTokenIsApprovedForCollateral",
        "inputs": [
            {
                "name": "_token",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "claimCollateral",
        "inputs": [
            {
                "name": "_loanId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "claimERC20",
        "inputs": [
            {
                "name": "_token",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "_amount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "createBid",
        "inputs": [
            {
                "name": "_loanId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_APRoffer",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "getAccount",
        "inputs": [
            {
                "name": "accountAddress",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct Library.Account",
                "components": [
                    {
                        "name": "wallet",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "accountId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "creationTimeStamp",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "totalAmountBorrowed",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "requestedLoans",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "successfulLoansCompletedAndRepaid",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "totalAmountRepaid",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "totalAmountLent",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "loanBids",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "totalLoans",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getAllBidsForProposedLoan",
        "inputs": [
            {
                "name": "_loanId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct Library.Bid[]",
                "components": [
                    {
                        "name": "bidId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "loanId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "lender",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "APRoffer",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "timeStamp",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "accepted",
                        "type": "bool",
                        "internalType": "bool"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getAllLoansBasedOnBorrower",
        "inputs": [
            {
                "name": "_borrower",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256[]",
                "internalType": "uint256[]"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getBid",
        "inputs": [
            {
                "name": "loanId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "bidId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct Library.Bid",
                "components": [
                    {
                        "name": "bidId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "loanId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "lender",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "APRoffer",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "timeStamp",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "accepted",
                        "type": "bool",
                        "internalType": "bool"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getBids",
        "inputs": [
            {
                "name": "lender",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256[2][]",
                "internalType": "uint256[2][]"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getLoan",
        "inputs": [
            {
                "name": "loanId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct Library.Loan",
                "components": [
                    {
                        "name": "loanStatus",
                        "type": "uint8",
                        "internalType": "enum Library.LoanStatus"
                    },
                    {
                        "name": "loanId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "borrower",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "loanToken",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "amount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "creationTimeStamp",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "duration",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "startTime",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "collateralToken",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "collateralAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "bids",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "bid",
                        "type": "tuple",
                        "internalType": "struct Library.Bid",
                        "components": [
                            {
                                "name": "bidId",
                                "type": "uint256",
                                "internalType": "uint256"
                            },
                            {
                                "name": "loanId",
                                "type": "uint256",
                                "internalType": "uint256"
                            },
                            {
                                "name": "lender",
                                "type": "address",
                                "internalType": "address"
                            },
                            {
                                "name": "APRoffer",
                                "type": "uint256",
                                "internalType": "uint256"
                            },
                            {
                                "name": "timeStamp",
                                "type": "uint256",
                                "internalType": "uint256"
                            },
                            {
                                "name": "accepted",
                                "type": "bool",
                                "internalType": "bool"
                            }
                        ]
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getSelectedBid",
        "inputs": [
            {
                "name": "_loandId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct Library.Bid",
                "components": [
                    {
                        "name": "bidId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "loanId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "lender",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "APRoffer",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "timeStamp",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "accepted",
                        "type": "bool",
                        "internalType": "bool"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "makeNewAccount",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "renounceOwnership",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "repayLoan",
        "inputs": [
            {
                "name": "_loanId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "selectBid",
        "inputs": [
            {
                "name": "_loanId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_selectedBid",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "submitLoanRequest",
        "inputs": [
            {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "tokenToBorrow",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "duration",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "collateralToken",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "collateralAmount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "totalNumberOfLoans",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "transferOwnership",
        "inputs": [
            {
                "name": "newOwner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "OwnershipTransferred",
        "inputs": [
            {
                "name": "previousOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "error",
        "name": "OwnableInvalidOwner",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "OwnableUnauthorizedAccount",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ]
    }
];