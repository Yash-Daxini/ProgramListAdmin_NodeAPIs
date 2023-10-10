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

  const [topicAndCount, setTopicAndCount] = useState([]);

  useEffect(() => {
    fetch("https://localhost:5001/api/MST_Program/problemcount")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTopicAndCount(data);
      })
      .catch((e) => {});
  }, []);

  let totalProgram = 0;

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

  const cardsOfCount = topicAndCount.map((obj) => {
    totalProgram += obj.program_Count;
    return (
      <div class="card">
        <div>
          <div class="cardNumber" data-val={obj.program_Count}>
            {obj.program_Count}
          </div>
        </div>
        <div class="cardName">{obj.topic_Name}</div>
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
                {/* <tr>
                <td>Allan Smith</td>
                <td>
                  <span>
                    <ion-icon name="star" class="star"></ion-icon>
                  </span>
                  <span>
                    <ion-icon name="star" class="star"></ion-icon>
                  </span>
                  <span>
                    <ion-icon name="star" class="star"></ion-icon>
                  </span>
                  <span>
                    <ion-icon name="star" class="star"></ion-icon>
                  </span>
                  <span>
                    <ion-icon name="star" class="star"></ion-icon>
                  </span>
                </td>
              </tr>
              <tr>
                <td>Amit Shroff</td>
                <td>
                  <span>
                    <ion-icon name="star" class="star"></ion-icon>
                  </span>
                  <span>
                    <ion-icon name="star" class="star"></ion-icon>
                  </span>
                  <span>
                    <ion-icon name="star" class="star"></ion-icon>
                  </span>
                  <span>
                    <ion-icon name="star" class="star"></ion-icon>
                  </span>
                  <span>
                    <ion-icon name="star-half" class="star"></ion-icon>
                  </span>
                </td>
              </tr>
              <tr>
                <td>Darshan Uni.</td>
                <td>
                  <span>
                    <ion-icon name="star" class="star"></ion-icon>
                  </span>
                  <span>
                    <ion-icon name="star" class="star"></ion-icon>
                  </span>
                  <span>
                    <ion-icon name="star" class="star"></ion-icon>
                  </span>
                  <span>
                    <ion-icon name="star" class="star"></ion-icon>
                  </span>
                </td>
              </tr> */}
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
              {/* <tr>
                <td>
                  <span>
                    <ion-icon class="text-warning" name="person"></ion-icon>
                  </span>
                </td>
                <td>Allan Smith</td>
              </tr>
              <tr>
                <td>
                  <span>
                    <ion-icon class="text-prinmary" name="person"></ion-icon>
                  </span>
                </td>
                <td>Amit Shroff</td>
              </tr>
              <tr>
                <td>
                  <span>
                    <ion-icon class="text-danger" name="person"></ion-icon>
                  </span>
                </td>
                <td>Darshan Uni.</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
