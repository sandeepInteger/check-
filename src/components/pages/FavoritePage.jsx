import PortraitPhoto from "../PortraitPhoto";

export default function FavoritePage({ memory }) {
  return (
    <div className="page-content page-content--favorite">
      <div className="favorite__photo-wrap page-animate page-animate--photo">
        <PortraitPhoto
          src={memory.imageSrc}
          fallback={memory.imageFallback}
          alt="Favorite memory"
          className="favorite__photo"
          cropClass={memory.cropClass}
        />
      </div>
      <h3 className="favorite__title heading-serif heading-serif--medium page-animate page-animate--title">
        {memory.title}
      </h3>
      <p className="favorite__subtitle body-text page-animate page-animate--text">
        {memory.subtitle}
      </p>
    </div>
  );
}
