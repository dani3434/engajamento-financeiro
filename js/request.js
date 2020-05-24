
class ServicePI {

    constructor(){
        // variaveis locais
        this._loalIp = {};


        //metodos 
        this.check();

    }


     check(){
        let info = window.localStorage.getItem("localIP");
       
        if(info)
        {
            this._loalIp = JSON.parse(info);
            console.log("capturando storange gravado anteriormente...");
            console.log(this._loalIp)

        }
        else {

            this.requestInfoIp().then(request=>{
             request.json().then(dados => { 
               
                this._loalIp = dados;
                localStorage.setItem("localIP", JSON.stringify(dados));
                console.log("garvando storange ...");
          
               })
               
            })
            .catch(error =>{
               console.log(error)

            })
        }
    }

     
    requestInfoIp(){
       return fetch('http://ip-api.com/json/')
       
    }



    get getInfoLocal(){
        
        let info = this._localIp;
        return info
    }

}

// modal

const divModal = document.querySelector('.modal');
const pessoasNum = document.querySelector('.pessoas');

let i = 0;
function intervaloModal(){

    pessoasNum.innerHTML = 300 + i;

    function ativarModal(){
        divModal.classList.add('active');
      }
      
      function desativarModal(){
          divModal.classList.remove('active');
        }
      
      setTimeout(ativarModal,3000);
      
      setTimeout(desativarModal,1000 * 15);

      i++

}


setInterval(intervaloModal,1000 * 30)