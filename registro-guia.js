document.getElementById("formGuia")
.addEventListener("submit", async function(e){

  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const telefono = document.getElementById("telefono").value;
  const especialidad = document.getElementById("especialidad").value;
  const descripcion = document.getElementById("descripcion").value;

  const { error } = await window._supabase
    .from("guias")
    .insert([
      {
        nombre: nombre,
        correo: correo,
        telefono: telefono,
        especialidad: especialidad,
        experiencia: descripcion
      }
    ]);

  if(error){
    alert("Error: " + error.message);
    console.log(error);
    return;
  }

  alert("Solicitud aceptada correctamente.");

  document.getElementById("formGuia").reset();

});
