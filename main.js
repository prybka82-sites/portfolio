import './scripts/sendMail.js';

//navbar stickiness
let navbar = document.querySelector('nav');

let navbar_offset = navbar.offsetTop;

window.onscroll = () => {
    if (window.pageYOffset >= navbar_offset) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
}

//right column correction: 
//right column width can't be lower than a specific value
//if it is, columns must be removed 

let min_width = 917;
let cols = document.querySelectorAll('.column');

function columnResizer() {
    let width = document.querySelector('.row').offsetWidth;

    if (width < min_width) {
        cols.forEach((item) => {
            item.classList.remove('column');
            item.classList.add('no-column');
        });
    } else {
        cols.forEach((item) => {
            item.classList.remove('no-column');
            item.classList.add('column');
        });
    };
}

window.onresize = () => {
    columnResizer();
};

window.onload = () => {
    columnResizer();
}




