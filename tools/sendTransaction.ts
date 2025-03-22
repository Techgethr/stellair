import { sendXLM, sendAsset } from "../src/stellar/makePayments";
import type { ToolConfig } from "./allTools.js"; // Type definition for tool configurations
import type { SendTransactionArgs } from "../interface/index.js"; // Type definition for send transaction arguments

// Configuration for the send transaction tool
export const sendTransactionTool: ToolConfig<SendTransactionArgs> = {
  definition: {
    type: "function",
    function: {
      name: "send_transaction",
      description: "Send a transaction to another address",
      parameters: {
        type: "object",
        properties: {
          to: {
            type: "string",
            description: "The recipient address",
          },
          value: {
            type: "string",
            description: "The amount of XLM to send",
          },
          
          token: {
            type: "string",
            description: "The contract/token Id of the token/coin to send",
            optional: true,
          },
          issuer: {
            type: "string",
            description: "The issuer of the token/coin to send",
            optional: true,
          },
        },
        required: ["to","value"],
      },
    },
  },
  // Handler function to execute the send transaction tool
  handler: async (args) => {
    const result = await sendTransaction(args);
    return result;
  },
};

// Function to send a transaction
async function sendTransaction({
  to,
  value,
  token,
  issuer
}: SendTransactionArgs) {
  try {
    let tx = null;
    if((token == undefined || token == "") || (issuer == undefined || issuer == "")) {
      tx = await sendXLM(value,to);
    } else {
      tx = await sendAsset(value,to, token, issuer);
    } 
    
    return tx;
    
    
  } catch (error) {
    // Handling errors and returning an error message
    //console.error(error);
    return `Failed to send transaction: ${error instanceof Error ? error.message : "Unknown error"}`
  }
}
