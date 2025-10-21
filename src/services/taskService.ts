import api from "@/lib/api";

export const getTasks = async () => {
  const res = await api.get("/tasks");
  return res.data;
};

export const getPropertyTasks = async (propertyId: number) => {
  const res = await api.get(`/properties/${propertyId}/tasks`);
  return res.data;
};

export const getTask = async (id: number) => {
  const res = await api.get(`/tasks/${id}`);
  return res.data;
};

export const createTask = async (data: any) => {
  const res = await api.post("/tasks", { task: data });
  return res.data;
};

export const updateTask = async (id: number, data: any) => {
  const res = await api.put(`/tasks/${id}`, { task: data });
  return res.data;
};

export const deleteTask = async (id: number) => {
  await api.delete(`/tasks/${id}`);
};
