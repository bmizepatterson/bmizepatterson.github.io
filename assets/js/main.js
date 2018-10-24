let tick = false;
let header = document.getElementById("header-container");

function setHeaderClass(scroll_pos) {
    if (scroll_pos > 500) {
        header.classList.remove('expanded');
    } else {
        header.classList.add('expanded');
    }
}

window.addEventListener('scroll', function(e) {

    if (!tick && header) {

        window.requestAnimationFrame(function() {
            setHeaderClass(window.scrollY);
            tick = false;
        });

        tick = true;

    }

});
