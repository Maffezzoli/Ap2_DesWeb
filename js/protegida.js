document.addEventListener('DOMContentLoaded', () => {
    const logado = localStorage.getItem("logado");
    const logout = document.querySelector("#logout");
    const masc = document.querySelector(".btn.masc");
    const fem = document.querySelector(".btn.fem");
    const all = document.querySelector(".btn.all");
    const filtro = document.querySelector("#filter");
    const abre_fecha = document.querySelector("#abre");
    const container = document.querySelector(".container");
    const sub_container = document.querySelector(".sub-container");
    const img_container = document.querySelector(".img-container");
    let aberto = true;

    if (logado === "true") {
        // Verifica se há parâmetros de URL e carrega os dados
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const tipo = urlParams.get('tipo');

        // Carrega os dados com base no tipo
        getData(tipo);
    } else {
        deslogado();
    }

    function deslogado() {
        document.body.innerHTML = "";
    }

    logout.addEventListener("click", () => {
        localStorage.setItem("logado", "false");
        deslogado();
        window.location.href = "index.html";
    });

    masc.addEventListener("click", () => {
        filtro.value = ""
        updateURLAndFetchData("masculino");
    });

    fem.addEventListener("click", () => {
        filtro.value = ""
        updateURLAndFetchData("feminino");
    });

    all.addEventListener("click", () => {
        filtro.value = ""
        updateURLAndFetchData("all");
    });

    abre_fecha.addEventListener("click", () => {
        if (aberto) {
            aberto = false;
            img_container.style.top = "80px";
            sub_container.style.display = "none";
            abre_fecha.className = `fa-solid fa-chevron-down`;
            abre_fecha.style.top = "20px";
            abre_fecha.style.left = "580px";
            container.style.height = "50px";
            logout.style.top = "0px";
            logout.style.left = "570px";
        } else {
            aberto = true;
            img_container.style.top = "245px";
            sub_container.style.display = "flex";
            abre_fecha.style.top = "190px";
            abre_fecha.style.left = "320px";
            container.style.height = "210px";
            logout.style.top = "-70px";
            logout.style.left = "340px";
            abre_fecha.className = `fa-solid fa-chevron-up`;
        }
    });

    filtro.addEventListener("input", () => {
        getDataWithFilter(filtro.value);
    });
});

const img_container = document.querySelector(".img-container");

const getData = async (tipo) => {
    img_container.innerHTML = ''; // Limpa o container de imagens

    try {
        const response = await fetch(`https://botafogo-atletas.mange.li/2024-1/${tipo}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        renderData(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const getDataWithFilter = async (filtroNome) => {
    const tipo = window.location.search.split('=')[1];
    const response = await fetch(`https://botafogo-atletas.mange.li/2024-1/${tipo}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const filteredData = data.filter(item => item.nome.toLowerCase().includes(filtroNome.toLowerCase()));
    renderData(filteredData);
};

const renderData = (data) => {
    img_container.innerHTML = ''; // Limpa o container antes de adicionar os novos elementos

    data.forEach(element => {
        const div = document.createElement("div");
        div.addEventListener("click", () => {
            window.location.href = `especifica.html?id=${element.id}`;
        });
        const img = document.createElement("img");
        const nome = document.createElement("p");
        const posicao = document.createElement("p");
        posicao.innerText = element.posicao;
        nome.innerText = element.nome;
        div.appendChild(nome);
        div.appendChild(posicao);
        img.setAttribute("src", element.imagem);
        div.classList.add("box-img");
        div.appendChild(img);
        img_container.appendChild(div);
    });
};

const updateURLAndFetchData = (tipo) => {
    const newUrl = `${window.location.pathname}?tipo=${tipo}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    getData(tipo);
};
