//Header toggle
let MenuBtn =document.getElementById('MenuBtn')

MenuBtn.addEventListener('click',function(e){
   document.querySelector('body').classList.toggle('mobile-nav-active');
   this.classList.toggle('fa-xmark')
})

//Typing Effect
let typed =new Typed('.auto-input',{
   strings: ['Web Designer!','Web Developer!','UI Designer!','Content Creater!'],
    typedSpeed: 10,
    backSpeed: 10,
    backDelay: 1500,
    loop:true,
})
