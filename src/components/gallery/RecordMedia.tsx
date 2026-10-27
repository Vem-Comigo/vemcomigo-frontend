import { useState } from "react";
import { BookOpen, HeartHandshake, Image, MessageCircle, Sprout, Users } from "lucide-react";
import type { RecordCategory, RecordImage } from "../../content/projectRecords";

const symbols = { formacao: BookOpen, rodas: MessageCircle, assembleias: Users, ccas: HeartHandshake, realizacoes: Sprout };

/** A graphic placeholder, never a skeleton or a simulated photograph. */
export function RecordMedia({ image, category, eager = false }: {
  image?: RecordImage;
  category: RecordCategory;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const Symbol = symbols[category];
  if (image?.src && !failed) {
    return <img className="record-photo" src={image.src} alt={image.alt} width={image.width} height={image.height} loading={eager ? "eager" : "lazy"} decoding="async" onError={() => setFailed(true)} />;
  }
  return (
    <div className="record-placeholder" role="img" aria-label={failed ? "Imagem indisponível. O registro continua disponível." : "Imagem em breve. Espaço reservado para uma fotografia."}>
      <div className="placeholder-drawing" aria-hidden="true">
        <svg className="placeholder-connection" viewBox="0 0 500 280" fill="none" focusable="false">
          <ellipse cx="250" cy="140" rx="210" ry="105" transform="rotate(-12 250 140)" />
          <path d="M55 195 Q120 255 185 205 T340 200 Q405 245 450 170" />
        </svg>
        <span className="placeholder-bubble"><Symbol strokeWidth={1.35} /></span>
        <span className="placeholder-reply"><MessageCircle strokeWidth={1.4} /></span>
        <span className="placeholder-dot" />
        <span className="placeholder-star">✳</span>
      </div>
      <span className="placeholder-label"><Image size={17} aria-hidden="true" />{failed ? "Imagem indisponível" : "Imagem em breve"}</span>
    </div>
  );
}
