# WorkFlow Pro

A modern Employee Management and Payroll System for companies to monitor employee workload, manage salaries, contracts, and more.

---

## 🚀 Live Site
[https://your-live-site-url.com](https://your-live-site-url.com)

## 👤 Admin Credentials
- **Email:** admin@workflowpro.com
- **Password:** Admin@1234

---

## ✨ Features
- Email & Password authentication with role selection (Employee, HR)
- Google social login (defaults to Employee role)
- Role-based dashboards for Employee, HR, and Admin
- Protected routes with persistent login (no redirect on reload)
- Responsive design for mobile, tablet, and desktop
- Employee worksheet submission, edit, and delete (with modals)
- HR can verify employees, pay salaries, and view employee details with charts
- Admin can fire employees, promote to HR, and adjust salary (increase only)
- Payroll requests and payment approval workflow
- Contact Us form with admin message management
- Toast notifications for all CRUD/auth operations (no browser alerts)
- TanStack Query for all GET data fetching
- Environment variables for all sensitive keys (Firebase, ImgBB, MongoDB, etc.)
- Pagination for payment history
- Modern UI with Tailwind CSS (no DaisyUI)

---

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo.git
cd workfolow-assingment-client
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create a `.env` file in the root of `workfolow-assingment-client`:
```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_IMGBB_API_KEY=your_imgbb_api_key
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Start the development server
```bash
npm run dev
```

---

## ⚙️ Environment Variables
- All sensitive keys are loaded from `.env` using Vite's `import.meta.env`.
- **Never commit your `.env` file to version control.**

---

## 📚 Tech Stack
- React, React Router, TanStack Query
- Firebase Auth
- Express, MongoDB (server)
- Tailwind CSS
- ImgBB for image uploads
- Toast notifications (`react-hot-toast`)

---

## 📢 Notes
- Do not use Lorem Ipsum anywhere in the app.
- All CRUD/auth operations use toast notifications, not browser alerts.
- Dashboard and all pages are fully responsive.
- Admin credentials and live URL are provided above.

---

## 📝 License
MIT
# Employee-Management
