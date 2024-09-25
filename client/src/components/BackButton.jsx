import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton({ backOptions = "/" }) {
  const navigate = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigate(backOptions);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
