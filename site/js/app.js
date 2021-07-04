const pages = document.querySelectorAll('.page');
const navs = document.querySelectorAll('.navbar-item');
const seedMenu = document.querySelectorAll('.seedMenu');
const demoContainer = document.querySelector('#demoContainer');
const demoBlurb = document.querySelector('#demo-blurb');
const links = [];
const sketchWidths = {
  block           : '540px',
  loaf            : '540px',
  beacon          : '540px',
  pentadecathalon : '330px',
  glider          : '540px',
  lwss            : '720px'
};

function toggleDemoBlurb() {
  if (demoContainer.children.length) {
    demoContainer.children[0].remove();
    demoBlurb.style.display = 'block';
  }
}

function loadDemo(name) {
  const frame = document.createElement('iframe');
  frame.setAttribute('scrolling', 'no');
  frame.setAttribute('frameborder', '0');
  frame.setAttribute('src', `../../sketches/html/${name}.html`);
  if (demoBlurb.style.display !== 'none') demoBlurb.style.display = 'none';
  if (demoContainer.children.length) demoContainer.children[0].remove();
  demoContainer.style.width = sketchWidths[name];
  demoContainer.appendChild(frame);
}

function showPage(link) {
  links.forEach((link) => {
    link.page.style.display = 'none';
  });
  link.page.style.display = 'block';
}

for (let i = 0; i < pages.length; i++) {
  let link = { page: pages[i], nav: navs[i] };
  links.push(link);
}
links.forEach((link) => {
  link.page.style.display = 'none';
  link.nav.addEventListener('click', () => showPage(link));
});
seedMenu.forEach((seedChoice) =>
  seedChoice.addEventListener('click', (choice) => loadDemo(choice.target.id))
);


window.addEventListener('load', () => showPage(links[0]));