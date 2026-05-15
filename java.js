let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
let usuario = JSON.parse(sessionStorage.getItem('usuario')) || null;

document.addEventListener('DOMContentLoaded', () => {
    actualizarInterfaz();
    actualizarSesionUI();
});

//F(x) que lee el producto que introduce el usuario
function agregarDesdeInput() {
    const inputNombre =document.getElementById('input-nombre');
    const inputPrecio =document.getElementById('input-precio');
    const nombre =inputNombre.value.trim();
    const precio= parseFloat(inputPrecio.value);

    // Validación: no añadir si están vacíos o el precio no es un número
    if (!nombre || isNaN(precio) || precio <= 0) {
        alert('Introduce un nombre y un precio válido.');
        return;
    }

    agregarCarrito(nombre, precio);
    inputNombre.value = '';
    inputPrecio.value = '';
}

//F(x) que agrega productos al carrito
function agregarCarrito(nombre, precio) {
    const producto = {
        nombre: nombre,
        precio: precio
    };

    carrito.push(producto);

    sessionStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarInterfaz();
}

//f(x) Que actualiza la interfaz
function actualizarInterfaz() {
    const lista = document.getElementById('lista-carrito');
    const contador = document.getElementById('contador-carrito');
    const totalElemento = document.getElementById('total-precio');
    
    lista.innerHTML = "";
    let total = 0;

    carrito.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - ${item.precio}€`;
        lista.appendChild(li);
        total += item.precio;
    });
const envio = total === 0 ? 0 : total >= 50 ? 0 : 3.99;
const totalConEnvio = total + envio;

const envioElemento = document.getElementById('coste-envio');
const totalFinalElemento = document.getElementById('total-con-envio');
if (envioElemento)    envioElemento.textContent = envio === 0 ? 'GRATIS' : envio.toFixed(2) + '€';
if (totalFinalElemento) totalFinalElemento.textContent = totalConEnvio.toFixed(2);
    if(contador) contador.textContent = carrito.length;
    if(totalElemento) totalElemento.textContent = total.toFixed(2);
}

//F(x) para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    sessionStorage.removeItem('carrito');
    actualizarInterfaz();
}
function iniciarSesion(nombre, email) {
    usuario = { nombre, email, fechaLogin: new Date().toISOString() };
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
    actualizarSesionUI();
}

function cerrarSesion() {
    usuario = null;
    sessionStorage.removeItem('usuario');
    actualizarSesionUI();
}

//Actualiza el icono de perfil y el texto según si hay sesión activa.
function actualizarSesionUI() {
    const btnSesion = document.getElementById('btn-sesion');
    if (!btnSesion) return;

    if (usuario) {
        btnSesion.textContent = `👤 ${usuario.nombre}`;
        btnSesion.title = `Sesión iniciada: ${usuario.email}`;
        btnSesion.onclick = cerrarSesion;
    } else {
        btnSesion.textContent = '👤 Acceder';
        btnSesion.onclick = abrirModalSesion;
    }
}

function abrirModalSesion() {
    const nombre = prompt('Tu nombre:');
    const email  = prompt('Tu email:');
    if (nombre && email) {
        iniciarSesion(nombre.trim(), email.trim());
        alert(`¡Bienvenida, ${nombre}! Tu sesión se mantendrá activa mientras navegas.`);
    }
}