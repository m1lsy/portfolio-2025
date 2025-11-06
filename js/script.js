(function(){
  // Create interactive dot grid
  function createDotGrid() {
    const grid = document.querySelector('.dot-grid');
    if (!grid) return;

    // Create dots
    const rows = 15;
    const cols = 20;
    for (let i = 0; i < rows * cols; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      grid.appendChild(dot);
    }

    // Interactive effect
    let timeout;
    grid.addEventListener('mousemove', (e) => {
      const rect = grid.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      clearTimeout(timeout);
      
      grid.querySelectorAll('.dot').forEach(dot => {
        const dotRect = dot.getBoundingClientRect();
        const dotX = dotRect.left - rect.left + dotRect.width/2;
        const dotY = dotRect.top - rect.top + dotRect.height/2;
        
        const distance = Math.hypot(x - dotX, y - dotY);
        if (distance < 60) {
          dot.classList.add('active');
          timeout = setTimeout(() => dot.classList.remove('active'), 300);
        }
      });
    });
  }

  // Card reveal animation
  function animateCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((c, i) => {
      c.style.opacity = '0';
      c.style.transform = 'translateY(8px)';
      setTimeout(()=>{
        c.style.transition = 'opacity .45s ease, transform .45s ease';
        c.style.opacity = '1';
        c.style.transform = 'translateY(0)';
      }, 120 * i);
    });
  }

  // Duplicate banner content for smooth infinite scroll
  function setupBanner() {
    const content = document.querySelector('.banner-content');
    if (content) {
      const clone = content.cloneNode(true);
      content.parentElement.appendChild(clone);
    }
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', function(){
    createDotGrid();
    animateCards();
    setupBanner();
  });
})();
