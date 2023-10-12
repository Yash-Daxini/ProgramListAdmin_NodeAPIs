import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const SelectAll = () => {
  const navigate = useNavigate();
  const [programObj, setProgramObj] = useState([]);
  const [filterObj, setFilterObj] = useState({
    program_topic: "all",
    difficulty: "all",
  });
  const [filterArr, setFilterArr] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("user") === null) {
      navigate("../login");
    }
  }, [navigate]);

  useEffect(() => {
    fetch(`http://localhost:8000/programs`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProgramObj(data);
        setFilterArr(data);
      })
      .catch((e) => {});
  }, []);

  let setForTopic = new Set();

  let topicObj = [];

  programObj.forEach((element) => {
    setForTopic.add(element.program_topic);
  });

  setForTopic.forEach((element) => {
    topicObj.push(element);
  });

  const Delete = (id, topic) => {
    if (programObj.filter((ele) => ele.program_topic === topic).length === 1) {
      fetch(`http://localhost:8000/topic/deleteFromTopic/${topic}`, {
        method: "DELETE",
      }).then((res) => {console.log(topic)});
    }
    fetch(`http://localhost:8000/programs/${id}`, {
      method: "DELETE",
    })
      .then((resp) => {
        navigate("../");
        setTimeout(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Data Deleted Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("../SelectAll");
        }, 0.01);
      })
      .catch((e) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Some error occured!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const allPrograms = filterArr.map((program) => {
    return (
      <>
        <tr>
          <td>
            <Link
              to={"./SelectByID/" + program._id}
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
          <td>
            <button className="btn btn-outline-info">
              <Link
                to={"./UpdateByID/" + program._id}
                className="text-decoration-none"
              >
                <ion-icon name="create-outline"></ion-icon>
              </Link>
            </button>
          </td>
          <td>
            <button
              type="submit"
              className="btn btn-outline-danger"
              onClick={(e) => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "It will deleted permanently!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    Delete(program._id, program.program_topic);
                  }
                });
              }}
            >
              <ion-icon name="trash-outline"></ion-icon>
            </button>
          </td>
        </tr>
      </>
    );
  });

  const allTopicsName = topicObj.map((topic) => {
    return (
      <>
        <option>{topic}</option>
      </>
    );
  });

  return (
    <div className="selectAll main">
      <div className="d-flex justify-content-between flex-wrap">
        <div>
          <h1>Programs</h1>
        </div>
        <div className="d-flex justify-content-center aligm-items-center flex-wrap w-50">
          <select
            className="form-control m-2"
            value={filterObj.program_topic}
            onChange={(e) => {
              setFilterObj({ ...filterObj, program_topic: e.target.value });
              if (e.target.value === "all" && filterObj.difficulty === "all") {
                setFilterArr(programObj);
              } else if (e.target.value === "all") {
                setFilterArr(
                  programObj.filter(
                    (ele) => ele.difficulty === filterObj.difficulty
                  )
                );
              } else if (filterObj.difficulty === "all") {
                let arr = programObj.filter(
                  (ele) => ele.program_topic === e.target.value
                );
                setFilterArr(arr);
              } else {
                setFilterArr(
                  programObj.filter(
                    (ele) =>
                      ele.program_topic === e.target.value &&
                      ele.difficulty === filterObj.difficulty
                  )
                );
              }
            }}
          >
            <option value={"all"}>Select Topic Name</option>
            {allTopicsName}
          </select>
          <select
            className="form-control m-2"
            value={filterObj.difficulty}
            onChange={(e) => {
              setFilterObj({
                ...filterObj,
                difficulty: e.target.value,
              });
              if (
                e.target.value === "all" &&
                filterObj.program_topic === "all"
              ) {
                setFilterArr(programObj);
              } else if (e.target.value === "all") {
                setFilterArr(
                  programObj.filter(
                    (ele) => ele.program_topic === filterObj.program_topic
                  )
                );
              } else if (filterObj.program_topic === "all") {
                setFilterArr(
                  programObj.filter((ele) => ele.difficulty === e.target.value)
                );
              } else {
                setFilterArr(
                  programObj.filter(
                    (ele) =>
                      ele.program_topic === filterObj.program_topic &&
                      ele.difficulty === e.target.value
                  )
                );
              }
            }}
          >
            <option value={"all"}>Select Difficulty</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
        <div>
          <Link className="successAddBtn rounded-3 m-2" to={"../Insert"}>
            <ion-icon name="add-outline"></ion-icon>
          </Link>
        </div>
      </div>
      <div className="table-responsive">
        <table class="table table-borderless">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Topic</th>
              <th scope="col">Program Link</th>
              <th scope="col">Solution Link</th>
              <th scope="col">Difficulty</th>
              <th scope="col" colSpan={2}>
                Actions
              </th>
            </tr>
          </thead>
          {allPrograms.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={6}>
                  <h3>No match found</h3>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>{allPrograms}</tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default SelectAll;
