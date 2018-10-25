let tick = false;
let headerContainer = document.getElementById("header-container");
let header = document.getElementById("site-header");


window.addEventListener('scroll', windowScroll);

function windowScroll(e) {

    if (!tick) {

        window.requestAnimationFrame(function () {
            setHeaderClass();
            tick = false;
        });

        tick = true;
    }
}

function setHeaderClass() {
    if (headerContainer) {
        if (window.pageYOffset > 500) {
            headerContainer.classList.remove('expanded');
        } else {
            headerContainer.classList.add('expanded');
        }
    } else {
        if (window.pageYOffset + window.innerHeight > document.body.getBoundingClientRect().height - 100) {
            header.classList.add('slide-up');
        } else {
            header.classList.remove('slide-up');
        }
    }
}
