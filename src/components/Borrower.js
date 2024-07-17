import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { abi } from '../abi';
import { CONTRACT_ADDRESS } from '../config';

function Borrower() {
  const [loanDetails, setLoanDetails] = useState({
    amount: '',
    tokenToBorrow: '',
    duration: '',
    collateralToken: '',
    collateralAmount: ''
  });
  const [bids, setBids] = useState([]);
  const [accountExists, setAccountExists] = useState(false);

  useEffect(() => {
    checkAccountExists();
  }, []);

  const handleInputChange = (e) => {
    setLoanDetails({
      ...loanDetails,
      [e.target.name]: e.target.value
    });
  };

  const checkAccountExists = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

    try {
      const accounts = await provider.listAccounts();
      if (accounts.length === 0) {
        setAccountExists(false);
        return;
      }

      const account = await contract.getAccount(accounts[0]);
      setAccountExists(account.wallet !== ethers.constants.AddressZero);
    } catch (error) {
      console.error(error);
      setAccountExists(false);
    }
  };

  const createAccount = async () => {
    if (!window.ethereum) return alert('Please install MetaMask.');

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

    try {
      const tx = await contract.makeNewAccount();
      await tx.wait();
      alert('Account created successfully!');
      setAccountExists(true);
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating the account.');
    }
  };

  const requestLoan = async () => {
    if (!window.ethereum) return alert('Please install MetaMask.');

    if (!accountExists) {
      return alert('Please create an account first.');
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

    try {
      const tx = await contract.submitLoanRequest(
        ethers.utils.parseEther(loanDetails.amount),
        loanDetails.tokenToBorrow,
        loanDetails.duration,
        loanDetails.collateralToken,
        ethers.utils.parseEther(loanDetails.collateralAmount)
      );
      await tx.wait();
      alert('Loan requested successfully!');
    } catch (error) {
      console.error(error);
      alert('An error occurred while requesting the loan.');
    }
  };

  const fetchBids = async (loanId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

    try {
      const fetchedBids = await contract.getAllBidsForProposedLoan(loanId);
      setBids(fetchedBids);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Borrower Page</h2>
      <div>
        {!accountExists && (
          <button onClick={createAccount}>Create Account</button>
        )}
        {accountExists && (
          <div>
            <input type="text" name="amount" placeholder="Amount" value={loanDetails.amount} onChange={handleInputChange} />
            <input type="text" name="tokenToBorrow" placeholder="Token to Borrow" value={loanDetails.tokenToBorrow} onChange={handleInputChange} />
            <input type="text" name="duration" placeholder="Duration (seconds)" value={loanDetails.duration} onChange={handleInputChange} />
            <input type="text" name="collateralToken" placeholder="Collateral Token" value={loanDetails.collateralToken} onChange={handleInputChange} />
            <input type="text" name="collateralAmount" placeholder="Collateral Amount" value={loanDetails.collateralAmount} onChange={handleInputChange} />
            <button onClick={requestLoan}>Request Loan</button>
          </div>
        )}
      </div>
      <div>
        <h3>Bids</h3>
        {bids.length > 0 ? (
          bids.map((bid, index) => (
            <div key={index}>
              <p>Lender: {bid.lender}</p>
              <p>APR Offer: {bid.APRoffer}</p>
              <button>Select Bid</button>
            </div>
          ))
        ) : (
          <p>No bids available</p>
        )}
      </div>
    </div>
  );
}

export default Borrower;
