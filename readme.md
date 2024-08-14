## How to use
In your `_config.ts` file, add these lines:
```ts
import mermaid from "https://deno.land/x/lume_mermaid_plugin/mod.ts";

site.use(mermaid())
```
## How it works
After the rendering of Lume, special characters will be HTML-encoded (e.g. `node --> node` to `node --&gt; node`). This makes Mermaid unable to parse the syntax. Also, the rendered Mermaid block will be:
```html
<pre>
  <code class="language-mermaid">
    Mermaid code
  </code>
</pre>
```
While [Mermaid API](https://mermaid.js.org/intro/#mermaid-api) only look for the `<div>` or `<pre>` tags with `class="mermaid"`.

This plugin will:
- HTML-decode Mermaid code
- Use correct `<pre class="mermaid">Mermaid code</pre>`
- Inject Mermaid API once for every page has Mermaid code