const campo_senha = document.querySelector("#senha");
const campo_user = document.querySelector("#user");
const btn = document.querySelector("#logar");
const aviso = document.querySelector("#aviso");
let alvo = "1967465279c2acb6ab99af0fc23e8d25"
const sal = "oi"
btn.addEventListener("click", (e) => {
    const entrada_senha = campo_senha.value;
    const senha_hash = hex_md5(entrada_senha + sal);

    if (senha_hash === alvo) {
        aviso.innerText = "";
        localStorage.setItem("logado", "true");  // Armazena o estado de login no localStorage
        window.location.href = "protegida.html";
    } else {
        aviso.innerText = "Senha Incorreta!";
    }
});
