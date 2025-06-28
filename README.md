# 🌊 WorkWave – Modern Job Portal

[![Live Demo](https://img.shields.io/badge/Live-Demo-00C7B7?logo=vercel&logoColor=white&style=for-the-badge)](https://workwave-phi.vercel.app/)
[![License](https://img.shields.io/github/license/satyam-code45/workwave?style=for-the-badge)](https://github.com/satyam-code45/workwave/blob/main/LICENSE)
[![Stars](https://img.shields.io/github/stars/satyam-code45/workwave?style=for-the-badge)](https://github.com/satyam-code45/workwave/stargazers)

**WorkWave** is a modern full-stack job portal built using Next.js, Prisma, NextAuth, Tiptap, and Tailwind CSS. It allows job seekers and employers to connect through a smooth and intuitive interface, with features like resume uploads, job applications, Stripe payments, and email notifications.

---

## ✨ Features

- 🔐 Authentication with NextAuth.js & Prisma Adapter  
- ✍️ Rich job descriptions with Tiptap Editor  
- 📄 Resume uploads via UploadThing  
- 📬 Email notifications using Resend  
- 💳 Payments for premium listings with Stripe  
- 🎨 Light/Dark mode using `next-themes`  
- ✅ Form validation via React Hook Form & Zod  
- 🔔 Smooth toasts and alerts with Sonner  
- 🧱 Built using Radix UI and Lucide Icons  
- ⚡ Fast dev experience with Turbopack  

---

## 🧑‍💻 Tech Stack

| Category           | Tech                                                                 |
|--------------------|----------------------------------------------------------------------|
| **Framework**      | [Next.js 15](https://nextjs.org/)                                    |
| **Auth**           | [NextAuth.js](https://next-auth.js.org/) with [Prisma Adapter](https://authjs.dev/reference/adapter/prisma) |
| **ORM**            | [Prisma](https://www.prisma.io/)                                     |
| **Editor**         | [Tiptap](https://tiptap.dev/)                                        |
| **Forms**          | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |
| **Styling**        | [Tailwind CSS](https://tailwindcss.com/), `tailwindcss-animate`      |
| **Components**     | [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/) |
| **Uploads**        | [UploadThing](https://uploadthing.com/)                              |
| **Payments**       | [Stripe](https://stripe.com/)                                        |
| **Email**          | [Resend](https://resend.com/)                                        |
| **Toasts**         | [Sonner](https://sonner.emilkowal.dev/)                              |
| **Jobs**           | [Inngest](https://www.inngest.com/)                                  |

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/satyam-code45/workwave.git
cd workwave
pnpm install
```

### 2. Set Environment Variables

Create a `.env` file and fill in:

```env
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:3000
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
RESEND_API_KEY=your_resend_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 3. Run Dev Server

```bash
pnpm dev
```

> Make sure your database is up and Prisma migrations have run (`npx prisma migrate dev` if needed)

---

## 📂 Project Structure

```
.
├── app/                  # App directory (Next.js 15)
├── components/           # Reusable UI components
├── prisma/               # Prisma schema and seed files
├── lib/                  # Utilities and helpers
├── styles/               # Global styles
├── public/               # Static assets
└── ...
```

---

## 📜 Available Scripts

```bash
pnpm dev       # Start dev server
pnpm build     # Build for production
pnpm start     # Start production server
pnpm lint      # Lint with ESLint
pnpm prisma    # Prisma commands
```

---

## 🖼️ Preview

![WorkWave Preview](https://workwave-phi.vercel.app/og-image.png)

> If not auto-generated, consider adding your own screenshot or video walkthrough.

---

## 🤝 Contributing

Contributions are welcome and encouraged!

```bash
git checkout -b feature/my-feature
git commit -m "Add new feature"
git push origin feature/my-feature
```

Then open a [pull request](https://github.com/satyam-code45/workwave/pulls).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

Built with ❤️ by [Satyam](https://github.com/satyam-code45)

> Feel free to ⭐ the repo if you found this helpful!