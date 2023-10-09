import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const SelectAll = () => {
  const navigate = useNavigate();
  const [programObj, setProgramObj] = useState([]);
  const [topicObj, setTopicObj] = useState([]);
  const [filterObj, setFilterObj] = useState({
    program_Topic: "all",
    program_Difficulty: "all",
  });

  useEffect(() => {
    if (sessionStorage.getItem("user") === null) {
      navigate("../login");
    }
  }, [navigate]);

  useEffect(() => {
    fetch(`https://localhost:5001/api/MST_ProgramTopic/`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTopicObj(data);
      })
      .catch((e) => {});
  }, []);

  useEffect(() => {
    fetch(`https://localhost:5001/api/MST_Program/`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProgramObj(data);
      })
      .catch((e) => {});
  }, []);

  const fetchUsingFilter = (program_Topic, program_Difficulty) => {
    // console.warn(program_Topic + " " + program_Difficulty);
    fetch(
      `https://localhost:5001/api/MST_Program/getByFilter/${program_Topic}/${program_Difficulty}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProgramObj(data);
        filterObj.program_Topic = program_Topic;
        filterObj.program_Difficulty = program_Difficulty;
      })
      .catch((e) => {});
  };

  const Delete = (id) => {
    fetch(`https://localhost:5001/api/MST_Program/${id}`, {
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

  const allPrograms = programObj.map((program) => {
    return (
      <>
        <tr>
          <td>
            <Link
              to={"./SelectByID/" + program.id}
              style={{ textDecoration: "none" }}
            >
              {program.program_Name}
            </Link>
          </td>
          <td>{program.program_Topic}</td>
          <td>
            <Link to={program.program_Link} target="_blank">
              <ion-icon name="link-outline"></ion-icon>
            </Link>
          </td>
          <td>
            <Link to={program.program_SolutionLink} target="_blank">
              <ion-icon name="link-outline"></ion-icon>
            </Link>
          </td>
          <td>{program.program_Difficulty}</td>
          <td>
            <button className="btn btn-outline-info">
              <Link
                to={"./UpdateByID/" + program.id}
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
                    Delete(program.id);
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

  const allTopicsName = topicObj.map((topicObj) => {
    return (
      <>
        <option>{topicObj.topic_Name}</option>
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
            value={filterObj.program_Topic}
            onChange={(e) => {
              setFilterObj({ ...filterObj, program_Topic: e.target.value });
              fetchUsingFilter(e.target.value, filterObj.program_Difficulty);
            }}
          >
            <option value={"all"}>Select Topic Name</option>
            {allTopicsName}
          </select>
          <select
            className="form-control m-2"
            value={filterObj.program_Difficulty}
            onChange={(e) => {
              setFilterObj({
                ...filterObj,
                program_Difficulty: e.target.value,
              });
              fetchUsingFilter(filterObj.program_Topic, e.target.value);
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
