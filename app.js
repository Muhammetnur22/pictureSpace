
// INIT
let filterInput = document.getElementById('filterInput');
filterInput.addEventListener('change', getSearchedImages);
const popUp = document.querySelector('.pop-up-wrapper');
getPhotos()

function loading(isLoading = true){
    if(!isLoading){
        document.querySelector('.loading-block').style.display = 'none'
    }
    else{
        document.querySelector('.loading-block').style.display = 'flex'
    }
}


function getPhotos() {
    fetch("https://pixabay.com/api/?key=20820625-bb1b47f1d7255b5b2f6254db9")
        .then(resp => {
            return resp.json()
        })
        .then(data => {
            renderImages(data.hits);
            loading(false)
        })
        
}

function getSearchedImages(){
    
    const output = document.getElementById('search-result');
    output.innerHTML = '<h2>' + filterInput.value +'</h2>'
    loading(true)

    const searchValue = document.querySelector('input').value;
    fetch(`https://pixabay.com/api/?key=20820625-bb1b47f1d7255b5b2f6254db9&q=${searchValue}`)
        .then(resp => {
            return resp.json()
        })
        .then(data => {
            renderImages(data.hits);
            loading(false)
        })
        .catch((err) => console.error(err))
}

function renderImages(data){

    let html = '';
    const imageArray = data;

    imageArray.forEach(image => {
        const tags = image.tags.split(',');
        html += `
        <div class="card">
            <div class="img-wrapper">
                <img src=${image.webformatURL} alt="">
            </div>
            <p>${image.user}</p>
            ${tags.map((tag) => {
                return `<span >#${tag}</span>`
            })}
        </div>
        `;
    });
    
    document.querySelector('.cards').innerHTML = html
    getCards()
}

function getCards(){
    const cards = document.querySelectorAll('.card');
    let cardArray = cards;

    if(cardArray.length > 0){
        cardArray.forEach((card) => {
            card.children[0].addEventListener('click', (e) => {
                popUpImage(e.target.src)
            })
        })
    }
}
function popUpImage(src){   
    // remove scroll
    document.body.style.overflow = 'hidden';
    // get src then create img tag inside popup block
    popUp.innerHTML = `<div class="pop-up"><img class="img" src="${src }"></div>`;
    // after creating popup block display it
    popUp.style.display = 'block';
}

popUp.addEventListener('click', (e) => {
    // get class names of popup elemts
    const className = e.target.className;

    if(className !== 'img'){
        popUp.style.display = 'none';
        document.body.style.overflow = 'unset'
    }
})