document.addEventListener('DOMContentLoaded', () => {
    // Lógica del Menú y Modo Claro/Oscuro
    const modeToggle = document.getElementById('mode-toggle');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;

    const savedMode = localStorage.getItem('theme-mode');
    if (savedMode) {
        body.className = savedMode;
        modeToggle.textContent = savedMode === 'dark-mode' ? '🌙' : '☀️';
    } else {
        body.className = 'light-mode';
        modeToggle.textContent = '☀️';
    }

    modeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.className = 'dark-mode';
            modeToggle.textContent = '🌙';
            localStorage.setItem('theme-mode', 'dark-mode');
        } else {
            body.className = 'light-mode';
            modeToggle.textContent = '☀️';
            localStorage.setItem('theme-mode', 'light-mode');
        }
    });

    const dropdownParents = document.querySelectorAll('.has-submenu');

    function closeMenuOutside(event) {
        if (mobileMenu && !mobileMenu.contains(event.target) && mobileMenuToggle && !mobileMenuToggle.contains(event.target)) {
            mobileMenu.classList.remove('open');
            document.removeEventListener('click', closeMenuOutside);
            dropdownParents.forEach(item => item.classList.remove('active'));
        }
    }

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            mobileMenu.classList.toggle('open');
            if (mobileMenu.classList.contains('open')) {
                setTimeout(() => {
                    document.addEventListener('click', closeMenuOutside);
                }, 50);
            } else {
                document.removeEventListener('click', closeMenuOutside);
                dropdownParents.forEach(item => item.classList.remove('active'));
            }
        });
    }

    dropdownParents.forEach(item => {
        const toggle = item.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', (event) => {
                if (mobileMenu.classList.contains('open')) {
                    event.preventDefault();
                    event.stopPropagation();
                    item.classList.toggle('active');
                }
            });
        }
    });

    // Lógica específica para la página de equipo.html
    if (window.location.pathname.endsWith('/equipo/')) {
        initEquipoPage();
    }
});

function initEquipoPage() {
    // Lógica para mostrar/ocultar el formulario de añadir/editar
    const showFormButton = document.getElementById('show-add-form-button');
    const addFormSection = document.getElementById('add-practicante-section');
    const formulario = document.getElementById('practicante-form');
    
    // Asigna el evento de clic al botón "Añadir Practicante"
    if (showFormButton && addFormSection) {
        showFormButton.addEventListener('click', () => {
            addFormSection.classList.remove('hidden-form');
            addFormSection.scrollIntoView({ behavior: 'smooth' });
            // Esto prepara el formulario para una nueva creación
            if (formulario) {
                formulario.reset();
                document.getElementById('form-title').textContent = 'Añadir Practicante';
                document.getElementById('save-button').textContent = 'Guardar cambios';
                document.getElementById('practicante-id').value = '';
                document.getElementById('grado').disabled = false;
            }
        });
    }

    // Lógica para los select de Grado según la Disciplina
    
}
