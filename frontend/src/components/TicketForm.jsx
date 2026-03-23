import { useState } from "react";
import { classifyTicket, createTicket } from "../api";




function TicketForm({ onTicketCreated }) {
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("general");
    const [priority, setPriority] = useState("low");
    const [loading, setLoading] = useState(false)

    


    const handleSubmit = async (e) => {
        e.preventDefault();  // prevents page reload

        try {
            const ticketData = {
                title,
                description,
                category,
                priority,
            };
            await createTicket(ticketData);

            setTitle("");
            setDescription("");
            setCategory("general");
            setPriority("low");

            if (onTicketCreated) {
                onTicketCreated();
            }
        } catch (error) {
            console.error("Ticket creation failed:", error)
        }

        console.log("Title:", title)
        console.log("Description:", description);
    };

    const handleClassify = async (text) => {
        if (!text) return;

        try {
            setLoading(true);

            const res = await classifyTicket(text);

            if (res.data.suggested_category) {
                setCategory(res.data.suggested_category);
            }

            if (res.data.suggested_priority) {
                setPriority(res.data.suggested_priority);
            }
        } catch (error) {
            console.error("FULL ERROR:", error);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create Ticket</h2>

            <form onSubmit={handleSubmit}>

                <input 
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />

                <br /><br />

                <textarea 
                    placeholder="Description"
                    value={description}
                    onChange={(e) => {
                        const value = e.target.value;
                        setDescription(value);

                        if (value.length > 20) {
                            handleClassify(value);
                        }
                    }}
                />

                {loading && <p>Analyzing with AI...</p>}
                
                <br /><br />

                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="billing">Billing</option>
                    <option value="technical">Technical</option>
                    <option value="account">Account</option>
                    <option value="general">General</option>
                </select>

                <br /><br />

                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                </select>

                <br /><br />

                <button type="submit">
                    Submit
                </button>

                  
            </form>
        </div>
    )
    
}
export default TicketForm