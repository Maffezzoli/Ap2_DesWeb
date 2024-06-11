const campo_senha = document.querySelector("#senha");
const logado = localStorage.getItem("logado");
const campo_user = document.querySelector("#user");
const btn = document.querySelector("#logar");
const aviso = document.querySelector("#aviso");
let alvo = "ef1e7c0e1c61fa26ed422f0a5803d8fe0a6736b1a54ded600ec891ac45c2b0a1"
const sal = "oi"
document.addEventListener('DOMContentLoaded', () => {
    if (logado == "true"){
        window.location.href = "protegida.html";
    }
});
btn.addEventListener("click", (e) => {
    const entrada_senha = campo_senha.value;
    const senha_hash = hex_sha256(entrada_senha + sal);
    if (senha_hash === alvo) {
        aviso.innerText = "";
        localStorage.setItem("logado", "true");  // Armazena o estado de login no localStorage
        window.location.href = "protegida.html";
    } else {
        aviso.innerText = "Senha Incorreta!";
    }
});
