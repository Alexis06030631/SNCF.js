import{_ as s,o as e,c as t,a as n,V as a}from"./chunks/framework.cb204819.js";const A=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"api/sncf.js.journeymanager.get.md","filePath":"api/sncf.js.journeymanager.get.md","lastUpdated":1714754077000}'),o={name:"api/sncf.js.journeymanager.get.md"},p=a('<p><a href="./">Home</a> &gt; <a href="./sncf.js.html">sncf.js</a> &gt; <a href="./sncf.js.journeymanager.html">JourneyManager</a> &gt; <a href="./sncf.js.journeymanager.get.html">get</a></p><h2 id="journeymanager-get-method" tabindex="-1">JourneyManager.get() method <a class="header-anchor" href="#journeymanager-get-method" aria-label="Permalink to &quot;JourneyManager.get() method&quot;">​</a></h2><p>Get a journey details with departure and arrival stop areas ids</p><p><strong>Signature:</strong></p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">get</span><span style="color:#A6ACCD;">(from: string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> to: string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> date</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> Date): </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">Journey</span><span style="color:#89DDFF;">&gt;;</span></span></code></pre></div><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><table><thead><tr><th><p>Parameter</p></th><th><p>Type</p></th><th><p>Description</p></th></tr></thead><tbody><tr><td><p>from</p></td><td><p>string</p></td><td><p>The departure stop area id or name</p></td></tr><tr><td><p>to</p></td><td><p>string</p></td><td><p>The arrival stop area id or name</p></td></tr><tr><td><p>date</p></td><td><p>Date</p></td><td><p><em>(Optional)</em> The date of the journey to get</p></td></tr></tbody></table>',7),l=a(`<p>Promise&lt;<a href="./sncf.js.journey.html">Journey</a>&gt;</p><h2 id="example-1" tabindex="-1">Example 1 <a class="header-anchor" href="#example-1" aria-label="Permalink to &quot;Example 1&quot;">​</a></h2><p>This example shows how to get a journey using the departure and arrival stop areas names</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> journey </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#A6ACCD;"> client</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">journey</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Paris</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Bordeaux</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(journey)</span></span></code></pre></div><h2 id="example-2" tabindex="-1">Example 2 <a class="header-anchor" href="#example-2" aria-label="Permalink to &quot;Example 2&quot;">​</a></h2><p>This example shows how to get a journey using the departure and arrival stop areas ids</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> journey </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#A6ACCD;"> client</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">journey</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">stop_area:SNCF:87611004</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">stop_area:SNCF:87686006</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(journey)</span></span></code></pre></div>`,7);function r(c,i,y,d,D,h){return e(),t("div",null,[p,n(" **Returns:** "),l])}const F=s(o,[["render",r]]);export{A as __pageData,F as default};