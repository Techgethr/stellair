import { getLast10Transactions } from "../src/stellar/getWalletInfo";
import type { ToolConfig } from "./allTools.js";

import type { GetBalanceArgs } from "../interface/index.js";

/**
 * Get the last transactions of a wallet.
 *
 * This tool takes a single parameter, the wallet address to get the last transactions
 * from.
 */
export const getTransactionsTool: ToolConfig<GetBalanceArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_transactions",
      description: "Get the last transactions of a wallet",
      parameters: {
        type: "object",
        properties: {
          wallet: {
            type: "string",
            //pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The wallet address to get the balance from",
          },
        },
        required: ["wallet"],
      },
    },
  },
  handler: async ({ wallet }) => {
    return await getTransactions(wallet);
  },
};

async function getTransactions(wallet: string) {
  const balance = await getLast10Transactions(wallet);
  return balance;
}
