
/**
 * Arguments for the get_balance tool
 */
export interface GetBalanceArgs {
  /**
   * The wallet to get the balance of
   */
  wallet: string;
}

/**
 * Arguments for the search_hash tool
 */
 export interface SearchHashArgs {
  /**
   * The hash to search
   */
  hash: string;
}

export interface CancelCheckArgs {
  checkId: string;
}

export interface CancelOfferArgs {
  sequenceId: string;
}

export interface CreateOfferArgs {
  amount_from: string;
  amount_to: string;
  token_from?: string;
  token_to?: string;
}

export interface CreateAMMArgs {
  amount_from: string;
  amount_to: string;
  token_from?: string;
  token_to?: string;
  tradingfee?:string
}

export interface GetAMMArgs {
  token_from: string;
  token_to: string;
}

// No arguments needed since we're getting the connected wallet
export interface GetWalletAddressArgs {}

export interface SendTransactionArgs {
  /**
   * The recipient address
   */
  to: string;
  /**
   * The amount to send (in XRP, or token if applicable)
   */
  value: string;
  /**
   * The token Id to use for the transaction
   */
  token?: string;
}
