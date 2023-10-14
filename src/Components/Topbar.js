import React from "react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {

    const naviagate = useNavigate();

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
      <div class="topbar">
        <div class="toggle" onClick={toggleMenu}></div>
        <div class="logoName">
          <div class="logo">
            {/* <ion-icon class="ion" name="book-outline"></ion-icon> */}
          </div>
          <div class="name">ProgramList</div>
        </div>
        <button className="themeBtn w-25 h-75 darkTheme" onClick={(e)=>{
          e.target.classList.toggle("darkTheme");
          e.target.classList.toggle("lightTheme");
          document.getElementsByClassName("main")[0].classList.toggle("lightTheme");
          document.getElementsByClassName("main")[0].classList.toggle("darkTheme");
        }}>Change theme</button>
        <div>
          <button class="logout btn border-0 text-primary" onClick={(e)=>{
            sessionStorage.clear();
            naviagate("./login");
          }}>
            <ion-icon name="log-out-outline"></ion-icon>
          </button>
        </div>
        <div class="user">
          <ion-icon name="person-circle-outline"></ion-icon>
        </div>
      </div>
    </>
  );
};

export default Topbar;
