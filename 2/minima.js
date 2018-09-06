if(!window.Minima)
  window.Minima = {cache: {}};

Minima.death = function(ele, fn, dur){
  ele.classList.add('death');
  setTimeout(function(){
    ele.classList.remove('death');
    if(fn)
      fn();
  }, dur || 300);
}

Minima.toggleDialog = function(id) {
  var dialog = document.getElementById(id);
  if(dialog)
    dialog.hasAttribute('open') 
      ? dialog.removeAttribute('open')
      : dialog.setAttribute('open', '');
};

Minima.toggleDropdown = function(id){
  var dropdown = document.getElementById(id);
  if(dropdown){
    var menu = dropdown.querySelectorAll('div.dropdown-menu')[0];
    if(menu)
      Minima.death(menu, function(){
        while (menu.querySelector(':not(label)'))
          dropdown.appendChild(menu.querySelector(':not(label)'));
        dropdown.removeChild(menu);        
        dropdown.classList.remove('active');
      }, 200);
    else{
      var div = document.createElement('div');
      div.classList.add('dropdown-menu');
      while (dropdown.querySelector(':not(label)'))
        div.appendChild(dropdown.querySelector(':not(label)'));
      dropdown.appendChild(div);
      dropdown.classList.add('active');
    }
  }
}

Minima.toggleNav = function(id){
  var nav = document.getElementById(id);
  if(nav){
    var active = nav.classList.contains('active');
    nav.classList[active ? 'remove' : 'add']('active');
    if(!active && !document.getElementById('nav-bg')){
      var div = document.createElement('div');
      div.classList.add('nav-bg');
      div.id='nav-bg';
      div.addEventListener('click', Minima.toggleNav.bind(this, id));
      document.body.appendChild(div);
    }else{
      var bg = document.getElementById('nav-bg');
      bg.parentElement.removeChild(bg);
    }
  }
}

Minima.toggleTab = function(event){
  var active = event.target.parentElement.querySelector('.active');
  if(active)
    active.classList.remove('active');
  Minima.activate(event);
}

Minima.activate = function(event, setter, id) {
  var ele = id ? document.getElementById(id) : event.target;
  var active = setter ? !setter : ele.classList.contains('active');
  ele.classList[active ? 'remove' : 'add']('active');
};

Minima.initNav = function (){
  var nav = document.querySelector("nav.fixed:first-of-type");
  document.body.classList[nav?'add':'remove']('fixed-nav');
}

Minima.initMobile = function(){
  if(innerWidth > 800) return null;
  var mobile = document.querySelectorAll('.mobile');
  var update = function(el){
    el.classList.remove('active');
    if(el.getAttribute('role') === "button") return null;    
    el.setAttribute('aria-label', 'Menu, click to open menu');
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    var fn = function(event, key){
      if(!key || event.keyCode === 13){
        Minima.activate(event);
        var verb = el.classList.contains('active') ? 'close' : 'open';
        el.setAttribute('aria-label', 'Menu, click to '+verb+' menu');
      }
    }
    el.addEventListener('click', fn);
    el.addEventListener('keydown', function(e){fn(e,true)});
  }
  
  for(var i = 0; i < mobile.length; i++)
    update(mobile[i]);
};

Minima.getState = function(){
  return innerWidth > 800 ? (innerWidth > 1000 ? "desktop" : "tablet") : "mobile";
}

Minima.checkFullscreen = function(){
  var fullscreen = document.body.classList.contains('fullscreen');
  var nav = document.querySelector('body nav:first-of-type');
  var mobile = Minima.state === 'mobile';

  if(fullscreen){
    var minHeight = innerHeight;
    if(nav)
      minHeight -= 78;
    if(mobile)
      minHeight -= 18;
    else
      minHeight -= 26;
    
    document.body.style.minHeight = `${minHeight}px`;
  }
}

Minima.init = function(){
  Minima.state = Minima.getState();
  Minima.initNav();
  Minima.initMobile();
  Minima.checkFullscreen();
};

Minima.elementInterval = setInterval(function(){
  if(Minima.cache.elCount !== document.body.childElementCount)
    Minima.init();
  Minima.cache.elCount = document.body.childElementCount;
}, 100);

addEventListener('load', Minima.init);
addEventListener('hashchange', Minima.init);
addEventListener('resize', Minima.init);