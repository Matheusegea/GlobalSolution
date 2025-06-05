const niveisNormais = {
    "Rio Guaíba": 2.5,
    "Rio Taquari": 6.0,
    "Rio Jacuí": 17.0,
    "Rio Gravataí": 2.4
}

const niveisCriticos = {
    "Rio Guaíba": 4.0,
    "Rio Taquari": 7.5,
    "Rio Jacuí": 20.0,
    "Rio Gravataí": 3.0
}

let historico = []
let ultimoRegistro = null

function calcularNivelRisco(chuvaMm, nivelRioM, rio) {
    let riscoChuva = 0.0
    
    if (chuvaMm <= 20) {
        riscoChuva = 0.0
    } else if (chuvaMm <= 50) {
        riscoChuva = (chuvaMm - 20) / 30 * 0.3
    } else if (chuvaMm <= 100) {
        riscoChuva = 0.3 + (chuvaMm - 50) / 50 * 0.2
    } else {
        riscoChuva = 0.5
    }

    const nivelNormal = niveisNormais[rio]
    const nivelCritico = niveisCriticos[rio]
    let riscoRio = 0.0

    if (nivelRioM <= nivelNormal) {
        riscoRio = 0.0
    } else if (nivelRioM <= nivelCritico) {
        riscoRio = (nivelRioM - nivelNormal) / (nivelCritico - nivelNormal) * 0.5
    } else {
        const excesso = nivelRioM - nivelCritico
        const margemExtra = Math.max(0.0, Math.min(excesso / nivelCritico * 0.5, 0.5))
        riscoRio = 0.5 + margemExtra
    }

    const riscoTotal = Math.min(riscoChuva + riscoRio, 1.0)
    return riscoTotal
}
function classificarRisco(risco) {
    if (risco >= 0.7) {
        return "🔴 ALTO RISCO DE ENCHENTE"
    } else if (risco >= 0.4) {
        return "🟠 RISCO MODERADO DE ENCHENTE"
    } else {
        return "🟢 RISCO BAIXO DE ENCHENTE"
    }
}
function verificarRiscoEnchente() {
    const cidade = document.getElementById('cidade').value
    const rio = document.getElementById('rio').value
    const chuva = parseFloat(document.getElementById('chuva').value)
    const nivelRio = parseFloat(document.getElementById('nivel-rio').value)

    if (isNaN(chuva) || isNaN(nivelRio)) {
        mostrarAlerta('Por favor, preencha todos os campos com valores numéricos.')
        return
    }

    const risco = calcularNivelRisco(chuva, nivelRio, rio)
    const classificacao = classificarRisco(risco)

    const novoRegistro = {
        cidade: cidade,
        rio: rio,
        chuva: chuva,
        nivelRio: nivelRio,
        risco: risco,
        classificacao: classificacao,
        data: new Date().toLocaleString()
    }

    if (!ultimoRegistro || 
        ultimoRegistro.cidade !== novoRegistro.cidade ||
        ultimoRegistro.rio !== novoRegistro.rio ||
        ultimoRegistro.chuva !== novoRegistro.chuva ||
        ultimoRegistro.nivelRio !== novoRegistro.nivelRio) {
        
        historico.push(novoRegistro)
        ultimoRegistro = novoRegistro
        
        salvarHistorico()
    }
    mostrarResultado(novoRegistro)
    atualizarHistorico()
}
function mostrarResultado(registro) {
    const resultadoDiv = document.getElementById('resultado-simulacao')
    
    let corClasse = ''
    if (registro.classificacao.includes('ALTO')) {
        corClasse = 'resultado-alto-risco'
    } else if (registro.classificacao.includes('MODERADO')) {
        corClasse = 'resultado-medio-risco'
    } else {
        corClasse = 'resultado-baixo-risco'
    }
    
    resultadoDiv.innerHTML = `
        <h3>Resultado da Simulação Atual:</h3>
        <p><strong>Cidade:</strong> ${registro.cidade}</p>
        <p><strong>Rio:</strong> ${registro.rio}</p>
        <p><strong>Chuva nas últimas 24h:</strong> ${registro.chuva.toFixed(2)} mm</p>
        <p><strong>Nível do rio:</strong> ${registro.nivelRio.toFixed(2)} m</p>
        <p class="${corClasse}"><strong>${registro.classificacao} (${(registro.risco * 100).toFixed(1)}%)</strong></p>
    `
    
    resultadoDiv.style.display = 'block'
}

