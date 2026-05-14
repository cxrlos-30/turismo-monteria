console.log("SCRIPT CARGADO CORRECTAMENTE");


let hotelSeleccionado = "";

async function cargarHoteles() {
  const { data } = await window._supabase
    .from('hoteles')
    .select('*');

  const lista = document.getElementById("lista-hoteles");
  if (!lista) return;

  lista.innerHTML = "";

const select = document.getElementById("hotelSeleccionado");

if(select){
  select.innerHTML = "<option>Selecciona un hotel</option>";
}

  data.forEach(hotel => {
    const card = document.createElement("div");
    card.className = "card";
    if(select){
  select.innerHTML += `
    <option value="${hotel.nombre}">
      ${hotel.nombre}
    </option>
  `;
}

card.innerHTML = `
  <img src="${hotel.imagen}" alt="${hotel.nombre}">
  <h3>${hotel.nombre}</h3>
`;
card.addEventListener("click", () => {
  abrirModalHotel(
    hotel.nombre,
    hotel.imagen,
    hotel.ubicacion,
    hotel.descripcion
  );
});

    lista.appendChild(card);
  });
}

async function cargarLugares() {
  const { data } = await window._supabase
    .from('lugares')
    .select('*');

  const lista = document.getElementById("lista-lugares");
  if (!lista) return;

  lista.innerHTML = "";

data.forEach(lugar => {

  const card = document.createElement("div");

  card.className = "card";


  card.innerHTML = `
    <img src="${lugar.imagen}" alt="${lugar.nombre}">
    <h3>${lugar.nombre}</h3>
  `;


  // CLICK EN LA CARD
 card.addEventListener("click", () => {
  abrirModal(
    lugar.nombre,
    lugar.imagen,
    lugar.ubicacion,
    lugar.descripcion
  );
});


  lista.appendChild(card);

});
}


async function cargarGuias() {
  const { data } = await window._supabase
    .from('guias')
    .select('*');

  const lista = document.getElementById("lista-guias");
  if (!lista) return;

  lista.innerHTML = "";

  data.forEach(guia => {
    const card = document.createElement("div");
    card.className = "card guia-card";

   card.innerHTML = `
  <img src="https://s3.ppllstatics.com/canarias7/www/multimedia/201704/14/media/cortadas/462076-1g_CSN462076_MG3928385--1248x702.jpg" alt="${guia.nombre}">
  
  <div class="card-content">
    <h3>${guia.nombre}</h3>
  </div>
`;

    card.onclick = () => mostrarGuia(guia);

    lista.appendChild(card);
  });
}
//lol

document.addEventListener("DOMContentLoaded", () => {
  cargarHoteles();
  cargarLugares();
  cargarGuias();
});
function mostrarFormulario(){
  document.getElementById("form-guia").classList.toggle("oculto");
}

async function registrarGuia(){

  alert("Botón funcionando");

  try {

    const nombre = document.getElementById("nombreGuia").value;
    const telefono = document.getElementById("telefonoGuia").value;
    const experiencia = document.getElementById("expGuia").value;
    const foto = "https://cdn-icons-png.flaticon.com/512/6522/6522581.png";

    console.log(window._supabase);

    const { data, error } = await window._supabase
      .from("guias")
      .insert([
        {
          nombre,
          telefono,
          experiencia,
          imagen: foto
        }
      ]);

    if(error){
      alert("ERROR: " + error.message);
      console.log(error);
      return;
    }

    alert("Registro guardado");

  } catch(err){
    alert("Fallo: " + err.message);
    console.log(err);
  }

  
}

async function guardarReserva() {

  const { data: { user } } = await window._supabase.auth.getUser();

  if (!user) {
    alert("Debes iniciar sesión para reservar");
    window.location.href = "login.html";
    return;
  }

  const hotel = document.getElementById("hotelSeleccionado").value;
  const nombre = document.getElementById("nombreReserva").value;
  const correo = document.getElementById("correoReserva").value;
  const telefono = document.getElementById("telefonoReserva").value;
  const ingreso = document.getElementById("ingreso").value;
  const salida = document.getElementById("salida").value;
if (
  hotel === "Selecciona un hotel" ||
  nombre.trim() === "" ||
  correo.trim() === "" ||
  telefono.trim() === "" ||
  ingreso.trim() === "" ||
  salida.trim() === ""
) {
  alert("Debes completar todos los campos antes de reservar");
  return;
}
  const { error } = await window._supabase
    .from("reservas_hoteles")
    .insert([{
      user_id: user.id,
      hotel: hotel,
      nombre,
      correo,
      telefono,
      fecha_ingreso: ingreso,
      fecha_salida: salida
    }]);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Reserva realizada correctamente");

  document.getElementById("formReserva").classList.add("oculto");
}

