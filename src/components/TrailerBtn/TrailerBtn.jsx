import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { CiPlay1 } from "react-icons/ci";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoading, trailerMovie } from "../../redux/movies/selectors";
import { getTrailerMovie } from "../../redux/movies/operations";

import styles from "./TrailerBtn.module.css";
import Loader from "../Loader/Loader";

function TrailerBtn({ movieId }) {
  const dispatch = useDispatch();
  const loader = useSelector(isLoading);
  const trailer = useSelector(trailerMovie);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = async () => {
    try {
      await dispatch(getTrailerMovie(movieId)).unwrap();
      setIsOpen(true);
      document.body.style.overflow = "hidden";
    } catch (error) {
      console.error("Error loading trailer:", error);
      // показать уведомление пользователю
      // без .catch() - необработанная ошибка попадёт в console
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        document.body.style.overflow = "";
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
      document.body.style.overflow = "";
    }
  };

  // react-slick settings
  const sliderSettings = {
    dots: true,
    infinite: trailer.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <ul
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {dots}
      </ul>
    ),
    customPaging: (index) => (
      <div
        style={{
          width: "30px",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          color: "#ebeef5",
          borderRadius: "8px",
        }}
      >
        {index + 1}
      </div>
    ),
    // react-slick settings
  };

  return (
    <div>
      <button onClick={handleClick} className={styles.watchTrailerBtn}>
        <CiPlay1 />
        Watch trailer
      </button>

      {loader && <Loader />}

      {isOpen && (
        <div className={styles.backdrop} onClick={handleBackdropClick}>
          <div className={styles.playerWindow}>
            <button onClick={handleClose} className={styles.closeButton}>
              ✕
            </button>

            {trailer.length > 0 ? (
              <Slider {...sliderSettings}>
                {trailer.map((t) => (
                  <div key={t.key}>
                    <iframe
                      width="100%"
                      height="450"
                      src={`https://www.youtube-nocookie.com/embed/${t.key}`}
                      frameBorder="0"
                      allowFullScreen
                      title={t.name}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <p className={styles.text}>
                Trailer not available for this movie
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TrailerBtn;
