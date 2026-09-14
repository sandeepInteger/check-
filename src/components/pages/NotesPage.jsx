import PortraitPhoto from "../PortraitPhoto";

export default function NotesPage({ memory }) {
  return (
    <div className="page-content page-content--notes">
      <div className="notes__photo page-animate page-animate--photo">
        <PortraitPhoto
          src={memory.imageSrc}
          fallback={memory.imageFallback}
          alt="Shriya"
          cropClass={memory.cropClass}
        />
      </div>
      <h3 className="notes__title heading-serif heading-serif--medium page-animate page-animate--title">
        {memory.title}
      </h3>
      <div className="notes__stickies">
        {memory.notes.map((note, i) => (
          <span
            key={note}
            className={`notes__sticky handwritten page-animate page-animate--note-${i}`}
          >
            {note}
          </span>
        ))}
      </div>
    </div>
  );
}