function mostrarReserva(nombreHotel){

  hotelSeleccionado = nombreHotel;

  const form = document.getElementById("formReserva");

  form.classList.remove("oculto");

  form.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

function abrirMapa(link){
  window.open(link, "_blank");
}

function mostrarFormularioReserva(){
  document.getElementById("formReserva")
    .classList.toggle("oculto");

  document.getElementById("formReserva")
    .scrollIntoView({
      behavior:"smooth"
    });
}

function mostrarGuia(guia) {
  document.getElementById("modalNombre").textContent = guia.nombre;
  document.getElementById("modalEspecialidad").textContent = guia.especialidad || "Guía turístico";
  document.getElementById("modalDescripcion").textContent = guia.experiencia;
  document.getElementById("modalImagen").src =
    "https://s3.ppllstatics.com/canarias7/www/multimedia/201704/14/media/cortadas/462076-1g_CSN462076_MG3928385--1248x702.jpg";

  document.getElementById("btnWhatsappGuia").href =
 `https://wa.me/57${guia.telefono}?text=${encodeURIComponent("¡Hola " + guia.nombre + "! Vi tu perfil en Turismo Montería y me gustaría contratarte como guía. ¿Tienes disponibilidad?")}`

  document.getElementById("modalGuia").classList.remove("oculto");
}

function cerrarModalGuia(){
  document.getElementById("modalGuia")
    .classList.add("oculto");
console.log("SCRIPT CARGADO CORRECTAMENTE");
}

let ultimoScroll = 0;

window.addEventListener("scroll", () => {

  const barra = document.querySelector(".top-bar");
  const actual = window.pageYOffset;

  if(!barra) return;

  if(actual <= 20){
    barra.classList.remove("ocultar");
    return;
  }

  if(actual > ultimoScroll){
    barra.classList.add("ocultar");
  }else{
    barra.classList.remove("ocultar");
  }

  ultimoScroll = actual;
});

document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("modalLugar");

  const cerrarModal = document.getElementById("cerrarModal");


  // HACER GLOBAL LA FUNCIÓN
window.abrirModal = function(
  nombre,
  imagen,
  ubicacion,
  descripcion
){
  document.getElementById("modalTitulo").textContent = nombre;
  document.getElementById("modalImagen").src = imagen;
  document.getElementById("modalDescripcion").textContent = descripcion;
  document.getElementById("modalMapa").src = ubicacion + "&output=embed";
  document.getElementById("btnMaps").href = ubicacion;

  modal.style.display = "flex";
};


  // CERRAR
  cerrarModal.addEventListener("click", () => {

    modal.style.display = "none";

  });


  // CLICK AFUERA
  modal.addEventListener("click", (e) => {

    if(e.target === modal){

      modal.style.display = "none";

    }

  });

});

document.addEventListener("DOMContentLoaded", () => {

  const modalHotel = document.getElementById("modalHotel");
  const cerrarHotel = document.getElementById("cerrarModalHotel");

  window.abrirModalHotel = function(
    nombre,
    imagen,
    ubicacion,
    descripcion
  ) {

    document.getElementById("hotelModalTitulo").textContent = nombre;
    document.getElementById("hotelModalImagen").src = imagen;
    document.getElementById("hotelModalDescripcion").textContent = descripcion;

    document.getElementById("hotelModalMapa").src = ubicacion + "&output=embed";
    document.getElementById("hotelBtnMaps").href = ubicacion;

    modalHotel.style.display = "flex";
  };

  cerrarHotel.addEventListener("click", () => {
    modalHotel.style.display = "none";
  });

  modalHotel.addEventListener("click", (e) => {
    if (e.target === modalHotel) {
      modalHotel.style.display = "none";
    }
  });



});

async function cargarMisReservas() {
  const { data: { user } } = await window._supabase.auth.getUser();

  const contenedor = document.getElementById("misReservas");
  const mensaje = document.getElementById("mensajeVacio");

  if (!contenedor || !mensaje) return;

  contenedor.innerHTML = "";

  if (!user) {
    mensaje.style.display = "block";
    return;
  }

  const { data, error } = await window._supabase
    .from("reservas_hoteles")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.log(error.message);
    return;
  }

  if (!data || data.length === 0) {
    mensaje.style.display = "block";
    return;
  }

  mensaje.style.display = "none";

  data.forEach(reserva => {
    contenedor.innerHTML += `
      <div class="reserva-card" onclick="abrirModalReserva(
        '${reserva.hotel}',
        '${reserva.fecha_ingreso}',
        '${reserva.fecha_salida}',
        '${reserva.nombre}',
        '${reserva.correo}',
        '${reserva.telefono}'
      )">
        <button class="btn-eliminar" onclick="event.stopPropagation(); eliminarReserva('${reserva.id}')">✕</button>
        <h3>${reserva.hotel}</h3>
        <p>Ingreso: ${reserva.fecha_ingreso}</p>
        <p>Salida: ${reserva.fecha_salida}</p>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarMisReservas();
});

async function eliminarReserva(id) {
  const confirmar = confirm("¿Eliminar esta reserva?");

  if (!confirmar) return;

  const { error } = await window._supabase
    .from("reservas_hoteles")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Reserva eliminada");

  cargarMisReservas();
}
function abrirModalReserva(hotel, ingreso, salida, nombre, correo, telefono) {
  document.getElementById("tituloReserva").textContent = hotel;
  document.getElementById("detalleIngreso").textContent = "Ingreso: " + ingreso;
  document.getElementById("detalleSalida").textContent = "Salida: " + salida;
  document.getElementById("detalleNombre").textContent = "Reservado por: " + nombre;
  document.getElementById("detalleCorreo").textContent = "Correo: " + correo;
  document.getElementById("detalleTelefono").textContent = "Teléfono: " + telefono;

  document.getElementById("modalReserva").style.display = "flex";
}

document.getElementById("cerrarModalReserva").addEventListener("click", () => {
  document.getElementById("modalReserva").style.display = "none";
});

document.getElementById("modalReserva").addEventListener("click", (e) => {
  if (e.target.id === "modalReserva") {
    document.getElementById("modalReserva").style.display = "none";
  }
});

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".top-bar");

  if (!navbar) return;

  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

