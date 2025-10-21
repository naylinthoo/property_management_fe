"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProperty, deleteProperty } from "@/services/propertyService";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";
import { capitalize, getStatusClass } from "@/app/utils/utils";

export default function PropertyDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [tasksRefreshKey, setTasksRefreshKey] = useState(0);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProperty(Number(id))
      .then(setProperty)
      .catch((err) => {
        console.error("Failed to fetch property:", err);
        setProperty(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteProperty(property.id);
      router.push("/");
    } catch (err) {
      console.error("Failed to delete property:", err);
      alert("Delete failed");
    }
  };

  if (loading) return null;
  if (!property) return <div className="p-6 max-w-4xl mx-auto space-y-6">Property not found.</div>;

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-6">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{property.name}</h1>
          <p className="text-sm text-gray-600">{property.address}</p>
          <p className="mt-1">Owner: {property.owner_name}</p>
          <p>Rent: ฿{property.monthly_rent}</p>
          <p className="mt-1">
            Status: <span className={`px-2 py-1 rounded mt-1 inline-block ${getStatusClass(
                    property.status
                  )}`}>{capitalize(property.status)}</span>
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/properties/${property.id}/edit`)}
            className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </header>

      <section className="bg-white p-4 rounded shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Create Task for this property</h2>
        <TaskForm
          propertyId={property.id}
          onSuccess={() => setTasksRefreshKey((k) => k + 1)}
        />
      </section>

      <section className="bg-white p-4 rounded shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Tasks</h2>
        <TaskList key={tasksRefreshKey} propertyId={property.id} />
      </section>
    </main>
  );
}
