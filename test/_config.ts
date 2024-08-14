import lume from "lume/mod.ts";
import mermaid from "../mod.js";
// import mermaid from "https://deno.land/x/lume_mermaid_plugin/mod.js";

const site = lume();
site.use(mermaid())

export default site;
