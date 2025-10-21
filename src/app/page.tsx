"use client";
import { useEffect, useState } from "react";
import { getProperties } from "@/services/propertyService";
import { useRouter } from "next/navigation";
import { capitalize, getFilterButtonClass, getStatusClass } from "./utils/utils";

export default function PropertyListPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [filter, setFilter] = useState<"all" | "vacant" | "occupied" | "maintenance">("all");
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    getProperties().then(setProperties);
  }, []);


  const filteredProperties = properties
    .filter((p) => filter === "all" || p.status === filter)
    .filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.address.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <main className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3">
        <h1 className="text-2xl font-bold">Properties</h1>
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search"
            className="border rounded px-3 py-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => router.push("/properties/new")}
            className="bg-gray-800 text-white px-4 py-1 rounded"
          >
            + Add Property
          </button>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button className={getFilterButtonClass("all", filter)} onClick={() => setFilter("all")}>
          All
        </button>
        <button className={getFilterButtonClass("vacant", filter)} onClick={() => setFilter("vacant")}>
          Vacant
        </button>
        <button className={getFilterButtonClass("occupied", filter)} onClick={() => setFilter("occupied")}>
          Occupied
        </button>
        <button
          className={getFilterButtonClass("maintenance", filter)}
          onClick={() => setFilter("maintenance")}
        >
          Maintenance
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        {filteredProperties.map((p) => (
          <div
            key={p.id}
            className="relative border rounded p-3 hover:shadow-md transition cursor-pointer"
            onClick={() => router.push(`/properties/${p.id}`)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold text-lg">{p.name}</h2>
                <p className="text-sm">{p.address}</p>
                <span
                  className={`px-2 py-1 text-xs rounded mt-1 inline-block ${getStatusClass(
                    p.status
                  )}`}
                >
                  {capitalize(p.status)}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/properties/${p.id}/edit`);
                }}
                className="ml-2 px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
