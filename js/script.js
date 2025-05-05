document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                navMenu.classList.remove('active');
            }
        });
    });

    animarElementosVisibles();
    window.addEventListener('scroll', animarElementosVisibles);

    configurarLightbox();

    const textoBienvenida = document.querySelector('header h1');
    if (textoBienvenida) {
        animarTextoEscritura(textoBienvenida);
    }

    const secciones = document.querySelectorAll('section');
    secciones.forEach(seccion => {
        seccion.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        seccion.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    const formulario = document.querySelector('form');
    if (formulario) {
        configurarValidacionInteractiva(formulario);
    }

    const textarea = document.querySelector('textarea');
    if (textarea) {
        crearContadorCaracteres(textarea);
    }

    crearSelectorTema();
});

function animarElementosVisibles() {
    const elementos = document.querySelectorAll('.animar-entrada');
    
    elementos.forEach(elemento => {
        const posicionElemento = elemento.getBoundingClientRect().top;
        const alturaVentana = window.innerHeight;
        
        if (posicionElemento < alturaVentana - 100) {
            elemento.classList.add('visible');
        }
    });
}

function prepararElementosAnimados() {
    const secciones = document.querySelectorAll('section');
    secciones.forEach((seccion, index) => {
        seccion.classList.add('animar-entrada');
        seccion.style.transitionDelay = `${index * 0.2}s`;
    });
}

function configurarLightbox() {
    const galeria = document.querySelector('.galeria');
    
    if (!galeria) return;
    
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    document.body.appendChild(lightbox);
    
    lightbox.style.display = 'none';
    lightbox.style.position = 'fixed';
    lightbox.style.top = '0';
    lightbox.style.left = '0';
    lightbox.style.width = '100%';
    lightbox.style.height = '100%';
    lightbox.style.backgroundColor = 'rgba(0,0,0,0.9)';
    lightbox.style.zIndex = '1000'; 
    lightbox.style.display = 'none'; 
    lightbox.style.opacity = '0'; 
    lightbox.style.transition = 'opacity 0.3s ease'; 
    
    const imgLightbox = document.createElement('img');
    imgLightbox.style.maxWidth = '90%';
    imgLightbox.style.maxHeight = '90%';
    imgLightbox.style.objectFit = 'contain';
    imgLightbox.style.transition = 'transform 0.3s ease';
    lightbox.appendChild(imgLightbox);
    
    lightbox.style.display = 'flex';
    lightbox.style.justifyContent = 'center';
    lightbox.style.alignItems = 'center';
    
    lightbox.style.display = 'none';
    
    const imagenes = galeria.querySelectorAll('img');
    imagenes.forEach(img => {
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', function() {
            imgLightbox.src = this.src;
            lightbox.style.display = 'flex';
            
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);
            
            document.body.style.overflow = 'hidden'; 
        });
    });
    
    lightbox.addEventListener('click', function() {
        this.style.opacity = '0';
        
        setTimeout(() => {
            this.style.display = 'none';
            document.body.style.overflow = 'auto'; 
        }, 300);
    });
    
}

