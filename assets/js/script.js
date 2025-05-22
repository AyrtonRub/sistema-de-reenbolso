(function() {
    const expense = document.querySelector('#expense')
    const category = document.querySelector('#category')
    const value = document.querySelector('#value')
    const button = document.querySelector('button')

    
    function createTag(tagName, className) {
        const element = document.createElement(tagName)
        
        if(className) {
            element.classList.add(className)
        }
        
        return element
    }
    
    const listItems = []

    const linksImg = {
        food: 'imgs/talheres.svg',
        hosting: 'imgs/cama.svg',
        transport: 'imgs/carro.svg',
        services: 'imgs/chave.svg',
        others: 'imgs/bilhete.svg'
    }

    function createLi (expense, category, value, linkImg) {
        const li = createTag('li')

        const divPrimary = createTag('div')
        li.appendChild(divPrimary)
        divPrimary.innerHTML = `
        <div class="img"  style="background-image: url(${linkImg})"></div>
        `

        const divExpense = createTag('div')
        const nameExpense = createTag('span')
        nameExpense.textContent = expense
        divExpense.appendChild(nameExpense)
        const nameCategory = createTag('small')
        nameCategory.textContent = category
        divExpense.appendChild(nameCategory)
        divPrimary.appendChild(divExpense)

        const divSecondary = createTag('div')
        li.appendChild(divSecondary)
        const price = createTag('div', 'price')
        divSecondary.appendChild(price)
        const coin = createTag('small', 'coin')
        coin.textContent = 'R$'
        price.appendChild(coin)
        price.textContent += value


        return li
    }

    console.log(createLi('Almoço', 'Alimentação', 10.99, 'imgs/talheres.svg' ))



    // category.addEventListener('change', function(e) {
    //     const isValid = e.target.value

    //     console.log(linksImg[isValid])
    // })
})()