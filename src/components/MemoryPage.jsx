import BeginningPage from "./pages/BeginningPage";
import ScrapbookPage from "./pages/ScrapbookPage";
import CollagePage from "./pages/CollagePage";
import FavoritePage from "./pages/FavoritePage";
import NotesPage from "./pages/NotesPage";
import LetterPage from "./pages/LetterPage";
import ClosingPage from "./pages/ClosingPage";

const PAGE_COMPONENTS = {
  beginning: BeginningPage,
  scrapbook: ScrapbookPage,
  collage: CollagePage,
  favorite: FavoritePage,
  notes: NotesPage,
  letter: LetterPage,
  closing: ClosingPage,
};

export default function MemoryPage({ memory, pageIndex }) {
  const Component = PAGE_COMPONENTS[memory.type];
  if (!Component) return null;

  return (
    <div className="memory-page" data-page-index={pageIndex}>
      <Component memory={memory} />
    </div>
  );
}
