// Local, original xMINT figure panels. No synthetic measurements are generated.
document.querySelectorAll('.spatial-module').forEach(module=>{
 module.querySelectorAll('[data-map]').forEach(button=>button.addEventListener('click',()=>{
  module.querySelectorAll('[data-map-panel]').forEach(panel=>{panel.hidden=panel.dataset.mapPanel!==button.dataset.map;});
  module.querySelectorAll('[data-map]').forEach(tab=>{const selected=tab===button;tab.classList.toggle('active',selected);tab.setAttribute('aria-pressed',String(selected));});
  module.querySelector('.map-label').textContent='IMPUTED EXPRESSION · OUTPUT 0'+(Number(button.dataset.map)+1);
 }));
});
const pathwayNotes=[
 'EGFR / A membrane receptor. Activated EGFR recruits adaptor proteins that connect receptor signaling to RAS.',
 'GRB2 / SOS / GRB2 helps recruit SOS, a guanine nucleotide exchange factor that promotes the GTP-bound state of RAS.',
 'RAS–GTP / The active molecular switch recruits and activates RAF-family kinases.',
 'RAF / A MAP kinase kinase kinase (MAP3K) upstream of MEK1 and MEK2.',
 'MEK1/2 / MAP2K1 and MAP2K2 phosphorylate and activate ERK1 and ERK2.',
 'ERK1/2 / MAPK3 and MAPK1 regulate substrates in the cytoplasm and nucleus.',
 'NUCLEAR TARGETS / ERK signaling can alter transcription. The response depends on cellular context.'
];
document.querySelectorAll('.pathway-module').forEach(module=>{
 module.querySelectorAll('[data-node]').forEach(node=>{
  const select=()=>{module.querySelectorAll('[data-node]').forEach(item=>{item.classList.toggle('active',item===node);item.setAttribute('aria-pressed',String(item===node));});module.querySelector('.node-detail').textContent=pathwayNotes[Number(node.dataset.node)];};
  node.setAttribute('aria-pressed','false');node.addEventListener('click',select);node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();select();}});
 });
});
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const pipelineNotes=[
 '01 / INPUTS — H&E morphology and a targeted gene panel provide complementary views of the tissue.',
 '02 / FEATURES — Histology patches encode local morphology, alongside gene expression and spatial information.',
 '03 / INTEGRATION — Cross-modal attention connects image-derived representations with molecular features.',
 '04 / IMPUTATION — The model predicts expression in tissue space. These three maps are outputs shown in the original overview.'
];
document.querySelectorAll('.multimodal-module').forEach(module=>{
 let step=0,playing=!reducedMotion.matches;
 const playButton=module.querySelector('[data-play]');const detail=module.querySelector('.pipeline-detail');
 function render(){
  module.dataset.step=String(step);module.classList.toggle('is-playing',playing);
  playButton.textContent=playing?'Pause walkthrough':'Play walkthrough';playButton.setAttribute('aria-pressed',String(playing));
  detail.setAttribute('aria-live',playing?'off':'polite');detail.textContent=pipelineNotes[step];
  module.querySelectorAll('[data-pipeline]').forEach(panel=>panel.classList.toggle('lit',Number(panel.dataset.pipeline)===step));
  module.querySelectorAll('[data-step-select]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.stepSelect)===step)));
 }
 playButton.addEventListener('click',()=>{playing=!playing;render();});
 module.querySelectorAll('[data-step-select]').forEach(button=>button.addEventListener('click',()=>{step=Number(button.dataset.stepSelect);playing=false;render();}));
 reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches){playing=false;render();}});
 setInterval(()=>{const rect=module.getBoundingClientRect();if(playing&&!document.hidden&&rect.height>0&&rect.top<window.innerHeight&&rect.bottom>0){step=(step+1)%4;render();}},3500);
 render();
});
document.querySelectorAll('[data-photo-filter]').forEach(button=>button.addEventListener('click',()=>{
 const category=button.dataset.photoFilter;let count=0;
 document.querySelectorAll('[data-photo-category]').forEach(card=>{card.hidden=category!=='all'&&card.dataset.photoCategory!==category;if(!card.hidden)count++;});
 document.querySelectorAll('[data-photo-filter]').forEach(tab=>{const selected=tab===button;tab.classList.toggle('active',selected);tab.setAttribute('aria-pressed',String(selected));});
 document.querySelector('.diary-count').textContent=count+' PHOTOS';
}));
