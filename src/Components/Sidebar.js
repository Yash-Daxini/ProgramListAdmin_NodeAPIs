import React from "react";
import { Link } from "react-router-dom";
import "../CSS/style.css";

const Sidebar = () => {
  const toggleMenu = () => {
    let toggle = document.querySelector(".toggle");
    let toggleInSideBar = document.querySelector(".toggleInSideBar");
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");
    toggle.classList.toggle("active");
    toggleInSideBar.classList.toggle("active");
    navigation.classList.toggle("active");
    main.classList.toggle("active");
  };

  return (
    <>
      <div class="navigation" id="navigation">
      <div class="toggleInSideBar" onClick={toggleMenu}></div>
        <ul>
          <li>
            <Link class="" to="./">
              <span class="icon"></span>
              <span class="title">
                <h3>ProgramList</h3>
              </span>
            </Link>
          </li>
          <li>
            <Link class="" to="./">
              <span class="icon">
                <ion-icon class="ion" name="home-outline"></ion-icon>
              </span>
              <span class="title">Dashbord</span>
            </Link>
          </li>
          <li>
            <Link class="" to="./SelectAll">
              <span class="icon">
                <ion-icon class="ion" name="code-outline"></ion-icon>
              </span>
              <span class="title">Programs</span>
            </Link>
          </li>
          <li>
            <Link class="" to="./SelectAllTopic">
              <span class="icon">
                <ion-icon class="ion" name="podium-outline"></ion-icon>
              </span>
              <span class="title">Topics</span>
            </Link>
          </li>
          <li>
            <Link class="" to="./SelectAllUser">
              <span class="icon">
                <ion-icon class="ion" name="people-outline"></ion-icon>
              </span>
              <span class="title">Users</span>
            </Link>
          </li>
          {/* <li>
                    <Link class="" to={"./Insert"}>
                        <span class="icon"><ion-icon class="ion" name="add-circle-outline"></ion-icon></span>
                        <span class="title">Insert Program</span>
                    </Link>
                </li> */}
          {/* <li>
                    <Link class="" to={"./InsertUser"}>
                        <span class="icon"><ion-icon class="ion" name="add-circle-outline"></ion-icon></span>
                        <span class="title">Insert User</span>
                    </Link>
                </li> */}
          {/* <li>
                    <a class="" asp-area="LOC_City" asp-controller="Home" asp-action="Index">
                        <span class="icon"><ion-icon class="ion" name="location-outline"></ion-icon></span>
                        <span class="title">City</span>
                    </a>
                </li>
                <li>
                    <a class="" asp-area="CON_ContactCategory" asp-controller="Home" asp-action="Index">
                        <span class="icon"><ion-icon class="ion" name="copy-outline"></ion-icon></span>
                        <span class="title">Category</span>
                    </a>
                </li>
                <li>
                    <a class="" asp-area="MST_Contact" asp-controller="Home" asp-action="Index">
                        <span class="icon"><ion-icon class="ion" name="person-outline"></ion-icon></span>
                        <span class="title">Contact</span>
                    </a>
                </li> */}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
