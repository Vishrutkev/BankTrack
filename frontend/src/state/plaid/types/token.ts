export interface PlaidItem {
  products: string[];
}

export interface PlaidLinkToken {
  expiration: string;
  link_token: string;
  request_id: string;
}

export interface AccessTokenResponse {
  user: string;
}
