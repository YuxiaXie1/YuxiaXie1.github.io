const menuToggle=document.querySelector('.menu-toggle');const nav=document.querySelector('#main-nav');if(menuToggle&&nav){const active=document.querySelector('main')?.dataset.active;nav.querySelectorAll('a[data-page]').forEach(a=>{if(a.dataset.page===active)a.setAttribute('aria-current','page')});menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')==='true';menuToggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false')}))}// Shared image viewer with keyboard navigation and focus restoration.
const lightbox=document.querySelector('.lightbox');
if(lightbox){
 const preview=lightbox.querySelector('img');
 const closeButton=lightbox.querySelector('.lightbox-close');
 const caption=document.createElement('p');caption.className='lightbox-caption';caption.id='image-caption';lightbox.append(caption);
 const previous=document.createElement('button');previous.className='lightbox-prev';previous.textContent='‹';previous.setAttribute('aria-label','Previous image');
 const next=document.createElement('button');next.className='lightbox-next';next.textContent='›';next.setAttribute('aria-label','Next image');
 lightbox.append(previous,next);lightbox.setAttribute('role','dialog');lightbox.setAttribute('aria-modal','true');lightbox.setAttribute('aria-label','Image viewer');lightbox.setAttribute('aria-describedby','image-caption');
 let opener=null,items=[],position=0,oldOverflow='';
 function show(index){position=(index+items.length)%items.length;const img=items[position].querySelector('img');preview.src=img.src;preview.alt=img.alt;caption.textContent=img.alt+' · '+(position+1)+' / '+items.length;}
 document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{
  opener=button;items=[...document.querySelectorAll('[data-image]')].filter(item=>!item.closest('[hidden]'));show(items.indexOf(button));
  oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');closeButton.focus();
 }));
 function close(){if(!lightbox.classList.contains('open'))return;lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow=oldOverflow;opener?.focus();}
 closeButton.addEventListener('click',close);previous.addEventListener('click',()=>show(position-1));next.addEventListener('click',()=>show(position+1));
 lightbox.addEventListener('click',event=>{if(event.target===lightbox)close()});
 document.addEventListener('keydown',event=>{if(!lightbox.classList.contains('open'))return;
  if(event.key==='Escape')close();
  if(event.key==='ArrowLeft'){event.preventDefault();show(position-1)}
  if(event.key==='ArrowRight'){event.preventDefault();show(position+1)}
  if(event.key==='Tab'){const buttons=[closeButton,previous,next];let i=buttons.indexOf(document.activeElement);event.preventDefault();buttons[(i+(event.shiftKey?2:1))%3].focus();}
 });
}
// A compact research map switches between three scientific lenses.
const stage = document.querySelector('.research-stage');
if (stage) {
  const views = {
    spatial: {
      title: 'Connect the cell<br>to its <em>context.</em>',
      description: 'Explore spatial expression outputs from the xMINT overview alongside their tissue morphology.',
      label: 'COLORECTAL TUMOR / SPATIAL VIEW'
    },
    pathway: {
      title: 'Trace signals<br>through the <em>pathway.</em>',
      description: 'Use graph structure and co-expression patterns to make pathway activity scores more reliable and interpretable.',
      label: 'GENE NETWORK / PATHWAY VIEW'
    },
    multimodal: {
      title: 'Let images and<br>omics <em>converge.</em>',
      description: 'Connect tissue morphology with molecular measurements through cross-modal learning and gene imputation.',
      label: 'H&E + SPATIAL OMICS / MULTIMODAL VIEW'
    }
  };
  const title = document.querySelector('#stage-title');
  const description = document.querySelector('#stage-description');
  const label = document.querySelector('.stage-visual-label');
  document.querySelectorAll('[data-stage]').forEach(button => button.addEventListener('click', () => {
    const mode = button.dataset.stage;
    const view = views[mode];
    if (!view) return;
    stage.dataset.mode = mode;
    title.innerHTML = view.title;
    description.textContent = view.description;
    if (label) label.textContent = view.label;
    stage.querySelectorAll("[data-science-panel]").forEach(panel => { panel.hidden = panel.dataset.sciencePanel !== mode; });
    document.querySelectorAll('[data-stage]').forEach(tab => {
      const selected = tab === button;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-pressed', String(selected));
    });
  }));
  document.querySelector('[data-stage="spatial"]')?.setAttribute('aria-pressed', 'true');
}

// The news archive can be narrowed by update type.
const newsCards = [...document.querySelectorAll('.news-card[data-category]')];
if (newsCards.length) {
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(tab => {
      const selected = tab === button;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-pressed', String(selected));
    });
    newsCards.forEach(card => { card.hidden = filter !== 'all' && card.dataset.category !== filter; });
  }));
}

// Reveal sections as they enter the viewport, with reduced-motion support in CSS.
document.documentElement.classList.add('js-enabled');
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}
