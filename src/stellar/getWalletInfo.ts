import { Keypair, rpc} from '@stellar/stellar-sdk';
import axios from "axios";

/**
 * Get the address from the secret key in the environment file
 *
 *
 * @returns The Stellar address
 */
export async function getAddress() {
  // Check if the mnemonic environment variable is set
  if (!process.env.WALLET_SECRETKEY) {
    throw new Error(
      "WALLET_SECRETKEY environment variable is not set. You need to set it to create a wallet client."
    );
  }

  const wallet = Keypair.fromSecret(process.env.WALLET_SECRETKEY);

  return `Address: ${wallet.publicKey()}`;
}


/**
 * Get the native balance (XLM) from an address
 *
 *
 * @returns The XLM balance
 */
 export async function getNativeBalanceFromAddress(address:string) {
    // Check if the mnemonic environment variable is set
    if (!process.env.WALLET_SECRETKEY) {
      throw new Error(
        "WALLET_SECRETKEY environment variable is not set. You need to set it to create a wallet client."
      );
    }

    if (!process.env.STELLAR_SERVER) {
      throw new Error(
        "STELLAR_SERVER environment variable is not set. You need to set it to create a wallet client."
      );
    }

    const response = await axios.get(
      `${process.env.STELLAR_SERVER}/accounts/${address}`
    );

    const nativeBalance = response.data.balances.find(
      (balance: any) => balance.asset_type === "native"
    );

    return nativeBalance.balance;
}


/**
 * Get the token balances from an address
 *
 *
 * @returns The token balances
 */
 export async function getTokenBalancesFromAddress(address:string) {

    if (!process.env.STELLAR_SERVER) {
      throw new Error(
        "STELLAR_SERVER environment variable is not set. You need to set it to create a wallet client."
      );
    }

    const response = await axios.get(
      `${process.env.STELLAR_SERVER}/accounts/${address}`
    );

    const nonNativeBalances = response.data.balances.filter(
      (balance: any) => balance.asset_type !== "native"
    );

    return nonNativeBalances.map((token) => `Currency code: ${token.asset_code}, Amount: ${token.balance}, Issuer: ${token.asset_issuer}, Authorized to use the asset:${token.is_authorized}`).join("\n") ;
}



export async function getLast10Transactions(account: string) {
  if (!process.env.STELLAR_SERVER) {
    throw new Error(
      "STELLAR_SERVER environment variable is not set. You need to set it to create a wallet client."
    );
  }


  const response = await axios.get(
    `${process.env.STELLAR_SERVER}/accounts/${account}/transactions?order=desc&limit=10`
  );

  // Extrae las transacciones desde la respuesta
  const transactions = response.data._embedded.records;

  return transactions.map((tx: any) => `Memo: ${tx.memo}, Hash: ${tx.hash}, Date: ${tx.created_at}, From: ${tx.source_account}`).join("\n");
}

