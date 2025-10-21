"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PropertyForm from "@/components/PropertyForm";
import { getProperty } from "@/services/propertyService";

export default function EditPropertyPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);

  useEffect(() => {
    getProperty(Number(id)).then(setProperty);
  }, [id]);

  if (!property) return null;
  return <PropertyForm initialData={property} isEditMode />;
}
