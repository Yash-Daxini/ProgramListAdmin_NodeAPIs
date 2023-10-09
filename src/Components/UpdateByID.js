import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const UpdateByID = () => {
  const [newProgram, setNewProgram] = useState({});

  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    if( sessionStorage.getItem("user") === null ){
      navigate("../login");
    }
  }, [navigate])

  useEffect(() => {
    fetch("https://localhost:5001/api/MST_Program/" + params.id)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setNewProgram(data);
        })
        .catch((e) => {
        })
    }, [params.id]);

  return (
    <div className="main my-5 mx-5 w-75">
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Program Name
        </label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Program Name"
          value={newProgram.program_Name}
          onChange={(e) => {
            setNewProgram({ ...newProgram, program_Name: e.target.value });
          }}
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Program Topic
        </label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Program Topic"
          value={newProgram.program_Topic}
          onChange={(e) => {
            setNewProgram({ ...newProgram, program_Topic: e.target.value });
          }}
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Program Link
        </label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Program Link"
          value={newProgram.program_Link}
          onChange={(e) => {
            setNewProgram({ ...newProgram, program_Link: e.target.value });
          }}
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Solution Link
        </label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Solution Link"
          value={newProgram.program_SolutionLink}
          onChange={(e) => {
            setNewProgram({ ...newProgram, program_SolutionLink: e.target.value });
          }}
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Difficulty
        </label>
        <select class="form-control" 
        value={newProgram.program_Difficulty}
        onChange={(e) => {
          setNewProgram({
            ...newProgram,
            program_Difficulty: e.target.value,
          });
        }}
        >
          <option>Select Difficulty</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>
      <div class="mb-3">
        <button type="submit" className="mx-5 btn btn-outline-success" 
          onClick={(e) => {
            e.preventDefault();
            if (
              newProgram.program_Name === undefined ||
              newProgram.program_Topic === undefined ||
              newProgram.program_Topic === "Select Topic Name" ||
              newProgram.program_Topic === "" ||
              newProgram.program_Link === undefined ||
              newProgram.program_SolutionLink === undefined ||
              newProgram.program_Difficulty === undefined ||
              newProgram.program_Difficulty === "Select Difficulty"
            ){
              Swal.fire({
                title: 'Error!',
                text: 'All fields are not fullfilled',
                icon: 'error',
                confirmButtonText: "Ok"
              })
              return;
            }
            fetch(`https://localhost:5001/api/MST_Program/${params.id}`, {
              method: "PUT",
              headers: { 
                  "Accept":"application/json",
                  "Content-type": "application/json" 
              },
              body: JSON.stringify(newProgram),
              })
              .then((r) => r.json())
              .then((res) => {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Data Updated Successfully!',
                  showConfirmButton: false,
                  timer: 1500
                })
              })
              .catch((e)=>{
                Swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: 'Some Error Occured!',
                  showConfirmButton: false,
                  timer: 1500
                })
              })
  
            setNewProgram({
              ...newProgram,
              program_Name: "",
              program_Topic: "",
              program_Link: "",
              program_SolutionLink: "",
              program_Difficulty: "",
            });
          }}
        >
          Update
        </button>
        <button type="submit" className="btn btn-outline-danger"
         onClick={(e)=>{
            navigate("./../../");
         }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateByID;
