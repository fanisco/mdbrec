### ✅ Cursor AI Task: Build a Chat-Based Movie Recommendation Interface

**Goal**: Implement a chat window in the frontend of a fullstack app. The goal is to let users type the name of a movie they’d like to watch, send that input to a backend API, and then return a list of recommended movie titles (with metadata) as a reply in the chat.

---

### 🎯 User Flow

1. **User opens the app.**
2. **User sees a chat window** (a textbox input + chat history/messages area).
3. **User types a message**: e.g., “I want something like _Inception_”.
4. **Frontend sends the message to the backend** via an API call.
5. **Backend responds with a list of recommendations** (titles, year, genre, poster, etc.).
6. **Frontend displays recommendations in the chat window** as a stylized reply.

---

### 🛠 Requirements

#### 🔷 Frontend (React + Tailwind preferred)

- [ ] Chat UI component with:

  - Chat history area
  - Textbox for user input
  - Submit button (or `Enter` to send)

- [ ] Render user message in chat format.
- [ ] After submit, disable input briefly and show loading spinner.
- [ ] Display results (movies) as a styled message block with:

  - Title
  - Year
  - Genre
  - Poster (if available)

- [ ] Error handling (e.g., no results found, network errors).

#### 🔷 Backend/API Integration

- [ ] Use existing or mock API endpoint like `/api/recommend?query=...`
- [ ] Return list of movies:

  ```json
  [
    {
      "title": "Interstellar",
      "year": 2014,
      "genre": "Sci-Fi",
      "poster": "https://..."
    },
    ...
  ]
  ```

- [ ] Implement sample backend route (Express or similar) with dummy/static data for now.

---

### 📁 Folder Structure (suggested)

```
/frontend
  /components
    ChatWindow.jsx
    ChatMessage.jsx
  /pages
    index.jsx
/backend
  /routes
    recommend.js
  server.js
```
