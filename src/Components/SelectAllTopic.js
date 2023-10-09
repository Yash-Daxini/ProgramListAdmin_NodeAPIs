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
    fetch("https://localhost:5001/api/MST_ProgramTopic")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTopicObj(data);
      })
      .catch((e) => {});
  }, []);

  const allTopics = topicObj.map((topic) => {
    return (
      <>
        <tr>
          <td>
            <Link
              to={"./SelectByTopicName/"+ topic.topic_Name}
              style={{ textDecoration: "none" }}
            >
              {topic.topic_Name}
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
