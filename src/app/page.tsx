"use client";
import { useEffect, useState } from "react";
import { getProperties } from "@/services/propertyService";
import { useRouter } from "next/navigation";

export default function PropertyListPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [filter, setFilter] = useState<"all" | "vacant" | "occupied" | "maintenance">("all");
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    getProperties().then(setProperties);
  }, []);

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const statusClass = (status: string) => {
    switch (status) {
      case "vacant":
        return "bg-green-100 text-green-700";
      case "occupied":
        return "bg-yellow-100 text-yellow-700";
      case "maintenance":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredProperties = properties
    .filter((p) => filter === "all" || p.status === filter)
    .filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.address.toLowerCase().includes(search.toLowerCase())
    );

const filterButtonClass = (btnStatus: string) => {
  let base = "px-3 py-1 rounded font-medium";
  let color = "";

  switch (btnStatus) {
    case "vacant":
      color =
        filter === "vacant"
          ? "bg-green-600 text-white"
          : "bg-green-100 text-green-700";
      break;
    case "occupied":
      color =
        filter === "occupied"
          ? "bg-yellow-600 text-white"
          : "bg-yellow-100 text-yellow-700";
      break;
    case "maintenance":
      color =
        filter === "maintenance"
          ? "bg-red-600 text-white"
          : "bg-red-100 text-red-700";
      break;
    default:
      color =
        filter === "all"
          ? "bg-gray-600 text-white"
          : "bg-gray-200 text-gray-700";
  }

  return `${base} ${color}`;
};


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
        <button className={filterButtonClass("all")} onClick={() => setFilter("all")}>
          All
        </button>
        <button className={filterButtonClass("vacant")} onClick={() => setFilter("vacant")}>
          Vacant
        </button>
        <button className={filterButtonClass("occupied")} onClick={() => setFilter("occupied")}>
          Occupied
        </button>
        <button
          className={filterButtonClass("maintenance")}
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
                  className={`px-2 py-1 text-xs rounded mt-1 inline-block ${statusClass(
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
