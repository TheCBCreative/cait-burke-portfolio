/** A link's host as people would type it: "https://www.example.com/a" → "example.com". */
export const displayHost = (href: string) => new URL(href).host.replace(/^www\./, '');
