# 📊 FinDash – Financial Dashboard

> 🚀 **A MODERN, RESPONSIVE FINANCIAL DASHBOARD BUILT USING REACT, CONTEXT API, TAILWIND CSS, AND RECHARTS**  
> 📈 **Analyze, track, and visualize financial data with interactive charts and role-based access**

---

## 🧠 Tech Stack

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)
![Recharts](https://img.shields.io/badge/Recharts-DataViz-orange)

---

## 🚀 Core Features

- 📊 **Interactive Financial Dashboard**
- 📈 **Real-time Profit, Revenue & Expense Tracking**
- 📉 **Dynamic Charts (Bar, Line, Pie)**
- 🔐 **Role-Based Access Control (Admin / Editor / Viewer)**
- 📋 **Transaction Management System**
- ⚡ **Fast & Responsive UI (Mobile + Desktop)**

---

## 📊 Data Visualization

- 📊 **Revenue vs Expenses (Bar Chart with hover highlight)**
- 📈 **Profit Trend (Line Chart)**
- 🥧 **Expense Breakdown (Pie Chart)**
- 📉 **Income vs Profit Comparison**

---

## 📋 Transaction Features

- ➕ **Add new transactions**
- ❌ **Delete transactions (Admin only)**
- 🏷️ **Category tagging**
- 💰 **Income / Expense classification**

---

## 🔐 Role-Based Access

| Role   | Permissions        |
|--------|--------------------|
| 🛠️ Admin  | Add + Delete       |
| ✏️ Editor | Add only           |
| 👁️ Viewer | Read only          |

---

## 📁 Project Structure

📦 src
 ┣ 📂 components        → Reusable UI components
 ┃ ┣ 📜 Insights.jsx
 ┃ ┣ 📜 RoleBanner.jsx
 ┃ ┣ 📜 SummaryCards.jsx
 ┃ ┗ 📜 Table.jsx
 ┣ 📂 context           → Global state management
 ┃ ┗ 📜 AppContext.jsx
 ┣ 📂 data              → Static JSON data
 ┃ ┗ 📜 data.json
 ┣ 📂 pages             → Main pages
 ┃ ┗ 📜 Dashboard.jsx
 ┣ 📜 App.jsx
 ┣ 📜 main.jsx
 ┗ 📜 index.css

---

## ⚙️ Installation & Setup
S
git clone https://github.com/sravankumar27319/dashboard.git
cd findash
npm install
npm run dev

---

## 📦 Data Handling

> 💡 Default data is loaded from JSON and managed using Context API

- src/data/data.json
- Global state handled by AppContext

---

## 🎨 UI Highlights

- Clean modern dashboard layout  
- Smooth hover animations  
- Highlighted bar interactions  
- Dynamic profit margin indicator  
- Fully responsive design  

---

## 🔥 Key Implementations

- Context API state management  
- Recharts data visualization  
- Role-based UI rendering  
- Dynamic progress bar logic  
- JSON-based data integration  

---

## 🚀 Future Enhancements

- Authentication (Login / Signup)
- Dark Mode
- Backend Integration (API)
- Export Reports (PDF / Excel)
- Advanced Filters

## 👨‍💻 Author

Sravan

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
