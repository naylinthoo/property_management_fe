"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProperty } from "@/services/propertyService";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";

export default function PropertyDetailPage() {
  const { id } = useParams();
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

  if (loading) return null;
  if (!property) return <div className="p-6 max-w-4xl mx-auto space-y-6">Property not found.</div>;

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-bold">{property.name}</h1>
        <p className="text-sm text-gray-600">{property.address}</p>
        <p className="mt-1">Owner: {property.owner_name}</p>
        <p>Rent: ฿{property.monthly_rent}</p>
        <p className="italic">Status: {property.status}</p>
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
