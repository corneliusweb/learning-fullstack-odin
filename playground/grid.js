const btns = document.querySelector('.buttons');

btns.addEventListener('click', (event) => { 
   const target = event.target;
   if (target.textContent === '/') {
      console.log("divider clicked");
      
   }
})