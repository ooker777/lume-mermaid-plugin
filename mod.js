const mermaidScript = `
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
mermaid.initialize({ startOnLoad: true });`
export default function (){
  return (site) => {
    site.process([".html"], (pages) => {
      for (const page of pages) {
        const document = page.document;
        if (!document) continue;

        const elements = document.querySelectorAll("pre code.language-mermaid");

        if (elements.length) {
          const scriptElement = document.createElement("script");
          scriptElement.setAttribute("type", "module")
          scriptElement.textContent = mermaidScript;
          document.head.appendChild(scriptElement);
        }

        for (const element of elements) {
          const pre = element.parentElement;
          pre.textContent = element.textContent;
          pre.classList.add("mermaid");
        }
      }
    });
  };
}