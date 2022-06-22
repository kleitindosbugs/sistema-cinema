const show = document.querySelector(".show")
const cadeiras = show.querySelectorAll(".cadeira:not(.ocupada)")
const select = document.querySelector("select")
const totalIngresso = document.querySelector(".totalIngresso")

let qntIngressos = document.querySelector(".qntIngressos")
let valorIngresso = parseInt(select.value)
let cadeirasSelecionadas = []

popularInterface()

function popularInterface() {
    const lugaresSelecionados = JSON.parse(localStorage.getItem("lugaresSelecionados"))
    const quantidadeIngressos = JSON.parse(localStorage.getItem("quantidadeIngressos"))
    const precoIngresso = JSON.parse(localStorage.getItem("precoIngresso"))

    if(lugaresSelecionados != undefined && lugaresSelecionados.length > 0) {
        cadeiras.forEach((cadeira, index) => {
            if(lugaresSelecionados.indexOf(index) > -1) {
                cadeira.classList.add("selecionada")
            }
        })
    }

    if(quantidadeIngressos != undefined) {
        qntIngressos.textContent = quantidadeIngressos
    }

    if(precoIngresso != undefined){
        valorIngresso = precoIngresso
        totalIngresso.textContent = qntIngressos.textContent * valorIngresso
        select.value = valorIngresso
    } 

}

function salvarPreco(valorIngresso) {
    localStorage.setItem("precoIngresso", valorIngresso)
}

select.addEventListener("change", function() {
    let valorIngresso = parseInt(select.value)
    totalIngresso.textContent = qntIngressos.textContent * valorIngresso
    salvarPreco(valorIngresso)
})

show.addEventListener("click", function(e) {    
    cadeirasSelecionadas = [...cadeiras].map((cadeira, index) => {
        if(cadeira == e.target) {
            cadeira.classList.toggle("selecionada")
        }     
        if(cadeira.className == "cadeira selecionada") {
            return {cadeira, index} 
        }
    })

    let arrCadeirasSelecionadas = cadeirasSelecionadas.filter((cadeiraSelecionada) => {
        if(cadeiraSelecionada != undefined) {
            return cadeiraSelecionada
        }
    })

    qntIngressos.textContent = arrCadeirasSelecionadas.length
    totalIngresso.textContent = qntIngressos.textContent * valorIngresso
    salvarPreco(valorIngresso)

    let lugares = []
    for(i = 0; i < arrCadeirasSelecionadas.length; i++) {
        lugares.push(arrCadeirasSelecionadas[i].index)
    }

    localStorage.setItem("lugaresSelecionados", JSON.stringify(lugares))
    localStorage.setItem("quantidadeIngressos", qntIngressos.textContent)
})








