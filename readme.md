# React Spreadsheet Prototype

This project is a front-end-only React prototype built as part of the React Internship Assignment for Inscripts. It replicates a spreadsheet-like UI using React, TypeScript, and Tailwind CSS, closely matching the provided Figma design.

## 🚀 Live Demo

[Live URL](https://your-deployment-url.com) *(Replace this with your actual deployed URL)*

## 📌 Project Objective

Recreate a spreadsheet experience (like Google Sheets/Excel) in React with:
- Pixel-perfect alignment with Figma design
- Interactive UI with working tabs and buttons
- Functional spreadsheet layout using `react-table` or a custom table

## 🛠 Tech Stack

- ⚛️ React 18 (with Vite)
- 🧑‍💻 TypeScript (strict mode)
- 🎨 Tailwind CSS
- 🧩 `react-table`
- ✅ ESLint + Prettier (Linting & Code Style)

## 📂 Folder Structure

project-root/
├── public/
├── src/
│ ├── components/ # Custom components including table/grid
│ ├── assets/ # Icons, logos, etc.
│ ├── App.tsx # Root app structure
│ └── main.tsx # React root render
├── index.html
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
└── README.md # You're here!


## ✅ Features

- Spreadsheet-like table with sortable columns
- Interactive toolbar and buttons (log actions to console)
- Pixel-close implementation to Figma
- Fully responsive and styled using Tailwind
- Code passes `npm run lint` and `npm run type-check`

## 🧪 Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/your-username/spreadsheet-prototype.git
cd spreadsheet-prototype

# 2. Install dependencies
npm install

# 3. Run the app
npm run dev

# 4. Lint and type check (optional but recommended)
npm run lint
npm run type-check

