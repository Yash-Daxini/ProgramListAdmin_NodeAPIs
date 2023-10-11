import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("user") == null) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetch("http://localhost:8000/user")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((e) => {});
  }, []);

  let cardNumbers = document.querySelectorAll(".cardNumber");
  let interval = 1000;

  cardNumbers.forEach((cardNumber) => {
    let startValue = 0;
    let endValue = parseInt(cardNumber.getAttribute("data-val"));
    let duration;
    duration = Math.floor(interval / endValue);
    let counter = setInterval(() => {
      startValue += 1;
      cardNumber.textContent = startValue;
      if (endValue === 0) {
        cardNumber.textContent = endValue;
        clearInterval(counter);
      }
      if (startValue === endValue) {
        clearInterval(counter);
      }
    }, duration);
  });

  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/programs")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPrograms(data);
      })
      .catch((e) => {});
  }, []);

  let setForTopics = new Set();

  programs.forEach(element => {
    setForTopics.add(element.program_topic);
  });

  let topicsArr = [];

  setForTopics.forEach(element => {
    topicsArr.push(element);
  });

  let totalProgram = programs.length;

  const dispayAdminUser = users.map((user) => {
    return (
      <>
        <tr>
          <td>
            <span>
              <ion-icon name="person-outline" className="ion"></ion-icon>
            </span>
          </td>
          <td>{user.user_name}</td>
        </tr>
      </>
    );
  });

  const cardsOfCount = topicsArr.map((obj) => {
    let arr = programs.filter((program)=>program.program_topic === obj);
    let programCount = arr.length;
    return (
      <div class="card">
        <div>
          <div class="cardNumber" data-val={programCount}>
            {programCount}
          </div>
        </div>
        <div class="cardName">{obj}</div>
      </div>
    );
  });

  return (
    <div>
      <div class="cardBox text-center">
        {cardsOfCount}
        <div class="card">
          {/* <div> */}
          <div class="cardNumber" data-val={totalProgram}>
            {totalProgram}
          </div>
          <div class="cardName">Total Questions</div>
          {/* </div> */}
        </div>
      </div>
      <div class="homePart d-flex flex-wrap">
        <div class="userFeedback">
          <h4>Login User Inforamation</h4>
          <div className="table-responsive">
            <table
              class="table text-center my-3"
              cellpadding="40px"
              cellspacing="40px"
            >
              <thead>
                <tr>
                  <th scope="col">User Name</th>
                  <th scope="col">User Email</th>
                  <th scope="col">User Mobile Number</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {sessionStorage.getItem("user") === null ? (
                    <td></td>
                  ) : (
                    <>
                      <td>
                        {JSON.parse(sessionStorage.getItem("user")).user_name}
                      </td>
                      <td>
                        {
                          JSON.parse(sessionStorage.getItem("user"))
                            .user_emailaddress
                        }
                      </td>
                      <td>
                        {
                          JSON.parse(sessionStorage.getItem("user"))
                            .user_mobilenumber
                        }
                      </td>
                    </>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="recentUser">
          <h4>Recent Admin User</h4>
          <table
            class="table text-center my-3"
            cellpadding="40px"
            cellspacing="40px"
          >
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Name</th>
              </tr>
            </thead>
            <tbody>
              {dispayAdminUser}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
