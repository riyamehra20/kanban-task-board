#  Kanban Task Board

A clean and responsive **Kanban Task Board** built with React and Vite. Organize your tasks visually across columns, manage your workflow, and keep your progress saved — all in the browser.

 **Live Demo:** [https://kanbantask-boardd.netlify.app](https://kanbantask-boardd.netlify.app)

---

##  Features

-  **Add Tasks** — Quickly add new tasks using the form
-  **Multiple Columns** — Organize tasks across Todo, In Progress, and Done
-  **Delete Tasks** — Remove tasks you no longer need
-  **Local Storage** — Your tasks are saved in the browser and persist on refresh
-  **Responsive Design** — Works on desktop and mobile

---

##  Tech Stack

| Technology | Purpose |
|---|---|
| React | UI components & state management |
| Vite | Fast development build tool |
| CSS | Styling |
| LocalStorage | Persistent data storage |

---

##  Project Structure

```
kanban-task-board/
├── public/
│   └── _redirects        # Netlify SPA routing fix
├── src/
│   ├── assets/           # Static assets
│   ├── components/
│   │   ├── Board.jsx       # Main board layout
│   │   ├── Column.jsx      # Individual column
│   │   ├── TaskCard.jsx    # Task card component
│   │   └── AddTaskForm.jsx # Form to add new tasks
│   ├── hooks/
│   │   └── useLocalStorage.js  # Custom hook for persistence
│   ├── utils/
│   │   └── uid.js          # Unique ID generator
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

---

##  Getting Started

### Prerequisites
- Node.js (v16+)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/riyamehra20/kanban-task-board.git

# Navigate into the project folder
cd kanban-task-board/kanban-task-board

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

##  Deployment

This project is deployed on **Netlify** with continuous deployment from the `main` branch.

A `public/_redirects` file is included to handle client-side routing:
```
/*    /index.html   200
```

---

##  Screenshot

> ![alt text](kanban.png)

---

##  Author

**Riya Mehra**
- GitHub: [@riyamehra20](https://github.com/riyamehra20)

---

##  License

This project is open source and available under the [MIT License](LICENSE).
