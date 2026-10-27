import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { projectRecords, recordCategories } from "../../content/projectRecords";
import type { ProjectRecord, RecordCategory } from "../../content/projectRecords";
import { TextAnimate } from "../motion/TextAnimate";
import { RecordMedia } from "./RecordMedia";
import { RecordDialog } from "./RecordDialog";
import "./gallery.css";

export function ProjectGallery() {
  const [filter, setFilter] = useState<RecordCategory | "todos">("todos");
  const [selected, setSelected] = useState<ProjectRecord | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const mosaic = useRef<HTMLDivElement>(null);
  const visible = projectRecords.filter(record => filter === "todos" || record.category === filter);
  const demoCount = projectRecords.filter(record => record.demo).length;
  const filters = [{ id: "todos", label: "Todos" }, ...recordCategories] as const;
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08 });
    mosaic.current?.querySelectorAll(".action-record").forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, [filter]);
  return (
    <section className="section project-gallery" id="em-acao" aria-labelledby="titulo-em-acao">
      <div className="container">
        <div className="gallery-heading">
          <div>
            <p className="eyebrow">ENCONTROS QUE APROXIMAM</p>
            <h2 id="titulo-em-acao"><TextAnimate text="Vem Comigo em ação" /></h2>
            <p className="gallery-intro">Conheça os encontros, as iniciativas e as experiências que fazem parte do nosso projeto.</p>
          </div>
          <div className="gallery-heading-note" aria-hidden="true"><MessageCircle size={28} strokeWidth={1.5} /><span>O cuidado acontece<br />no encontro.</span></div>
        </div>
        {demoCount > 0 && <p className="gallery-demo-note">{demoCount === projectRecords.length
          ? "Esta galeria está sendo preparada. Os cartões abaixo são exemplos de apresentação, aguardando relatos e fotografias reais."
          : "Esta galeria reúne registros do projeto e exemplos identificados como demonstrativos, aguardando conteúdo real."}</p>}
        <div className="gallery-filters" role="group" aria-label="Filtrar registros por categoria">
          {filters.map(item => <button key={item.id} type="button" aria-pressed={filter === item.id} aria-controls="gallery-results" onClick={() => setFilter(item.id)}>
            <Check className="gallery-filter-check" size={16} aria-hidden="true" />{item.label}
          </button>)}
        </div>
        <p className="gallery-result-count" role="status" aria-live="polite" aria-atomic="true">{visible.length} {visible.length === 1 ? "registro disponível" : "registros disponíveis"}{visible.every(item => item.demo) && visible.length > 0 ? " · conteúdo demonstrativo" : ""}</p>
        <div ref={mosaic} className={`gallery-mosaic ${filter !== "todos" ? "is-filtered" : ""}`} id="gallery-results" key={filter}>
          {visible.map((record, index) => {
            const category = recordCategories.find(item => item.id === record.category)!;
            return <article className={`action-record theme-${category.theme} ${record.featured ? "is-featured" : ""}`} key={record.id} style={{ "--record-order": Math.min(index, 5) } as CSSProperties}>
              <div className="record-preview"><RecordMedia key={record.images[0]?.src || "placeholder"} image={record.images[0]} category={record.category} /></div>
              <div className="record-card-copy">
                <p className="record-category">{category.label}</p>
                <h3><button className="record-open" type="button" aria-haspopup="dialog" onClick={event => { opener.current = event.currentTarget; setSelected(record); }}>{record.title}<span className="sr-only"> — abrir detalhes</span></button></h3>
                <p className="record-card-description">{record.summary}</p>
                <div className="record-card-bottom"><span>{record.demo ? "Exemplo · conteúdo real em breve" : "Ver registro"}</span><ArrowUpRight size={23} aria-hidden="true" /></div>
              </div>
            </article>;
          })}
          {!visible.length && <p className="gallery-empty">Ainda não há registros nesta categoria. Novos encontros encontrarão espaço por aqui.</p>}
        </div>
      </div>
      {selected && <RecordDialog key={selected.id} record={selected} returnFocus={opener.current} onDismiss={() => setSelected(null)} />}
    </section>
  );
}
