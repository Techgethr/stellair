import { getWalletAddressTool } from "./getWalletAddress";
import { getBalanceTool } from "./getBalance";
import { getTokenBalancesTool } from "./getTokenBalances";
import { getTransactionsTool } from "./getTransactions";
import { sendTransactionTool } from "./sendTransaction";

export interface ToolConfig<T = any> {
  /**
   * The definition of the tool.
   */
  definition: {
    type: "function";
    function: {
      name: string;
      description: string;
      parameters: {
        type: "object";
        properties: Record<string, unknown>;
        required: string[];
      };
    };
  };

  /**
   * The handler function that will be called when the tool is executed.
   */
  handler: (args: T) => Promise<any>;
}

export const tools: Record<string, ToolConfig> = {
  // == READ == \\
  /**
   * Get the connected wallet address.
   */
  get_wallet_address: getWalletAddressTool,
  /**
   * Get the balance of a wallet address.
   */
   get_balance: getBalanceTool,
  /**
   * Get the token balances of a wallet address.
   */
   get_token_balances: getTokenBalancesTool,
  /**
   * Get the last transactions of a wallet address.
   */
   get_transactions: getTransactionsTool,

  /**
   * Send payment
   */
   send_transaction: sendTransactionTool,
};
