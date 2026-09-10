export default function CollagePage({ memory }) {
  return (
    <div className="page-content page-content--collage">
      <div className="collage__photos">
        {memory.images.map((src, i) => (
          <div
            key={src}
            className={`collage__photo collage__photo--${i + 1} page-animate page-animate--photo-${i}`}
          >
            <img src={src} alt={`Memory ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
      <p className="collage__caption heading-serif heading-serif--medium page-animate page-animate--title">
        {memory.title}
      </p>
    </div>
  );
}
