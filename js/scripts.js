//const tiempo = Date.now();
//const hoy = new Date(tiempo);
//document.getElementById("fecha").innerHTML = hoy.toLocaleDateString() + ' - ' + hoy.toTimeString();

document.getElementById("valor").setAttribute('style', 'color: orange');
        document.getElementById("valor").innerHTML = 'Insuficiente '+document.getElementById("evalua").value;
document.getElementById("evalua").addEventListener('change', () => {
    if (document.getElementById("evalua").value <= 3) {
        document.getElementById("valor").setAttribute('style', 'color: red');
        document.getElementById("valor").innerHTML = 'Muy Deficiente '+document.getElementById("evalua").value;    
    }
    if (parseInt(document.getElementById("evalua").value) == 4 || document.getElementById("evalua").value == 5) {
        document.getElementById("valor").setAttribute('style', 'color: orange');
        document.getElementById("valor").innerHTML = 'Insuficiente '+document.getElementById("evalua").value;  
    } 
    if (document.getElementById("evalua").value == 6) {
        document.getElementById("valor").setAttribute('style', 'color: #e5be01');
        document.getElementById("valor").innerHTML = 'Suficiente '+document.getElementById("evalua").value;;  
    }
    if (document.getElementById("evalua").value == 7) {
        document.getElementById("valor").setAttribute('style', 'color: blue');
        document.getElementById("valor").innerHTML = 'Bien '+document.getElementById("evalua").value;;  
    }
    if (document.getElementById("evalua").value == 8) {
        document.getElementById("valor").setAttribute('style', 'color: green');
        document.getElementById("valor").innerHTML = 'Notable '+document.getElementById("evalua").value;;  
    }
    if (document.getElementById("evalua").value > 8) {
        document.getElementById("valor").setAttribute('style', 'color: darkgreen');
        document.getElementById("valor").innerHTML = 'Sobresaliente '+document.getElementById("evalua").value;; 
    }
});

function mensaje() {
  document.getElementById("voto").innerHTML = "Muchas Gracias por su evaluación :)"  
}

let formulario = document.getElementById('contact-form');
let inputs = document.querySelectorAll('#contact-form input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÃ€-Ã¿\s]{4,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	nombre: false,
	correo: false,
	phone: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario');
		break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
		break;
		case "password2":
			validarPassword2();
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "phone":
			validarCampo(expresiones.phone, e.target, 'phone');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('form-group-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('form-group-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('icon-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('icon-circle-cross');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('form-group-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('form-group-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('icon-circle-cross');
		document.querySelector(`#grupo__${campo} i`).classList.remove('icon-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('icon-circle-cross');
		document.querySelector(`#grupo__password2 i`).classList.remove('icon-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['password'] = false;
	} else {
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('icon-circle-cross');
		document.querySelector(`#grupo__password2 i`).classList.add('icon-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['password'] = true;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', e => {

	/* const terminos = document.getElementById('terminos'); */

	if(campos.nombre && campos.correo && campos.phone) {
		
		document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje');
		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');

		let datos = new FormData(formulario);

		let peticion = {
			method: 'POST',
			body: datos
		}

		fetch('contacto.php', peticion)
		.then(respuesta => respuesta.json())
		.then(respuesta => {

		}).catch(error => console.log('error', error));
		
		formulario.reset();
		
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 3000);

		document.querySelectorAll('.form-group-correcto').forEach((icono) => {
			icono.classList.remove('form-group-correcto');
		});
	} else {
		e.preventDefault();
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});