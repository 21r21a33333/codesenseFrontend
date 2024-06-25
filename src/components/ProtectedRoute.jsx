import { useEffect } from "react";
import Cookies from "js-cookie";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken === undefined) {
      navigate("/", { replace: true });
    }
  });

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;