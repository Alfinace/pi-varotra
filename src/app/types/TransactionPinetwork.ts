export interface Link {
  href: string;
  templated?: boolean;
}

export interface Links {
  [key: string]: Link;
}

export interface TransactionPinework {
  memo: string;
  memo_bytes: string;
  _links: Links;
  id: string;
  paging_token: string;
  successful: boolean;
  hash: string;
  ledger: number;
  created_at: string;
  source_account: string;
  source_account_sequence: string;
  fee_account: string;
  fee_charged: string;
  max_fee: string;
  operation_count: number;
  envelope_xdr: string;
  result_xdr: string;
  result_meta_xdr: string;
  fee_meta_xdr: string;
  memo_type: string;
  signatures: string[];
  valid_after: string;
  valid_before: string;
  preconditions: {
    timebounds: {
      min_time: string;
      max_time: string;
    };
  };
}