function atualizarHistorico() {
    const historicoDiv = document.getElementById('historico-simulacoes')
    historicoDiv.innerHTML = '<h3>Histórico de Simulações</h3>'
    
    if (historico.length === 0) {
        historicoDiv.innerHTML += '<p>Sem simulações no histórico.</p>'
        return
    }
    
    const historicoList = document.createElement('div')
    historicoList.className = 'historico-list'
    
    historico.forEach((registro, index) => {
        let corClasse = ''
        if (registro.classificacao.includes('ALTO')) {
            corClasse = 'resultado-alto-risco'
        } else if (registro.classificacao.includes('MODERADO')) {
            corClasse = 'resultado-medio-risco'
        } else {
            corClasse = 'resultado-baixo-risco'
        }
        
        const registroItem = document.createElement('div')
        registroItem.className = 'historico-item'
        registroItem.innerHTML = `
            <p><strong>${index + 1}. ${registro.cidade}</strong></p>
            <p><strong>${registro.rio}</strong></p>
            <p>🌧 ${registro.chuva} mm</p>
            <p>🌊 ${registro.nivelRio} m</p>
            <p class="${corClasse}">📊 <strong>${registro.classificacao}</strong> (${(registro.risco * 100).toFixed(1)}%)</p>
            <p><small>${registro.data}</small></p>
            <button class="btn-excluir" onclick="excluirRegistro(${index})">Excluir</button>
        `
        
        historicoList.appendChild(registroItem)
    })
    
    historicoDiv.appendChild(historicoList)
}
function excluirRegistro(index) {
    historico.splice(index, 1)
    salvarHistorico()
    atualizarHistorico()
}
function salvarHistorico() {
    localStorage.setItem('simuladorEnchentesHistorico', JSON.stringify(historico))
}
function carregarHistorico() {
    const historicoSalvo = localStorage.getItem('simuladorEnchentesHistorico')
    if (historicoSalvo) {
        historico = JSON.parse(historicoSalvo)
        if (historico.length > 0) {
            ultimoRegistro = historico[historico.length - 1]
        }
    }
}
function mostrarAlerta(mensagem) {
    const alertaDiv = document.getElementById('alerta')
    alertaDiv.textContent = mensagem
    alertaDiv.style.display = 'block'
    
    setTimeout(() => {
        alertaDiv.style.display = 'none'
    }, 3000)
}
function atualizarInfoRio() {
    const rio = document.getElementById('rio').value
    const nivelNormal = niveisNormais[rio]
    const nivelCritico = niveisCriticos[rio]
    
    document.getElementById('nivel-normal').textContent = `${nivelNormal.toFixed(2)} metros`
    document.getElementById('nivel-critico').textContent = `${nivelCritico.toFixed(2)} metros`
}
document.addEventListener('DOMContentLoaded', function() {
    carregarHistorico()
    
    const rioSelect = document.getElementById('rio')
    for (const rio in niveisNormais) {
        const option = document.createElement('option')
        option.value = rio
        option.textContent = rio
        rioSelect.appendChild(option)
    }
    
    atualizarInfoRio()
    
    document.getElementById('btn-verificar').addEventListener('click', verificarRiscoEnchente)
    document.getElementById('rio').addEventListener('change', atualizarInfoRio)
    
    atualizarHistorico()
})
