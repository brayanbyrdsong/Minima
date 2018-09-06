window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-123344128-1');

const setNote = () => {
  let note = document.querySelector('.note')
  if(document.querySelector('.note'))
    note.parentElement.removeChild(note);
  note = document.createElement('div');
  note.classList.add('note');
  let theme = localStorage.theme != 0 ? themes[localStorage.theme-1] : 'default';
  note.innerText = `${theme} v${localStorage.version || 2}`;
  let anchor = document.createElement('a');
  anchor.innerText = 'reset to default';
  anchor.addEventListener('click', function(){
    setVersion(2);
    setTheme(0);
  });
  note.appendChild(anchor);
  document.body.appendChild(note);
}

const themes = ['dark', 'sharp', 'minima'];

const setTheme = num => {
  if(typeof num === 'string')
    num = parseInt(num);
  const theme = document.getElementById('theme');
  if(theme)
    theme.parentElement.removeChild(theme);
  if(num !== 0){
    let link = document.createElement('link');
    link.setAttribute('href', `./themes/${themes[num-1]}.css`);
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('id', 'theme');
    document.body.appendChild(link);
  }
  localStorage.theme = num;
  setNote();
};

const setVersion = num => {
  if(typeof num === 'string')
    num = parseInt(num);
  document.querySelectorAll(`[href="./${[num===1?2:1]}/minima.css"], [href="/${[num===1?2:1]}/minima.css"], [href="${[num===1?2:1]}/minima.css"], [href="../${[num===1?2:1]}/minima.css"]`)
    .forEach(el=>el.href=`./${[num===1?1:2]}/minima.css`);
  localStorage.version = num;
  setNote();
};

setTheme(localStorage.theme || 3);

if(localStorage.version)
  setVersion(localStorage.version);

const copy = id => {
  const input = document.createElement('input');
  input.value = {
    link: `<link href="https://minima--blbbrayan.repl.co/2/minima.css" rel="stylesheet" type="text/css" />`,
    import: `@import url("https://minima--blbbrayan.repl.co/2/minima.css");`,
    code: `<script src="https://minima--blbbrayan.repl.co/2/minima.js"></script>`}[id];
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  input.parentElement.removeChild(input);
};

const moduleUrls = [
'./templates/campaign.html',
'./templates/components.html',
'./templates/documentation.html',
'./templates/elements.html',
'./templates/examples.html',
'./templates/forms.html',
'./templates/home.html',
'./templates/layout.html',
'./templates/support.html',
'./templates/templates.html'
];

const waitUntil=()=>new Promise(r => setInterval(()=>window.Minima ? r() : null, 100));

const init = async () => {
  await waitUntil();
  Minima.dom.loadModule(moduleUrls,()=>console.log('Minima Dom: modules loaded'));
  if(Minima.cache.routeInvalid)
    location.hash = '/home';
  setTimeout(()=>checkLink(),0);
};

init();

const checkLink = () => setTimeout(()=>{
  document.querySelectorAll('nav a')
    .forEach(a=>a.classList[a.hash === location.hash?'add':'remove']('active'));
  document.querySelectorAll('section a')
    .forEach(a=>a.classList[a.hash === location.hash?'add':'remove']('active'));
}, 0);

addEventListener('load', checkLink);
addEventListener('hashchange', checkLink);