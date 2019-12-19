let header = document.querySelector('header')
let article = document.querySelector('article');
let dogsMessage;
let breedNameSaver;                                               // saves the name of the breed when clicking on the menu
// When clicking on the menu then the page should change itself according to menu
header.addEventListener('click', function(e){
  if(e.target.textContent === "Go Back"){
    window.location = "";
    header.innerHTML = "";
    getDogsNames();
    getDogPics('https://dog.ceo/api/breeds/image/random/3');
    breedNameSaver = "";
  }
  else if (e.target.className === 'subBreed') {
    header.innerHTML = "";
    window.location.hash = breedNameSaver + '/' + e.target.textContent;
    renderMenu("Go Back")
    getDogPics('https://dog.ceo/api/breed/' + breedNameSaver + '/' + e.target.textContent + '/images/random/3');
  }
  else if(e.target.className === ""){
  header.innerHTML = "";
  breedNameSaver = e.target.textContent;
  window.location.hash = e.target.textContent;
  getDogBreed(e.target.textContent)
  getDogPics('https://dog.ceo/api/breed/' + e.target.textContent + '/images/random/3');
}
})
// The page  will change itself according to the fragment identifier
window.addEventListener('load', function(e){
  getDogsNames();
  if(window.location.hash !== '' ){
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function(){
      let data = JSON.parse(this.responseText);
      dogsMessage = data.message;
      console.log(dogsMessage)
      if(dogsMessage.hasOwnProperty(window.location.hash.split('#')[1])){
      let removeHash = window.location.hash.split('#')[1]
      getDogPics('https://dog.ceo/api/breed/' + removeHash + '/images/random/3');
      getDogBreed(removeHash)
    }

    })
    xhr.open('GET', 'https://dog.ceo/api/breeds/list/all');
    xhr.send();

  }else{
    getDogPics('https://dog.ceo/api/breeds/image/random/3');
  }
})
// renders the menu. Giving us the option to click on different breeds of dogs or sub breed of dogs
function renderMenu(name,breed){
  let newTextElement = document.createElement('div');
  newTextElement.style.width = "110px";
  newTextElement.style.height = "40px";
  newTextElement.style.color = "white";
  newTextElement.style.cursor = "pointer";
  newTextElement.className = breed;
  newTextElement.textContent = name;
  header.appendChild(newTextElement);
}
// Gets data from the API where the names of different dog breeds or sub breeds are acquired
function getDogsNames(){
let xhr = new XMLHttpRequest();
xhr.addEventListener('load', function(e){
  if(this.status === 200){
  let dogs = JSON.parse(this.responseText);
  dogsMessage = dogs.message;
  let dogNames = Object.keys(dogsMessage)
  for(dog of dogNames){
    renderMenu(dog,"");
  }
}else{
  alert('oops')
}
})
xhr.open('GET', 'https://dog.ceo/api/breeds/list/all');
xhr.send();
}
//Gets images of different dog breeds or sub breeds from the API
 function getDogPics(breedName){
   article.innerHTML = "";
   let xhr = new XMLHttpRequest();
   xhr.addEventListener('load', function(e){
     e.stopPropagation();
     if(this.status === 200){
      let dogs = JSON.parse(this.responseText);
      let dogPics = dogs.message;
      for (dog of dogPics) {
      let span = document.createElement('span');
      let dogText = dog.split('/');
      let p = document.createElement('p');
      p.style.width = '200px';
      p.textContent = dogText[4];
      let img = document.createElement('img');
      img.src = dog
      img.style.width = "200px";
      img.style.height = "200px";
      span.appendChild(img);
      span.appendChild(p)
      article.appendChild(span);
    }
    let button = document.createElement('button');
    button.textContent = "reload images";
    article.appendChild(button)
    button.addEventListener('click',function(){
      getDogPics(breedName);
    })
   }else{
     alert('oops')
   }
   })
   xhr.open('GET', breedName);
   xhr.send();
 }
// renders the menu for sub breed dogs and give them the className "SubBreed". If the breed of dogs
//has no sub breed then only the menu "Go Back will be rendered"
function getDogBreed(nameOfDog){
  header.innerHTML ="";
  console.log(dogsMessage);
  if(dogsMessage[nameOfDog].length !== 0){
    renderMenu("Go Back");
    for (dog of dogsMessage[nameOfDog]) {
      renderMenu(dog,'subBreed');
    }
  }else{
    renderMenu("Go Back", "");
  }
}
