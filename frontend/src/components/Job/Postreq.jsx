import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const Postreq = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [Gender, setGender] = useState("");
  const [UPI, setUPI] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [AmountFrom, setAmountFrom] = useState("");
  const [AmountTo, setAmountTo] = useState("");
  const [fixedAmount, setFixedAmount] = useState("");
  const [AmountType, setAmountType] = useState("default");

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (AmountType === "Fixed Amount") {
      setAmountFrom("");
      setAmountFrom("");
    } else if (AmountType === "Ranged Amount") {
      setFixedAmount("");
    } else {
      setAmountFrom("");
      setAmountTo("");
      setFixedAmount("");
    }
    await axios
      .post(
        "http://localhost:4000/api/v1/job/post",
        fixedAmount.length >= 4
          ? {
              title,
              description,
              Gender,
              UPI,
              city,
              location,
              fixedAmount,
            }
          : {
              title,
              description,
              Gender,
              UPI,
              city,
              location,
              AmountFrom,
              AmountTo,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <>
      <div className="job_post page">
        <div className="container">
          <h3>POST NEW REQUEST</h3>
          <form onSubmit={handleJobPost}>
            <div className="wrapper">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Name"
              />
              <select
                value={Gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">
                 Female
                </option>
                  
              </select>
            </div>
            <div className="wrapper">
              <input
                type="text"
                value={UPI}
                onChange={(e) => setUPI(e.target.value)}
                placeholder="UPI"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Collage"
              />
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Address"
            />
           <div className="Amount_wrapper">
              <div>
                <input
                  type="number"
                  placeholder="Enter Amount"
                  value={fixedAmount}
                  onChange={(e) => setFixedAmount(e.target.value)}
                />
              </div>
            </div>

            <textarea
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Reason"
            />
            <button type="submit">Done</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Postreq;
