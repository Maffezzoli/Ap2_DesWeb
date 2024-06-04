const img_container = document.querySelector(".img-container");
const info_container = document.querySelector(".infos");
const voltar = document.querySelector("#btn");
const logado = localStorage.getItem("logado");
const status_login = document.querySelector("#status")
const main = document.querySelector("main")
let caminho = "protegida.html"
let verifica_id = false

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id < 61 && id > 0){
        verifica_id = true
    }
    const getData = async () => {
        img_container.innerHTML = ''; // Limpa o container de imagens

        try {
            const response = await fetch(`https://botafogo-atletas.mange.li/2024-1/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const div = document.createElement("div");
            const img = document.createElement("img");
            const detalhes = document.createElement("p");
            const n_jogos = document.createElement("p");
            const nascimento = document.createElement("p");
            const altura = document.createElement("p");
            const naturalidade = document.createElement("p");
            const nome = document.createElement("p");
            const posicao = document.createElement("p");
            n_jogos.innerText = "Jogos pelo Botafogo: " + data.n_jogos;
            nascimento.innerText = "Nascimento: " + data.nascimento;
            altura.innerText = "Altura: " + data.altura;
            naturalidade.innerText = "Naturalidade: " + data.naturalidade;
            detalhes.innerText = data.detalhes;
            posicao.innerText = data.posicao;
            nome.innerText = data.nome;
            div.classList.add("box-img");
            div.appendChild(img);
            div.appendChild(nome);
            div.appendChild(posicao);
            img.setAttribute("src", data.imagem);
            info_container.appendChild(detalhes);
            info_container.appendChild(n_jogos);
            info_container.appendChild(nascimento);
            info_container.appendChild(altura);
            info_container.appendChild(naturalidade);
            img_container.appendChild(div);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    voltar.addEventListener("click", () => {
        window.location.href = caminho;
    });
    if (logado === "true" && verifica_id === true){
        getData();
        status_login.style.display = "none"
    }
    else if(!verifica_id){
        main.style.justifyContent = "center"
        img_container.style.display = "none"
        info_container.style.display = "none"
        status_login.innerText = "Jogador(a) não encontrando com base no ID informado!"
    }
    else{
        main.style.justifyContent = "center"
        img_container.style.display = "none"
        info_container.style.display = "none"
        voltar.innerText = "Fazer Login"
        caminho = "index.html"
    }
});
