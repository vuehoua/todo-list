import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Page Not Found</h2>
      <p></p>
      <Link to="/">Home</Link>
    </div>
  );
}

export default NotFound;
