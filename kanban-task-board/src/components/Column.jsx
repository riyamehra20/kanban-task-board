// Column.jsx
// Presentational (dumb) component — receives tasks + handlers via props.
// Renders one of the 3 columns: To Do | In Progress | Done.
// Zero local state — purely driven by parent (Board).

import TaskCard from './TaskCard'

export default function Column({ col, tasks, onDelete, onMove, onEdit }) {
  return (
    <div className="column">
      {/* Column header: title + task count */}
      <div className="column__header">
        <h2 className="column__title">{col.label}</h2>
        <span className="column__count">{tasks.length}</span>
      </div>

      {/* Task list */}
      {tasks.length === 0 ? (
        <p className="column__empty">No tasks here</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            colId={col.id}
            onDelete={onDelete}
            onMove={onMove}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  )
}
