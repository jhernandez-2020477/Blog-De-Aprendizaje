import { Link } from "react-router-dom";

export const CardPost = ({ _id, title, description, course, date, repository }) => {
  return (
    <div className="card m-2 p-3 shadow w-100">
      <h5>{title}</h5>
      <p>{description}</p>
      <p>{course}</p>
      <p className="text-muted">{new Date(date).toLocaleDateString()}</p>
      <Link to={`/feed/post/${_id}`} className="btn btn-outline-primary">
        Ver comentarios
      </Link>
    </div>
  );
};
