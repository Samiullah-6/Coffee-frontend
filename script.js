document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Smooth scroll ---------- */
  document.querySelectorAll('.nav-link, .side-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.startsWith('#')) {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
        // also close the sidebar if a side link is clicked
        if (link.classList.contains('side-link')) closeSidebar();
      });
    }
  });

  /* ---------- Sidebar (left slide) ---------- */
  const sideMenu   = document.getElementById('sideMenu');
  const overlay    = document.getElementById('overlay');
  const openBtn    = document.getElementById('openSidebar');
  const closeBtn   = document.getElementById('closeSidebar');
  const sidebarIcon = document.getElementById('sidebarIcon'); // <- top-left icon

  function openSidebar(){
    sideMenu.classList.add('open');
    overlay.classList.add('show');
    sideMenu.setAttribute('aria-hidden','false');
  }
  function closeSidebar(){
    sideMenu.classList.remove('open');
    overlay.classList.remove('show');
    sideMenu.setAttribute('aria-hidden','true');
  }

  // Attach event listeners
  if (openBtn) openBtn.addEventListener('click', openSidebar);     // Menu link in header
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);  // X button inside sidebar
  if (sidebarIcon) sidebarIcon.addEventListener('click', openSidebar); // ☰ icon in top-left
  overlay.addEventListener('click', closeSidebar);

  // Close sidebar on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
  });

  // Expose close for smooth-scroll callback above
  window.closeSidebar = closeSidebar;

  /* ---------- Testimonials slider (auto + manual) ---------- */
  const track = document.getElementById('testimonialRow');
  const slides = Array.from(track.children);
  const prev = document.querySelector('.t-prev');
  const next = document.querySelector('.t-next');
  const dotsWrap = document.getElementById('tDots');

  let index = 0;
  const total = slides.length;

  // create dots
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', `Go to slide ${i+1}`);
    b.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(b);
  });

  function update(){
    track.style.transform = `translateX(-${index * 100}%)`;
    Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle('active', i === index));
  }
  function goTo(i){ index = (i + total) % total; update(); }
  function nextSlide(){ goTo(index + 1); }
  function prevSlide(){ goTo(index - 1); }

  if (next) next.addEventListener('click', nextSlide);
  if (prev) prev.addEventListener('click', prevSlide);

  // auto slide
  let timer = setInterval(nextSlide, 3000);

  // pause on hover
  const testimonialsSection = document.getElementById('testimonials');
  if (testimonialsSection){
    testimonialsSection.addEventListener('mouseenter', () => clearInterval(timer));
    testimonialsSection.addEventListener('mouseleave', () => { timer = setInterval(nextSlide, 4000); });
  }

  update(); // initial state
});
