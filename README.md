# personalized dashboard widget creator

This project is a personalized dashboard widget created as part of the Frontend Developer Intern assignment for **SnapShare AI**. The widget showcases key metrics and notifications from a mock API and is designed to be clean, responsive, and production-ready using modern frontend technologies.

---
## 🌐 Live Demo

You can view the deployed project here:  
🔗 [https://personalized-dashboard-widget-creat-lyart.vercel.app/](https://personalized-dashboard-widget-creat-lyart.vercel.app/)

---
## 🚀 Features

- 📊 **Analytics Summary Widget**: Displays total users, new signups, active users, today's revenue, and conversion rate.
- 🛎️ **Notifications Panel**: Shows recent alerts with severity levels.
- 🔁 **Mock API Integration**: Simulates data fetching using either `json-server` or delayed `setTimeout`.
- 📱 **Responsive Design**: Works across desktop, tablet, and mobile.
- 🎨 **Modern UI**: Built with Tailwind CSS and React components.
- ⚠️ **Loading & Error Handling** (optional bonus)

---

## 📁 Folder Structure

```text
📁 src 
├── 📁components # 🔁 Reusable UI components 
├── 📁data       # 📊 Contains dummy_data.json file 
├── 📁pages      # 🚪 Main entry page (e.g., index.tsx) 
📁public         # 🖼️ Static assets (images, icons, etc.) 
```

---

## 🛠 Tech Stack

- **Next.js** (React Framework)
- **React** (Component-based UI)
- **Tailwind CSS** (Styling)
- **json-server** (Mock API)
- **Framer Motion** (Animations – optional)


---

## 🧪 Setup Instructions

1. **Install dependencies**

```bash
npm install

Start the mock API
(Choose one of the following options)

Option 1: Use json-server (recommended)

npx json-server --watch data/dummy_data.json --port 4000

Option 2: Simulate fetch in code

Import the data and use setTimeout() in your React component to mimic an API delay.

Run the development server

npm run dev
```

## 📊 Mock Data Overview

This project uses a mocked JSON file (`dummy_data.json`) containing two key sections:

### `analyticsSummary`:

- **Widget Title**: Title of the dashboard section
- **Total Users**: Total number of registered users
- **New Signups Today**: Count of new users today
- **Active Users**: Number of currently active users
- **Revenue Today**: Today's revenue (e.g., "$12,450")
- **Conversion Rate**: Percentage value (e.g., "4.2%")
- **Recent Activities**: An array of actions with:
  - `type`: Activity type (Login, Signup, etc.)
  - `description`: Action description
  - `timestamp`: Time of activity

### `notifications`:

- **Notification Message**: User-facing alert
- **Severity**: `high`, `info`, etc.
- **Read Status**: Boolean (`true` or `false`)

---

## 💡 Optional Enhancements (Bonus)

The following features are extra but recommended:

- 🔐 **Mock Login Page** before accessing the dashboard
- ⚙️ **Detail Pages** using client-side routing
- 🎬 **Smooth Transitions** via [Framer Motion](https://www.framer.com/motion/)
- 🧑‍🦯 **Accessibility Improvements** with ARIA labels and keyboard navigation
- ❗ **Error Boundaries** and retry mechanism for failed API calls

---

## 🧠 Development Approach

- Started with a clean **Next.js** project using `create-next-app`
- Implemented utility-first responsive UI using **Tailwind CSS**
- Created reusable components like:
  - `AnalyticsCard.tsx`
  - `NotificationCard.tsx`
- Used `json-server` to simulate a REST API locally
- Also demonstrated API delay simulation using `setTimeout` for in-code mock fetch
- Focused on:
  - Clean folder structure and modular architecture
  - Well-commented, readable code
  - Mobile-first responsive layout


