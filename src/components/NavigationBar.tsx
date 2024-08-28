import { Link, useNavigate } from '@tanstack/react-router';

export default function NavigationBar() {
  const navigate = useNavigate();
  // an example of react-router's non-typesafe route navigation
  // you can write any path you want without any type checking
  return (
    <div>
      <Link to="/">Home</Link>
      <button onClick={() => navigate({})}>No Where</button>
    </div>
  );
}
