

(function () {

  const style = document.createElement("style");
  style.textContent = `
    #toast-container {
      position: fixed;
      top: 80px;
      right: 20px;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    }

    .toast {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      min-width: 300px;
      max-width: 380px;
      padding: 14px 16px;
      border-radius: 14px;
      background: #ffffff;
      box-shadow: 0 8px 30px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.08);
      border-left: 4px solid #ff9800;
      pointer-events: all;
      animation: toastIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both;
      transition: opacity 0.3s ease, transform 0.3s ease;
      position: relative;
      cursor: default;
    }

    .toast.saliendo {
      animation: toastOut 0.3s ease forwards;
    }

    @keyframes toastIn {
      from { opacity: 0; transform: translateX(60px) scale(0.92); }
      to   { opacity: 1; transform: translateX(0)   scale(1); }
    }

    @keyframes toastOut {
      from { opacity: 1; transform: translateX(0)   scale(1); }
      to   { opacity: 0; transform: translateX(60px) scale(0.9); max-height: 0; padding: 0; margin: 0; }
    }

    .toast.tipo-exito  { border-left-color: #2e7d32; }
    .toast.tipo-error  { border-left-color: #c62828; }
    .toast.tipo-aviso  { border-left-color: #e65100; }
    .toast.tipo-info   { border-left-color: #0277bd; }

    .toast-icono {
      font-size: 22px;
      line-height: 1;
      margin-top: 1px;
      flex-shrink: 0;
    }

    .toast-cuerpo { flex: 1; }

    .toast-titulo {
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 14px;
      color: #1a1a1a;
      margin-bottom: 2px;
    }

    .toast-mensaje {
      font-family: 'Poppins', sans-serif;
      font-size: 13px;
      color: #555;
      line-height: 1.4;
    }

    .toast-cerrar {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 18px;
      color: #aaa;
      padding: 0;
      line-height: 1;
      flex-shrink: 0;
      transition: color 0.2s;
    }

    .toast-cerrar:hover { color: #444; }

    .toast-barra {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      border-radius: 0 0 0 14px;
      background: rgba(0,0,0,0.1);
      animation: toastBarra linear forwards;
    }

    @keyframes toastBarra {
      from { width: 100%; }
      to   { width: 0%; }
    }

    body.dark-mode .toast {
      background: #1e1e1e;
      box-shadow: 0 8px 30px rgba(0,0,0,0.45);
    }

    body.dark-mode .toast-titulo { color: #f0f0f0; }
    body.dark-mode .toast-mensaje { color: #aaa; }
    body.dark-mode .toast-cerrar { color: #666; }
    body.dark-mode .toast-cerrar:hover { color: #ccc; }

    #confirm-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      z-index: 99998;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.2s ease;
      backdrop-filter: blur(2px);
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    #confirm-box {
      background: #fff;
      border-radius: 20px;
      padding: 32px 28px 24px;
      max-width: 380px;
      width: 90%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.2);
      animation: popIn 0.3s cubic-bezier(0.34,1.56,0.64,1);
      text-align: center;
    }

    @keyframes popIn {
      from { transform: scale(0.88); opacity: 0; }
      to   { transform: scale(1);    opacity: 1; }
    }

    #confirm-icono {
      font-size: 40px;
      margin-bottom: 12px;
      line-height: 1;
    }

    #confirm-mensaje {
      font-family: 'Poppins', sans-serif;
      font-size: 16px;
      color: #222;
      margin-bottom: 24px;
      line-height: 1.5;
    }

    #confirm-botones {
      display: flex;
      gap: 12px;
      justify-content: center;
    }

    .confirm-btn {
      font-family: 'Poppins', sans-serif;
      font-size: 14px;
      font-weight: 600;
      padding: 10px 28px;
      border-radius: 999px;
      border: none;
      cursor: pointer;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }

    .confirm-btn:hover { transform: translateY(-2px); }
    .confirm-btn:active { transform: scale(0.97); }

    .confirm-btn-si {
      background: linear-gradient(135deg, #ef5350, #c62828);
      color: white;
      box-shadow: 0 4px 14px rgba(198,40,40,0.35);
    }

    .confirm-btn-no {
      background: #f0f0f0;
      color: #444;
    }

    body.dark-mode #confirm-box { background: #1e1e1e; }
    body.dark-mode #confirm-mensaje { color: #eee; }
    body.dark-mode .confirm-btn-no { background: #333; color: #ccc; }
  `;
  document.head.appendChild(style);

  const contenedor = document.createElement("div");
  contenedor.id = "toast-container";
  document.body.appendChild(contenedor);

  const iconos = {
    exito: "✅",
    error: "❌",
    aviso: "⚠️",
    info:  "ℹ️"
  };

  const titulos = {
    exito: "¡Listo!",
    error: "Error",
    aviso: "Atención",
    info:  "Información"
  };

  function mostrarToast(mensaje, tipo = "info", duracion = 4000) {
    const toast = document.createElement("div");
    toast.className = `toast tipo-${tipo}`;

    toast.innerHTML = `
      <div class="toast-icono">${iconos[tipo] || "ℹ️"}</div>
      <div class="toast-cuerpo">
        <div class="toast-titulo">${titulos[tipo] || "Aviso"}</div>
        <div class="toast-mensaje">${mensaje}</div>
      </div>
      <button class="toast-cerrar" aria-label="Cerrar">✕</button>
      <div class="toast-barra" style="animation-duration: ${duracion}ms"></div>
    `;

    contenedor.appendChild(toast);

    function cerrar() {
      toast.classList.add("saliendo");
      setTimeout(() => toast.remove(), 350);
    }

    toast.querySelector(".toast-cerrar").addEventListener("click", cerrar);
    const timer = setTimeout(cerrar, duracion);

    toast.addEventListener("mouseenter", () => {
      clearTimeout(timer);
      toast.querySelector(".toast-barra").style.animationPlayState = "paused";
    });

    toast.addEventListener("mouseleave", () => { cerrar(); });
  }

  function mostrarConfirm(mensaje) {
    return new Promise((resolve) => {
      const overlay = document.createElement("div");
      overlay.id = "confirm-overlay";

      overlay.innerHTML = `
        <div id="confirm-box">
          <div id="confirm-icono">🗑️</div>
          <p id="confirm-mensaje">${mensaje}</p>
          <div id="confirm-botones">
            <button class="confirm-btn confirm-btn-no" id="btn-no">Cancelar</button>
            <button class="confirm-btn confirm-btn-si" id="btn-si">Eliminar</button>
          </div>
        </div>
      `;

      document.body.appendChild(overlay);

      overlay.querySelector("#btn-si").addEventListener("click", () => { overlay.remove(); resolve(true); });
      overlay.querySelector("#btn-no").addEventListener("click", () => { overlay.remove(); resolve(false); });
      overlay.addEventListener("click", (e) => { if (e.target === overlay) { overlay.remove(); resolve(false); } });
    });
  }

  window.Toast = {
    exito:     (msg, dur) => mostrarToast(msg, "exito", dur),
    error:     (msg, dur) => mostrarToast(msg, "error", dur),
    aviso:     (msg, dur) => mostrarToast(msg, "aviso", dur),
    info:      (msg, dur) => mostrarToast(msg, "info",  dur),
    confirmar: mostrarConfirm
  };

})();