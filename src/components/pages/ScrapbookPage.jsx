export default function ScrapbookPage({ memory }) {
  return (
    <div className="page-content page-content--scrapbook">
      <span className="scrapbook__tape scrapbook__tape--tl" aria-hidden="true" />
      <span className="scrapbook__star scrapbook__star--1" aria-hidden="true">
        ✦
      </span>
      <span className="scrapbook__star scrapbook__star--2" aria-hidden="true">
        ✦
      </span>
      <span className="scrapbook__heart" aria-hidden="true">
        ♥
      </span>

      <p className="scrapbook__date section-label page-animate page-animate--date">
        {memory.date}
      </p>
      <div className="scrapbook__photo page-animate page-animate--photo">
        <img src={memory.image} alt="First memory" loading="lazy" />
      </div>
      <h3 className="scrapbook__title heading-serif heading-serif--medium page-animate page-animate--title">
        {memory.title}
      </h3>
      <p className="scrapbook__text body-text page-animate page-animate--text">
        {memory.text}
      </p>
      <span className="scrapbook__arrow handwritten page-animate page-animate--note">
        this one →
      </span>
    </div>
  );
}
