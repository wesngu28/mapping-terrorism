'use strict';

const navButtons = document.querySelectorAll('nav button');
navButtons.forEach(elem => elem.addEventListener('click', pages))

function pages() {
    const navButtons = document.querySelectorAll('nav button');
    navButtons.forEach(elem => elem.classList.remove('selected'));
    this.classList.add('selected');

    if(this.id === 'home') {
        const allOverview = document.querySelectorAll('section');
        allOverview.forEach((elem) => {
            if(elem.id === 'map-holder') {
                elem.classList.add('map-hidden')
            } else {
                elem.classList.add('hidden')
            }
        });
        const overview = document.getElementById('overview');
        overview.classList.remove('hidden');
    }
    if(this.id === 'gtd') {
        const allOverview = document.querySelectorAll('section');
        allOverview.forEach(elem => elem.classList.add('hidden'));
        const map = document.getElementById('map-holder');
        map.classList.remove('hidden');
        map.classList.remove('map-hidden');
    }
}