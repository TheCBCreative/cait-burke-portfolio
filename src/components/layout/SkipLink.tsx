/** Lets keyboard users jump past the masthead straight to page content.
 * Visually hidden until it receives focus (see .skip-link in global.css). */
export function SkipLink() {
  return (
    <a href="#main-content" className="skip-link">
      Skip to content
    </a>
  );
}
