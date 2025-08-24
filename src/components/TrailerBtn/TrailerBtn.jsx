import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { CiPlay1 } from "react-icons/ci";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { trailerMovie } from "../../redux/movies/selectors";
import { getTrailerMovie } from "../../redux/movies/operations";

import styles from "./TrailerBtn.module.css";

function TrailerBtn({ movieId }) {
  const dispatch = useDispatch();
  const trailer = useSelector(trailerMovie);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    dispatch(getTrailerMovie(movieId));
    setIsOpen(true);
    document.body.style.overflow = "hidden";
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
    };
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
      document.body.style.overflow = "";
    }
  };

  // Настройки слайдера react-slick
  const sliderSettings = {
    dots: true,
    infinite: trailer.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <div>
      <button onClick={handleClick} className={styles.watchTrailer}>
        <CiPlay1 />
        Watch trailer
      </button>

      {isOpen && (
        <div className={styles.backdrop} onClick={handleBackdropClick}>
          <div className={styles.modal}>
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
                      src={`https://www.youtube.com/embed/${t.key}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
