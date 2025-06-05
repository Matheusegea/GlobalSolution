document.addEventListener('DOMContentLoaded', function() {

    let currentQuestion = 0
    let score = 0
    const quizQuestions = [
        {
            question: "Qual destes NÃO é um fator que contribui para o aumento do risco de enchentes urbanas?",
            options: [
                "A) Construção de mais parques e áreas verdes",
                "B) Ocupação desordenada de margens de rios",
                "C) Sistemas de drenagem ineficientes",
                "D) Aumento da frequência de chuvas intensas"
            ],
            answer: 0,
            feedback: "A construção de parques e áreas verdes ajuda a absorver a água da chuva, reduzindo o risco de enchentes, ao contrário dos outros fatores listados."
        },
        {
            question: "Que tipo de tecnologia é frequentemente usada para monitorar o nível dos rios em tempo real?",
            options: [
                "A) Radares meteorológicos",
                "B) Sensores de nível ultrassônicos ou de pressão",
                "C) Drones com câmeras térmicas",
                "D) Sismógrafos"
            ],
            answer: 1,
            feedback: "Sensores de nível, como os ultrassônicos ou de pressão, são instalados diretamente nos rios para medir a altura da água continuamente."
        },
        {
            question: "Qual o principal objetivo de um sistema de alerta precoce de enchentes?",
            options: [
                "A) Impedir completamente a ocorrência de enchentes",
                "B) Mapear as áreas já inundadas",
                "C) Dar tempo para a população tomar medidas de proteção e evacuar áreas de risco",
                "D) Analisar a qualidade da água após a enchente"
            ],
            answer: 2,
            feedback: "O objetivo primordial é a segurança da população, fornecendo informação antecipada para ações preventivas e evacuação."
        },
        {
            question: "\"Inteligência Artificial\" em sistemas de prevenção de enchentes pode ser usada para:",
            options: [
                "A) Construir barreiras físicas automaticamente",
                "B) Analisar grandes volumes de dados (chuva, nível de rios, histórico) para prever riscos com maior precisão",
                "C) Controlar o clima para evitar chuvas fortes",
                "D) Purificar a água contaminada pela enchente"
            ],
            answer: 1,
            feedback: "A IA é poderosa na análise de dados complexos para identificar padrões e prever cenários de risco com mais acurácia que métodos tradicionais."
        },
        {
            question: "Qual medida individual NÃO é recomendada durante uma enchente?",
            options: [
                "A) Desligar a energia elétrica da casa (se seguro)",
                "B) Separar documentos importantes em local seguro e elevado",
                "C) Tentar atravessar áreas alagadas de carro ou a pé",
                "D) Acompanhar os alertas oficiais da Defesa Civil"
            ],
            answer: 2,
            feedback: "Atravessar áreas alagadas é extremamente perigoso devido à força da correnteza e riscos ocultos. A recomendação é buscar locais elevados e seguros."
        },
        {
            question: "O que significa \"bacia hidrográfica\"?",
            options: [
                "A) Um reservatório artificial de água",
                "B) A área geográfica drenada por um rio principal e seus afluentes",
                "C) Um tipo específico de sensor de chuva",
                "D) O estudo do ciclo da água"
            ],
            answer: 1,
            feedback: "Entender a bacia hidrográfica é fundamental para gerenciar os recursos hídricos e prever como a chuva afetará os rios da região."
        },
        {
            question: "Qual tecnologia permite criar mapas detalhados de áreas de risco de inundação?",
            options: [
                "A) GPS (Sistema de Posicionamento Global)",
                "B) SIG (Sistemas de Informação Geográfica) e sensoriamento remoto",
                "C) Redes sociais",
                "D) Termômetros digitais"
            ],
            answer: 1,
            feedback: "SIG combina dados geográficos (como relevo, uso do solo) e informações de sensores para criar mapas precisos de vulnerabilidade a inundações."
        },
        {
            question: "Além dos sensores de nível, que outro tipo de sensor é vital para prever enchentes causadas por chuvas?",
            options: [
                "A) Sensor de temperatura",
                "B) Sensor de qualidade do ar",
                "C) Pluviômetro (sensor de chuva)",
                "D) Sensor de umidade do solo"
            ],
            answer: 2,
            feedback: "Pluviômetros medem a quantidade de chuva, informação essencial para alimentar modelos de previsão de cheias."
        },
        {
            question: "Qual a importância do planejamento urbano na prevenção de enchentes?",
            options: [
                "A) Nenhuma, pois enchentes são eventos puramente naturais.",
                "B) Define apenas onde construir hospitais.",
                "C) Ajuda a evitar construções em áreas de risco e a criar infraestrutura de drenagem adequada",
                "D) Determina a cor das casas na cidade."
            ],
            answer: 2,
            feedback: "O planejamento urbano adequado considera os riscos naturais e direciona o crescimento da cidade de forma a minimizar a exposição a enchentes."
        },
        {
            question: "O que fazer com animais de estimação em caso de alerta de enchente e necessidade de evacuação?",
            options: [
                "A) Deixá-los em casa com comida e água.",
                "B) Soltá-los na rua para que se salvem sozinhos.",
                "C) Levá-los junto para um local seguro, com coleira/caixa de transporte e identificação",
                "D) Esperar a enchente passar para buscá-los."
            ],
            answer: 2,
            feedback: "Animais de estimação dependem de seus tutores. Em uma evacuação, devem ser levados junto para garantir sua segurança."
        }
    ]

    const questionContainer = document.getElementById('questionContainer')
    const optionsContainer = document.getElementById('optionsContainer')
    const feedbackContainer = document.getElementById('feedbackContainer')
    const nextButton = document.getElementById('nextButton')
    const progressText = document.getElementById('progressText')
    const progressBarFill = document.getElementById('progressBarFill')
    const restartButton = document.getElementById('restartButton')

    
    function loadQuestion() {
        const question = quizQuestions[currentQuestion]
        questionContainer.textContent = question.question
        optionsContainer.innerHTML = ''
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button')
            button.className = '__quiz-option'
            button.textContent = option
            button.addEventListener('click', () => selectOption(index))
            optionsContainer.appendChild(button)
        })

        updateProgress()
        
        feedbackContainer.textContent = ''
        feedbackContainer.style.display = 'none'
        nextButton.disabled = true
    }
    function updateProgress() {
        const progressPercentage = ((currentQuestion + 1) / quizQuestions.length) * 100
        progressBarFill.style.width = `${progressPercentage}%`
        progressText.textContent = `${currentQuestion + 1}/${quizQuestions.length}`
    }
    function selectOption(selectedIndex) {
        const question = quizQuestions[currentQuestion]
        const options = document.querySelectorAll('.__quiz-option')
        options.forEach(option => {
            option.disabled = true
        })
        if (selectedIndex === question.answer) {
            options[selectedIndex].classList.add('correct')
            score++
            feedbackContainer.textContent = question.feedback
            feedbackContainer.classList.remove('incorrect')
            feedbackContainer.classList.add('correct')
        } else {
            options[selectedIndex].classList.add('incorrect')
            options[question.answer].classList.add('correct')
            feedbackContainer.textContent = `Incorreto. A resposta correta é: ${question.options[question.answer]}\n\n${question.feedback}`
            feedbackContainer.classList.remove('correct')
            feedbackContainer.classList.add('incorrect')
        }
        
        feedbackContainer.style.display = 'block'
        nextButton.disabled = false
    }
    function showFinalResults() {
        questionContainer.innerHTML = `
            <h3>Quiz Concluído!</h3>
            <p>Sua pontuação: ${score}/${quizQuestions.length}</p>
            <p>${score >= quizQuestions.length * 0.7 ? '🏆 Excelente! Você conhece bem as medidas de prevenção!' : (score >= quizQuestions.length/2 ? '👍 Bom trabalho! Continue aprendendo.' : '🤔 Que tal tentar novamente para melhorar seu conhecimento?')}</p>
        `
        optionsContainer.innerHTML = ''
        feedbackContainer.style.display = 'none'
        nextButton.style.display = 'none'
        restartButton.style.display = 'block'
    }
    nextButton.addEventListener('click', function() {
        currentQuestion++
        
        if (currentQuestion < quizQuestions.length) {
            loadQuestion()
        } else {
            showFinalResults()
        }
    })
    restartButton.addEventListener('click', function() {
        currentQuestion = 0
        score = 0
        
        nextButton.style.display = 'block'
        restartButton.style.display = 'none'
        loadQuestion()
    })
    loadQuestion()
})