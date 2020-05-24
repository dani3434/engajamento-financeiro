
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
        
        let info = this._loalIp;
        return info
    }

}

