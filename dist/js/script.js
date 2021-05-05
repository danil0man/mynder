let year = document.querySelector('#year');
let btn = document.querySelector('.navigation__submit');


btn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(year.value);
})

// get(`/:${year.value}/:${genre}`)
