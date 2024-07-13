import { Link } from "react-router-dom";
import { LogoutBar } from "./LogoutBar";

export function Menu() {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to="/" style={padding}>
        blogs
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
      <LogoutBar />
    </div>
  );
}
