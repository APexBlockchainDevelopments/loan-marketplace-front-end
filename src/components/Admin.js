import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { abi } from '../abi';
import { CONTRACT_ADDRESS } from '../config';

function Admin() {
  const [bids, setBids] = useState([]);
  const [approvedTokens, setApprovedTokens] = useState([]);
  const [tokenAddress, setTokenAddress] = useState('');
  const [approvalStatus, setApprovalStatus] = useState(true);
  const [loans, setLoans] = useState([]);


  ///need to re config, need to update contract address

  useEffect(() => {
    fetchApprovedTokens();
    fetchAllLoans();
  }, []);

  const handleTokenInputChange = (e) => {
    setTokenAddress(e.target.value);
  };

  const handleApprovalChange = (e) => {
    setApprovalStatus(e.target.checked);
  };

  const fetchApprovedTokens = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

    try {
      const approvedTokensList = []; // Fetch and populate this list
      setApprovedTokens(approvedTokensList);
    } catch (error) {
      console.error(error);
    }
  };

  const updateCollateralToken = async () => {
    if (!window.ethereum) return alert('Please install MetaMask.');

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

    try {
      const tx = await contract.approvedOrDenyCollateralToken(tokenAddress, approvalStatus);
      await tx.wait();
      alert('Collateral token updated successfully!');
      fetchApprovedTokens();
    } catch (error) {
      console.error(error);
      alert('An error occurred while updating the collateral token.');
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
      <h1>Admin Page</h1>
      <div>
        <h2>Update Collateral Token</h2>
        <input
          type="text"
          value={tokenAddress}
          onChange={handleTokenInputChange}
          placeholder="Token Address"
        />
        <label>
          <input
            type="checkbox"
            checked={approvalStatus}
            onChange={handleApprovalChange}
          />
          Approve
        </label>
        <button onClick={updateCollateralToken}>Update Token</button>
      </div>
      <div>
        <h2>Approved Tokens</h2>
        <ul>
          {approvedTokens.map((token, index) => (
            <li key={index}>{token}</li>
          ))}
        </ul>
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
    </div>
  );
}

export default Admin;
