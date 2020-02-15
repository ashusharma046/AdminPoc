## Setup
- `npm install`
- `cp dev.env .env`
- `npm i -g foreman` (if you don't have it globally installed already)
- `make client`

## Auth0

If you don't have an Auth0 account, create a new one, add the required .env vars.

Make sure in your Settings tab on Auth0's site to set callback url's to `http://localhost:8011/login` and
allowed origins to `http://localhost:8011`