import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { abi } from '../abi';
import { CONTRACT_ADDRESS } from '../config';

function Admin() {
  const [bids, setBids] = useState([]);
  const [collateralTokens, setCollateralTokens] = useState([]);
  const [newToken, setNewToken] = useState('');
  const [approval, setApproval] = useState(false);

  useEffect(() => {
    fetchAllBids();
    fetchCollateralTokens();
  }, []);

  const fetchAllBids = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

    try {
      const allBids = []; // Replace this with your method to get all bids
      // Assuming you have a way to get all loan IDs
      const loanIds = await contract.getAllLoanIds();
      for (let loanId of loanIds) {
        const loanBids = await contract.getAllBidsForProposedLoan(loanId);
        allBids.push(...loanBids);
      }
      setBids(allBids);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCollateralTokens = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

    try {
      const tokens = []; // Replace this with your method to get approved tokens
      // Assuming you have a way to get all tokens
      const tokenList = await contract.getApprovedTokens();
      setCollateralTokens(tokenList);
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
      const tx = await contract.approvedOrDenyCollateralToken(newToken, approval);
      await tx.wait();
      alert('Collateral token updated successfully!');
      fetchCollateralTokens(); // Refresh the list of tokens
    } catch (error) {
      console.error(error);
      alert('An error occurred while updating the collateral token.');
    }
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <div>
        <h3>All Bids</h3>
        {bids.length > 0 ? (
          bids.map((bid, index) => (
            <div key={index}>
              <p>Lender: {bid.lender}</p>
              <p>APR Offer: {bid.APRoffer}</p>
              <p>Loan ID: {bid.loanId}</p>
              <p>Accepted: {bid.accepted ? 'Yes' : 'No'}</p>
            </div>
          ))
        ) : (
          <p>No bids available</p>
        )}
      </div>
      <div>
        <h3>Approved Collateral Tokens</h3>
        {collateralTokens.length > 0 ? (
          collateralTokens.map((token, index) => (
            <div key={index}>
              <p>Token Address: {token}</p>
            </div>
          ))
        ) : (
          <p>No collateral tokens available</p>
        )}
      </div>
      <div>
        <h3>Update Collateral Token</h3>
        <input
          type="text"
          placeholder="Token Address"
          value={newToken}
          onChange={(e) => setNewToken(e.target.value)}
        />
        <label>
          Approve
          <input
            type="radio"
            name="approval"
            checked={approval === true}
            onChange={() => setApproval(true)}
          />
        </label>
        <label>
          Deny
          <input
            type="radio"
            name="approval"
            checked={approval === false}
            onChange={() => setApproval(false)}
          />
        </label>
        <button onClick={updateCollateralToken}>Update Token</button>
      </div>
    </div>
  );
}

export default Admin;
