import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";

const AuthHOC = (WrappedComponent: React.ComponentType): React.FC => {
  const WithAuth: React.FC = (props) => {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) {
      return <Navigate to="/" />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default AuthHOC;
