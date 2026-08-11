# 🎬 Nightflix

**Nightflix** — це вебзастосунок для пошуку фільмів, перегляду інформації про них, збереження улюблених стрічок та отримання персоналізованих рекомендацій за допомогою штучного інтелекту.

Застосунок використовує **TMDb API (The Movie Database)** як основне джерело інформації про фільми, а окремий backend забезпечує роботу AI-асистента для підбору фільмів.

🌐 **Live Demo:**  
https://nightflix-react-spa.vercel.app/

⚙️ **Backend:**  
https://nightflix-react-spa.onrender.com

---

# 🇺🇦 Українська версія

## 📖 Про проєкт

Nightflix створений для користувачів, які хочуть швидко знайти фільм для перегляду, дізнатися більше про нього або отримати персоналізовану рекомендацію.

Застосунок дозволяє переглядати популярні фільми, виконувати пошук за назвою, відкривати детальну інформацію про стрічку, переглядати акторський склад, відгуки та трейлери.

Також користувач може додавати фільми до **Favorites**, щоб зберегти цікаві стрічки та повернутися до них пізніше.

Окремою частиною Nightflix є **AI Movie Assistant** — чат-асистент, який допомагає підібрати фільм відповідно до побажань користувача.

Наприклад, користувач може попросити:

- комедію для легкого вечора;
- атмосферний трилер;
- фільм із конкретним актором;
- фільми певного режисера;
- фільм конкретного жанру;
- щось динамічне або, навпаки, повільне та атмосферне;
- декілька фільмів відповідно до настрою.

AI-асистент аналізує запит та пропонує до трьох відповідних варіантів із коротким описом.

---

## ✨ Основні можливості

### 🔥 Trending Movies

На головній сторінці відображаються актуальні популярні фільми з TMDb.

Користувач може перемикатися між:

- трендами за день;
- трендами за тиждень.

Для навігації між результатами використовується пагінація.

### 🔎 Пошук фільмів

Nightflix дозволяє шукати фільми за назвою.

Пошук використовує debounce, тому API-запит виконується не після кожного введеного символу, а після короткої паузи користувача.

Параметри пошуку та поточна сторінка також синхронізуються з URL.

### 🎞 Детальна інформація про фільм

Для кожного фільму доступна окрема сторінка з детальною інформацією.

Користувач може переглянути:

- назву;
- постер;
- опис;
- дату виходу;
- рейтинг;
- жанри;
- акторський склад;
- відгуки користувачів;
- трейлери.

### ▶️ Перегляд трейлерів

Якщо для фільму доступні трейлери, їх можна переглянути безпосередньо у застосунку.

Трейлери відкриваються у модальному вікні та відтворюються через YouTube player.

Якщо для одного фільму доступно декілька трейлерів, між ними можна перемикатися за допомогою слайдера.

### ❤️ Favorites

Користувач може додавати цікаві фільми до списку улюблених та видаляти їх звідти.

Ідентифікатори улюблених фільмів зберігаються у **localStorage**, тому список залишається доступним після перезавантаження сторінки.

### 🤖 AI Movie Assistant

Nightflix має окремий AI-асистент для персоналізованого підбору фільмів.

Користувач може описати, що саме хоче подивитися, використовуючи природну мову.

Наприклад:

> Хочу подивитися психологічний трилер із похмурою атмосферою.

або:

> Порадь кілька фільмів із Леонардо Ді Капріо.

або:

> Хочу ознайомитися з фільмами Крістофера Нолана. З чого краще почати?

або:

> Порадь щось легке та смішне на вечір.

Асистент враховує контекст поточної розмови та може уточнювати побажання користувача.

AI-функціональність працює через окремий **Express backend**, який взаємодіє з **Google Gemini API**. Таким чином API-ключ Gemini не передається безпосередньо у клієнтську частину застосунку.

---

## 🛠 Технології

### Frontend

- **React 19**
- **Vite**
- **JavaScript**
- **Redux Toolkit**
- **React Redux**
- **React Router**
- **Axios**
- **Material UI**
- **Emotion**
- **CSS Modules**
- **React Icons**
- **React Hot Toast**
- **React Slick**
- **use-debounce**

### Backend

- **Node.js**
- **Express**
- **Google Gemini API**
- **@google/genai**
- **CORS**
- **Helmet**
- **dotenv**

### External API

- **TMDb API — The Movie Database**

TMDb використовується для отримання:

- популярних фільмів;
- результатів пошуку;
- детальної інформації про фільми;
- акторського складу;
- відгуків;
- трейлерів.

---

## 🏗 Архітектура

Проєкт складається з двох частин:

