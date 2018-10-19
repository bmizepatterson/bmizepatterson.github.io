let tick = false;

function setHeaderClass(scroll_pos) {
    if (scroll_pos > 600) {
        document.getElementById("site-header").classList.add('collapsed');
    } else {
        document.getElementById("site-header").classList.remove('collapsed');
    }
}

window.addEventListener('scroll', function(e) {

    if (!tick) {

        window.requestAnimationFrame(function() {
            setHeaderClass(window.scrollY);
            tick = false;
        });

        tick = true;

    }

});
