// uid.js
// Generates a unique string ID for each task object.
// Combines timestamp + random for collision safety.

export const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2)
