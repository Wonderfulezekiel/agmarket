Below is a clean **project documentation draft** for your platform. It is written so you can start building immediately with **Next.js** on the frontend.

# FarmConnect Platform Documentation

## 1. Project Overview

AGMarket is a web platform that helps **farmers create their own online stores** and helps **buyers discover and purchase farm products** from those farmers.

It combines two ideas:

1. **Store builder for farmers** — like Shopify.
2. **Central marketplace for buyers** — like Jumia or Amazon, but focused on farm products.

Farmers can:

* create a store
* add products
* manage inventory
* receive orders
* chat with buyers
* accept payments

Buyers can:

* browse products
* search by category or location
* compare farmers
* chat with farmers
* place orders
* pay online

---

## 2. Product Goals

The platform should:

* make it easy for farmers to sell online
* help buyers discover farm products faster
* remove middlemen where possible
* support direct communication and trust
* work well on mobile and desktop

---

## 3. Target Users

### Farmer

A person or farm business that sells agricultural products like rice, chicken, eggs, tomatoes, goat, yam, and vegetables.

### Buyer

An individual, restaurant, food vendor, retailer, or company that wants to buy farm products.

### Admin

The platform owner or operations team that manages users, products, disputes, verification, and settings.

---

## 4. Core Product Modules

### A. Landing Website

Public marketing pages that explain the platform.

### B. Authentication

Sign up, login, password reset, and onboarding.

### C. Farmer Dashboard

Farmer can manage store, products, orders, and messages.

### D. Buyer Marketplace

Buyers can search and browse products from different farmers.

### E. Product & Store Pages

Each farmer has a public store page and each product has its own page.

### F. Chat System

Buyer and farmer can message each other before or after purchase.

### G. Payment & Orders

Buyers can pay and track order status.

### H. Admin Panel

For approvals, moderation, reports, and platform control.

---

# 5. Tech Stack

## Frontend

* **Next.js**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**
* **React Query** for server state
* **Zustand** or Context for UI state
* **Next.js App Router**

## Recommended supporting tools

* **Supabase Auth** or custom auth
* **Supabase/PostgreSQL** for database
* **Cloud storage** for images
* **Stripe / Paystack / Flutterwave** for payments
* **Socket.io** or Supabase Realtime for chat

---

# 6. Information Architecture / Sitemap

## Public pages

* `/`
* `/about`
* `/how-it-works`
* `/marketplace`
* `/categories`
* `/product/[id]`
* `/store/[slug]`
* `/farmers`
* `/pricing`
* `/contact`
* `/faq`
* `/terms`
* `/privacy`

## Authentication pages

* `/auth/login`
* `/auth/register`
* `/auth/forgot-password`
* `/auth/reset-password`
* `/auth/verify-email`

## Farmer dashboard

* `/dashboard`
* `/dashboard/store`
* `/dashboard/products`
* `/dashboard/products/new`
* `/dashboard/products/[id]/edit`
* `/dashboard/orders`
* `/dashboard/messages`
* `/dashboard/analytics`
* `/dashboard/settings`
* `/dashboard/payouts`

## Buyer dashboard

* `/account`
* `/account/orders`
* `/account/messages`
* `/account/wishlist`
* `/account/settings`

## Admin pages

* `/admin`
* `/admin/users`
* `/admin/farmers`
* `/admin/products`
* `/admin/orders`
* `/admin/reports`
* `/admin/categories`
* `/admin/settings`

---

# 7. Landing Page Structure

Your landing page should sell the idea clearly.

## Sections

1. **Hero section**

   * headline
   * subheadline
   * CTA buttons: “Get Started” and “Browse Marketplace”

2. **How it works**

   * Farmer creates store
   * Farmer lists products
   * Buyer browses and buys

3. **Marketplace preview**

   * rice, chicken, goat, eggs, yam, tomatoes

4. **Features**

   * store builder
   * direct chat
   * secure payment
   * product discovery
   * order tracking

