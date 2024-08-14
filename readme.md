## How to use
In your `_config.ts` file, add these lines:
```ts
import mermaidPlugin from "./mermaidPlugin.ts";

site.use(mermaidPlugin())
```
## How it works
After the rendering of Lume, special characters will be HTML-encoded (e.g. `node --> node` to `node --&gt; node`). This makes Mermaid unable to parse the syntax. Also, the rendered Mermaid block will be:
```html
<pre class="language-mermaid">
  <code class="language-mermaid">
    Actual Mermaid code here
  </code>
</pre>
```
While [Mermaid API](https://mermaid.js.org/intro/#mermaid-api) only look for the `<div>` or `<pre>` tags with `class="mermaid"`.

This plugin is the same with adding this processor into your `_config.ts`:
```ts
site.process([".html"], (pages) => {
  for (const page of pages) {
    const mermaidBlocks = page.document?.getElementsByClassName("language-mermaid");
    if (!mermaidBlocks) continue
    addMermaidScript(page);
    processMermaidBlock(mermaidBlocks, page); //decode HTML and remove the `<code></coded>` tags
  }
});
```