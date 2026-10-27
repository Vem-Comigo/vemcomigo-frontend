import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, MapPin, X } from "lucide-react";
import { recordCategories } from "../../content/projectRecords";
import type { ProjectRecord } from "../../content/projectRecords";
import { RecordMedia } from "./RecordMedia";

export function RecordDialog({ record, onDismiss, returnFocus }: {
  record: ProjectRecord;
  onDismiss: () => void;
  returnFocus: HTMLElement | null;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [closing, setClosing] = useState(false);
  const [photo, setPhoto] = useState(0);
  const category = recordCategories.find(item => item.id === record.category)!;
  const count = record.images.length;
  const image = record.images[photo];

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    body.style.paddingRight = `${parseFloat(getComputedStyle(body).paddingRight) + gap}px`;
    body.style.overflow = "hidden";
    element.showModal();
    closeButton.current?.focus({ preventScroll: true });
    return () => {
      clearTimeout(closeTimer.current);
      element.close();
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    };
  }, [returnFocus]);

  function dismiss() {
    if (closing) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onDismiss();
      return;
    }
    setClosing(true);
    const duration = parseFloat(getComputedStyle(dialog.current!).getPropertyValue("--gallery-modal-duration")) || 240;
    closeTimer.current = setTimeout(onDismiss, duration);
  }
  function changePhoto(direction: number) {
    setPhoto(previous => (previous + direction + count) % count);
  }
  const validDate = record.date ? new Date(`${record.date}T12:00:00`) : null;
  const dateLabel = validDate && !Number.isNaN(validDate.getTime())
    ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(validDate)
    : null;

  return (
    <dialog ref={dialog} className={`record-dialog theme-${category.theme}`} data-closing={closing || undefined} aria-labelledby="record-dialog-title" aria-describedby={record.demo ? "record-demo-notice" : undefined}
      onCancel={event => { event.preventDefault(); dismiss(); }}
      onClick={event => { if (event.target === event.currentTarget) dismiss(); }}
      onKeyDown={event => {
        if (event.key === "Tab") {
          const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]')].filter(element => element.getClientRects().length > 0);
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }
        if (count > 1 && event.key === "ArrowRight") { event.preventDefault(); changePhoto(1); }
        if (count > 1 && event.key === "ArrowLeft") { event.preventDefault(); changePhoto(-1); }
      }}>
      <div className="record-dialog-shell">
        <div className="record-dialog-top">
          <span>Um olhar mais de perto</span>
          <button ref={closeButton} className="gallery-icon-button" type="button" onClick={dismiss} aria-label="Fechar detalhes"><X size={23} aria-hidden="true" /></button>
        </div>
        <div className="record-dialog-body">
          <div className="record-dialog-gallery">
            <figure>
              <div className="record-dialog-media" key={photo}>
                <RecordMedia image={image} category={record.category} eager />
              </div>
              {image?.caption && <figcaption>{image.caption}</figcaption>}
            </figure>
            {count > 1 && <div className="record-photo-controls" role="group" aria-label="Navegação entre imagens">
              <button className="gallery-icon-button" type="button" aria-label="Imagem anterior" onClick={() => changePhoto(-1)}><ArrowLeft size={21} aria-hidden="true" /></button>
              <span role="status" aria-live="polite" aria-atomic="true">Imagem {photo + 1} de {count}</span>
              <button className="gallery-icon-button" type="button" aria-label="Próxima imagem" onClick={() => changePhoto(1)}><ArrowRight size={21} aria-hidden="true" /></button>
            </div>}
          </div>
          <div className="record-dialog-copy">
            <p className="record-category">{category.label}</p>
            <h3 id="record-dialog-title">{record.title}</h3>
            {record.demo && <p className="record-demo-notice" id="record-demo-notice">Conteúdo demonstrativo · aguardando registro real.</p>}
            <p className="record-full-description">{record.description}</p>
            {(dateLabel || record.location) && <dl className="record-metadata">
              {dateLabel && <div><dt>Data</dt><dd><time dateTime={record.date}>{dateLabel}</time></dd></div>}
              {record.location && <div><dt>Local</dt><dd><MapPin size={17} aria-hidden="true" />{record.location}</dd></div>}
            </dl>}
          </div>
        </div>
      </div>
    </dialog>
  );
}
