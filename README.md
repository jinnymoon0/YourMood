# 🫶 YourMood

### A personal daily mood tracker built with Firebase + GitHub Pages  
**By [Jinny Moon](https://github.com/jinnymoon0)**  

---

## 🌤 Live Demo
👉 **[[(https://jinnymoon0.github.io/YourMood/))**

YourMood is a bilingual (English / Korean) web app that lets you record your **daily mood, thoughts, and activities** — then view them beautifully visualized on a calendar with emoji summaries.

---

## ✨ Features

### 🧠 1. Daily Mood Selection
- Choose from **26+ mood emojis** (happy, calm, stressed, etc.).
- Add optional **notes** and **tags** (like *work*, *school*, *friends*, *home*).

### 🗓 2. Calendar Mood Report
- View your daily emojis in a **monthly calendar grid**.
- See **emoji frequency bars** for the current month.
- Click any day to load or edit that entry.

### 🪞 3. Question of the Day (ENG / KOR)
- A different reflective question appears daily (e.g., “What gave you energy today?”).
- You can write a short answer and save it with your mood.

### 🏷️ 4. Tag Filtering
- Quickly filter the calendar by tags like *work*, *school*, or *friends*.
- Stats and emojis update live when filters change.

### ☁️ 5. Firebase Integration
- Data is stored securely in **Firebase Firestore** under each anonymous user.
- Uses **Anonymous Authentication** so users don’t need to sign up.
- Works both locally and on GitHub Pages via your authorized domain.

### 🌍 6. Bilingual + Mobile Friendly
- Automatically detects system language (English or Korean).
- Responsive layout for both desktop and mobile.

---

## 🧰 Built With

| Technology | Purpose |
|-------------|----------|
| **HTML + CSS + JavaScript (ES Modules)** | Frontend and logic |
| **Firebase Firestore** | Cloud database for storing moods |
| **Firebase Auth (Anonymous)** | User identity |
| **GitHub Pages** | Free hosting for static web apps |
| **Modern JS (CDN imports)** | No build tools or frameworks required |

---

## 🚀 Setup (for your own deployment)

1. Clone the repo:
   ```bash
   git clone https://github.com/jinnymoon0/yourmood.git
   cd yourmood
