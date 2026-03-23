import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api",
});

export const getTickets = (params) => API.get("/tickets/", { params });
export const createTicket = (data) => API.post("/tickets/", data);
export const updateTicket = (id, data) => API.patch(`/tickets/${id}/`, data);
export const getStats = () => API.get("/tickets/stats/");
export const classifyTicket = (description) => API.post("/tickets/classify/", { description });