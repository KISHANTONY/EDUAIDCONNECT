import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Student Details</h3>
        <div className="banner">
          <p>
            Name: <span> {job.title}</span>
          </p>
          <p>
            Gender: <span>{job.Gender}</span>
          </p>
          <p>
            UPI: <span>{job.UPI}</span>
          </p>
          <p>
            Collage: <span>{job.city}</span>
          </p>
          <p>
            Location: <span>{job.location}</span>
          </p>
          <p>
            Description: <span>{job.description}</span>
          </p>
          <p>
            Posted On: <span>{job.jobPostedOn}</span>
          </p>
          <p>
            Amount:{" "}
            {job.fixedAmount ? (
              <span>{job.fixedAmount}</span>
            ) : (
              <span>
                {job.AmountFrom} - {job.AmountTo}
              </span>
            )}
          </p>
          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <Link to={`/application/${job._id}`}>Pay Now</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
