window.onload= function(){
    const element_inputs = document.querySelectorAll(".input");

    element_inputs.forEach(
        (input)=>{
            input.addEventListener("blur",(event)=>{SelectionInput(event.target)})
        }
    )

    function SelectionInput(input){
        let type_input = input.dataset?.type;
        let input_parent = input.parentNode;
        let input_alert = input_parent.querySelector(".input__alert");
        if(input.validity.valid){
            input_parent.classList.remove("input__container--invalid");
            input_alert.innerHTML=showErrorMessage(input,type_input);
            input_alert.classList.remove("input__alert--active");
        }else{
            input_parent.classList.add("input__container--invalid");
            input.parentElement.querySelector(".input__alert").innerHTML=showErrorMessage(input,type_input);
            input_alert.classList.add("input__alert--active");
        }
    }

    const messagesError = {
        name:{
            valueMissing: "El campo Nombre no puede estar vacio",
        },
        email:{
            valueMissing: "El campo Correo no puede estar vacio",
            typeMismatch: "El correo no es valido",
        },
        subject:{
            valueMissing: "El campo Asunto no puede estar vacio",
        },
    };

    function showErrorMessage(input,type_input){
        let object__valid = input.validity; // objeto con el tipo de validaciones;
        let mensaje = ""
        for (let error in object__valid){
            if(error != "valid"){     // excluimos el tipo de validacion valid;
                if(object__valid[error]){
                    // return mensaje = error;
                    return mensaje= messagesError[type_input][error];
                }
            }else{
                return mensaje = "";
            }
        }
    }

}