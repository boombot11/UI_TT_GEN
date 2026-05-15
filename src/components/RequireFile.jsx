// RequireFile.js
import { Navigate, useLocation } from "react-router-dom";
import { useFileContext } from "./FileContext";

const RequireFile = ({ children }) => {
  const { File } = useFileContext();
  const location = useLocation();

  // Allow access to '/' and '/upload' without a file
  if (location.pathname === "/" || location.pathname === "/upload") {
    return children;
  }

  // If no file, show alert and redirect to /upload
  if (!File) {
    alert("Please upload a file first.");
    return <Navigate to="/upload" replace />;
  }

  return children;
};

export default RequireFile;
