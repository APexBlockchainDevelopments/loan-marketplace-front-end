import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { abi } from '../abi';
import { CONTRACT_ADDRESS } from '../config';

function Lender() {
  const [bids, setBids] = useState([]);
  const [loanId, setLoanId] = useState('');
  const [APRoffer, setAPRoffer] = useState('');
  const [accountExists, setAccountExists] = useState(false);
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    checkAccountExists();
    fetchAllLoans();
  }, []);

  const handleInputChange = (e) => {
    if (e.target.name === 'loanId') {
      setLoanId(e.target.value);
    } else {
      setAPRoffer(e.target.value);
    }
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

  const createBid = async () => {
    if (!window.ethereum) return alert('Please install MetaMask.');

    if (!accountExists) {
      return alert('Please create an account first.');
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

    try {
      const tx = await contract.createBid(
        loanId,
        APRoffer
      );
      await tx.wait();
      alert('Bid created successfully!');
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating the bid.');
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

  const fetchAllLoans = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

    try {
      const totalLoans = await contract.totalNumberOfLoans();
      const fetchedLoans = [];

      for (let i = 0; i < totalLoans; i++) {
        const loan = await contract.getLoan(i);
        fetchedLoans.push(loan);
      }

      setLoans(fetchedLoans);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Lender Page</h1>
      {accountExists ? (
        <>
          <div>
            <h2>Create Bid</h2>
            <input
              type="text"
              name="loanId"
              value={loanId}
              onChange={handleInputChange}
              placeholder="Loan ID"
            />
            <input
              type="text"
              name="APRoffer"
              value={APRoffer}
              onChange={handleInputChange}
              placeholder="APR Offer"
            />
            <button onClick={createBid}>Create Bid</button>
          </div>

          <div>
            <h2>All Loans</h2>
            {loans.length > 0 ? (
              <ul>
                {loans.map((loan, index) => (
                  <li key={index}>
                    <p>Loan ID: {loan.loanId.toString()}</p>
                    <p>Borrower: {loan.borrower}</p>
                    <p>Amount: {loan.amount.toString()}</p>
                    <p>Duration: {loan.duration.toString()} seconds</p>
                    <p>Collateral Token: {loan.collateralToken}</p>
                    <p>Collateral Amount: {loan.collateralAmount.toString()}</p>
                    <p>Loan Status: {loan.loanStatus}</p>
                    <p>Bid ID: {loan.bid.bidId.toString()}</p>
                    <p>Bid APR Offer: {loan.bid.APRoffer.toString()}</p>
                    <button onClick={() => fetchBids(loan.loanId.toString())}>View Bids</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No loans available.</p>
            )}
          </div>
        </>
      ) : (
        <div>
          <h2>Create Account</h2>
          <button onClick={createAccount}>Create Account</button>
        </div>
      )}
    </div>
  );
}

export default Lender;
