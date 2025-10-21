import api from "@/lib/api";

export const getProperties = async () => {
  const res = await api.get("/properties");
  return res.data;
};

export const getProperty = async (id: number) => {
  const res = await api.get(`/properties/${id}`);
  return res.data;
};

export const createProperty = async (data: any) => {
  const res = await api.post("/properties", { property: data });
  return res.data;
};

export const updateProperty = async (id: number, data: any) => {
  const res = await api.put(`/properties/${id}`, { property: data });
  return res.data;
};

export const deleteProperty = async (id: number) => {
  await api.delete(`/properties/${id}`);
};
