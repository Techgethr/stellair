import { Keypair, Asset, TransactionBuilder, Networks, BASE_FEE, Operation, rpc } from "@stellar/stellar-sdk";

export async function sendXLM(destination: string, amount: string){
  
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
    
    const sourceKeypair = Keypair.fromSecret(process.env.WALLET_SECRETKEY);
    const server = new rpc.Server(process.env.STELLAR_SERVER);


    const sourceAccount = await server.getAccount(sourceKeypair.publicKey());
    const networkSelected = process.env.STELLAR_NETWORK == "futurenet" ? Networks.FUTURENET: (process.env.STELLAR_NETWORK == "testnet"? Networks.TESTNET : Networks.PUBLIC);

    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE
    })
    .setNetworkPassphrase(networkSelected)
      .addOperation(
        Operation.payment({
          destination: destination,
          asset: Asset.native(),
          amount: amount, 
        })
      )
      .setTimeout(30)
      .build();

    transaction.sign(sourceKeypair);

    const result = await server.sendTransaction(transaction);

    return `The payment was made successfully, with the hash ${result.hash}`
}


export async function sendAsset(destination: string, amount: string, token: string, issuer: string){
  
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
    
    const sourceKeypair = Keypair.fromSecret(process.env.WALLET_SECRETKEY);
    const server = new rpc.Server(process.env.STELLAR_SERVER);

    const sourceAccount = await server.getAccount(sourceKeypair.publicKey());

    const asset = new Asset(token,issuer);
    const networkSelected = process.env.STELLAR_NETWORK == "futurenet" ? Networks.FUTURENET: (process.env.STELLAR_NETWORK == "testnet"? Networks.TESTNET : Networks.PUBLIC);

    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE
    })
    .setNetworkPassphrase(networkSelected)
      .addOperation(
        Operation.payment({
          destination: destination,
          asset: asset,
          amount: amount, 
        })
      )
      .setTimeout(30)
      .build();

    transaction.sign(sourceKeypair);

    const result = await server.sendTransaction(transaction);

    return `The payment was made successfully, with the hash ${result.hash}`
}