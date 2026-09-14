import PortraitPhoto from "../PortraitPhoto";

export default function CollagePage({ memory }) {
  return (
    <div className="page-content page-content--collage">
      <div className="collage__photos">
        {memory.images.map((item, i) => (
          <div
            key={item.src ?? item.fallback ?? i}
            className={`collage__photo collage__photo--${i + 1} page-animate page-animate--photo-${i}`}
          >
            <PortraitPhoto
              src={item.src}
              fallback={item.fallback}
              alt={`Memory ${i + 1}`}
              cropClass={item.cropClass}
            />
          </div>
        ))}
      </div>
      <p className="collage__caption heading-serif heading-serif--medium page-animate page-animate--title">
        {memory.title}
      </p>
    </div>
  );
}
