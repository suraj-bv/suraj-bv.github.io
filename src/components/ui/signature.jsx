import "./signature.css";

export default function Signature() {
  return (
    <footer className="terminal-footer">
      <div className="terminal-footer__inner">
        <div className="terminal-footer__line">
          <span className="terminal-footer__prompt" aria-hidden="true">
            $
          </span>
          <span className="terminal-footer__text">
            &copy; 2026 suraj-bv &middot; Built with React + Sanity &middot;
            Terminal theme
          </span>
          <span
            className="terminal-footer__cursor"
            aria-hidden="true"
          >
            _
          </span>
        </div>
      </div>
    </footer>
  );
}
