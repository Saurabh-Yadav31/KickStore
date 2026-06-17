# KickStore - Premium Football Merchandise Search App

## Overview

**KickStore** is a product search application for football merchandise. It allows users to browse and search products by name, filter by category, view results in a responsive product grid, and handle no-result cases gracefully.

### Motivation

I built KickStore to create a clean and user-friendly football merchandise discovery experience inspired by the excitement around international football tournaments. The goal was to take a simple product search assignment and present it through a polished, modern storefront UI while keeping the core experience fast, intuitive, and easy to use.

### Status

This project is currently implemented as a **full-stack MVP** with:
- a static frontend built with HTML, CSS, and JavaScript
- a Node.js + Express backend
- MongoDB Atlas for product persistence
- deployment for both frontend and backend

---

## Live Demo

- **Frontend:** `https://kickstore-frontend.onrender.com`
- **Backend API:** `https://kickstore-backend.onrender.com`

> Note: If the backend is on a free hosting tier, the first API request may take a few seconds to respond.

---

## Features Implemented

- ✅ Product storage with 15+ football merchandise items
- ✅ Search by product name
- ✅ Case-insensitive search behavior
- ✅ Category filtering
- ✅ Dynamic result rendering in a product grid
- ✅ Empty state handling for no matches found
- ✅ Initial backend fetch with local in-memory filtering for faster interaction
- ✅ Responsive design for desktop, tablet, and mobile
- ✅ Frontend and backend deployment

---

## Tech Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript (ES6)
- Google Fonts (Poppins)

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- CORS

### Tooling
- nodemon
- Git & GitHub
- Render (deployment)

---

## Project Structure

```text
KickStore/
├── index.html              # Main frontend page
├── style.css               # UI styling and responsive layout
├── script.js               # Search, filtering, rendering, API calls
├── data.js                 # Local fallback dataset
├── images/                 # Product images
└── backend/
    ├── server.js           # Express server and API routes
    ├── seed.js             # Seeds MongoDB with initial product data
    ├── models/
    │   └── Product.js      # Mongoose product schema
    ├── package.json
    └── .env                # Local environment variables (not committed)
```

---

## Architecture

### High-Level Flow

1. The frontend loads in the browser.
2. On startup, it fetches the product list from the Express backend.
3. The backend reads product data from MongoDB Atlas.
4. The frontend stores the fetched results in memory and performs search/filter operations locally for faster updates.
5. If the backend is unavailable, the frontend falls back to the local dataset in `data.js`.

### Layers

#### 1. Data Layer
- `data.js` provides a local fallback dataset.
- MongoDB Atlas stores the persistent product collection.
- `Product.js` defines the product schema using Mongoose.

#### 2. Frontend Layer
- `index.html` provides the main page structure.
- `style.css` handles layout, responsiveness, and UI styling.
- `script.js` handles fetching, state management, filtering, and rendering.

#### 3. Backend Layer
- `server.js` exposes API endpoints for retrieving product data.
- `seed.js` inserts the initial dataset into MongoDB.
- Express + Mongoose handle API logic and persistence.

---

## API Endpoints

### Get all products
```http
GET /api/products
```

### Search products
```http
GET /api/products/search?q=term&category=CategoryName
```

Example:
```http
GET /api/products/search?q=argentina&category=Jerseys
```

---

## Setup & Run Instructions

You can run this project in two ways:

### Option 1: Frontend-only mode
This uses the local fallback dataset from `data.js`.

#### Steps
```bash
git clone https://github.com/Saurabh-Yadav31/KickStore.git
cd KickStore
```

Then open `index.html` in your browser.

This mode works without backend or database setup.

---

### Option 2: Full-stack local mode

#### Prerequisites
- Node.js installed
- MongoDB Atlas connection string
- Modern web browser

#### 1. Clone the repository
```bash
git clone https://github.com/Saurabh-Yadav31/KickStore.git
cd KickStore
```

#### 2. Install backend dependencies
```bash
cd backend
npm install
```

#### 3. Create environment variables
Create a `backend/.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

#### 4. Seed the database
```bash
node seed.js
```

#### 5. Start the backend
```bash
npm run dev
```

#### 6. Run the frontend
Open `index.html` in your browser.

---

## How to Use

- Type in the search input to search by product name.
- Click category buttons to filter products.
- Use the reset option in the empty state to return to the full product list.

Example searches:
- `Argentina`
- `ball`
- `boots`

---

## Assumptions Made

1. The application focuses on **product discovery/search**, not checkout or account management.
2. Search is case-insensitive.
3. The current backend exposes **read-only product endpoints** only.
4. The frontend fetches products once and then filters locally in memory for faster interaction.
5. If the backend is unavailable, the frontend can still work with the fallback dataset in `data.js`.
6. The project targets modern browsers that support ES6 and modern CSS features.

---

## Validation & Error Handling

- Displays an empty state when no products match the current search/filter.
- Provides a reset action to recover from no-result states.
- Falls back to local product data if backend fetching fails.
- Uses local filtering after the initial fetch to reduce unnecessary repeated requests.

---

## 🤖 AI-Assisted Development

### Tools Used
- **Perplexity AI** — used for research, architecture decisions, and debugging help
- **GitHub Copilot** — used for code completions, boilerplate, and refactoring support

### How They Helped

I used Perplexity to research UI patterns, plan the backend architecture, and debug deployment issues like CORS and MongoDB Atlas connection errors. It was also useful for quickly verifying documentation without switching between many tabs.

GitHub Copilot helped with repetitive coding tasks like generating product card HTML, writing event listeners, and scaffolding Express routes. It sped up the initial setup and let me focus more on implementation decisions.

Overall, AI tools reduced the time I spent on boilerplate and research. That gave me more time to focus on frontend state, local filtering, backend fallback logic, and UI refinement.

### Challenges Encountered

**Inconsistent outputs:** The same kind of prompt sometimes produced different results across sessions. Copilot would also suggest different implementations depending on the surrounding code, so I learned to review every suggestion instead of accepting it blindly.

**Prompt interpretation:** Early prompts like “make the search better” gave generic results. More specific prompts worked much better, for example asking for local filtering from a cached array with debounce support.

**Design iteration:** AI suggestions for layout and styling were useful, but not always polished. Some ideas looked fine in isolation but needed manual adjustments for spacing, card sizing, typography, and mobile responsiveness.

**Validation gap:** AI-generated code usually handled the happy path well, but it sometimes missed edge cases. For example, I had to add the fallback to local data manually after testing backend failures.

**Over-accepting suggestions:** At first I accepted Copilot suggestions too quickly, which introduced a few subtle bugs. After that, I started reviewing each suggestion carefully before using it.

---

## Trade-offs / Limitations

- The current application supports read-only product browsing and search.
- There is no authentication, cart, checkout flow, or admin product management.
- Search is implemented with simple case-insensitive matching rather than advanced indexing or fuzzy search.
- The frontend is intentionally lightweight and framework-free for simplicity.

---

## Future Improvements

- Add product pagination for larger datasets
- Add backend-side validation and rate limiting
- Add indexing on searchable fields
- Add admin product management
- Add authentication for protected actions
- Add cart and checkout flow

---

## Evaluation Notes

This submission was built to satisfy the assignment requirements:
- store product list
- search by name
- display results
- handle not-found cases

In addition, I included category filtering, responsive UI improvements, backend persistence, and deployment to present the solution as a polished, production-leaning MVP while keeping the core assignment scope intact.

---

## License

This project was created for educational and assignment purposes.

---

## Author

Developed by **Saurabh Yadav**
