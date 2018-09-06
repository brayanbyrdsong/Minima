let snippets = {};

snippets.nav = `
<nav>
  <div class="space-between">
    <h5>Example</h5>
    <div>
      <a href="../">Home</a>
    </div>
  </div>
</nav>`;

snippets.section = `
<section>
  <h6>Section Element</h6>
  <p>...</p>
</section>`;

snippets.dialog = `
<button onclick="Minima.toggleDialog('dialog')">Open Dialog</button>
<dialog id="dialog" onclick="Minima.toggleDialog('dialog')">
  <h3>Dialog element example</h3>
  <p>Click me to close me</p>
</dialog>`;

snippets.layout = `
<div class="space-around example">
  <div></div>
  <div></div>
  <div></div>
</div>
<div class="space-between example">
  <div></div>
  <div></div>
  <div></div>
</div>
<div class="space-even example">
  <div></div>
  <div></div>
  <div></div>
</div>
<div class="flex">
  <div class="col"></div>
  <div class="col"></div>
  <div class="col"></div>
</div>`;
snippets.mobile = `
<nav>
  <div class="space-between">
    <img src="brand-img">
    <div class="mobile">
      <a href="/">Home</a>
      <a href="/docs.html"><b>Documentation</b></a>
      <a href="/examples.html">Examples</a>
      <a href="/themes.html">Themes</a>
    </div>
  </div>
</nav>`;
snippets.layout1 = `
<div class="flex">
  <div class="col gutter"></div>
  <div class="col gutter"></div>
  <div class="col gutter"></div>
</div>`;
snippets.layout2 = `
<div class="flex list">
  <div class="col gutter"></div>
  <div class="col gutter"></div>
  <div class="col gutter"></div>
</div>`;

snippets.cssLink = `
<script src="https://minima-css--blbbrayan.repl.co/2/minima.js"></script>`;

snippets.cssImport = `
@import url("https://minima-css--blbbrayan.repl.co/2/minima.css");`;

snippets.jsScript = `
<link href="https://minima-css--blbbrayan.repl.co/2/minima.css" 
rel="stylesheet" type="text/css" />`;

snippets.dropdown = `
<div id="dd" class="dropdown" 
  onclick="Minima.toggleDropdown('dd')">
  <label>Select an Option</label>
  <a>One</a>
  ...
</div>`;

snippets.sideNav = `
<nav id="..." class="side">
  ...
</nav>`;

snippets.tabs = `
<div class="tabs" onclick="Minima.toggleTab(event)">
  <a class="active">One</a>
  <a>Two</a>
</div>
// or
<div class="tabs" onclick="Minima.toggleTab(event)">
  <button class="active">One</button>
  <button>Two</button>
</div>`;

snippets.buttonTray = `
<form>
  ...
  <div class="button-tray right">
    <button>Submit</button>
  </div>
</form>`;

let load = () =>
  document.querySelectorAll('[snippet]').forEach(target => {
    if(target.classList.contains('snippet')) return null;
    let val = target.getAttribute('snippet');
    if(snippets[val]){
      target.innerText = snippets[val];
      target.classList.add('snippet');
      target.parentElement.addEventListener('click', 
        event => Minima.activate(event));
    }
});

setInterval(load, 100);

addEventListener('load', load);
addEventListener('hashchange', load);