import { getAddress } from "../src/stellar/getWalletInfo.js";
import type { ToolConfig } from "./allTools.js";

import type { GetWalletAddressArgs } from "../interface/index.js";

/**
 * Gets the connected wallet address.
 */
export const getWalletAddressTool: ToolConfig<GetWalletAddressArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_wallet_address",
      description: "Get the connected wallet address",
      // No parameters needed since we're getting the connected wallet
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
  handler: async () => {
    return await getWalletAddress();
  },
};

/**
 * Gets the connected wallet address.
 */
async function getWalletAddress(): Promise<string> {
  const address = await getAddress();
  return address;
}
