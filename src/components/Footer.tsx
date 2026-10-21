import { navigation } from "../content/institutional";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <a className="footer-brand" href="#inicio">
          <img
            src="/images/vem-comigo-logo.svg"
            alt="Vem Comigo — início"
            width="112"
            height="112"
          />
        </a>
        <p>
          Uma escola melhor
          <br />
          se constrói em conjunto.
        </p>
        <nav aria-label="Navegação do rodapé">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a href="#contato">Contato</a>
        </nav>
        <nav aria-label="Informações complementares">
          <a href="#perguntas">Perguntas frequentes</a>
          <a href="#privacidade">Privacidade</a>
          <a href="#inicio">Voltar ao início ↑</a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>Vem Comigo · Diálogo, cuidado e convivência escolar.</span>
        <span>Feito para aproximar.</span>
      </div>
    </footer>
  );
}