5. **Why choose us**

   * direct farmer access
   * trusted sellers
   * better prices
   * easy online sales

6. **Testimonials**

   * farmer testimonials
   * buyer testimonials

7. **Call to action**

   * “Start selling”
   * “Start buying”

8. **Footer**

   * about
   * terms
   * privacy
   * contact
   * social links

---

# 8. Authentication Flow

## Sign up options

* Farmer account
* Buyer account

## Farmer signup fields

* full name
* email
* phone number
* password
* farm/store name
* location
* product category
* optional farm logo

## Buyer signup fields

* full name
* email
* phone number
* password
* location

## Login

* email
* password

## Password reset

* request reset link
* verify email
* set new password

## Onboarding

After signup:

* farmer sets up store
* buyer sets delivery address

---

# 9. Farmer Dashboard Features

## Dashboard home

* total products
* total orders
* pending orders
* total revenue
* recent messages

## Store management

* store name
* logo
* banner image
* description
* location
* contact info
* delivery zones
* opening hours

## Product management

Each product should have:

* product name
* category
* description
* price
* unit type
* quantity available
* minimum order quantity
* images
* location
* delivery options
* status: draft/published/out of stock

## Orders

Farmer can:

* view all orders
* accept/reject order
* mark as processing
* mark as delivered
* see payment status

## Messages

* chat with buyers
* answer product questions
* discuss quantity and delivery

## Analytics

* views
* clicks
* sales
* conversion
* top products

---

# 10. Buyer Marketplace Features

## Marketplace home

* search bar
* category grid
* featured products
* nearby farmers
* trending items

## Search and filters

* product type
* location
* price range
* farmer rating
* availability
* delivery option

## Product page

* product photos
* price
* quantity
* description
* farmer info
* ratings
* chat button
* buy button

## Store page

* farmer profile
* all products from that store
* reviews
* location
* contact/chat button

## Buyer account

* order history
* wishlist
* messages
* saved addresses
* payment methods

---

# 11. Admin Panel Features

Admin should be able to:

* approve farmer accounts
* verify stores
* remove fake products
* handle reports
* manage categories
* view orders
* monitor platform activity
* manage banners and featured products

---

# 12. Data Models

These are the main database entities you will need.

## User

* id
* name
* email
* phone
* role: farmer/buyer/admin
* avatar
* created_at

## FarmerProfile

* user_id
* store_name
* store_slug
* bio
* location
* verification_status
* banner_url
* logo_url

## Product

* id
* farmer_id
* name
* category_id
* description
* price
* quantity
* unit
* location
* status
* images
* created_at

## Category

* id
* name
* slug
* icon
* parent_id optional

## Order

* id
* buyer_id
* farmer_id
* total_amount
* payment_status
* order_status
* delivery_address
* created_at

## OrderItem

* id
* order_id
* product_id
* quantity
* price

## Message

* id
* sender_id
* receiver_id
* order_id optional
* product_id optional
* text
* created_at

## Review

* id
* buyer_id
* farmer_id
* product_id optional
* rating
* comment
* created_at

## Payment

* id
* order_id
* provider
* reference
* amount
* status
* created_at

---

# 13. Main User Flows

## Farmer flow

1. Sign up
2. Create store
3. Add products
4. Publish products
5. Receive buyers
6. Chat and sell
7. Fulfill order
8. Track payment

## Buyer flow

1. Visit marketplace
2. Search product
3. Compare farmers
4. Open store or product page
5. Chat or buy
6. Pay
7. Track delivery
8. Leave review

---

# 14. UI Pages You Should Build First

## Public

* Home
* Marketplace
* Product page
* Store page
* About
* How it works
* Contact

## Auth

* Login
* Register
* Forgot password

## Farmer

* Dashboard
* Products
* Add product
* Orders
* Messages
* Store settings

## Buyer

* Account
* Orders
* Messages
* Wishlist

