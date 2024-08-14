import Site, { Plugin } from "lume/core/site.ts";
import { Data, Page } from "lume/core/file.ts";

const placeholder = '"This page doesn\'t contain any Mermaid code, so there is no need to inject Mermaid API here"';
const mermaidScript = `
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
mermaid.initialize({ startOnLoad: true });`

function addPlaceholderElement(page: Page<Data>) {
  const scriptElement = page.document?.createElement("script") as HTMLScriptElement;
  scriptElement.setAttribute("type", "module")
  scriptElement.textContent = placeholder;
  page.document?.body.appendChild(scriptElement);
}


/** 
 * After the rendering, special characters will be HTML-encoded. This makes Mermaid unable to parse the syntax. 
 * The rendered Mermaid block will be `<pre class="language-mermaid"><code class="language-mermaid">Actual Mermaid code here</code></pre>`. 
 * We need to decode it and remove the `<code>` tags.
 */
export default function (): Plugin {
  return (site: Site) => {
    site.process([".html"], (pages) => {
      for (const page of pages) {
        const preElements = page.document?.getElementsByTagName("pre");
        if (!preElements || typeof page.content !== "string") continue
        
        let hasMermaidBlock = false
        addPlaceholderElement(page);

        for (const preElement of preElements) {
          const codeElement = preElement.getElementsByTagName("code")[0];
          const mermaidCode = codeElement.classList.contains("language-mermaid") ? codeElement.innerHTML : null;
          if (codeElement && mermaidCode){
            hasMermaidBlock = true
            const decodedMermaidCode = mermaidCode.replaceAll("&gt;", ">").replaceAll("&lt;", "<");
            // console.log("🚀 decodedMermaidCode:", decodedMermaidCode)
            console.log("🚀 preElement.outerHTML:", preElement.outerHTML)
            page.content.replace(preElement.outerHTML, `<pre class="mermaid">${decodedMermaidCode}</pre>`)
          }
        }
        if (hasMermaidBlock) page.content.replace(placeholder, mermaidScript)
      }
    });
  };
}