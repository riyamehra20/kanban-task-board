// AddTaskForm.jsx
// Phase 1 — Captures task text and injects new object into "To Do" state array.
// Phase 2 — Priority dropdown (High / Medium / Low) passed on the task object.

import { useState } from 'react'
import { uid } from '../utils/uid'

export default function AddTaskForm({ onAdd }) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('medium')

  const handleAdd = () => {
    const trimmed = text.trim()
    if (!trimmed) return

    // Inject new task object into "To Do"
    onAdd({
      id: uid(),
      text: trimmed,
      priority,          // 'high' | 'medium' | 'low'
    })

    // Reset form
    setText('')
    setPriority('medium')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div className="add-task-form">
      {/* Task text input */}
      <input
        className="add-task-form__input"
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="New task description"
      />

      {/* Phase 2 — Priority dropdown */}
      <select
        className="add-task-form__select"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        aria-label="Task priority"
      >
        <option value="high">🔴 High</option>
        <option value="medium">🟡 Medium</option>
        <option value="low">🟢 Low</option>
      </select>

      {/* Submit button */}
      <button
        className="add-task-form__btn"
        onClick={handleAdd}
        aria-label="Add task"
      >
        + Add Task
      </button>
    </div>
  )
}
