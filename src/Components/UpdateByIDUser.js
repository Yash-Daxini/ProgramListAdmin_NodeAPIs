import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const UpdateByIDUser = () => {
  const [newUser, setNewUser] = useState({});

  const navigate = useNavigate(); 

  const params = useParams();

  useEffect(() => {
    if( sessionStorage.getItem("user") === null ){
      navigate("../login");
    }
  }, [navigate])

  useEffect(() => {
    fetch("http://localhost:8000/user/" + params.id)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setNewUser(data);
        })
        .catch((e) => {
        })
    }, [params.id]);

  return (
    <div className="main my-5 mx-5 w-75">
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          User Name
        </label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="User Name"
          value={newUser.user_name}
          onChange={(e) => {
            setNewUser({ ...newUser, user_name: e.target.value });
          }}
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Password
        </label>
        <input
          type="password"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Password"
          value={newUser.user_password}
          onChange={(e) => {
            setNewUser({ ...newUser, user_password: e.target.value });
          }}
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Email Address
        </label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Email Address"
          value={newUser.user_emailaddress}
          onChange={(e) => {
            setNewUser({ ...newUser, user_emailaddress: e.target.value });
          }}
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Mobile Number
        </label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Mobile Number"
          value={newUser.user_mobilenumber}
          onChange={(e) => {
            setNewUser({ ...newUser, user_mobilenumber: e.target.value });
          }}
        />
      </div>
      <div class="mb-3">
        <button type="submit" className="mx-5 btn btn-outline-success" 
          onClick={(e) => {
            e.preventDefault();
            if (
              newUser.user_name === undefined ||
              newUser.user_emailaddress === undefined ||
              newUser.user_mobilenumber === undefined ||
              newUser.user_password === undefined ||
              newUser.user_name === "" ||
              newUser.user_emailaddress === "" ||
              newUser.user_mobilenumber === "" ||
              newUser.user_password === ""
            ){
              Swal.fire({
                title: 'Error!',
                text: 'All fields are not fullfilled',
                icon: 'error',
                confirmButtonText: "Ok"
              })
              return;
            }
            fetch(`http://localhost:8000/user/${params.id}`, {
              method: "PUT",
              headers: { 
                  "Accept":"application/json",
                  "Content-type": "application/json" 
              },
              body: JSON.stringify(newUser),
              })
              .then((r) => r.json())
              .then((res) => {
              })
              .catch((e)=>{
                console.warn(e);
              })
  
              setNewUser({
              ...newUser,
              user_name: "",
              user_emailaddress: "",
              user_mobilenumber: "",
              user_password: ""
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
}

export default UpdateByIDUser
