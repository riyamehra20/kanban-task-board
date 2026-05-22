// Board.jsx
// SMART COMPONENT — owns ALL application state via useLocalStorage.
// Implements every handler required by Phase 1 & Phase 2, then passes
// them DOWN as props (prop drilling pattern).
//
// State shape:
// {
//   todo:       [ { id, text, priority }, ... ],
//   inprogress: [ { id, text, priority }, ... ],
//   done:       [ { id, text, priority }, ... ],
// }

import { useLocalStorage } from '../hooks/useLocalStorage'
import Column from './Column'
import AddTaskForm from './AddTaskForm'

// Column definitions — order controls left-to-right render order
const COLUMNS = [
  { id: 'todo',       label: 'To Do'       },
  { id: 'inprogress', label: 'In Progress' },
  { id: 'done',       label: 'Done'        },
]

// Initial state — empty board on first load
const INITIAL_STATE = {
  todo:       [],
  inprogress: [],
  done:       [],
}

export default function Board() {
  // Phase 2 — State Persistence: useLocalStorage replaces useState.
  // Every setState call automatically syncs to localStorage.
  const [state, setState] = useLocalStorage('kanban_board_state', INITIAL_STATE)

  // ── Phase 1: ADD TASK ──────────────────────────────────────────────────────
  // Injects the new task object into the "To Do" array (prepend = top of list).
  const handleAdd = (task) => {
    setState((prev) => ({
      ...prev,
      todo: [task, ...prev.todo],
    }))
  }

  // ── Phase 1: DELETE TASK ───────────────────────────────────────────────────
  // Universal delete — works regardless of which column the task is in.
  const handleDelete = (taskId, colId) => {
    setState((prev) => ({
      ...prev,
      [colId]: prev[colId].filter((t) => t.id !== taskId),
    }))
  }

  // ── Phase 1: MOVE TASK ─────────────────────────────────────────────────────
  // Mutates column state: removes from source column, prepends to destination.
  const handleMove = (taskId, fromCol, toCol) => {
    setState((prev) => {
      const task = prev[fromCol].find((t) => t.id === taskId)
      if (!task) return prev
      return {
        ...prev,
        [fromCol]: prev[fromCol].filter((t) => t.id !== taskId),
        [toCol]:   [task, ...prev[toCol]],
      }
    })
  }

  // ── Phase 2: INLINE EDIT ───────────────────────────────────────────────────
  // Searches all columns and updates the matching task's text.
  const handleEdit = (taskId, newText) => {
    setState((prev) => {
      const updated = {}
      for (const colId of Object.keys(prev)) {
        updated[colId] = prev[colId].map((t) =>
          t.id === taskId ? { ...t, text: newText } : t
        )
      }
      return updated
    })
  }

  return (
    <div className="board">
      {/* Board header */}
      <div className="board__header">
        <h1 className="board__title">📋 Kanban Task Board</h1>
        <p className="board__subtitle">
          {Object.values(state).flat().length} tasks across {COLUMNS.length} columns
        </p>
      </div>

      {/* Add Task Form — Phase 1 (text input) + Phase 2 (priority dropdown) */}
      <AddTaskForm onAdd={handleAdd} />

      {/* 3-Column Grid — Phase 1 UI Architecture */}
      <div className="board__columns">
        {COLUMNS.map((col) => (
          <Column
            key={col.id}
            col={col}
            tasks={state[col.id] || []}
            onDelete={handleDelete}
            onMove={handleMove}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  )
}
