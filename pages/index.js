 import { useState, useEffect } from "react";
 import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [AmountDep, setDepositAmount] = useState(0);
  const [AmountWith, setWithdrawAmount] = useState(0);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      getBalance();
    }
  };
  const handleDepositInputChange = (event) => {
    setDepositAmount(event.target.value);
  };

  const handleWithdrawInputChange = (event) => {
    setWithdrawAmount(event.target.value);
  };

  const deposit5 = async () => {
    if (atm) {
      let tx = await atm.deposit(5);
      await tx.wait();
      getBalance();
    }
  };

  const deposit10 = async () => {
    if (atm) {
      let tx = await atm.deposit(10);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw5 = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw10 = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      getBalance();
    }
  };

  const depositWithUserInput = async () => {
    if (atm && AmountDep > 0) {
      let tx = await atm.deposit(AmountDep);
      await tx.wait();
      getBalance();
    }
  };

  const withdrawWithUserInput = async () => {
    if (atm && AmountWith > 0) {
      let tx = await atm.withdraw(AmountWith);
      await tx.wait();
      getBalance();
    }
  };
  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Connect your Metamask wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div className="atm-container">
        <p className="account-info">Your Account: {account}</p>
        <p className="account-info">Your Balance: {balance} ETH</p>
        <div className="button-group">
          <button onClick={deposit} className="deposit-button">Deposit 1 ETH</button>
          <button onClick={withdraw} className="withdraw-button">Withdraw 1 ETH</button>
        </div>
        <div className="button-group">
          <button onClick={deposit5} className="deposit-button">Deposit 5 ETH</button>
          <button onClick={withdraw5} className="withdraw-button">Withdraw 5 ETH</button>
        </div>
        <div className="button-group">
          <button onClick={deposit10} className="deposit-button">Deposit 10 ETH</button>
          <button onClick={withdraw10} className="withdraw-button">Withdraw 10 ETH</button>
        </div>
        <div className="input-group">
          <label htmlFor="deposit-amount">Deposit Amount:</label>
          <input type="number" id="deposit-amount" onChange={handleDepositInputChange} />
          <button onClick={depositWithUserInput} className="deposit-button">Deposit ETH</button>
        </div>
        <div className="input-group">
          <label htmlFor="withdraw-amount">Withdraw Amount:</label>
          <input type="number" id="withdraw-amount" onChange={handleWithdrawInputChange} />
          <button onClick={withdrawWithUserInput} className="withdraw-button">Withdraw ETH</button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header><h1 className="title">Metacrafters ATM</h1></header>
      {initUser()}
      <style jsx>{`
        body {
          background-color: black;
        }
        .container {
          text-align: center;
          background-color: lightblue;
          color: black;
          margin: 50px;
          padding: 100px;
        }

        .title {
          margin-bottom: 60px;
        }

        .atm-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          border-radius: 20px;
        }

        .account-info {
          margin-bottom: 10px;
        }

        button-group {
          margin-bottom: 10px;
          display: flex;
          justify-content: center;
        }
    
        .deposit-button,
        .withdraw-button {
          padding: 10px 20px;
          margin: 0 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          background-color: #007bff; /* Blue */
          color: white;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }
    
        .deposit-button:hover,
        .withdraw-button:hover {
          background-color: #0056b3; /* Darker blue */
        }
    
      `}</style>
    </main>
  );
}