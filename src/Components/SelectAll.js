import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const SelectAll = () => {
  const navigate = useNavigate();
  const [programObj, setProgramObj] = useState([]);
  const [listOrTextAreaBtn, setListOrTextAreaBtn] = useState(
    "Not Present in list ? Want to add new topic !"
  );
  const [isAnyChecked, setIsAnyChecked] = useState(false);
  const [filterObj, setFilterObj] = useState({
    program_topic: "all",
    difficulty: "all",
  });
  const [deleteArr, setDeleteArr] = useState([]);
  const [updateObj, setUpdateObj] = useState({});
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
  }, [updateObj]);

  let setForTopic = new Set();

  let topicObj = [];

  programObj.forEach((element) => {
    setForTopic.add(element.program_topic);
  });

  setForTopic.forEach((element) => {
    topicObj.push(element);
  });

  let deleteFromArray = () => {
    deleteArr.forEach((element) => {
      Delete(element.id, element.topic);
    });
  };

  const Delete = (id, topic) => {
    if (programObj.filter((ele) => ele.program_topic === topic).length === 1) {
      fetch(`http://localhost:8000/topic/deleteFromTopic/${topic}`, {
        method: "DELETE",
      }).then((res) => {
        console.log(topic);
      });
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

  const selectionList = topicObj.map((topic) => {
    return (
      <>
        <option value={topic} style={{ textTransform: "capitalize" }}>
          {topic}
        </option>
      </>
    );
  });

  // const
  const allPrograms = filterArr.map((program) => {
    return (
      <>
        <tr className={`display${program._id}`}>
          <td>
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked === true) {
                  if (isAnyChecked === false) {
                    setIsAnyChecked(true);
                  }
                  // console.warn("selected" + program._id);
                  deleteArr.push({
                    id: program._id,
                    topic: program.program_topic,
                  });
                  setDeleteArr(deleteArr);
                  // console.warn(deleteArr);
                } else {
                  let index = 0;
                  deleteArr.forEach((element, ind) => {
                    if (
                      element.id === program._id &&
                      element.topic === program.program_topic
                    ) {
                      index = ind;
                    }
                  });
                  console.warn(index);
                  if (index !== 0) deleteArr.splice(index, index);
                  else deleteArr.shift();
                  setDeleteArr(deleteArr);
                  // console.warn(deleteArr);
                }
                if (isAnyChecked === true && deleteArr.length === 0)
                  setIsAnyChecked(false);
              }}
            />
          </td>
          <td className={`display${program._id}`}>
            <Link
              to={"./SelectByID/" + program._id}
              style={{ textDecoration: "none" }}
            >
              <p className={`display${program._id}`}>{program.program_name}</p>
            </Link>
            <label style={{ display: "none" }} className={`edit${program._id}`}>
              <h5>Program Name</h5>
            </label>
            <input
              // style={{ display: "none" }}
              type="hidden"
              className={`edit${program._id} form-control border-3`}
              value={updateObj.program_name}
              onChange={(e) => {
                setUpdateObj({ ...updateObj, program_name: e.target.value });
              }}
            />
          </td>
          <td className={`display${program._id}`}>
            <p className={`display${program._id}`}>{program.program_topic}</p>
            <label style={{ display: "none" }} className={`edit${program._id}`}>
              <h5>Program Topic</h5>
            </label>
            <select
              className={`form-control edit${program._id}`}
              style={{ display: "none" }}
              id={`selectionBoxForTopic${program._id}`}
              value={updateObj.program_topic}
              onChange={(e) => {
                setUpdateObj({ ...updateObj, program_topic: e.target.value });
              }}
            >
              <option>Select Topic Name</option>
              {selectionList}
            </select>
            {/* <input
              // style={{ display: "none" }}
              type="hidden"
              className={`edit${program._id} form-control border-3`}
              value={updateObj.program_topic}
              onChange={(e) => {
                // program.program_topic = e.target.value;
                setUpdateObj({ ...updateObj, program_topic: e.target.value });
              }}
            /> */}
            <input
              required
              type="text"
              class={`form-control`}
              id={`textBoxForTopic${program._id}`}
              style={{ display: "none"}}
              placeholder="Program Topic"
              value={updateObj.program_topic}
              onChange={(e) => {
                setUpdateObj({ ...updateObj, program_topic: e.target.value });
              }}
            />
            <input
              type="button"
              style={{ display: "none" , width: "500px"}}
              className={`btn btn-outline-primary my-3 edit${program._id}`}
              value={listOrTextAreaBtn}
              onClick={(e) => {
                try {
                  if (
                    document.getElementById(`selectionBoxForTopic${program._id}`).style
                      .display === "none"
                  ) {
                    document.getElementById(
                      `selectionBoxForTopic${program._id}`
                    ).style.display = "block";
                    document.getElementById(
                      `textBoxForTopic${program._id}`
                    ).style.display = "none";
                    setListOrTextAreaBtn(
                      "Not Present in list ? Want to add new topic !"
                    );
                  } else {
                    document.getElementById(
                      `selectionBoxForTopic${program._id}`
                    ).style.display = "none";
                    document.getElementById(
                      `textBoxForTopic${program._id}`
                    ).style.display = "block";
                    setListOrTextAreaBtn("Want to select from list ? ");
                  }
                } catch (exce) {}
              }}
            ></input>
          </td>
          <td className={`display${program._id}`}>
            <Link
              to={program.program_link}
              className={`display${program._id}`}
              target="_blank"
            >
              {/* <p > */}
              <ion-icon name="link-outline"></ion-icon>
              {/* </p> */}
            </Link>
            <label style={{ display: "none" }} className={`edit${program._id}`}>
              <h5>Problem Link</h5>
            </label>
            <input
              // style={{ display: "none" }}
              type="hidden"
              className={`edit${program._id} form-control border-3`}
              value={updateObj.program_link}
              onChange={(e) => {
                setUpdateObj({ ...updateObj, program_link: e.target.value });
              }}
            />
          </td>
          <td className={`display${program._id}`}>
            <Link
              to={program.solution_link}
              className={`display${program._id}`}
              target="_blank"
            >
              {/* <p className={`display${program._id}`}> */}
              <ion-icon name="link-outline"></ion-icon>
              {/* </p> */}
            </Link>
            <label style={{ display: "none" }} className={`edit${program._id}`}>
              <h5>Solution Link</h5>
            </label>
            <input
              // style={{ display: "none" }}
              type="hidden"
              className={`edit${program._id} form-control border-3`}
              value={updateObj.solution_link}
              onChange={(e) => {
                setUpdateObj({ ...updateObj, solution_link: e.target.value });
              }}
            />
          </td>
          <td className={`display${program._id}`}>
            <p className={`display${program._id}`}>{program.difficulty}</p>
            <label style={{ display: "none" }} className={`edit${program._id}`}>
              <h5>Difficulty</h5>
            </label>
            <select
              class={`form-control editSelect${program._id} border-3`}
              value={updateObj.difficulty}
              style={{ display: "none" }}
              onChange={(e) => {
                setUpdateObj({ ...updateObj, difficulty: e.target.value });
              }}
            >
              <option>Select Difficulty</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </td>
          <td className={`display${program._id}`}>
            <button
              className="btn btn-outline-info"
              onClick={() => {
                if (
                  document.getElementById(`editIcon${program._id}`).name ===
                  "create-outline"
                ) {
                  let arr = document.getElementsByTagName(`tr`);

                  for (let k in arr) {
                    let e = arr[k];
                    try {
                      if (
                        k !== "length" &&
                        !e.classList.contains(`display${program._id}`)
                      )
                        e.style.filter = "blur(5px)";
                    } catch (exce) {}
                  }

                  arr = document.getElementsByClassName(
                    `display${program._id}`
                  );

                  for (let k in arr) {
                    let e = arr[k];
                    try {
                      if (e.tagName !== "TD" && e.tagName !== "TR") {
                        e.style.display = "none";
                      } else if (e.tagName === "TR") {
                        e.style.position = "relative";
                        e.style.left = "30%";
                        // e.style.backgroundColor = "red"
                      } else if (e.tagName === "TD") {
                        e.style.display = "block";
                      }
                    } catch (exce) {}
                  }
                  arr = document.getElementsByClassName(`edit${program._id}`);

                  for (let k in arr) {
                    let e = arr[k];
                    try {
                      // } catch (exce) {
                      if (k !== "length") {
                        e.type = "text";
                        e.style.display = "block";
                      }
                    } catch (exce) {}
                  }

                  let htmlElement = document.getElementsByClassName(
                    `editSelect${program._id}`
                  )[0];
                  htmlElement.style.display = "block";
                  document.getElementById(`editIcon${program._id}`).name =
                    "checkmark-outline";
                  htmlElement = document.getElementsByClassName(
                    `editSelect${program._id}`
                  )[0];
                  let selectionBoxForTopic = document.getElementById(
                    `selectionBoxForTopic${program._id}`
                  );
                  selectionBoxForTopic.style.display = "block";
                  htmlElement.style.display = "block";
                  setUpdateObj(program);
                } else {
                  fetch(`http://localhost:8000/programs/${updateObj._id}`, {
                    method: "PUT",
                    headers: {
                      Accept: "application/json",
                      "Content-type": "application/json",
                    },
                    body: JSON.stringify(updateObj),
                  })
                    .then((r) => r.json())
                    .then((res) => {
                      setUpdateObj({});
                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Data Updated Successfully!",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    })
                    .catch((e) => {
                      Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Some Error Occured!",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    });
                  let arr = document.getElementsByTagName(`tr`);

                  for (let k in arr) {
                    let e = arr[k];
                    try {
                      if (
                        k !== "length" &&
                        !e.classList.contains(`display${program._id}`)
                      )
                        e.style.filter = "blur(0px)";
                    } catch (exce) {}
                  }

                  arr = document.getElementsByClassName(
                    `display${program._id}`
                  );
                  let values = [];
                  for (let val in updateObj) values.push(updateObj[val]);
                  let index = 1;
                  for (let k in arr) {
                    let e = arr[k];
                    try {
                      if (e.tagName === "TR") {
                        e.style.position = "revert";
                        continue;
                      }
                      e.style.display = "revert";
                      if (index === 2 || index === 3) continue;
                      if (e.tagName !== "TD") e.innerText = values[index++];
                    } catch (exce) {}
                  }
                  arr = document.getElementsByClassName(`edit${program._id}`);

                  for (let k in arr) {
                    let e = arr[k];
                    try {
                      if (k !== "length") {
                        e.style.display = "none";
                        e.type = "hidden";
                      }
                    } catch (exce) {}
                  }
                  try {
                    arr = document.getElementsByClassName(
                      `editSelect${program._id}`
                    )[0];
                    arr.style.display = "none";
                    let selectionBoxForTopic = document.getElementById(
                      `selectionBoxForTopic${program._id}`
                    );
                    document.getElementById(
                      `textBoxForTopic${program._id}`
                    ).style.display = "none";
                    selectionBoxForTopic.style.display = "none";
                    document.getElementById(`editIcon${program._id}`).name =
                      "create-outline";
                  } catch (exce) {}
                }
              }}
            >
              {/* <Link
                to={"./UpdateByID/" + program._id + "/" + program.program_topic}
                className="text-decoration-none"
              > */}
              <ion-icon
                id={`editIcon${program._id}`}
                name="create-outline"
              ></ion-icon>
              {/* </Link> */}
            </button>
          </td>
          <td>
            {/* <button
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
            </button> */}
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
          {!isAnyChecked ? (
            <button
              className="btn btn-outline-danger"
              style={{ display: "none" }}
            >
              <ion-icon name="trash-outline"></ion-icon>
            </button>
          ) : (
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                deleteFromArray();
              }}
            >
              <ion-icon name="trash-outline"></ion-icon>
            </button>
          )}
          <Link className="successAddBtn btn rounded-3 m-2" to={"../Insert"}>
            <ion-icon name="add-outline"></ion-icon>
          </Link>
        </div>
      </div>
      <div className="table-responsive">
        <table class="table table-borderless">
          <thead>
            <tr>
              <th scope="col"></th>
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
            <tbody className="text-center">{allPrograms}</tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default SelectAll;
