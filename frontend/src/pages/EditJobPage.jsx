import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const EditJobPage = () => {
    // fetch job, prefill form, submit PUT update
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [type, setType] = useState("Full-Time");
    const [description, setDescription] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await fetch(`/api/jobs/${id}`);
                if (!res.ok) throw new Error("Failed to load job");
                const data = await res.json();
                setTitle(data.title || "");
                setType(data.type || "Full-Time");
                setDescription(data.description || "");
                setCompanyName(data.company?.name || "");
                setContactEmail(data.company?.contactEmail || "");
                setContactPhone(data.company?.contactPhone || "");
            } catch (err) {
                setError(err.message || "Failed to load job");
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                title,
                type,
                description,
                company: {
                    name: companyName,
                    contactEmail,
                    contactPhone,
                },
            };
            const res = await fetch(`/api/jobs/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error("Failed to update job");
            navigate(`/jobs/${id}`);
        } catch (err) {
            setError(err.message || "Failed to update job");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="edit">
            <div className="links" style={{ marginBottom: "1rem" }}>
                <Link to={`/jobs/${id}`}>Back</Link>
            </div>
            <h2>Edit Job</h2>
            {error && <p>{error}</p>}
            <form onSubmit={submitForm}>
                <label>Job title:</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />

                <label>Job type:</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Remote">Remote</option>
                    <option value="Internship">Internship</option>
                </select>

                <label>Job Description:</label>
                <textarea required value={description} onChange={(e) => setDescription(e.target.value)} />

                <label>Company Name:</label>
                <input type="text" required value={companyName} onChange={(e) => setCompanyName(e.target.value)} />

                <label>Contact Email:</label>
                <input type="text" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />

                <label>Contact Phone:</label>
                <input type="text" required value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />

                <button>Update Job</button>
            </form>
        </div>
    );
};

export default EditJobPage;


