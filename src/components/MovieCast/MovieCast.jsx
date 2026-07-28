import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IMG_URL_W500 } from "../../constants/tmdbConstants";
import { getActorsCast } from "../../redux/movies/operations";
import { castInfo } from "../../redux/movies/selectors";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { FaUserGroup } from "react-icons/fa6";
import styles from "./MovieCast.module.css";

function MovieCast() {
  const dispatch = useDispatch();
  const actors = useSelector(castInfo);
  const { movieId } = useParams();
  const [actorsPerPage, setActorsPerPage] = useState(14);

  const handleLoadMore = () => {
    setActorsPerPage((prev) => prev + 14);
  };

  const visibleActors = actors.slice(0, actorsPerPage);

  useEffect(() => {
    dispatch(getActorsCast(Number(movieId)));
  }, [dispatch, movieId]);

  const getInitial = (name) => {
    return name
      ? name
          .split(" ")
          .map((item) => item.charAt(0))
          .join("")
          .toUpperCase()
      : "";
  };

  return (
    <>
      <span className={`${styles.castMembers} ${styles.withIcon}`}>
        <FaUserGroup /> {actors.length} Cast Members
      </span>
      <ul className={styles.list}>
        {visibleActors.map((actor) => (
          <li key={actor.id} className={styles.item}>
            {actor.profile_path ? (
              <img
                src={`${IMG_URL_W500}${actor.profile_path}`}
                alt={actor.original_name}
                className={styles.image}
              />
            ) : (
              <div className={`${styles.imagePlaceholder} ${styles.initials}`}>
                {getInitial(actor.name)}
              </div>
            )}

            <p className={styles.actorName}>
              {actor.name || actor.original_name}
            </p>
            <p className={styles.characterName}>
              {actor.character || "Role not specified"}
            </p>
          </li>
        ))}
      </ul>
      {actorsPerPage < actors.length && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </>
  );
}

export default MovieCast;
