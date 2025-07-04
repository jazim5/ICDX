# ICDX - ICD-10 Code Search and Information Tool

ICDX is a web application built with Next.js and Firebase Studio that allows users to search for ICD-10 codes and diagnostic phrases to retrieve detailed medical information.

## Features

*   **ICD-10 Code Search:** Easily search for ICD-10 codes or diagnostic phrases.
*   **Detailed Code Information:** Get comprehensive details for each code, including:
    *   Definition
    *   Clinical Information (Diagnosis Criteria, Clinical Guidelines, Treatment Protocols, Medication Guidelines, Severity or Stage)
    *   Risk & Epidemiology (Risk Factors, Comorbidities, Epidemiology, Statistical Incidence and Prevalence Rates, Demographics)
    *   Coding & Administrative Information (Inclusion Terms, Exclusion Terms, Frequently Associated Codes, Procedural Codes Linkage, Reimbursement Guidelines, Audit Criteria, Chart Preparation, Notes)
    *   Patient Impact & Resources (Quality of Life Impact, Outcomes, Prevention, Patient Education Resources)
    *   Broader Context (Cost of Care, Legal and Ethical Considerations, International Variations, Historical Data, Research Links, Clinical Decision Support, Technology and Digital Health Links, Interoperability Considerations)
*   **User Authentication:** Securely sign up and sign in using email and password powered by Firebase Authentication.
*   **User Data Storage:** Store user-specific information (like email) in Firestore.

## Getting Started

### Prerequisites

*   Node.js installed
*   npm or yarn package manager
*   A Firebase project with Email/Password Authentication and Firestore enabled

### Setup

1.  Clone the repository:


bash git clone https://github.com/jazim5/ICDX.git

2.  Navigate to the project directory:


bash cd ICDX

3.  Install dependencies:


bash npm install # or yarn install

4.  Configure Firebase:
    *   Create a `.env.local` file in the root directory.
    *   Add your Firebase project's configuration details to the `.env.local` file:


env NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID

Replace the placeholder values with your actual Firebase configuration.

### Running the Application

*   **Development Mode:**


bash npm run dev # or yarn dev

The application will be available at `http://localhost:3000`.

*   **Production Mode:**


bash npm run build # or yarn build bash npm start # or yarn start

## Technologies Used

*   Next.js
*   React
*   TypeScript
*   Firebase (Authentication, Firestore)
*   Tailwind CSS (assuming from the class names like `space-y-6`, `animate-in`, `fade-in-50`)
*   Lucide React (for icons)

## Contributing

(Add contributing guidelines if you plan to accept contributions)

## License

(Add your project's license)

## Contact

(Add your contact information)
