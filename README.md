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

### 1. Product Discovery Focus (Business MVP Strategy)
* **Technical Perspective:** The current application logic supports a read-only architecture. There is no active session state, shopping cart system, user authentication, or checkout backend routes.
* **Business Perspective:** The project functions as a high-efficiency Minimum Viable Product (MVP) optimized strictly for the top of the sales funnel (Product Discovery). By focusing capital and development time on search speed and inventory visibility first, we validate market demand before investing overhead into complex payment systems.

### 2. Low-Friction Case-Insensitive Search
* **Technical Perspective:** The search string query ignores character casing transformations during execution. 
* **Business Perspective:** Users expect search bars to be flexible. Eliminating case sensitivity reduces user effort and friction. This matches standard retail behaviors seen on platforms like Flipkart, where searching for "BOOTS", "Boots", or "boots" yields the exact same products.

### 3. Dual-Layer Data Availability Strategy
* **Technical Perspective:** The client makes a single initial API request to fetch products on startup. It caches this array in local memory for subsequent frontend filtering. If the database API fails, the application automatically catches the error and loads a static backup array from `data.js`.
* **Business Perspective:** In e-commerce, slow load times kill conversion rates, and server downtime means instant lost revenue. Caching data locally provides instantaneous search results for the user, lowering platform bounce rates. Meanwhile, the local fallback dataset ensures high availability—keeping our digital storefront open and browsable even if the cloud database goes offline.

---

## Validation & Error Handling

### 1. Intelligent Empty States (Preventing Search Abandonment)
* **Technical Perspective:** The interface detects when the filtered product array length equals zero. It conditionally hides the product grid and injects a dedicated "No Match Found" container into the DOM, complete with an event listener to reset the search state.
* **Business Perspective:** On platforms like Swiggy, a completely blank search error is a dead end that causes immediate user abandonment. Our system handles missing items gracefully by explicitly telling the user what happened and providing an instant "Reset" call-to-action button. This acts as a recovery loop to pull the customer right back into our active shopping funnel.

### 2. Input Sanitization & Data Normalization
* **Technical Perspective:** All user inputs are stripped of leading/trailing accidental spaces using string manipulation methods before executing the search logic. The search inputs are evaluated as plain string text to prevent unauthorized script injections.
* **Business Perspective:** Customers often copy-paste text or accidentally add spaces while typing on mobile devices. Normalizing this input ensures the application remains highly forgiving of messy human inputs, preventing unnecessary "product not found" errors that lead to lost sales.

### 3. Graceful Degradation & Network Fail-safes
* **Technical Perspective:** The frontend fetch request is wrapped inside a robust try/catch block. If the API returns a non-200 status code, fails to connect to MongoDB Atlas, or encounters network timeouts on the hosting platform, the UI catches the error and seamlessly initializes using the hardcoded `data.js` catalog.
* **Business Perspective:** This technical fallback directly protects the brand's reputation. Instead of displaying a broken error code to the customer, the application downgrades gracefully, ensuring the user experiences a completely working, polished store catalog under any network condition.

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
