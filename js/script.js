

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