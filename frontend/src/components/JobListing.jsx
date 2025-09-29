import { Link } from "react-router-dom";

const JobListing = ({ job }) => {
  // show summary and link to job page
  return (
    <div className="job-preview">
      <h2><Link to={`/jobs/${job.id}`}>{job.title}</Link></h2>
      <p>Type: {job.type}</p>
      <p>Description: {job.description}</p>
      <p>Company: {job.company?.name}</p>
      <div className="job-details" style={{ marginTop: "10px" }}>
        <Link to={`/jobs/${job.id}`} className="btn">View Job</Link>
      </div>

    </div>
  );
};

export default JobListing;