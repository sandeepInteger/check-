import PortraitPhoto from "../PortraitPhoto";

export default function BeginningPage({ memory }) {
  return (
    <div className="page-content page-content--beginning">
      <h3 className="page-content__title heading-serif heading-serif--medium page-animate page-animate--title">
        {memory.title}
      </h3>
      <p className="page-content__date section-label page-animate page-animate--date">
        {memory.date}
      </p>
      <div className="page-content__photo-wrap page-animate page-animate--photo">
        <div className="page-content__photo-flash" />
        <PortraitPhoto
          src={memory.imageSrc}
          fallback={memory.imageFallback}
          alt="A cherished memory"
          className="page-content__photo"
          cropClass={memory.cropClass}
        />
      </div>
      <p className="page-content__hand-note handwritten page-animate page-animate--note">
        {memory.text}
      </p>
    </div>
  );
}
