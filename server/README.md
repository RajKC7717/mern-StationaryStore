Setup

1. Copy `.env.example` to `.env` and fill values.
2. Run `npm run dev`.

API

- GET `/api/health` – server status
- POST `/api/auth/register` – body: { email, name, password }
- POST `/api/auth/login` – body: { email, password } → { token, user }
- GET `/api/products` – list products (public)
- POST `/api/products` – create (requires Bearer token)
- GET `/api/products/:id` – read (requires Bearer token)
- PUT `/api/products/:id` – update (requires Bearer token)
- DELETE `/api/products/:id` – delete (requires Bearer token)


