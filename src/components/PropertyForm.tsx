"use client";

import { useState } from "react";
import { createProperty, updateProperty } from "@/services/propertyService";
import { useRouter } from "next/navigation";

interface PropertyFormProps {
  initialData?: any;
  isEditMode?: boolean;
}

export default function PropertyForm({ initialData, isEditMode }: PropertyFormProps) {
  const [form, setForm] = useState(
    initialData || {
      name: "",
      address: "",
      owner_name: "",
      monthly_rent: "",
      status: "vacant",
    }
  );
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateProperty(initialData.id, form);
      } else {
        await createProperty(form);
      }
      router.push("/");
    } catch (err) {
      console.error("Error saving property:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Dynamic title */}
      <h1 className="text-2xl font-bold mb-4">
        {isEditMode ? "Update Property" : "Create Property"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          name="owner_name"
          placeholder="Owner Name"
          value={form.owner_name}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          name="monthly_rent"
          placeholder="Monthly Rent"
          type="number"
          value={form.monthly_rent}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          <option value="vacant">Vacant</option>
          <option value="occupied">Occupied</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <button
          type="submit"
          className="bg-gray-900 text-white px-4 py-2 rounded w-full"
        >
          {isEditMode ? "Update Property" : "Create Property"}
        </button>
      </form>
    </div>
  );
}
