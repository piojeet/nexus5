const menuBtn = document.querySelectorAll('.menu_btn');
const closeBtn = document.querySelectorAll('.close_btn');
const navMenu = document.querySelectorAll('.links_nav');

// Menu open
menuBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        navMenu.forEach(menu => {
            menu.classList.add("active");
        });
        document.body.classList.add("no-scroll"); // 🚫 Scroll disable
    });
});

// Menu close button
closeBtn.forEach(cbtn => {
    cbtn.addEventListener("click", (e) => {
        e.stopPropagation();
        navMenu.forEach(menu => {
            menu.classList.remove("active");
        });
        document.body.classList.remove("no-scroll"); // ✅ Scroll enable
    });
});

// Outside click -> close menu
document.addEventListener("click", (e) => {
    navMenu.forEach(menu => {
        if (menu.classList.contains("active") && !menu.contains(e.target)) {
            menu.classList.remove("active");
            document.body.classList.remove("no-scroll");
        }
    });
});



(function(){
    const cursor = document.getElementById('sat-cursor');
    if(!cursor) return;
  
    // disable on touch devices
    const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    if (isTouch) {
      cursor.classList.add('sat-disabled');
      return;
    }
  
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX, curY = mouseY;
    const ease = 0.18; // lower = smoother lag
  
    // update target coords on mouse move
    window.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // show immediately if hidden
      cursor.style.opacity = '1';
    });
  
    // optional: hide when leaving viewport
    window.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
    });
    window.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
    });
  
    // reduce size when hovering interactive elements
    const interactiveSelector = 'a, button, input, textarea, select, .clickable';
    function checkHover() {
      const el = document.elementFromPoint(mouseX, mouseY);
      if (!el) return;
      if (el.closest && el.closest(interactiveSelector)) {
        cursor.classList.add('sat-small');
      } else {
        cursor.classList.remove('sat-small');
      }
    }
  
    // animation loop
    function raf() {
      curX += (mouseX - curX) * ease;
      curY += (mouseY - curY) * ease;
      cursor.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
      checkHover();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  
    // OPTIONAL: function to enable/disable cursor dynamically
    window.customCursor = {
      disable() { cursor.classList.add('sat-disabled'); document.documentElement.style.cursor = ''; },
      enable() { cursor.classList.remove('sat-disabled'); document.documentElement.style.cursor = 'none'; }
    };
  })();