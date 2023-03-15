window.onload= function(){
    const element_inputs = document.querySelectorAll('.contact__input');

    const contact_button = document.querySelector('[data-type="submit"]');

    function activateButton(){
        const active__button = (()=> [...element_inputs].every(input => input.checkValidity() === true))(); // verifica si los campos son validos;
        if(!active__button){
            contact_button.setAttribute('disabled','');
        }else{
            contact_button.removeAttribute('disabled');
        }
    }

    activateButton(); // valida si activar boton o no

    element_inputs.forEach(
        (input)=>{
            input.addEventListener("blur",(event)=>{SelectionInput(event.target)});
        }
    )

    function SelectionInput(input){
        let type_input = input.dataset?.type;
        let input_parent = input.parentNode;
        let input_alert = input_parent.querySelector('.contact__alert');

        if(custom_validation[type_input]){
            custom_validation[type_input](input);
        }

        if(input.validity.valid){
            input.classList.remove('contact__input--invalid');
            input_alert.innerHTML=showErrorMessage(input,type_input);
            input_alert.classList.remove('contact__alert--active');
            activateButton();
        }else{
            input.classList.add('contact__input--invalid');
            input.parentElement.querySelector('.contact__alert').innerHTML=showErrorMessage(input,type_input);
            input_alert.classList.add('contact__alert--active');
            activateButton();
        }
    }

    const messagesError = {
        name:{
            valueMissing: "El campo Nombre no puede estar vacio",
            patternMismatch:"Se admiten solo letras entre 3 y 50 caracteres máximo"
        },
        email:{
            valueMissing: "El campo Correo no puede estar vacio",
            typeMismatch: "El correo no es valido",
        },
        subject:{
            valueMissing: "El campo Asunto no puede estar vacio",
            patternMismatch:"Se permiten de 3 a 50 caracteres maximo"
        },
        message:{
            valueMissing: "Escribe un breve mensaje",
            customError:"Se permiten de 3 a 300 caracteres maximo",
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

    const custom_validation = {
        message: (input)=>{patternMatch(input)},
    }

    function patternMatch(input){
        let pattern = /^(?=\w[a-zA-Z]).{5,20}$/ig;
        let input_value = input.value;
        let message_error = pattern.test(input_value)?"":"Se adminten maximo 300 caracteres"; 
        input.setCustomValidity(message_error);
    }
}