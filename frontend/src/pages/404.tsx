import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4">
      <h1>Oops! That was a wrong turn.</h1>
      <p>The page or feature you're looking for does not exist - yet!</p>
      <Link to="/">Go back home</Link>
    </div>
  );
}