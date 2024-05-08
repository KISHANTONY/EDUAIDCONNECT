import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Reqs = () => {
  const [Reqs, setReqs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setReqs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="Reqs page">
      <div className="container">
        <h1>REQUESTS</h1>
        <div className="banner">
          {Reqs.Reqs &&
            Reqs.Reqs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.Gender}</p>
                  <p>{element.UPI}</p>
                  <Link to={`/job/${element._id}`}>DONATE NOW</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Reqs;
