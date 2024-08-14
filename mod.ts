import Site, { Plugin } from "lume/core/site.ts";
import { Data, Page } from "lume/core/file.ts";

function addMermaidScript(page: Page<Data>) {
  const mermaidScript = page.document?.createElement("script") as HTMLScriptElement;
  mermaidScript.setAttribute("type", "module")
  mermaidScript.textContent = "import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs'; mermaid.initialize({ startOnLoad: true });";
  page.document?.body.appendChild(mermaidScript);
}

function decodeEncodedBlock(codeBlock: HTMLElement, page: Page<Data>) {
  const encodedBlock = codeBlock.innerHTML;
  const decodedBlock = encodedBlock.replaceAll("&gt;", ">").replaceAll("&lt;", "<");
  if (typeof page.content === "string") {
    return page.content.replace(codeBlock.outerHTML, decodedBlock)
  }
  return page.content 
}

function processMermaidBlock(mermaidBlocks: HTMLCollectionOf<Element>, page: Page<Data>) {
  for (const mermaidBlock of mermaidBlocks) {
    const codeBlock = mermaidBlock.getElementsByTagName("code")[0];
    if (mermaidBlock.tagName === "PRE" && codeBlock) {
      mermaidBlock.classList.add("mermaid");
      page.content = decodeEncodedBlock(codeBlock, page);
    }
  }
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
        const mermaidBlocks = page.document?.getElementsByClassName("language-mermaid");
        if (!mermaidBlocks) continue
        addMermaidScript(page);
        processMermaidBlock(mermaidBlocks, page);
      }
    });
  };
}