## Admin

* Admin dashboard
* User management
* Product moderation

---

# 15. Recommended Frontend Folder Structure

```bash
app/
  (public)/
    page.tsx
    marketplace/page.tsx
    product/[id]/page.tsx
    store/[slug]/page.tsx
    about/page.tsx
    how-it-works/page.tsx
    contact/page.tsx

  (auth)/
    login/page.tsx
    register/page.tsx
    forgot-password/page.tsx
    reset-password/page.tsx

  (farmer)/
    dashboard/page.tsx
    dashboard/store/page.tsx
    dashboard/products/page.tsx
    dashboard/products/new/page.tsx
    dashboard/products/[id]/edit/page.tsx
    dashboard/orders/page.tsx
    dashboard/messages/page.tsx
    dashboard/settings/page.tsx

  (buyer)/
    account/page.tsx
    account/orders/page.tsx
    account/messages/page.tsx
    account/wishlist/page.tsx

  (admin)/
    admin/page.tsx
    admin/users/page.tsx
    admin/products/page.tsx
    admin/orders/page.tsx

components/
  ui/
  layout/
  marketplace/
  farmer/
  buyer/
  admin/

lib/
  auth.ts
  db.ts
  validations.ts
  utils.ts

types/
  index.ts

hooks/
  use-auth.ts
  use-products.ts
  use-orders.ts
```

---

# 16. MVP Scope

Start with only what is necessary.

## MVP must include

* landing page
* auth
* farmer store creation
* product upload
* marketplace browsing
* product pages
* chat
* order creation
* payment
* basic dashboard

## Not needed in version 1

* advanced AI recommendations
* delivery routing
* multi-language support
* complex analytics
* subscription billing
* loyalty system

---

# 17. Important Design Principles

Your app should be:

* mobile-first
* simple for farmers
* fast to load
* easy to navigate
* visually clean
* trust-focused

Use:

* large buttons
* simple forms
* clear pricing
* visible product images
* location badges
* seller verification badge

---

# 18. Security and Trust Features

These are very important for this type of platform:

* email verification
* phone verification
* farmer verification badge
* report product button
* admin moderation
* secure payments
* role-based access control

---

# 19. Performance Requirements

Make the app:

* fast on mobile
* image optimized
* lazy loaded
* cached where possible
* server-rendered for SEO
* responsive and lightweight

---

# 20. Suggested Build Order

Build in this order:

1. landing page
2. auth
3. farmer dashboard shell
4. product creation
5. marketplace page
6. product detail page
7. store page
8. chat
9. checkout/payment
10. orders
11. admin panel

---

# 21. Final Product Summary

This platform is:

* a **store builder for farmers**
* a **marketplace for buyers**
* a **direct sales system for agricultural products**
* a **trust and payment layer between farmers and buyers**

It is a very strong idea because it solves real buying and selling problems in agriculture.

son now use our tweakcn ui theme please the light one : 

npx shadcn@latest add https://tweakcn.com/r/themes/northern-lights.json

