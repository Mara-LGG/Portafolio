// Inicializar EmailJS
emailjs.init({
    publicKey: "IVNy0FBse4edQ2xXY"
});

document.getElementById('contacto-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío por defecto

    let isValid = true;

    // Referencias de campos y feedback
    const nombre = document.getElementById('nombre');
    const nombreFeedback = document.getElementById('nombre-feedback');

    const correo = document.getElementById('correo');
    const correoFeedback = document.getElementById('correo-feedback');

    const mensaje = document.getElementById('mensaje');
    const mensajeFeedback = document.getElementById('mensaje-feedback');

    const mensajeEstado = document.getElementById("mensajeEstado");

    // Limpiar estados de validación previa
    [nombre, correo, mensaje].forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');
    });

    // 1. Validar Nombre
    const nombreVal = nombre.value.trim();
    if (nombreVal === '') {
        nombreFeedback.textContent = 'El campo nombre no puede estar vacío.';
        nombre.classList.add('is-invalid');
        isValid = false;
    } else if (nombreVal.length < 3) {
        nombreFeedback.textContent = 'El nombre es muy corto (mínimo 3 letras).';
        nombre.classList.add('is-invalid');
        isValid = false;
    } else {
        nombre.classList.add('is-valid');
    }

    // 2. Validar Correo
    const correoVal = correo.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correoVal === '') {
        correoFeedback.textContent = 'El campo correo no puede estar vacío.';
        correo.classList.add('is-invalid');
        isValid = false;
    } else if (!emailRegex.test(correoVal)) {
        correoFeedback.textContent = 'Por favor ingresa un correo válido (ejemplo: email@gmail.com).';
        correo.classList.add('is-invalid');
        isValid = false;
    } else {
        correo.classList.add('is-valid');
    }

    // 3. Validar Mensaje
    const mensajeVal = mensaje.value.trim();
    if (mensajeVal === '') {
        mensajeFeedback.textContent = 'El campo mensaje no puede estar vacío.';
        mensaje.classList.add('is-invalid');
        isValid = false;
    } else {
        mensaje.classList.add('is-valid');
    }

    // Enviar directamente con EmailJS si las validaciones pasaron
    if (isValid) {
        mensajeEstado.innerHTML = `<p class="text-info">Enviando mensaje...</p>`;

        emailjs.sendForm(
            "service_9n1qp1k",
            "template_fwsytn7",
            this
        )
        .then(function () {
            mensajeEstado.innerHTML = `
                <p class="text-success">
                    ¡Mensaje enviado correctamente!
                </p>
            `;

            // Limpiar formulario y estilos de validación verde (is-valid)
            event.target.reset();
            [nombre, correo, mensaje].forEach(input => {
                input.classList.remove('is-valid');
            });
        })
        .catch(function (error) {
            console.error(error);
            mensajeEstado.innerHTML = `
                <p class="text-danger">
                    Ocurrió un error al enviar el mensaje.
                </p>
            `;
        });
    }
});