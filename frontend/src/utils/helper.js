export const serverUrl =
  process.env.NODE_ENV === "production"
    ? "https://task-management-project-0bpq.onrender.com/api/v1"
    : "http://localhost:3000/api/v1";
