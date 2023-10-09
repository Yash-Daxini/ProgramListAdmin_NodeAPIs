import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const SelectAllUser = () => {
  const [userObj, setUserObj] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("user") === null) {
      navigate("../login");
    }
  }, [navigate]);

  useEffect(() => {
    // fetch("https://localhost:5001/api/SEC_User")
    fetch("http://localhost:8000/user")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserObj(data);
      })
      .catch((e) => {});
  }, []);

  const Delete = (id) => {
    fetch(`http://localhost:8000/user/${id}`, {
      method: "DELETE",
    })
      .then((resp) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Data Deleted Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("../");
        setTimeout(() => {
          navigate("../SelectAllUser");
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

  const allUser = userObj.map((user) => {
    return (
      <>
        <tr>
          <td>{user.user_name}</td>
          <td>{user.user_password}</td>
          <td>{user.user_emailaddress}</td>
          <td>{user.user_mobilenumber}</td>
          <td>
            <button className="btn btn-outline-info">
              <Link
                to={"./UpdateByIDUser/" + user._id}
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
                    Delete(user._id);
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

  return (
    <div className="selectAll main">
      <div className="d-flex justify-content-between">
        <div>
          <h1>Users</h1>
        </div>
        <div>
          <Link className="successAddBtn rounded-3 m-2" to={"../InsertUser"}>
            <ion-icon name="add-outline"></ion-icon>
          </Link>
        </div>
      </div>
      <div className="table-responsive">
        <table class="table table-borderless">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Password</th>
              <th scope="col">Email Address</th>
              <th scope="col">Mobile Number</th>
              <th scope="col" colSpan={2}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>{allUser}</tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectAllUser;
