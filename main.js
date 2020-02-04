var from_input = document.getElementById('fromInput');
var from_select = document.getElementById('fromSelect');
var to_input = document.getElementById('toInput');
var to_select = document.getElementById('toSelect');
var rate_h3 = document.getElementById('rate');
var homeLink = document.getElementById('homeTag');
var infoLink = document.getElementById('infoTag');
var info_div = document.getElementById('info');
var home_div = document.getElementById('home');


from_input.addEventListener('input', convert);
to_input.addEventListener('input', convert);
from_select.addEventListener('change', convert);
to_select.addEventListener('change', convert);

function convert() {

    const from_select_val = from_select.value;
    const to_select_val = to_select.value;

    var url = `https://api.exchangerate-api.com/v4/latest/${from_select_val}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            const rate = data.rates[to_select_val];
            to_input.value = (from_input.value * rate).toFixed(2);

            if (from_select_val != 'from..' && to_select_val != 'to..') {

                rate_h3.innerHTML = `1 ${from_select_val} = ${rate} ${to_select_val}`;
                document.getElementById('select_option1').remove();
                document.getElementById('select_option2').remove();

            } else if (from_input.value < 0) {

                alert('Please enter a number greater than zero.');
                window.location.reload();

            } else {
                return null;
            }

        })
        .catch(error => console.log(error))

}


let showHome = () => {

    homeLink.classList.add('active');
    infoLink.classList.remove('active');

    home_div.classList.remove('d-none');

    info_div.classList.remove('d-block');
    info_div.classList.add('d-none');

}

let showInfo = () => {

    infoLink.classList.add('active');
    homeLink.classList.remove('active');

    info_div.classList.add('d-block');
    home_div.classList.add('d-none');

}