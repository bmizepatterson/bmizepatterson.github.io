let tick = false;
let header = document.getElementById("header-container");

if (header) {
    window.addEventListener('scroll', windowScroll);
}

function setHeaderClass(scroll_pos) {
    if (scroll_pos > 500) {
        header.classList.remove('expanded');
    } else {
        header.classList.add('expanded');
    }
}

function windowScroll(e) {

    if (!tick) {

        window.requestAnimationFrame(function() {
            setHeaderClass(window.pageYOffset);
            tick = false;
        });

        tick = true;
    }
}
