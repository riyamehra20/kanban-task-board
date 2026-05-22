// TaskCard.jsx
// Phase 1 — Delete action + Move action buttons on every card.
// Phase 2 — Inline editing (toggle state), priority badge, conditional CSS border.

import { useState, useEffect, useRef } from 'react'

// Which move buttons appear per column
const MOVE_ACTIONS = {
  todo:       [{ to: 'inprogress', label: '→ In Progress' }],
  inprogress: [{ to: 'todo', label: '← To Do' }, { to: 'done', label: '→ Done' }],
  done:       [{ to: 'inprogress', label: '← In Progress' }],
}

const PRIORITY_LABELS = {
  high:   'High',
  medium: 'Medium',
  low:    'Low',
}

export default function TaskCard({ task, colId, onDelete, onMove, onEdit }) {
  // Phase 2 — Inline edit toggle state
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)
  const inputRef = useRef(null)

  // Auto-focus the input when edit mode activates
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const startEdit = () => {
    setEditText(task.text)
    setIsEditing(true)
  }

  const saveEdit = () => {
    const trimmed = editText.trim()
    if (trimmed && trimmed !== task.text) {
      onEdit(task.id, trimmed)
    }
    setIsEditing(false)
  }

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter')  saveEdit()
    if (e.key === 'Escape') {
      setEditText(task.text) // revert
      setIsEditing(false)
    }
  }

  return (
    // Phase 2 — Conditional CSS class: high = red border, medium = yellow, low = green
    <div className={`task-card task-card--${task.priority}`}>

      {/* Phase 2 — Inline edit toggle */}
      {isEditing ? (
        <input
          ref={inputRef}
          className="task-card__edit-input"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleEditKeyDown}
          onBlur={saveEdit}
          aria-label="Edit task"
        />
      ) : (
        <p
          className="task-card__text"
          onClick={startEdit}
          title="Click to edit"
        >
          {task.text}
          <span className="task-card__text-hint">click to edit</span>
        </p>
      )}

      {/* Card footer: priority badge + action buttons */}
      <div className="task-card__footer">

        {/* Phase 2 — Priority badge with conditional colour */}
        <span className={`priority-badge priority-badge--${task.priority}`}>
          {PRIORITY_LABELS[task.priority]}
        </span>

        <div className="task-card__actions">
          {/* Phase 1 — Move buttons */}
          {MOVE_ACTIONS[colId].map((action) => (
            <button
              key={action.to}
              className="btn-move"
              onClick={() => onMove(task.id, colId, action.to)}
              aria-label={`Move to ${action.label}`}
            >
              {action.label}
            </button>
          ))}

          {/* Phase 1 — Delete button */}
          <button
            className="btn-delete"
            onClick={() => onDelete(task.id, colId)}
            aria-label="Delete task"
            title="Delete task"
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  )
}
