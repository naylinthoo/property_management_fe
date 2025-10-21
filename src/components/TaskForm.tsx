"use client";

import { useState } from "react";
import { createTask } from "@/services/taskService";

type Props = {
  propertyId: number;
  onSuccess?: () => void;
};

const todayDate = () => new Date().toISOString().split("T")[0];

export default function TaskForm({ propertyId, onSuccess }: Props) {
  const [form, setForm] = useState({
    property_id: String(propertyId),
    description: "",
    task_type: "cleaning",
    assigned_person: "",
    date: todayDate(),
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await createTask({
        property_id: Number(form.property_id),
        description: form.description,
        task_type: form.task_type,
        assigned_person: form.assigned_person,
        status: "pending",
        date: form.date || todayDate(),
      });

      // reset form
      setForm({
        property_id: String(propertyId),
        description: "",
        task_type: "cleaning",
        assigned_person: "",
        date: todayDate(),
      });

      onSuccess?.();
    } catch (err: any) {
      console.error("Create task failed:", err);
      setError("Failed to create task");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <div className="text-sm text-red-600">{error}</div>}

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border rounded p-2"
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <select
          name="task_type"
          value={form.task_type}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option value="cleaning">Cleaning</option>
          <option value="maintenance">Maintenance</option>
          <option value="inspection">Inspection</option>
        </select>

        <input
          name="assigned_person"
          value={form.assigned_person}
          onChange={handleChange}
          placeholder="Assigned person"
          className="border rounded p-2"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border rounded p-2"
        />
      </div>



      <div>
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {submitting ? "Creating…" : "Create Task"}
        </button>
      </div>
    </form>
  );
}
