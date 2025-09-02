# SareeShine by Firebase Studio

This is a Next.js e-commerce storefront for an exquisite saree shop, built with Firebase and Stripe.

## Getting Started

To run this project locally, follow these steps:

### 1. Install Dependencies

First, you need to install the necessary packages. Open your terminal and run:

```bash
npm install
```

### 2. Set Up Environment Variables

This project requires a few environment variables to connect to services like Firebase and to handle payments. Create a new file named `.env.local` in the root of your project directory and add the following lines:

```
# Your public-facing site URL
# For local development, this will be http://localhost:9002
NEXT_PUBLIC_SITE_URL=http://localhost:9002

# Firebase Configuration
# These values are pulled from your Firebase project settings.
# You can leave the ones from src/lib/firebase.ts if you are just testing.

# Note: The manual QR code checkout does not require Stripe keys.
# However, if you wish to enable the Stripe-based credit card checkout
# in the future, you will need to add your keys here.
STRIPE_SECRET_KEY=your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
```

Replace the placeholder values with your actual credentials.

### 3. Run the Development Server

Once your dependencies are installed and your environment variables are set, you can start the development server:

```bash
npm run dev
```

This will start the application on [http://localhost:9002](http://localhost:9002). You can now open this URL in your web browser to see your store.

### 4. Firebase Setup

- **Firestore:** Make sure you have enabled Firestore in your Firebase project console.
- **Storage:** Enable Firebase Storage to handle the payment screenshot uploads.
- **Security Rules:** For both Firestore and Storage, you will need to configure security rules to allow read/write access from your application. For development, you can start with open rules, but be sure to secure them for production.

---

Feel free to customize your products in `public/products.json` and adjust the styles in `src/app/globals.css`.