@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(0.9824 0.0013 286.3757);
  --foreground: oklch(0.3211 0 0);
  --card: oklch(1.0000 0 0);
  --card-foreground: oklch(0.3211 0 0);
  --popover: oklch(1.0000 0 0);
  --popover-foreground: oklch(0.3211 0 0);
  --primary: oklch(0.6487 0.1538 150.3071);
  --primary-foreground: oklch(1.0000 0 0);
  --secondary: oklch(0.6746 0.1414 261.3380);
  --secondary-foreground: oklch(1.0000 0 0);
  --muted: oklch(0.8828 0.0285 98.1033);
  --muted-foreground: oklch(0.5382 0 0);
  --accent: oklch(0.8269 0.1080 211.9627);
  --accent-foreground: oklch(0.3211 0 0);
  --destructive: oklch(0.6368 0.2078 25.3313);
  --destructive-foreground: oklch(1.0000 0 0);
  --border: oklch(0.8699 0 0);
  --input: oklch(0.8699 0 0);
  --ring: oklch(0.6487 0.1538 150.3071);
  --chart-1: oklch(0.6487 0.1538 150.3071);
  --chart-2: oklch(0.6746 0.1414 261.3380);
  --chart-3: oklch(0.8269 0.1080 211.9627);
  --chart-4: oklch(0.5880 0.0993 245.7394);
  --chart-5: oklch(0.5905 0.1608 148.2409);
  --sidebar: oklch(0.9824 0.0013 286.3757);
  --sidebar-foreground: oklch(0.3211 0 0);
  --sidebar-primary: oklch(0.6487 0.1538 150.3071);
  --sidebar-primary-foreground: oklch(1.0000 0 0);
  --sidebar-accent: oklch(0.8269 0.1080 211.9627);
  --sidebar-accent-foreground: oklch(0.3211 0 0);
  --sidebar-border: oklch(0.8699 0 0);
  --sidebar-ring: oklch(0.6487 0.1538 150.3071);
  --font-sans: Plus Jakarta Sans, sans-serif;
  --font-serif: Source Serif 4, serif;
  --font-mono: JetBrains Mono, monospace;
  --radius: 0.5rem;
  --shadow-x: 0;
  --shadow-y: 1px;
  --shadow-blur: 3px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.1;
  --shadow-color: oklch(0 0 0);
  --shadow-2xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.25);
  --tracking-normal: 0em;
  --spacing: 0.25rem;
}

.dark {
  --background: oklch(0.2303 0.0125 264.2926);
  --foreground: oklch(0.9219 0 0);
  --card: oklch(0.3210 0.0078 223.6661);
  --card-foreground: oklch(0.9219 0 0);
  --popover: oklch(0.3210 0.0078 223.6661);
  --popover-foreground: oklch(0.9219 0 0);
  --primary: oklch(0.6487 0.1538 150.3071);
  --primary-foreground: oklch(1.0000 0 0);
  --secondary: oklch(0.5880 0.0993 245.7394);
  --secondary-foreground: oklch(0.9219 0 0);
  --muted: oklch(0.3867 0 0);
  --muted-foreground: oklch(0.7155 0 0);
  --accent: oklch(0.6746 0.1414 261.3380);
  --accent-foreground: oklch(0.9219 0 0);
  --destructive: oklch(0.6368 0.2078 25.3313);
  --destructive-foreground: oklch(1.0000 0 0);
  --border: oklch(0.3867 0 0);
  --input: oklch(0.3867 0 0);
  --ring: oklch(0.6487 0.1538 150.3071);
  --chart-1: oklch(0.6487 0.1538 150.3071);
  --chart-2: oklch(0.5880 0.0993 245.7394);
  --chart-3: oklch(0.6746 0.1414 261.3380);
  --chart-4: oklch(0.8269 0.1080 211.9627);
  --chart-5: oklch(0.5905 0.1608 148.2409);
  --sidebar: oklch(0.2303 0.0125 264.2926);
  --sidebar-foreground: oklch(0.9219 0 0);
  --sidebar-primary: oklch(0.6487 0.1538 150.3071);
  --sidebar-primary-foreground: oklch(1.0000 0 0);
  --sidebar-accent: oklch(0.6746 0.1414 261.3380);
  --sidebar-accent-foreground: oklch(0.9219 0 0);
  --sidebar-border: oklch(0.3867 0 0);
  --sidebar-ring: oklch(0.6487 0.1538 150.3071);
  --font-sans: Plus Jakarta Sans, sans-serif;
  --font-serif: Source Serif 4, serif;
  --font-mono: JetBrains Mono, monospace;
  --radius: 0.5rem;
  --shadow-x: 0;
  --shadow-y: 1px;
  --shadow-blur: 3px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.1;
  --shadow-color: oklch(0 0 0);
  --shadow-2xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.25);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}


