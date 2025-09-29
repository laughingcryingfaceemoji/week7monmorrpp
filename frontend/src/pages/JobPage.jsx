import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const JobPage = () => {
    // fetch single job by id and allow delete
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await fetch(`/api/jobs/${id}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch job");
                }
                const data = await res.json();
                setJob(data);
            } catch (err) {
                setError(err.message || "Failed to fetch job");
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this job?");
        if (!confirmDelete) return;
        try {
            const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
            if (!res.ok && res.status !== 204) {
                throw new Error("Failed to delete job");
            }
            navigate("/");
        } catch (err) {
            alert(err.message || "Failed to delete job");
        }
    };

    if (loading) {
        return <div className="job-page"><p>Loading...</p></div>;
    }

    if (error) {
        return (
            <div className="job-page">
                <p>{error}</p>
                <Link to="/">Back</Link>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="job-page">
                <p>Job not found</p>
                <Link to="/">Back</Link>
            </div>
        );
    }

    return (
        <div className="job-page">
            <div className="job-preview">
                <div className="links" style={{ marginBottom: "1rem" }}>
                    <Link to="/">Back to Jobs</Link>
                </div>
                <h2>{job.title}</h2>
                <p>Type: {job.type}</p>
                <p>Description: {job.description}</p>
                <p>Company: {job.company?.name}</p>
                <p>Email: {job.company?.contactEmail}</p>
                <p>Phone: {job.company?.contactPhone}</p>
                <div style={{ marginTop: "1rem" }}>
                    <button onClick={handleDelete}>Delete Job</button>
                </div>
            </div>
        </div>
    );
};

export default JobPage;


