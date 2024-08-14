## How to use
In your `_config.ts` file, add these lines:
```ts
import mermaid from "https://deno.land/x/lume_mermaid_plugin/mod.ts";

site.use(mermaid())
```
## How it works
After the rendering of Lume, the rendered Mermaid block will be:
```html
<pre>
  <code class="language-mermaid">
    Mermaid code
  </code>
</pre>
```
While [Mermaid API](https://mermaid.js.org/intro/#mermaid-api) only look for the `<div>` or `<pre>` tags with `class="mermaid"`.

This plugin will:
- Use correct `<pre class="mermaid">Mermaid code</pre>` element
- Inject Mermaid API once for every page containing Mermaid code