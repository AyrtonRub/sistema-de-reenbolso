(function () {
  const expense = document.querySelector("#expense");
  const category = document.querySelector("#category");
  const price = document.querySelector("#value");
  const button = document.querySelector("button");
  const valueTotal = document.querySelector('#valueTotal span')
  const totalExpenses = document.querySelector('#totalExpenses')

  function createTag(tagName, className) {
    const element = document.createElement(tagName);

    if (className) {
      element.classList.add(className);
    }

    return element;
  }

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

    const coin = createTag("small", "coin");
    coin.textContent = "R$";
    price.appendChild(coin);

    const priceValue = createTag("span");
    priceValue.textContent = value;
    price.appendChild(priceValue);

    const imgClose = createTag("div");
    imgClose.setAttribute("id", "img-close");
    divSecondary.appendChild(imgClose);

    return li;
  }

  const output = document.querySelector("#output");

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

  class Produto {
    constructor(expense, category, price) {
      (this.expense = expense),
        (this.category = category),
        (this.price = price);
    }

    isValid() {
      return this.expense !== "" && this.category !== "" && this.price !== "";
    }

    isObject() {
      return {
        name_produto: this.expense,
        category: this.category,
        price: parseFloat(this.price),
      };
    }
  }

  function renderLi() {
    output.textContent = "";
    listItems.forEach((obj) => {
      output.appendChild(
        createLi(
          obj.name_produto,
          obj.category,
          obj.price,
          linksImg[category.value]
        )
      );
    });
  }

  function clickButtton(e) {
    e.preventDefault();
    const typeCategory = category.options[category.selectedIndex];
    const currencyPrice = price.value;
    const produto = new Produto(
      expense.value,
      typeCategory.text,
      currencyPrice
    );

    if (!produto.isValid()) {
      alert("Preencha os campos corretamente");
      return;
    }

    listItems.push(produto.isObject());
    console.log(listItems)

    let acumulador = 0

    listItems.forEach(obj => acumulador = acumulador += obj.price)
    valueTotal.textContent = acumulador.toFixed(2).replace('.', ',')
    totalExpenses.textContent = `${listItems.length} despesas`
   

    renderLi();
  }

  button.addEventListener("click", clickButtton);
})();
