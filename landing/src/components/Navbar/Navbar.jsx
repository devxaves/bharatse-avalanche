import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import logo from "../../asset/BharatSe_logo2.png";
import smalllogo from "../../asset/logo1.png";
import "./Navbar.css";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const navlinkUrls = [
    {
      displaytext: "Home",
      link: "./",
    },
    {
      displaytext: "Marketplace",
      link: "https://bharatse-market.vercel.app/",
    },
    {
      displaytext: "Community",
      link: "https://bharatse-community.vercel.app/", // Internal link
    },
    {
      displaytext: "Inventory",
      link: "https://bharatse-inventory-app.vercel.app/",
    },
  ];

  const [toggleMenu, setToggleMenu] = useState(false);

  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <>
      <nav className="fixed top-0 w-screen shadow-2xl app__navbar">
        <div className="app__navbar-logo">
          <img className="object-cover w-full h-full" src={logo} alt="Logo" />
        </div>
        <div className="app__navbar-logo_small">
          <img
            className="object-cover w-full h-full"
            src={smalllogo}
            alt="Small Logo"
          />
        </div>
        {isAuthenticated && (
          <div className="app__navbar-links">
            <ul>
              {navlinkUrls.map((i, index) => (
                <li key={index}>
                  <a
                    href={i.link}
                    target={i.link.startsWith("http") ? "_blank" : "_self"}
                    rel={i.link.startsWith("http") ? "noopener noreferrer" : ""}
                  >
                    {i.displaytext}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {isAuthenticated && (
          <div className="bg-transparent app__navbar-search">
            <div className="search">
              <input
                type="text"
                className="text-white bg-transparent"
                placeholder="Search"
              />
              <AiOutlineSearch className="search__icon" />
            </div>
          </div>
        )}

        {isAuthenticated ? (
          <div className="flex flex-row app__navbar-button">
            <button
              className="login"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Log Out
            </button>
            <div className="flex flex-row items-center button_2 justify-evenly w-max profile-btn">
              <h2 className="mx-3">{user.name.split(" ")[0]}</h2>
              <img
                className="w-12 rounded-full aspect-square"
                src={user.picture}
                alt="Profile"
              />
            </div>
          </div>
        ) : (
          <div className="app__navbar-button">
            <button className="login" onClick={loginWithRedirect}>
              Log In
            </button>
            <button
              className="button_1"
              onClick={() =>
                loginWithRedirect({
                  authorizationParams: {
                    screen_hint: "signup",
                  },
                })
              }
            >
              Sign Up
            </button>
          </div>
        )}

        <div className="items-center rounded-full app__navbar-smallscreen">
          {toggleMenu ? (
            <MdClose
              color="#eaeaea"
              className="-mr-1 "
              fontSize={34}
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <GiHamburgerMenu
              color="#eaeaea"
              fontSize={27}
              onClick={() => setToggleMenu(true)}
            />
          )}
        </div>
      </nav>

      <div className={`app__navbar-smallscreen items-center`}>
        <div
          className={`${
            toggleMenu
              ? "scale-100 opacity-100"
              : "scale-0 opacity-0 overflow-hidden"
          } app__navbar-smallscreen_overlay bg-chatbot slide-bottom flex flex-col items-end fixed right-2 transition-all duration-500 ease-in-out transform origin-top-right shadow-2xl`}
          disabled={toggleMenu ? false : true}
        >
          {isAuthenticated && (
            <div className="flex flex-col items-center w-full">
              <div className="flex flex-col items-center w-full py-5 border-b profile-details border-b-gray-700">
                <img
                  className="w-24 rounded-full aspect-square"
                  src={user.picture}
                  alt="Profile"
                />
                <h2 className="mx-3 mt-2">{user.name}</h2>
              </div>
              <ul className="items-center py-3 mb-5 border-b app__navbar-smallscreen-links border-b-gray-700">
                {navlinkUrls.map((i, index) => (
                  <li key={index} className="my-2 text-center">
                    <a
                      href={i.link}
                      target={i.link.startsWith("http") ? "_blank" : "_self"}
                      rel={i.link.startsWith("http") ? "noopener noreferrer" : ""}
                    >
                      {i.displaytext}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {isAuthenticated ? (
            <div className="flex justify-center app__navbar-button">
              <button
                className="login"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col my-3 app__navbar-button">
              <button className="login" onClick={loginWithRedirect}>
                Log In
              </button>
              <button
                className="button_1"
                onClick={() =>
                  loginWithRedirect({
                    authorizationParams: {
                      screen_hint: "signup",
                    },
                  })
                }
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