```text
Nightflix
│
├── Frontend
│   ├── React
│   ├── Redux Toolkit
│   ├── React Router
│   └── TMDb API
│
└── Backend
    ├── Node.js
    ├── Express
    └── Google Gemini API
```

### Frontend

Frontend відповідає за інтерфейс користувача та основну роботу з фільмами.

React-застосунок напряму звертається до **TMDb API** через Axios для отримання інформації про фільми.

### Backend

Backend використовується для роботи AI Movie Assistant.

Схема взаємодії:

```text
User
  ↓
React Frontend
  ↓
Express Backend
  ↓
Google Gemini API
  ↓
Express Backend
  ↓
React Frontend
```

---

## 🚀 Deployment

Проєкт розділений на frontend та backend, які розгорнуті окремо.

### Frontend — Vercel

https://nightflix-react-spa.vercel.app/

### Backend — Render

https://nightflix-react-spa.onrender.com

---

## 📂 Основна структура проєкту

```text
nightflix-react-spa/
│
├── src/
│   ├── components/
│   ├── constants/
│   ├── data/
│   ├── pages/
│   ├── redux/
│   │   └── movies/
│   ├── services/
│   ├── global.css
│   └── main.jsx
│
├── nightflix-backend/
│   └── src/
│       ├── config/
│       ├── constants/
│       ├── controllers/
│       ├── routes/
│       ├── app.js
│       └── server.js
│
├── package.json
└── vite.config.js
```

---

## ⚙️ Локальний запуск

### 1. Клонування репозиторію

```bash
git clone <repository-url>
cd nightflix-react-spa
```

### 2. Встановлення frontend-залежностей

```bash
npm install
```

### 3. Налаштування frontend environment variables

Створіть `.env` у корені frontend-частини:

```env
VITE_TMDB_BASE_URL=
VITE_TMDB_TOKEN=
VITE_BACKEND_URL=
```

Для роботи з TMDb необхідно отримати власний API access token.

### 4. Запуск frontend

```bash
npm run dev
```

### 5. Встановлення backend-залежностей

```bash
cd nightflix-backend
npm install
```

### 6. Налаштування backend environment variables

Створіть `.env` у директорії `nightflix-backend`:

```env
GEMINI_API_KEY=
CLIENT_URL=
PORT=
```

### 7. Запуск backend

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

---

## 💡 Що я реалізував у цьому проєкті

Під час розробки Nightflix я реалізував:

- роботу з REST API;
- асинхронні HTTP-запити через Axios;
- глобальне керування станом за допомогою Redux Toolkit;
- async actions через `createAsyncThunk`;
- маршрутизацію через React Router;
- lazy loading сторінок через `React.lazy` та `Suspense`;
- пошук із debounce;
- пагінацію;
- синхронізацію стану пошуку з URL;
- збереження Favorites у localStorage;
- отримання та відображення даних із TMDb;
- перегляд трейлерів;
- інтеграцію frontend та backend;
- створення REST endpoint на Express;
- інтеграцію Google Gemini API;
- підтримку контексту діалогу з AI-асистентом;
- обробку помилок API;
- CORS-конфігурацію;
- базові HTTP security headers за допомогою Helmet;
- окремий deployment frontend та backend.

---

## 👨‍💻 Author

**Roman Serdiuk**

---

# 🇬🇧 English Version

## 📖 About the Project

**Nightflix** is a movie discovery web application that helps users find movies, explore detailed information about them, save favorites, and receive personalized movie recommendations powered by artificial intelligence.

The application uses the **TMDb API (The Movie Database)** as its primary movie data source.

In addition to traditional movie search, Nightflix includes an **AI Movie Assistant** that allows users to describe what they would like to watch using natural language.

A user can ask for:

- a movie of a particular genre;
- something suitable for their current mood;
- movies starring a particular actor;
- movies directed by a particular director;
- something fast-paced or slow and atmospheric;
- a few suggestions for a movie night.

The assistant analyzes the request and recommends up to three suitable titles with short spoiler-free descriptions.

---

## ✨ Features

### 🔥 Trending Movies

The home page displays currently trending movies retrieved from TMDb.

Users can switch between:

- daily trends;
- weekly trends.

Pagination is available for navigating through the results.

### 🔎 Movie Search

Users can search for movies by title.

The search input uses debounce to avoid sending an API request after every keystroke.

The current search query and page are also synchronized with the URL.

### 🎞 Movie Details

Each movie has a dedicated details page.

Users can explore information including:

- title;
- poster;
- overview;
- release date;
- rating;
- genres;
- cast;
- reviews;
- trailers.

### ▶️ Movie Trailers

Available movie trailers can be watched directly inside Nightflix.

