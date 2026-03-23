

import './App.css'
import { useState, useEffect } from "react";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
// import Stats from "./components/Stats";
import { getTickets, getStats } from "./api";


function App() {

  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({});
  const [filters, setFilters] = useState({
    category: "",
    priority: "",
    status: "",
    search: "",
  });

  const fetchTickets = async () => {
    const res = await getTickets(filters);
    setTickets(res.data);
  };

  const fetchStats = async () => {
    const res = await getStats();
    setStats(res.data);
  };

  
  const handleTicketUpdated = () => {
    fetchTickets();
    fetchStats();
  };

  useEffect(() =>{
    fetchTickets();
  }, [filters]);

  useEffect(() => {
    fetchStats();
  }, [filters]);

  


  return (
    <div className="container">
      <h1>Support Ticket System</h1>

      <TicketForm onTicketCreated={handleTicketUpdated} />
      
      <h3>Filters</h3>

      <input 
        type="text"
        placeholder="Search..."
        value={filters.search}
        onChange={(e) =>
          setFilters({ ...filters, search: e.target.value })
        }
      />

      <select 
        value={filters.category}
        onChange={(e) =>
          setFilters({ ...filters, category: e.target.value })
        }
      >
        <option value="">All Categories</option>
        <option value="billing">Billing</option>
        <option value="technical">Technical</option>
        <option value="account">Account</option>
        <option value="general">General</option>
      </select>

      <select 
        value={filters.priority}
        onChange={(e) =>
          setFilters({ ...filters, priority: e.target.value })
        }
      >
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>

      <select 
        value={filters.status}
        onChange={(e) =>
          setFilters({ ...filters, status: e.target.value })
        }
      >
        <option value="">All Status</option>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="resolved">Resolved</option>
        <option value="closed">Closed</option>
      </select>

      <TicketList
        tickets={tickets}
        onTicketUpdated={handleTicketUpdated}
      />
    </div>
  );
}

export default App;
