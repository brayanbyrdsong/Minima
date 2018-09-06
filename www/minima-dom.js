if(!window.Minima)
  window.Minima = {cache: {}};

Minima.dom = (() => {
  document.body.classList.add('loading');
  document.body.classList.remove('loaded');
  document.addEventListener('readystatechange', ()=> {
    if (document.readyState == "complete") {
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
    }
  });
  let virtualDom = document.createElement('span');

  let loadTemplate = (url, callback) => {
      let xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() { 
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
              callback(xmlHttp.responseText);
      }
      xmlHttp.open("GET", url, true);
      xmlHttp.send(null);
  }

  let loadModule = (moduleUrls, callback) => {
    let loaded = 0;
    moduleUrls.forEach(url=>{
      loadTemplate(url, html=> virtualDom.innerHTML += `\n${html}`);
      loaded++;
      if(loaded === moduleUrls.length){
        callback();
      }
    })
  };

  let renderInterval = setInterval(()=>
    document.body.querySelectorAll('code').forEach(code =>{
      let template;
      try{
        template = virtualDom.querySelector(`template[name="${code.innerText}"]`);
      }catch{};
      if(template){
        let div = document.createElement('div');
        div.classList = code.classList;
        div.classList.add('minima-view');
        div.appendChild(template.content.cloneNode(true));
        code.parentElement.replaceChild(div, code);
      }
    })
  , 100);

  //routes
  let routes = [];

  let loadRoutes = () =>
    document.body.querySelectorAll(`code[route][template]`).forEach(code =>{
      let template = virtualDom.querySelector(`template[name="${code.getAttribute('template')}"]`);
      let title = code.getAttribute('title');
      if(template) {
        let clone = ()=> template.content.cloneNode(true);
        routes.push({path: code.getAttribute('route'), clone, template, html: clone(), title});
        code.parentElement.removeChild(code);
        Minima.cache.routes = routes;
      }
    });

  let checkRoute = () => {
    if(location.hash === '')
      location.hash = '/';
    let hash = location.hash.substr(1);
    if(Minima.cache.currentHash !== hash){
      let route = routes.find(e=>e.path === hash);
      if(route){
        let view = document.querySelector('#minima-view');
        if(view){
          while(view.lastChild)
            view.removeChild(view.lastChild);
          Minima.cache.currentRoute.html = Minima.cache.currentRoute.clone();
        }else{
          view = document.createElement('div');
          view.id = 'minima-view';
          document.body.appendChild(view);
        }
        view.appendChild(route.html);
        if(route.title)
          document.title = route.title;
        Minima.cache.currentHash = hash;
        Minima.cache.currentRoute = route;
        if(document.readyState === 'ready' || document.readyState === 'complete') {
          document.body.classList.remove('loading');
          document.body.classList.add('loaded');
        }
        Minima.cache.routeInvalid = false;
      } else {
        Minima.cache.routeInvalid = true;
      }
    }
  }

  let routingInterval = setInterval(()=>{
    loadRoutes(); checkRoute();
  }, 100);

  return {loadModule, httpGet: loadTemplate, renderInterval, routingInterval};
})();