Trailers are displayed in a modal using an embedded YouTube player.

When multiple trailers are available, users can navigate between them using a slider.

### ❤️ Favorites

Users can add movies to their Favorites list and remove them whenever they want.

Favorite movie IDs are stored in **localStorage**, allowing the list to persist between page reloads.

### 🤖 AI Movie Assistant

Nightflix includes an AI-powered movie recommendation assistant.

Instead of searching manually, users can simply describe what they want to watch.

For example:

> I want a dark psychological thriller.

or:

> Recommend a few movies starring Leonardo DiCaprio.

or:

> I want to explore Christopher Nolan's movies. Where should I start?

or:

> Recommend something light and funny for tonight.

The assistant can use the context of the current conversation and ask a short follow-up question when the user's preferences are not specific enough.

The AI functionality is handled by a separate **Express backend** integrated with the **Google Gemini API**. This architecture keeps the Gemini API key outside of the client-side application.

---

## 🛠 Tech Stack

### Frontend

- **React 19**
- **Vite**
- **JavaScript**
- **Redux Toolkit**
- **React Redux**
- **React Router**
- **Axios**
- **Material UI**
- **Emotion**
- **CSS Modules**
- **React Icons**
- **React Hot Toast**
- **React Slick**
- **use-debounce**

### Backend

- **Node.js**
- **Express**
- **Google Gemini API**
- **@google/genai**
- **CORS**
- **Helmet**
- **dotenv**

### External API

- **TMDb API — The Movie Database**

TMDb provides the application with:

- trending movies;
- movie search results;
- detailed movie information;
- cast information;
- reviews;
- trailers.

---

## 🏗 Architecture

The project consists of two separate parts:

```text
Nightflix
│
├── Frontend
│   ├── React
│   ├── Redux Toolkit
│   ├── React Router
│   └── TMDb API
│
└── Backend
    ├── Node.js
    ├── Express
    └── Google Gemini API
```

### Frontend

The frontend is responsible for the user interface and the main movie-related functionality.

The React application communicates with the **TMDb API** through Axios to retrieve movie data.

### Backend

The backend powers the AI Movie Assistant.

The communication flow looks like this:

```text
User
  ↓
React Frontend
  ↓
Express Backend
  ↓
Google Gemini API
  ↓
Express Backend
  ↓
React Frontend
```

---

## 🚀 Deployment

The frontend and backend are deployed separately.

### Frontend — Vercel

https://nightflix-react-spa.vercel.app/

### Backend — Render

https://nightflix-react-spa.onrender.com

---

## 📂 Project Structure

```text
nightflix-react-spa/
│
├── src/
│   ├── components/
│   ├── constants/
│   ├── data/
│   ├── pages/
│   ├── redux/
│   │   └── movies/
│   ├── services/
│   ├── global.css
│   └── main.jsx
│
├── nightflix-backend/
│   └── src/
│       ├── config/
│       ├── constants/
│       ├── controllers/
│       ├── routes/
│       ├── app.js
│       └── server.js
│
├── package.json
└── vite.config.js
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd nightflix-react-spa
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Configure frontend environment variables

Create a `.env` file in the frontend root directory:

```env
VITE_TMDB_BASE_URL=
VITE_TMDB_TOKEN=
VITE_BACKEND_URL=
```

A valid TMDb API access token is required.

### 4. Start the frontend

```bash
npm run dev
```

### 5. Install backend dependencies

```bash
cd nightflix-backend
npm install
```

### 6. Configure backend environment variables

Create a `.env` file inside `nightflix-backend`:

```env
GEMINI_API_KEY=
CLIENT_URL=
PORT=
```

### 7. Start the backend

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

---

## 💡 What I Implemented

While developing Nightflix, I implemented:

- REST API integration;
- asynchronous HTTP requests with Axios;
- global state management with Redux Toolkit;
- asynchronous Redux actions with `createAsyncThunk`;
- client-side routing with React Router;
- page-level lazy loading using `React.lazy` and `Suspense`;
- debounced movie search;
- pagination;
- URL-synchronized search state;
- persistent Favorites using localStorage;
- TMDb API integration;
- movie trailer playback;
- frontend/backend communication;
- an Express REST endpoint;
- Google Gemini API integration;
- conversational context for AI recommendations;
- API error handling;
- CORS configuration;
- basic HTTP security headers using Helmet;
- separate frontend and backend deployments.

---

## 🌐 Live Application

**Frontend:**  
https://nightflix-react-spa.vercel.app/

**Backend:**  
https://nightflix-react-spa.onrender.com

---

## 👨‍💻 Author

**Roman Serdiuk**
