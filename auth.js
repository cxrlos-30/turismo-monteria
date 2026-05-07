async function register(){

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const mensaje = document.getElementById("mensaje");

  const { error } = await window._supabase.auth.signUp({
    email: email,
    password: password
  });

  if(error){
    mensaje.textContent = "Error: " + error.message;
    return;
  }

  mensaje.textContent = "Usuario registrado correctamente";
}

async function login(){

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const mensaje = document.getElementById("mensaje");

  const { error } = await window._supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if(error){
    mensaje.textContent = "Error: " + error.message;
    return;
  }

  mensaje.textContent = "Login exitoso";

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
}