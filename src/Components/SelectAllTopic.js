import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const SelectAllTopic = () => {
  const [topicObj, setTopicObj] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("user") === null) {
      navigate("../login");
    }
  }, [navigate]);

  useEffect(() => {
    fetch("http://localhost:8000/programs")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTopicObj(data);
      })
      .catch((e) => {});
  }, []);

  let setForTopic = new Set();

  topicObj.forEach((element)=>{
    setForTopic.add(element.program_topic);
  });

  let topicsArray = [];

  setForTopic.forEach((element)=>{
    topicsArray.push(element);
  })

  const allTopics = topicsArray.map((topic) => {
    return (
      <>
        <tr>
          <td>
            <Link
              to={"./SelectByTopicName/"+ topic}
              style={{ textDecoration: "none" }}
            >
              {topic}
            </Link>
          </td>
        </tr>
      </>
    );
  });

  return (
    <div className="selectAll main">
      <div className="d-flex justify-content-between">
        <div>
          <h1>Topics</h1>
        </div>
      </div>
      <div className="table-responsive">
        <table class="table table-borderless">
          <thead>
            <tr>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>{allTopics}</tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectAllTopic;
