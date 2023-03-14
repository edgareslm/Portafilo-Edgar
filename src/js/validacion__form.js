window.onload= function(){
    const element_inputs = document.querySelectorAll(".contact__input");

    element_inputs.forEach(
        (input)=>{
            input.addEventListener("blur",(event)=>{SelectionInput(event.target)})
        }
    )

    function SelectionInput(input){
        let type_input = input.dataset?.type;
        let input_parent = input.parentNode;
        let input_alert = input_parent.querySelector(".contact__alert");
        if(input.validity.valid){
            input.classList.remove("contact__input--invalid");
            input_alert.innerHTML=showErrorMessage(input,type_input);
            input_alert.classList.remove("contact__alert--active");
        }else{
            input.classList.add("contact__input--invalid");
            input.parentElement.querySelector(".contact__alert").innerHTML=showErrorMessage(input,type_input);
            input_alert.classList.add("contact__alert--active");
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