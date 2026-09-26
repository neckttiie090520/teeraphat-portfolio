import { createContext, forwardRef, useCallback, useContext, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { useReducedMotion } from 'motion/react';
import HTMLFlipBook from 'react-pageflip';

const PAGE_COUNT = 158;
const LAST_INDEX = PAGE_COUNT;
const FULL_PDF = '/files/Actually-Faster-Complete-Book.pdf';
const pageIndices = Array.from({ length: PAGE_COUNT + 1 }, (_, index) => index);
const ActivePageContext = createContext(0);

interface FlipBookHandle {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
    turnToNextPage: () => void;
    turnToPrevPage: () => void;
    turnToPage: (index: number) => void;
  } | undefined;
}

const BookPage = forwardRef<HTMLDivElement, { index: number }>(({ index }, ref) => {
  const activePage = useContext(ActivePageContext);
  const [loaded, setLoaded] = useState(index <= 5);

  useEffect(() => {
    if (!loaded && Math.abs(index - activePage) <= 5) setLoaded(true);
  }, [activePage, index, loaded]);

  if (index === LAST_INDEX) {
    return (
      <div className="book-reader__leaf book-reader__leaf--back" ref={ref}>
        <span>THE PROOF PROJECT</span>
        <strong>Actually<br />Faster?</strong>
        <small>Teeraphat Raksawong<br />Chiang Mai · 2026</small>
      </div>
    );
  }

  return (
    <div className="book-reader__leaf" ref={ref}>
      {loaded ? (
        <img
          data-previewable
          src={`/book-full/page-${String(index + 1).padStart(3, '0')}.webp`}
          alt={`Actually Faster? page ${index + 1} of ${PAGE_COUNT}`}
          role="button"
          tabIndex={0}
          aria-label={`Preview image: Actually Faster? page ${index + 1} of ${PAGE_COUNT}`}
          width="1080"
          height="1620"
          loading={index < 3 ? 'eager' : 'lazy'}
          decoding="async"
        />
      ) : <span className="book-reader__loading" aria-hidden="true">{String(index + 1).padStart(3, '0')}</span>}
    </div>
  );
});
BookPage.displayName = 'BookPage';

export default function BookReader() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [jumpValue, setJumpValue] = useState('1');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const flipBookRef = useRef<FlipBookHandle | null>(null);
  const closingRef = useRef(false);
  const reduceMotion = useReducedMotion();

  const openReader = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    setIsOpen(true);
  };

  const closeReader = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog?.open || closingRef.current) return;

    const finish = () => {
      dialog.classList.remove('is-closing');
      dialog.close();
      closingRef.current = false;
      setIsOpen(false);
    };

    if (reduceMotion) {
      finish();
      return;
    }

    closingRef.current = true;
    dialog.classList.add('is-closing');
    const animation = dialog.animate(
      [{ opacity: 1, transform: 'translateY(0) scale(1)' }, { opacity: 0, transform: 'translateY(14px) scale(.985)' }],
      { duration: 220, easing: 'cubic-bezier(.4, 0, 1, 1)' },
    );
    animation.finished.then(finish, finish);
  }, [reduceMotion]);

  const turnPage = (direction: 'next' | 'previous') => {
    const book = flipBookRef.current?.pageFlip();
    if (!book) return;
    if (direction === 'next') {
      if (reduceMotion) book.turnToNextPage();
      else book.flipNext();
    } else if (reduceMotion) book.turnToPrevPage();
    else book.flipPrev();
  };

  const jumpToPage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const page = Number.parseInt(jumpValue, 10);
    if (!Number.isFinite(page)) return;
    const index = Math.max(0, Math.min(PAGE_COUNT - 1, page - 1));
    setCurrentPage(index);
    setJumpValue(String(index + 1));
    requestAnimationFrame(() => flipBookRef.current?.pageFlip()?.turnToPage(index));
  };

  const onReaderKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.target instanceof HTMLInputElement) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      turnPage('next');
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      turnPage('previous');
    }
  };

  return (
    <div className="book-preview">
      <p className="book-preview__meta">Complete book · {PAGE_COUNT} pages · Thai</p>
      <button className="book-preview__trigger" type="button" onClick={openReader}>
        Read the full book <span aria-hidden="true">↗</span>
      </button>
      <dialog
        className="book-reader book-reader--flip"
        ref={dialogRef}
        onClose={() => { setIsOpen(false); window.dispatchEvent(new Event('mascot:book-closed')); }}
        onCancel={(event) => { event.preventDefault(); closeReader(); }}
        onClick={(event) => { if (event.target === event.currentTarget) closeReader(); }}
        onKeyDown={onReaderKeyDown}
        aria-labelledby="book-reader-title"
      >
        <div className="book-reader__bar">
          <div>
            <span className="book-reader__eyebrow">THE PROOF PROJECT / FULL BOOK</span>
            <h4 id="book-reader-title">Actually Faster?</h4>
          </div>
          <button className="book-reader__close" type="button" onClick={closeReader} aria-label="Close book reader">×</button>
        </div>

        <div className="book-reader__stage" aria-label={`Flip through all ${PAGE_COUNT} pages of Actually Faster?`}>
          {isOpen && (
            <ActivePageContext.Provider value={currentPage}>
              <HTMLFlipBook
                ref={flipBookRef}
                className="book-reader__flipbook"
                style={{}}
                width={432}
                height={648}
                size="stretch"
                minWidth={240}
                maxWidth={520}
                minHeight={360}
                maxHeight={780}
                drawShadow={!reduceMotion}
                flippingTime={reduceMotion ? 1 : 720}
                usePortrait
                startZIndex={1}
                autoSize
                maxShadowOpacity={0.25}
                showCover
                mobileScrollSupport
                clickEventForward
                useMouseEvents
                swipeDistance={30}
                showPageCorners={!reduceMotion}
                disableFlipByClick
                renderOnlyPageLengthChange
                startPage={currentPage}
                onFlip={(event: { data: number }) => {
                  setCurrentPage(event.data);
                  setJumpValue(String(Math.min(event.data + 1, PAGE_COUNT)));
                }}
              >
                {pageIndices.map((index) => <BookPage key={index} index={index} />)}
              </HTMLFlipBook>
            </ActivePageContext.Provider>
          )}
        </div>

        <div className="book-reader__footer">
          <div className="book-reader__navigation">
            <button type="button" onClick={() => turnPage('previous')} disabled={currentPage <= 0} aria-label="Previous page">←</button>
            <span aria-live="polite">{currentPage === LAST_INDEX ? 'Back cover' : `Page ${currentPage + 1} of ${PAGE_COUNT}`}</span>
            <button type="button" onClick={() => turnPage('next')} disabled={currentPage >= LAST_INDEX} aria-label="Next page">→</button>
          </div>
          <form className="book-reader__jump" onSubmit={jumpToPage}>
            <label htmlFor="book-page-number">Go to page</label>
            <input id="book-page-number" type="number" min="1" max={PAGE_COUNT} inputMode="numeric" value={jumpValue} onChange={(event) => setJumpValue(event.target.value)} />
            <button type="submit">Go</button>
          </form>
          <a href={FULL_PDF} target="_blank" rel="noreferrer">Open full PDF ↗</a>
        </div>
      </dialog>
    </div>
  );
}
