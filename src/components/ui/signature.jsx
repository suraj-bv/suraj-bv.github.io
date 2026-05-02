import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./signature.css";

export function ThumbnailsCarousel({ images }) {
  const fallbackImages = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        full: `https://picsum.photos/seed/${i + 40}/600/800`,
        thumb: `https://picsum.photos/seed/${i + 40}/120/160`,
        alt: `Portrait ${i + 1}`,
      })),
    [],
  );

  const slides = images?.length ? images : fallbackImages;
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  return (
    <div className="photo-carousel">
      <div className="photo-carousel__frame">
        <img
          src={slides[activeIndex].full}
          alt={slides[activeIndex].alt || `Slide ${activeIndex + 1}`}
          className="photo-carousel__image"
          onError={(event) => {
            const fallbackSrc = slides[activeIndex].fallbackFull;
            if (fallbackSrc && event.currentTarget.src !== fallbackSrc) {
              event.currentTarget.src = fallbackSrc;
            }
          }}
        />
      </div>

      <div className="photo-carousel__controls">
        <button
          type="button"
          className="photo-carousel__nav"
          onClick={goToPrevious}
          aria-label="Previous photo"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <div
          className="photo-carousel__thumbnails"
          role="tablist"
          aria-label="Photo thumbnails"
        >
          {slides.map((image, index) => (
            <button
              key={image.thumb + index}
              type="button"
              className={`photo-carousel__thumb ${index === activeIndex ? "is-active" : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show photo ${index + 1}`}
              aria-pressed={index === activeIndex}
            >
              <img
                src={image.thumb}
                alt={image.alt || `Thumbnail ${index + 1}`}
                className="photo-carousel__thumb-image"
                onError={(event) => {
                  const fallbackThumb =
                    image.fallbackThumb || image.fallbackFull;
                  if (
                    fallbackThumb &&
                    event.currentTarget.src !== fallbackThumb
                  ) {
                    event.currentTarget.src = fallbackThumb;
                  }
                }}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          className="photo-carousel__nav"
          onClick={goToNext}
          aria-label="Next photo"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}
