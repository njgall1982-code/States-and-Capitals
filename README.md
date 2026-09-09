# 🇺🇸 US States & Capitals - Flashcard Study App

An interactive, touch-first flashcard web app built for mastering all 50 US States and Capitals. Optimized specifically for iPad and mobile touchscreens with 3D flip mechanics, swipe gestures, and offline persistence.

---

## ✨ Features

- **3D Card Flip**: Touch or click the card to flip between State and Capital.
- **Direction Modes**:
  - 🏛️ **State First**: State shown on front &rarr; flip to reveal Capital.
  - ⭐ **Capital First**: Capital shown on front &rarr; flip to reveal State.
  - 🔀 **Random**: Mix of State-first and Capital-first questions.
- **Study & Quiz Modes**:
  - **All States (50)**: Full deck review.
  - **Missed Only**: Automatically filters down to only cards you marked as needing practice.
  - **Shuffle / Alphabetical**: Toggle between random deck shuffle or A-to-Z order.
- **Mastery Tracking**:
  - Touch buttons or swipe gestures to categorize each card:
    - 👈 **Swipe Left** or press **❌ Need Practice**.
    - 👉 **Swipe Right** or press **✅ Got It!**.
  - Dual visual progress bar and mastery percentage tracker.
  - Persisted locally in browser (`localStorage`) so your progress is saved across sessions without requiring a login.
- **iPad & Touchscreen Ready**:
  - Zero tap delay (`touch-action: manipulation`).
  - Native gesture physics with real-time feedback badges.
  - Keyboard shortcuts for iPad Magic Keyboard or desktop (`Space` to flip, `Left/Right Arrows` to rate, `Up/Down` to navigate).
- **PWA / Offline Capable**:
  - Includes Web App Manifest and Service Worker for full-screen offline use.

---

## 📱 How to Install on iPad (Full Screen Native Experience)

1. Open the hosted URL in **Safari** on your iPad.
2. Tap the **Share** button (the square with an arrow pointing up).
3. Scroll down and tap **"Add to Home Screen"**.
4. Tap **Add** in the top-right corner.
5. Launch the app directly from your iPad Home Screen! It will run in full screen without the Safari URL address bar.

---

## 🚀 How to Deploy to GitHub Pages

### Option A: Using GitHub Desktop (Easiest)

1. Open **GitHub Desktop**.
2. Click **File** &rarr; **Add Local Repository...** (or simply drag this `States and Capitals` folder into the GitHub Desktop window).
3. If it says *"This directory does not appear to be a Git repository"*, click the blue link **"create a repository"** and click **Create Repository**.
4. In the bottom-left, type a summary like `Initial commit` and click **Commit to main**.
5. Click **Publish repository** in the top bar.
   > **Note**: Uncheck *"Keep this code private"* so that GitHub Pages can host it on the free tier.
6. In GitHub Desktop, press `Ctrl + Shift + G` (or **Repository** &rarr; **View on GitHub**).
7. On your GitHub repo page:
   - Click **Settings** &rarr; **Pages** (in the left sidebar).
   - Under **Build and deployment** &rarr; **Branch**, select `main` and `/ (root)`.
   - Click **Save**.
8. In 1–2 minutes, your site will be live at:
   `https://<YOUR_USERNAME>.github.io/<REPO_NAME>/`

---

### Option B: Using Git Command Line

1. Initialize a Git repository in this folder (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit of States and Capitals study app"
   ```

2. Create a new repository on [GitHub](https://github.com/new) (e.g., `states-and-capitals`).

3. Link and push your local repository to GitHub:
   ```bash
   git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
   git branch -M main
   git push -u origin main
   ```

4. Enable GitHub Pages:
   - Go to your repository on GitHub.
   - Click on **Settings** &rarr; **Pages** (in the left sidebar).
   - Under **Build and deployment** &rarr; **Branch**, select `main` branch and `/ (root)` folder.
   - Click **Save**.
   - In 1–2 minutes, your live site will be accessible at:
     `https://<YOUR_USERNAME>.github.io/<REPO_NAME>/`

---

## 💻 Local Testing

You can open `index.html` directly in any browser, or use a lightweight local server:
```bash
npx serve .
# or
python -m http.server 8000
```
Then open `http://localhost:8000` or the port shown.
