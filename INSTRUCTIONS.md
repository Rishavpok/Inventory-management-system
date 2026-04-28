# Electronics Inventory Management System

## Project Overview
This project is a demo-ready, frontend-only Inventory Management System for Electronics Products. It is built using React 18+ with TypeScript, utilizing React Router v6 for navigation and Zustand for global state management. The app implements a clean, white/light theme with a fixed sidebar layout and requires no external heavy UI libraries.

---

## Folder Structure

```
/src
  /components       → Reusable UI components (Sidebar, Header, Badge, Form controls) & CSS Modules
  /pages            → Top-level page views (Login, Dashboard, Products, etc.) & CSS Modules
  /store            → Zustand store files (authStore.ts, inventoryStore.ts)
  /types            → Global TypeScript interfaces (Category, Product, StockHistory, Sale)
  /data             → Mock data representing database state
  /utils            → (Empty placeholder for future standard helpers)
  App.tsx           → Application layout, higher-order logic, and unified routing
  main.tsx          → Bootstraps the application to the DOM
```

---

## Page Dissection & Login Flow

- **Login Flow (`/login`)**: Uses a centered card layout. Validates email string and password presence. Logs the user in on `admin@inventory.com`/`admin123`. Redirects correctly.
- **Dashboard (`/`)**: High-level statistical overview of stock levels and recent system activity.
- **Products Page (`/products`)**: A master view of all products with search capabilities. Features add, modify, and delete actions.
- **Add / Edit Product (`/products/add`, `/products/edit/:id`)**: A shared form managing product creation/mutation. Validates fields securely to maintain types. 
- **Stock Management (`/stock`)**: Shows current levels and provides inline modification of product stock. Updates record history.
- **Sales Page (`/sales`)**: A specific mechanism to record product outbound traffic (reduces stock, computes line totals).

---

## Type Definitions (`/src/types/index.ts`)
The unified model includes:
- `Category`: Typed strings isolating expected electronic categories.
- `Product`: Structural definition mapping IDs, prices, current stock, schema data.
- `StockHistory`: Ledger definitions tracking inbound/outbound adjustments.
- `Sale`: Purchase transactions tracking amount sold and monetary captures.

---

## Zustand Store Explained
The persistence methodology focuses on two simple Zustand patterns:

1. **`authStore`**: Controls session state. Validates presence of `isLoggedIn`.
2. **`inventoryStore`**: Encapsulates the core behavior. Retains mock DBs initialized from `/src/data`. Exposes atomic methods for cross-communication (`updateProduct`, `recordSale`, etc.) which handle composite updates safely without manual mutation.

---

## Transitioning to a Real Backend API

To swap dummy data for a real backend API:
1. Update `inventoryStore.ts` creation signature to strip initial mock loading. Ensure `products`, `sales`, and `stockHistory` begin empty/null structure.
2. Form hooks/effects such as `fetchProducts = async () => { ... }` executing standard GET requests. Call `set({ products: res.data })` respectively.
3. Modify synchronous mutations (`addProduct`, `deleteProduct`) to resolve `await fetch` block operations before utilizing the `set({...})` confirmation callbacks. Show localized loading indicators (e.g., adding `isLoading: boolean` inside Zustand).
4. Remove the `/src/data/*` dummy stubs entirely.

---

## Transitioning to Real JWT Authentication

To replace the mocked auth flow:
1. Revamp `authStore.login(credentials)` to hit your `POST /api/login` endpoint.
2. Upon verified execution, extract and capture the resulting JWT to standard LocalStorage (`localStorage.setItem('token', token)`). You may also consider httpOnly cookies.
3. Apply standard Axios interceptors or Fetch middleware mapping that token inside all standard `.headers.Authorization` constructs (`Bearer {token}`).
4. Hook application mount routines to fetch `/api/me` or similar validation metrics testing token expiry. Configure automatic resets.

---

## Routing Configuration

The architecture enforces Protected routes over normal navigation lines:
- **Public**: `/login` (Navigating here drops users successfully passing ProtectedRoute logic previously).
- **Protected (`ProtectedRoute.tsx`)**: Re-maps unregistered requests instantly back to `/login`.
  - `/` (Dashboard)
  - `/products`
  - `/products/add`
  - `/products/edit/:id`
  - `/stock`
  - `/sales`

---

## Assumptions Made
- The app intends to operate without strict localization formats (USD fixed for sales values).
- Reusable "Badge" abstractions can safely utilize predefined strings to map inline classes.
- Standard Form validations will trigger on form submission over individual line completion routines.
- In-memory resets clear dummy alterations back to standard file constants gracefully on reload (demonstration logic over robust local-storage persistence).
