import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
          Swal.fire("Deleted!", "Your data has been deleted.", "success");
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

  const allTopicsName = topicObj.map((topic) => {
    return (
      <>
        <option value={topic} style={{ textTransform: "capitalize" }}>
          {topic}
        </option>
      </>
    );
  });

  const enableEditing = (programObj) => {
    let trTags = document.getElementsByTagName(`tr`);
    for (let tagKey in trTags) {
      let tagValue = trTags[tagKey];
      try {
        if (
          tagKey !== "length" &&
          !tagValue.classList.contains(`display${programObj._id}`)
        )
          tagValue.style.filter = "blur(5px)";
      } catch (exce) {}
    }

    let displayTags = document.getElementsByClassName(
      `display${programObj._id}`
    );
    for (let tagKey in displayTags) {
      let tagValue = displayTags[tagKey];
      try {
        if (tagValue.tagName !== "TD" && tagValue.tagName !== "TR") {
          tagValue.style.display = "none";
        } else if (tagValue.tagName === "TR") {
          tagValue.style.position = "relative";
          tagValue.style.left = "30%";
        } else if (tagValue.tagName === "TD") {
          tagValue.style.display = "block";
        }
      } catch (exce) {}
    }

    let editTags = document.getElementsByClassName(`edit${programObj._id}`);
    for (let tagKey in editTags) {
      let tagValue = editTags[tagKey];
      try {
        if (tagKey !== "length") {
          tagValue.type = "text";
          tagValue.style.display = "block";
        }
      } catch (exce) {}
    }

    let dropdownForDifficulty = document.getElementsByClassName(
      `editSelect${programObj._id}`
    )[0];
    dropdownForDifficulty.style.display = "block";

    let updateIcon = document.getElementById(`editIcon${programObj._id}`);
    updateIcon.name = "checkmark-outline";

    let selectionBoxForTopic = document.getElementById(
      `selectionBoxForTopic${programObj._id}`
    );
    selectionBoxForTopic.style.display = "block";
    // htmlElement.style.display = "block";
    let cancelBtnForUpdate = document.getElementById(
      `cancelBtnForUpdate${programObj._id}`
    );
    cancelBtnForUpdate.style.display = "block";
  };

  const disableEditing = (programObj, updatedDataObj) => {
    let trTags = document.getElementsByTagName(`tr`);
    for (let tagKey in trTags) {
      let tagValue = trTags[tagKey];
      try {
        if (
          tagKey !== "length" &&
          !tagValue.classList.contains(`display${programObj._id}`)
        )
          tagValue.style.filter = "blur(0px)";
      } catch (exce) {}
    }

    let displayTags = document.getElementsByClassName(
      `display${programObj._id}`
    );
    let valuesForTags = [];
    for (let val in updatedDataObj) valuesForTags.push(updatedDataObj[val]);
    let indexForValuesForTags = 1;
    for (let tagKey in displayTags) {
      let tagValue = displayTags[tagKey];
      try {
        if (tagValue.tagName === "TR") {
          tagValue.style.position = "revert";
          continue;
        }
        tagValue.style.display = "revert";
        if (indexForValuesForTags === 2 || indexForValuesForTags === 3)
          continue;
        if (tagValue.tagName !== "TD")
          tagValue.innerText = valuesForTags[indexForValuesForTags++];
      } catch (exce) {}
    }

    let editTags = document.getElementsByClassName(`edit${programObj._id}`);
    for (let tagKey in editTags) {
      let tagValue = editTags[tagKey];
      try {
        if (tagKey !== "length") {
          tagValue.style.display = "none";
          tagValue.type = "hidden";
        }
      } catch (exce) {}
    }

    try {
      let dropdownForDifficulty = document.getElementsByClassName(
        `editSelect${programObj._id}`
      )[0];
      dropdownForDifficulty.style.display = "none";

      let selectionBoxForTopic = document.getElementById(
        `selectionBoxForTopic${programObj._id}`
      );
      selectionBoxForTopic.style.display = "none";

      let textBoxForTopic = document.getElementById(
        `textBoxForTopic${programObj._id}`
      );
      textBoxForTopic.style.display = "none";

      let updateIcon = document.getElementById(`editIcon${programObj._id}`);
      updateIcon.name = "create-outline";

      let cancelBtnForUpdate = document.getElementById(
        `cancelBtnForUpdate${programObj._id}`
      );
      cancelBtnForUpdate.style.display = "none";
    } catch (exce) {}
  };

  const updateData = (updatedDataObj) => {
    fetch(`http://localhost:8000/programs/${updatedDataObj._id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedDataObj),
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
  };

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
                    toast.success(
                      `Delete Button Activated! Now you can delete`,
                      {
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        autoClose: 5000,
                        theme: "light",
                      }
                    );
                    toast.info(<DeleteButtonToast />, {
                      position: toast.POSITION.TOP_CENTER,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      autoClose: false,
                      theme: "light",
                    });
                    setIsAnyChecked(true);
                  }
                  deleteArr.push({
                    id: program._id,
                    topic: program.program_topic,
                  });
                  setDeleteArr(deleteArr);
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
                  if (index !== 0) deleteArr.splice(index, index);
                  else deleteArr.shift();
                  setDeleteArr(deleteArr);
                }
                if (isAnyChecked === true && deleteArr.length === 0) {
                  toast.dismiss();
                  toast.error(`Delete Button Deactivated! You can't delete`, {
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    autoClose: 5000,
                    theme: "light",
                  });
                  setIsAnyChecked(false);
                }
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
              {allTopicsName}
            </select>
            <input
              required
              type="text"
              class={`form-control`}
              id={`textBoxForTopic${program._id}`}
              style={{ display: "none" }}
              placeholder="Program Topic"
              value={updateObj.program_topic}
              onChange={(e) => {
                setUpdateObj({ ...updateObj, program_topic: e.target.value });
              }}
            />
            <input
              type="button"
              style={{ display: "none", width: "500px" }}
              className={`btn btn-outline-primary my-3 edit${program._id}`}
              value={listOrTextAreaBtn}
              onClick={(e) => {
                try {
                  if (
                    document.getElementById(
                      `selectionBoxForTopic${program._id}`
                    ).style.display === "none"
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
              <ion-icon name="link-outline"></ion-icon>
            </Link>
            <label style={{ display: "none" }} className={`edit${program._id}`}>
              <h5>Problem Link</h5>
            </label>
            <input
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
              <ion-icon name="link-outline"></ion-icon>
            </Link>
            <label style={{ display: "none" }} className={`edit${program._id}`}>
              <h5>Solution Link</h5>
            </label>
            <input
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
                  enableEditing(program);
                  setUpdateObj(program);
                } else {
                  disableEditing(program, updateObj);
                  updateData(updateObj);
                }
              }}
            >
              <ion-icon
                id={`editIcon${program._id}`}
                name="create-outline"
              ></ion-icon>
            </button>
          </td>
          <td>
            <button
              className="btn btn-outline-danger"
              id={`cancelBtnForUpdate${program._id}`}
              style={{ display: "none" }}
              onClick={() => {
                disableEditing(program, updateObj);
              }}
            >
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </td>
        </tr>
      </>
    );
  });

  const DeleteButtonToast = ({ closeToast }) => {
    return (
      <div>
        <button
          className="btn btn-outline-danger"
          onClick={() => {
            Swal.fire({
              title: "Are you sure?",
              text: `You want to delete ${deleteArr.length} records ?`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            }).then((result) => {
              if (result.isConfirmed) {
                deleteFromArray();
              }
            });
            closeToast();
          }}
        >
          Delete <ion-icon name="trash-outline"></ion-icon>
        </button>
      </div>
    );
  };

  return (
    <div className="selectAll main">
      <ToastContainer className="custom-toast-container" />
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
