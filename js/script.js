
// Aqui vaio codigo do slider
function debounce(callback, delay) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
      timer = null;
    }, delay);
  };
}

class Slide{
  constructor(slide,wrapper){
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = {finalPosition:0,startX: 0,movement:0}
    this.activeClass = 'active';
  }
  
  trasition(active){
    this.slide.style.transition = active ? 'transform .3s': '';
  }

  mouveSlider(distX){
    this.dist.movePosition = distX;

    this.slide.style.transform = `translate3d(${distX}px,0,0)`;
  }

  updatePosition(clientX){
    this.dist.movement = (this.dist.startX - clientX) * 1.6;
    
    return this.dist.finalPosition - this.dist.movement;
  }

  onStart(event){
    let moveType;

    if(event.type === 'mousedown'){
       event.preventDefault();
       this.dist.startX = event.clientX
       moveType = "mousemove";
    }else{
      this.dist.startX = event.changedTouches[0].clientX;
      moveType = "touchmove"
    }
  
   this.wrapper.addEventListener(moveType,this.onMove)
   this.trasition(false)
  }
  
  onEnd(event){
   const movetype = (event.type === 'mouseup') ? 'mousemove' : 'touchmove';
   this.wrapper.removeEventListener(movetype,this.onMove)
   this.dist.finalPosition = this.dist.movePosition;
   this.trasition(true)
   this.changeSlideOnEnd();
  }
  
  // Mude para o rpoximo slider ao passar o mouse
  changeSlideOnEnd(){
    if(this.dist.movement > 120 && this.index.next !== undefined){
      this.activeNextSlider();
    }else if(this.dist.movement < -120 && this.index.prev !== undefined){
      this.activePrevSlider();
    }else{
      this.changeSlide(this.index.active)
    }
  }

  onMove(event){
   const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX;
   const finalPosition = this.updatePosition(pointerPosition)
   this.mouveSlider(finalPosition)
  }

  addSlideEvent(){
    this.wrapper.addEventListener('mousedown',this.onStart);
    this.wrapper.addEventListener('touchstart',this.onStart);
    this.wrapper.addEventListener('mouseup',this.onEnd);
    this.wrapper.addEventListener('touchend',this.onEnd);
  }
  
  // Calculo do posicionamento no centro
  slidePosition(slide){
    const margin =  (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }
  //Index da navegação do slider
  slidesIndexNav(index){
    const last = this.slideArray.length - 1;

    this.index ={
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1
    }
  }
  // ativar o slider anterior
  activePrevSlider(){
    if(this.index.prev !== undefined){
      this.changeSlide(this.index.prev)
    }
  }
  // Ativa o proximo slider
  activeNextSlider(){
    if(this.index.next !== undefined){
      this.changeSlide(this.index.next)
    }
  }

  // Mudar o slider
  changeSlide(index){
   const activeSlider = this.slideArray[index];
   this.mouveSlider(activeSlider.position);
   this.slidesIndexNav(index);

   this.dist.finalPosition = activeSlider.position;
   this.changeActiveClass();
  }
  // Mudar a classe ativo
  changeActiveClass(){
    this.slideArray.forEach((item) => item.element.classList.remove(this.activeClass))
    this.slideArray[this.index.active].element.classList.add(this.activeClass);
  }
  // Slide config
  slidesConfig(){
    this.slideArray = [...this.slide.children].map((element) =>{
      const position = this.slidePosition(element);
      return {position,element}
    });
  }
  
  // Mudar os valores quando der o resize
  onResize(){
    setTimeout(() =>{
      this.slidesConfig();
      this.changeSlide(this.index.active)
    },600)
   
  }
  addResizeEvent(){
   window.addEventListener('resize',this.onResize)
  }


  bindEvents(){
    this.onStart = this.onStart.bind(this)
    this.onMove = this.onMove.bind(this)
    this.onEnd = this.onEnd.bind(this)
    
    this.activePrevSlider = this.activePrevSlider.bind(this);
    this.activeNextSlider = this.activeNextSlider.bind(this)

    this.onResize = debounce(this.onResize.bind(this),200);
  }

  init(){
    this.bindEvents();
    this.trasition(true)
    this.addSlideEvent();
    this.slidesConfig();
    this.addResizeEvent();
    this.changeSlide(3)
    return this;
  }
}


class SlideNav extends Slide {

  addArrow(prev,next){
    this.prevElement = document.querySelector(prev);
    this.nextElement = document.querySelector(next)
    this.addArrowEvent();
  }

  addArrowEvent(){
    this.prevElement.addEventListener('click', this.activePrevSlider)
    this.nextElement.addEventListener('click',this.activeNextSlider)

  }

}

const slide = new SlideNav('.slider','.wrapper');

slide.init();
slide.addArrow('.prev','.next')





// Anima o scroll
function animacaoScroll(){

  const sections = document.querySelectorAll('[data-anime="scroll"]');


  if(sections.length){
      const windowMetade = window.innerHeight * 0.5;
      
      function animaScroll(){
        sections.forEach((section) =>{
          const topSect = section.getBoundingClientRect().top - windowMetade;
          if(topSect < 0){
            section.classList.add('ativo');
          }
        })
      }

      animaScroll();

      window.addEventListener('scroll',animaScroll);

  }
}

animacaoScroll()




// função para quando clicar fora do botão de menu
function outsideClick(element,events,callback){
  const html = document.documentElement;
  const fora = 'data-outside';

  if(!element.hasAttribute(fora)){
    events.forEach(userEvent =>{
      setTimeout(() =>{
        html.addEventListener(userEvent,clickFora);
      },)
    });
   
    element.setAttribute(fora,'')
  }

  function clickFora(event){
    if(!element.contains(event.target)){
     events.forEach(userEvent =>{
      html.removeEventListener(userEvent,clickFora); 
    }); 
     element.removeAttribute(fora) 
     callback();
    }
  }
}

const menuMobile = document.querySelector('[data-menu="button-mobile"]');
const listaMenu = document.querySelector('#menu');
const redeSociais = document.querySelector('.rede-sociais');
const eventos = ['click','touchstart'];

if(menuMobile){
    function openMenu(menu){
      listaMenu.classList.toggle('active');
      menuMobile.classList.toggle('active');
      redeSociais.classList.toggle('active');

      outsideClick(listaMenu,eventos, () =>{
        listaMenu.classList.remove('active');
        menuMobile.classList.remove('active');
      redeSociais.classList.remove('active');
      });
    }

    eventos.forEach((eventos) =>{
      menuMobile.addEventListener(eventos,openMenu);
    })
}