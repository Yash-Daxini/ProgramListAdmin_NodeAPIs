import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const SelectByTopicName = () => {

  const params = useParams();

  const [progams, setProgams] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if( sessionStorage.getItem("user") === null ){
      navigate("../login");
    }
  }, [navigate])

  useEffect(() => {
    fetch(`http://localhost:8000/programs/topics/${params.name}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProgams(data);
      })
      .catch((e) => {});
  }, [params.name,params.id])

  const allPrograms = progams.map((program) => {
    return (
      <>
        <tr>
          <td>
            <Link
              to={"../../../SelectAll/SelectByID/" + program.id}
              style={{ textDecoration: "none" }}
            >
              {program.program_name}
            </Link>
          </td>
          <td>{program.program_topic}</td>
          <td>
            <Link to={program.program_link} target="_blank">
              <ion-icon name="link-outline"></ion-icon>
            </Link>
          </td>
          <td>
            <Link to={program.solution_link} target="_blank">
              <ion-icon name="link-outline"></ion-icon>
            </Link>
          </td>
          <td>{program.difficulty}</td>
        </tr>
      </>
    );
  });
  

  return (
    <div className="selectAll main">
      <h1 style={{textTransform:"capitalize"}}>{params.name}</h1>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Topic</th>
              <th scope="col">Program Link</th>
              <th scope="col">Solution Link</th>
              <th scope="col">Difficulty</th>
            </tr>
          </thead>
          <tbody>{allPrograms}</tbody>
        </table>
      </div>
    </div>
  )
}

export default SelectByTopicName
