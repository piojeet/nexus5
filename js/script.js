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
