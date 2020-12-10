import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import yuberLogo from "../images/logo.svg";

export const Header: React.FC = () => {
  const { data } = useMe();

  return (
    <header className="py-9">
      <div className="w-full px-9 max-w-screen-2xl mx-auto flex justify-between">
        <Link to="/">
          <img src={yuberLogo} alt="logo" className=" w-36" />
        </Link>
        <span>
          <Link to="/my-profile">
            <FontAwesomeIcon icon={faUser} className="text-xl" />
          </Link>
        </span>
      </div>
    </header>
  );
};
