import PortraitPhoto from "../PortraitPhoto";
import { siteConfig } from "../../data/siteConfig";

export default function ClosingPage({ memory }) {
  return (
    <div className="page-content page-content--closing">
      <div className="closing__photo-wrap page-animate page-animate--photo">
        <PortraitPhoto
          src={siteConfig.photos.main}
          fallback="/images/memory-01.svg"
          alt={siteConfig.fullName ?? siteConfig.girlfriendName}
          className="closing__photo"
          cropClass="photo-crop--center"
        />
      </div>
      <p className="closing__text heading-serif heading-serif--medium page-animate page-animate--title">
        {memory.text}
      </p>
      <p className="closing__gift-text heading-serif heading-serif--large page-animate page-animate--text">
        {memory.closingText}
      </p>
    </div>
  );
}
