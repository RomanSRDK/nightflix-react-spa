import { useEffect, useState } from "react";
import { CiPlay1 } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getTrailerMovie } from "../../redux/movies/operations";
import { isLoading, trailerMovie } from "../../redux/movies/selectors";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import styles from "./TrailerBtn.module.css";

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
      toast.error(`Error loading trailer: ${error}`);
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
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={loader}
        aria-busy={loader}
        className={styles.watchTrailerBtn}
      >
        <CiPlay1 aria-hidden="true" />
        Watch Trailer
      </button>

      {loader && <Loader />}

      {isOpen && (
        <div className={styles.backdrop} onClick={handleBackdropClick}>
          <div className={styles.playerWindow}>
            <button
              type="button"
              onClick={handleClose}
              className={styles.closeButton}
            >
              <IoClose aria-hidden="true" />
            </button>

            {trailer.length > 0 ? (
              <Slider {...sliderSettings}>
                {trailer.map((t) => (
                  <div key={t.key}>
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${t.key}`}
                      title={t.name || "Movie trailer"}
                      width="100%"
                      height="450"
                      allowFullScreen
                      allow="clipboard-write; encrypted-media; web-share"
                      frameBorder="0"
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
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
    </>
  );
}

export default TrailerBtn;