function animarTextoEscritura(elemento) {
    const texto = elemento.textContent;
    elemento.textContent = '';
    elemento.style.borderRight = '0.15em solid var(--color-primario)';
    elemento.style.animation = 'blink-caret .75s step-end infinite';
    
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes blink-caret {
            from, to { border-color: transparent }
            50% { border-color: var(--color-primario) }
        }
    `;
    document.head.appendChild(style);
    
    let i = 0;
    const escribir = setInterval(() => {
        if (i < texto.length) {
            elemento.textContent += texto.charAt(i);
            i++;
        } else {
            clearInterval(escribir);
            setTimeout(() => {
                elemento.style.borderRight = 'none';
            }, 1000);
        }
    }, 100);
}

function configurarValidacionInteractiva(formulario) {
    const inputs = formulario.querySelectorAll('input[type="text"], input[type="email"], textarea');
    
    inputs.forEach(input => {

        const mensajeValidacion = document.createElement('span');
        mensajeValidacion.className = 'validacion-mensaje';
        mensajeValidacion.style.color = 'var(--color-primario-oscuro)';
        mensajeValidacion.style.fontSize = '0.8em';
        mensajeValidacion.style.marginTop = '5px';
        mensajeValidacion.style.display = 'none';
        input.parentNode.appendChild(mensajeValidacion);
        
        
        input.addEventListener('input', function() {
            validarCampo(this, mensajeValidacion);
        });
        
        
        input.addEventListener('blur', function() {
            validarCampo(this, mensajeValidacion);
        });
    });
    
    
    formulario.addEventListener('submit', function(e) {
        let formValido = true;
        
        inputs.forEach(input => {
            const mensajeValidacion = input.parentNode.querySelector('.validacion-mensaje');
            if (!validarCampo(input, mensajeValidacion)) {
                formValido = false;
            }
        });
        
        if (!formValido) {
            e.preventDefault();
        } else {
            
            mostrarNotificacion('¡Formulario enviado con éxito!', 'success');
            setTimeout(() => {
                formulario.reset();
            }, 2000);
            e.preventDefault(); 
        }
    });
}

function validarCampo(campo, mensajeElemento) {
    let valido = true;
    let mensaje = '';
    
    if (campo.value.trim() === '') {
        valido = false;
        mensaje = 'Este campo es obligatorio';
    } 
    
    else if (campo.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campo.value)) {
        valido = false;
        mensaje = 'Por favor, ingresa un correo electrónico válido';
    }
    
    if (!valido) {
        campo.style.borderColor = '#e74c3c';
        mensajeElemento.style.display = 'block';
        mensajeElemento.textContent = mensaje;
    } else {
        campo.style.borderColor = '#2ecc71';
        mensajeElemento.style.display = 'none';
    }
    
    return valido;
}


function crearContadorCaracteres(textarea) {
    const contador = document.createElement('div');
    contador.className = 'contador-caracteres';
    contador.style.textAlign = 'right';
    contador.style.fontSize = '0.8em';
    contador.style.color = 'var(--color-gris-oscuro)';
    contador.style.marginTop = '5px';
    
    textarea.parentNode.appendChild(contador);
    
    function actualizarContador() {
        const caracteres = textarea.value.length;
        contador.textContent = `${caracteres} caracteres`;
        
        if (caracteres > 200) {
            contador.style.color = 'var(--color-primario)';
        } else {
            contador.style.color = 'var(--color-gris-oscuro)';
        }
    }
    
    actualizarContador();
    textarea.addEventListener('input', actualizarContador);
}

function crearSelectorTema() {
    
    const selectorTema = document.createElement('div');
    selectorTema.className = 'selector-tema';
    selectorTema.innerHTML = '<i class="fa-solid fa-moon"></i>';
    selectorTema.style.position = 'fixed';
    selectorTema.style.top = '20px';
    selectorTema.style.right = '20px';
    selectorTema.style.backgroundColor = 'var(--color-primario)';
    selectorTema.style.color = 'white';
    selectorTema.style.borderRadius = '50%';
    selectorTema.style.width = '40px';
    selectorTema.style.height = '40px';
    selectorTema.style.display = 'flex';
    selectorTema.style.justifyContent = 'center';
    selectorTema.style.alignItems = 'center';
    selectorTema.style.cursor = 'pointer';
    selectorTema.style.zIndex = '99';
    selectorTema.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    
    document.body.appendChild(selectorTema);
    
    
    const temaOscuro = localStorage.getItem('temaOscuro') === 'true';
    if (temaOscuro) {
        document.body.classList.add('tema-oscuro');
        selectorTema.innerHTML = '<i class="fa-solid fa-sun"></i>';
        aplicarTemaOscuro();
    }
    
    selectorTema.addEventListener('click', function() {
        document.body.classList.toggle('tema-oscuro');
        
        if (document.body.classList.contains('tema-oscuro')) {
            selectorTema.innerHTML = '<i class="fa-solid fa-sun"></i>';
            localStorage.setItem('temaOscuro', 'true');
            aplicarTemaOscuro();
        } else {
            selectorTema.innerHTML = '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem('temaOscuro', 'false');
            aplicarTemaClaro();
        }
    });
}

function aplicarTemaOscuro() {
    document.documentElement.style.setProperty('--color-blanco', '#121212');
    document.documentElement.style.setProperty('--color-negro', '#f0f0f0');
    document.documentElement.style.setProperty('--color-gris-claro', '#2a2a2a');
    document.documentElement.style.setProperty('--color-gris-oscuro', '#e0e0e0');
    document.documentElement.style.setProperty('--color-primario-claro', '#2a3f5c');
}

function aplicarTemaClaro() {
    document.documentElement.style.setProperty('--color-blanco', '#ffffff');
    document.documentElement.style.setProperty('--color-negro', '#111111');
    document.documentElement.style.setProperty('--color-gris-claro', '#f0f0f0');
    document.documentElement.style.setProperty('--color-gris-oscuro', '#333333');
    document.documentElement.style.setProperty('--color-primario-claro', '#98c1d9');
}

function mostrarNotificacion(mensaje, tipo = 'info') {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.textContent = mensaje;
    notificacion.style.position = 'fixed';
    notificacion.style.top = '20px';
    notificacion.style.left = '50%';
    notificacion.style.transform = 'translateX(-50%)';
    notificacion.style.padding = '12px 25px';
    notificacion.style.borderRadius = '5px';
    notificacion.style.zIndex = '1000';
    notificacion.style.opacity = '0';
    notificacion.style.transition = 'all 0.3s ease';
    
    switch(tipo) {
        case 'success':
            notificacion.style.backgroundColor = '#2ecc71';
            notificacion.style.color = 'white';
            break;
        case 'error':
            notificacion.style.backgroundColor = '#e74c3c';
            notificacion.style.color = 'white';
            break;
        default:
            notificacion.style.backgroundColor = 'var(--color-primario)';
            notificacion.style.color = 'white';
    }
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        notificacion.style.opacity = '0';
        setTimeout(() => {
            notificacion.remove();
        }, 300);
    }, 3000);
}

window.addEventListener('load', function() {
    prepararElementosAnimados();
    setTimeout(animarElementosVisibles, 300);
});
