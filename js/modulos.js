const footer=`  <div class="footer-container">
<div class="footer-logo">
    <i class="fa-solid fa-laptop-code"></i>
    <h2>Aylen Francisco</h2>
</div>

<div class="iconos-sociales">
    <span class="facebook">
        <i class="fa-brands fa-facebook-f"></i>
    </span>
    <span class="twitter">
        <i class="fa-brands fa-twitter"></i>
    </span>
    <span class="instagram">
        <i class="fa-brands fa-instagram"></i>
    </span>
</div>

<p>&copy; Aylen Francisco Medina 2025</p>
<p>Todos los derechos reservados</p>
</div>`;
const nav=` <div class="nav-container">
            <div class="logo">
                <i class="fa-solid fa-code"></i>
                <span>Aylen Francisco</span>
            </div>
            <div class="menu-toggle">
                <i class="fa-solid fa-bars"></i>
            </div>
            <div class="nav-menu">
                <ul class="nav-list">
                    <li class="nav-item">
                        <a href="index.html" class="nav-link"><i class="fa-solid fa-house"></i>Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a href="galería.html" class="nav-link"><i class="fa-solid fa-image"></i>Fotos</a>
                    </li>
                    <li class="nav-item">
                        <a href="contacto.html" class="nav-link"><i class="fa-solid fa-envelope"></i>Contacto</a>
                    </li>
                </ul>
            </div>
        </div>`
document.querySelector('nav').innerHTML=nav;
document.querySelector('footer').innerHTML=footer;