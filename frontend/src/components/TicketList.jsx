import { updateTicket } from "../api";

function TicketList({ tickets, onTicketUpdated }) {

    const handleStatusChange = async (id, { status:newStatus }) => {
        try {
            await updateTicket(id, { status: newStatus});
            // window.location.reload(); // temporary simple refresh
            if (onTicketUpdated) {
                onTicketUpdated();
            }
        } catch (error) {
            console.error("Status update failed");
        }
    };

    return (
        <div>
            <h2>All Tickets</h2>

            {tickets.length === 0 && <p>No tickets yet.</p>}

            {tickets.map((ticket) => (
                <div
                    key={ticket.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        marginBottom: "10px",
                    }}

                >
                    <h3>{ ticket.title }</h3>

                    <p>
                        {ticket.description.length > 100
                            ? ticket.description.substring(0, 100) + "..." : ticket.description}
                    </p>

                    <p><strong>Category:</strong> {ticket.category}</p>
                    <p><strong>Priority:</strong> {ticket.priority}</p>
                    <p><strong>Created:</strong> {new Date(ticket.created_at).toLocaleString()}</p>

                    <select 
                        value={ticket.status}
                        onChange={(e) =>
                            handleStatusChange(ticket.id, e.target.value)
                        } 
                    >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
            ))}
        </div>
    );
}

export default TicketList;
