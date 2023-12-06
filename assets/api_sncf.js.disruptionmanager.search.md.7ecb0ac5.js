import{_ as s,o as a,c as n,V as e}from"./chunks/framework.51fee0ea.js";const F=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"api/sncf.js.disruptionmanager.search.md","filePath":"api/sncf.js.disruptionmanager.search.md","lastUpdated":1701859774000}'),t={name:"api/sncf.js.disruptionmanager.search.md"},o=e(`<p><a href="./">Home</a> &gt; <a href="./sncf.js.html">sncf.js</a> &gt; <a href="./sncf.js.disruptionmanager.html">DisruptionManager</a> &gt; <a href="./sncf.js.disruptionmanager.search.html">search</a></p><h2 id="disruptionmanager-search-method" tabindex="-1">DisruptionManager.search() method <a class="header-anchor" href="#disruptionmanager-search-method" aria-label="Permalink to &quot;DisruptionManager.search() method&quot;">​</a></h2><p>Search the disruptions</p><p><strong>Signature:</strong></p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">search</span><span style="color:#A6ACCD;">(since_date</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> Date</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> until_date</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> Date): </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">Disruption[]</span><span style="color:#89DDFF;">&gt;;</span></span></code></pre></div><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><table><thead><tr><th>Parameter</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>since_date</td><td>Date</td><td><em>(Optional)</em> Defines the start date of the disruptions to search for</td></tr><tr><td>until_date</td><td>Date</td><td><em>(Optional)</em> Defines the end date of the disruptions to search for</td></tr></tbody></table><p><strong>Returns:</strong></p><p>Promise&lt;<a href="./sncf.js.disruption.html">Disruption</a>[]&gt;</p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><p>This example shows all the disruptions from yesterday to today</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">Client</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">SNCF.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> client </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Client</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">client</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">disruptions</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">search</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Date</span><span style="color:#A6ACCD;">(Date</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">now</span><span style="color:#A6ACCD;">() </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">86400000</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Date</span><span style="color:#A6ACCD;">())</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#A6ACCD;">(</span><span style="color:#A6ACCD;font-style:italic;">disruptions</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">disruptions</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">catch</span><span style="color:#A6ACCD;">(console</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">error)</span></span></code></pre></div>`,12),p=[o];function l(r,c,i,D,A,y){return a(),n("div",null,p)}const d=s(t,[["render",l]]);export{F as __pageData,d as default};