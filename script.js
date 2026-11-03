/**
 * Lógica JavaScript para Clínica Veterinaria Huellitas Sanas
 * Inicialización de mapa interactivo en Herrera, Santo Domingo y validación de formularios.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar Mapa Leaflet centrado en Herrera, Santo Domingo, República Dominicana
    const map = L.map('map').setView([18.4716, -69.9752], 14);

    // Capa de mapa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Marcador indicando la veterinaria en Herrera, Santo Domingo
    const marker = L.marker([18.4716, -69.9752]).addTo(map);
    marker.bindPopup("<b>Clínica Veterinaria Huellitas Sanas</b><br>Herrera, Santo Domingo, R.D.").openPopup();

    // Validación de Formulario y Apertura de Correo
    const contactForm = document.getElementById('contactForm');
    const modalConfirmacionElement = document.getElementById('modalConfirmacion');
    const modalConfirmacion = new bootstrap.Modal(modalConfirmacionElement);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            event.stopPropagation();

            const nombreInput = document.getElementById('nombre');
            const emailInput = document.getElementById('email');
            const mensajeInput = document.getElementById('mensaje');

            const nombreVal = nombreInput.value.trim();
            const emailVal = emailInput.value.trim();
            const mensajeVal = mensajeInput.value.trim();

            let isValid = true;

            if (nombreVal === '') {
                nombreInput.classList.add('is-invalid');
                isValid = false;
            } else {
                nombreInput.classList.remove('is-invalid');
                nombreInput.classList.add('is-valid');
            }

            if (!emailRegex.test(emailVal)) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            } else {
                emailInput.classList.remove('is-invalid');
                emailInput.classList.add('is-valid');
            }

            if (mensajeVal === '') {
                mensajeInput.classList.add('is-invalid');
                isValid = false;
            } else {
                mensajeInput.classList.remove('is-invalid');
                mensajeInput.classList.add('is-valid');
            }

            if (isValid) {
                const destinatario = 'info@huellitassanas.com.do';
                const asunto = encodeURIComponent(`Consulta Veterinaria (Herrera, Santo Domingo) de ${nombreVal}`);
                const cuerpo = encodeURIComponent(`Hola Huellitas Sanas,\n\nMi nombre es: ${nombreVal}\nCorreo de contacto: ${emailVal}\n\nMensaje:\n${mensajeVal}`);

                const mailtoUrl = `mailto:${destinatario}?subject=${asunto}&body=${cuerpo}`;

                const handleBlur = () => {
                    modalConfirmacion.show();
                    window.removeEventListener('blur', handleBlur);
                };

                window.addEventListener('blur', handleBlur);
                window.location.href = mailtoUrl;

                setTimeout(() => {
                    modalConfirmacion.show();
                    window.removeEventListener('blur', handleBlur);
                }, 1500);

                contactForm.reset();
                nombreInput.classList.remove('is-valid');
                emailInput.classList.remove('is-valid');
                mensajeInput.classList.remove('is-valid');
            }
        });
    }
});