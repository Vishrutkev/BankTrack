export interface PlaidItem {
  item_id: string;
  access_token: string;
  products: string[];
}

export interface PlaidLinkToken {
  expiration: string;
  link_token: string;
  request_id: string;
}

export interface AccessTokenResponse {
  access_token: string;
  item_id: string;
  error: null | string;
}
