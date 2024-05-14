import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div id="container">
      <h1>404</h1>

      <h3>Looks like the page you're looking for doesn't exist.</h3>

      <Link to="/">Take me back home</Link>
    </div>
  );
}
