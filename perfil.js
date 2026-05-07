async function cargarPerfil(){

  const { data } = await window._supabase.auth.getUser();

  if(!data.user){
    window.location.href = "login.html";
    return;
  }

  document.getElementById("correoUsuario").textContent =
    data.user.email;
}

async function logout(){
  await window._supabase.auth.signOut();
  window.location.href = "login.html";
}

async function cargarPerfil(){

  const { data } = await window._supabase.auth.getUser();

  if(!data.user){
    window.location.href = "login.html";
    return;
  }

  document.getElementById("correoUsuario").textContent =
    data.user.email;
}

async function logout(){
  await window._supabase.auth.signOut();
  window.location.href = "login.html";
}
cargarPerfil();