let container = document.querySelector('.sub-section_container')
let left_button = document.querySelector('.left')
let right_button = document.querySelector('.right')
let section_container = document.querySelector('.section_container')
let left = 0;

function creatImage(){
   return new Promise((reserve,reject) =>{
      const url = 'https://jsonplaceholder.typicode.com/photos'
      const xhr = new XMLHttpRequest()
      xhr.open('GET',url)
      xhr.responseType = 'json'
      xhr.onload = () =>{
         if(xhr.status >= 400){
            reject(xhr.response)
         }else{
            reserve(xhr.response)
         }
      }
      xhr.onerror = () =>{
         reject(xhr.response)
      }
      xhr.send();
   })
}
creatImage()
.then(data =>{
   return new Promise ((reserve,reject)=>{
      let arr = []
      for(let i = 0;i <= 26; i++){
         arr.push(data[i].url)
      }
      reserve(arr)
   }).then(info =>{
      for(let i = 0; i < info.length; i++){
         let img = document.createElement('img')
         container.append(img)
         img.src = info[i]
         img.alt = i
         img.classList.add('img')
      }
   })
})
.catch(err =>{
   console.log(err)
})
function left_click(){
let imgs = document.querySelectorAll('.img')
     left = left - 600;
     if(left < -(imgs.length * 600 - 1800)){
        left = 0
     }
     container.style.left = + left + 'px' 
}
function right_click(){
let imgs = document.querySelectorAll('.img')
   left = left + 600;
   if(left > 0){
      left = - imgs.length * 600 + 1950;
   }
   container.style.left = + left + 'px' 
}


section_container.addEventListener('click', left_click) 
left_button.addEventListener('click', left_click)
right_button.addEventListener('click', right_click)
