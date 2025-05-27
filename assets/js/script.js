(function () {
  const expense = document.querySelector("#expense");
  const category = document.querySelector("#category");
  const price = document.querySelector("#value");
  const button = document.querySelector("button");
  const valueTotal = document.querySelector("#valueTotal span");
  const totalExpenses = document.querySelector("#totalExpenses");
  const output = document.querySelector("#output");

  price.oninput = function() {
    let value = this.value.replace(/\D/g, "")
    
    value = Number(value) / 100
    this.value = formatCurrancyBRL(value)
  }

  function formatCurrancyBRL(value) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  // Função para a criação de tag
  function createTag(tagName, className) {
    const element = document.createElement(tagName);

    if (className) {
      element.classList.add(className);
    }

    return element;
  }
  // Função para capitalizar o texto
  function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }

  //Função para a criação da LI
  function createLi(expense, category, value, linkImg) {
    const li = createTag("li");

    // --- Bloco da Imagem ---
    const divPrimary = createTag("div");
    li.appendChild(divPrimary);

    const divImage = createTag("div");
    divImage.className = "img";
    divImage.style.backgroundImage = `url(${linkImg})`;
    divPrimary.appendChild(divImage);

    // --- Bloco de Informações da Despesa ---
    const divExpense = createTag("div");

    const nameExpense = createTag("span");
    nameExpense.textContent = expense;
    divExpense.appendChild(nameExpense);

    const nameCategory = createTag("small");
    nameCategory.textContent = category;
    divExpense.appendChild(nameCategory);

    divPrimary.appendChild(divExpense);

    // --- Bloco de Valor ---
    const divSecondary = createTag("div");
    li.appendChild(divSecondary);

    const price = createTag("div", "price");
    divSecondary.appendChild(price);

    const priceValue = createTag("span");
    priceValue.innerHTML = `
      <small class="coin">R$</small> ${value}
    `;
    price.appendChild(priceValue);

    const imgClose = createTag("div");
    imgClose.classList.add('img-close')
    imgClose.setAttribute("data-close", "");
    divSecondary.appendChild(imgClose);

    return li;
  }

  // lista dos itens
  const listItems = [];

  // links das imagens
  const linksImg = {
    food: "assets/imgs/talheres.svg",
    hosting: "assets/imgs/cama.svg",
    transport: "assets/imgs/carro.svg",
    services: "assets/imgs/chave.svg",
    others: "assets/imgs/bilhete.svg",
  };

  // Classe para a criação do produto
  class Produto {
    constructor(expense, category, price, idCategoria) {
      (this.expense = expense),
        (this.category = category),
        (this.price = price);
        (this.idCategoria = idCategoria)
    }

    isValid() {
      return (
        this.expense !== "" &&
        this.category !== "" &&
        this.price !== "" &&
        !isNaN(this.price)
      );
    }

    isObject() {
      return {
        name_produto: this.expense,
        category: this.category,
        price: this.price ,
        create: new Date(),
        id_category: this.idCategoria
      };
    }
  }

  // Função para renderizar a LI na tela
  function renderLi() {
    output.textContent = "";
    listItems.forEach((obj) => {
      output.appendChild(
        createLi(
          capitalizar(obj.name_produto),
          obj.category,
          formatCurrancyBRL(obj.price).replace('R$', ''),
          linksImg[obj.id_category]
        )
      );
    });
  }

  // Função para adicionar o item na tela
  function clickButtton(e) {
    e.preventDefault();
    const typeCategory = category.options[category.selectedIndex].text;
    const cleanValue = parseFloat(
      price.value
      .replace(/\s/g, "")
      .replace('R$', '')
      .replace(/\./g, '')
      .replace(',', '.')
    )

    const produto = new Produto(expense.value, typeCategory, cleanValue, category.value);

    if (!produto.isValid()) {
      alert("Preencha os campos corretamente");
      return;
    }

    listItems.push(produto.isObject());
    console.log(listItems)
    renderLi();
    updateValues()

    expense.value = "";
    category.value = "";
    price.value = "";
  }

  function updateValues() {
    let acumulador = 0;

    listItems.forEach((obj) => (acumulador = acumulador += obj.price));
    valueTotal.textContent = formatCurrancyBRL(acumulador).replace('R$', '')

    totalExpenses.textContent = `${listItems.length} despesas`;
  }

  function clickUl(e) {
    const element = e.target;
    const lis = document.querySelectorAll("#output li");
    let currentLi = element.parentElement;

    while (currentLi && currentLi.nodeName !== "LI") {
      currentLi = currentLi.parentElement;
    }
    const index = [...lis].indexOf(currentLi);

    if (element.hasAttribute("data-close")) {
      listItems.splice(index, 1);
    }

    renderLi();
    updateValues()
  }

  button.addEventListener("click", clickButtton);
  output.addEventListener("click", clickUl);
})();
