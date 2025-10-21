"use client";

import { useEffect, useState } from "react";
import { getPropertyTasks, deleteTask, updateTask } from "@/services/taskService";

type Props = {
  propertyId: number;
};

export default function TaskList({ propertyId }: Props) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPropertyTasks(propertyId);

      const sorted = [...data].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setTasks(sorted);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyId]);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this task?")) return;
    try {
      await deleteTask(id);
      setTasks((t) => t.filter((x) => x.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete");
    }
  };

  const handleToggleStatus = async (task: any) => {
    const nextStatus =
      task.status === "pending"
        ? "in_progress"
        : task.status === "in_progress"
        ? "done"
        : "pending";

    try {
      const updated = await updateTask(task.id, { status: nextStatus });
      setTasks((t) =>
        t.map((x) => (x.id === task.id ? { ...x, status: updated.status } : x))
      );
    } catch (err) {
      console.error("Status update failed:", err);
      alert("Failed to update status");
    }
  };

  if (loading) return <div>Loading tasks…</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (tasks.length === 0) return <div>No tasks yet.</div>;

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).replace("_", " ");

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="border p-3 rounded flex justify-between items-start hover:shadow-sm transition"
        >
          <div>
            <div className="font-semibold flex items-center gap-2">
              <span>{capitalize(task.task_type)}</span>
              <button
                onClick={() => handleToggleStatus(task)}
                className={`px-2 py-1 text-xs rounded ${
                  task.status === "done"
                    ? "bg-green-100 text-green-700"
                    : task.status === "in_progress"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {capitalize(task.status)}
              </button>
            </div>

            <div className="text-sm text-gray-700 mt-1">{task.description}</div>
            <div className="text-xs text-gray-500 mt-1">
              Assigned: {task.assigned_person || "—"} • Date: {task.date || "—"}
            </div>
          </div>

          <button
            onClick={() => handleDelete(task.id)}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
