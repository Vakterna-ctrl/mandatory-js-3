let header = document.querySelector('header')
let article = document.querySelector('article');
let dogsMessage;
let breedNameSaver;
header.addEventListener('click', function(e){
  if(e.target.textContent === "Go Back"){
    header.innerHTML = "";
    getDogsNames();
    getDogPics('https://dog.ceo/api/breeds/image/random/3');
  }
  else if (e.target.className === 'subBreed') {
    header.innerHTML = "";
    window.location.hash = e.target.textContent;
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
window.addEventListener('load', function(e){
  if(window.location.hash !== ''){
    let removeHash = window.location.hash.split('#')[1]
       getDogPics('https://dog.ceo/api/breed/' + removeHash + '/images/random/3');
       getDogBreed(removeHash)

  }else{
    getDogsNames();
    getDogPics('https://dog.ceo/api/breeds/image/random/3');
  }
})

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

function getDogsNames(){
let xhr = new XMLHttpRequest();
xhr.addEventListener('load', function(e){
  e.stopPropagation();
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

function getDogBreed(nameOfDog){
  header.innerHTML ="";
  if(dogsMessage[nameOfDog].length !== 0){
    renderMenu("Go Back");
    for (dog of dogsMessage[nameOfDog]) {
      renderMenu(dog,'subBreed');
    }
  }else{
    renderMenu("Go Back", "");
  }
}
