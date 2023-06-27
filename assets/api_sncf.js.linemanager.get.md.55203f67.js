import{_ as a,o as e,c as s,V as t}from"./chunks/framework.163d85da.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"api/sncf.js.linemanager.get.md","filePath":"api/sncf.js.linemanager.get.md","lastUpdated":null}'),n={name:"api/sncf.js.linemanager.get.md"},l=t(`<p><a href="./">Home</a> &gt; <a href="./sncf.js.html">sncf.js</a> &gt; <a href="./sncf.js.linemanager.html">LineManager</a> &gt; <a href="./sncf.js.linemanager.get.html">get</a></p><h2 id="linemanager-get-method" tabindex="-1">LineManager.get() method <a class="header-anchor" href="#linemanager-get-method" aria-label="Permalink to &quot;LineManager.get() method&quot;">​</a></h2><p>Get a line by id</p><p><strong>Signature:</strong></p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">get</span><span style="color:#A6ACCD;">(lineID: string): </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">Line</span><span style="color:#89DDFF;">&gt;;</span></span></code></pre></div><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><table><thead><tr><th>Parameter</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>lineID</td><td>string</td><td>The id of the line</td></tr></tbody></table><p><strong>Returns:</strong></p><p>Promise&lt;<a href="./sncf.js.line.html">Line</a>&gt;</p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><p>This example shows how to get a line by id</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> line </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#A6ACCD;"> client</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">line</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">lline:SNCF:CSR:433500</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(line)</span></span></code></pre></div>`,12),o=[l];function p(r,i,c,h,d,g){return e(),s("div",null,o)}const D=a(n,[["render",p]]);export{y as __pageData,D as default};
