export default function LetterPage({ memory }) {
  return (
    <div className="page-content page-content--letter paper-texture">
      <h3 className="letter__title heading-serif heading-serif--large page-animate page-animate--title">
        {memory.title}
      </h3>
      <div className="letter__body">
        {memory.text.split("\n\n").map((paragraph, i) => (
          <p
            key={i}
            className={`letter__paragraph body-text page-animate page-animate--text-${i}`}
          >
            {paragraph}
          </p>
        ))}
      </div>
      <div className="letter__seal" aria-hidden="true">
        ♥
      </div>
    </div>
  );
}
