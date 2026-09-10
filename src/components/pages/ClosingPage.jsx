export default function ClosingPage({ memory }) {
  return (
    <div className="page-content page-content--closing">
      <p className="closing__text heading-serif heading-serif--medium page-animate page-animate--title">
        {memory.text}
      </p>
      <p className="closing__gift-text heading-serif heading-serif--large page-animate page-animate--text">
        {memory.closingText}
      </p>
    </div>
  );
}
