// Estado interno estável do jogo
let gameState = {
    nivel: 1,
    pontos: 0,
    agua: 70,
    solo: 65,
    capital: 80,
    currentQuestionIndex: 0,
    isGameOver: false
};

// Banco de dados de perguntas balanceadas sobre o Agro Forte de Alta Produtividade
const perguntasAgroForte = [
    {
        titulo: "Agricultura de Precisão (IoT)",
        descricao: "Uma forte seca se aproxima. Para não desperdiçar recursos, você deseja investir em sensores de solo conectados e monitoramento por drones para aplicar água e nutrientes apenas onde é necessário?",
        imagem: "https://images.unsplash.com/photo-1560493450-b15b2c90f438?auto=format&fit=crop&w=800&q=80",
        opcoes: [
            { 
                texto: "Sim, investir em tecnologia de precisão. (Custo Alto, Alta Economia hídrica futura)", 
                efeito: { capital: -30, agua: +20, solo: +15, pontos: +25 } 
            },
            { 
                texto: "Não, manter o manejo visual e manual tradicional para economizar capital.", 
                efeito: { capital: 0, agua: -25, solo: -10, pontos: +5 } 
            }
        ]
    },
    {
        titulo: "Biotecnologia na Safra",
        descricao: "É hora de escolher as sementes da plantação. O laboratório oferece uma nova linhagem biotecnológica altamente resistente ao estresse térmico e à escassez.",
        imagem: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80",
        opcoes: [
            { 
                texto: "Adotar sementes biotecnológicas de alta performance. (Protege a produtividade)", 
                efeito: { capital: -35, agua: +15, solo: +5, pontos: +30 } 
            },
            { 
                texto: "Comprar sementes convencionais comuns mais baratas.", 
                efeito: { capital: +15, agua: -30, solo: -15, pontos: +10 } 
            }
        ]
    },
    {
        titulo: "Armazenamento Inteligente (Silos)",
        descricao: "Sua colheita automatizada foi recorde! Porém, o preço de venda atual de mercado está muito baixo no momento. Qual a sua estratégia logística?",
        imagem: "https://images.unsplash.com/photo-1595275372297-f7d6437db97d?auto=format&fit=crop&w=800&q=80",
        opcoes: [
            { 
                texto: "Construir silos modernos com atmosfera controlada para estocar e vender na alta dos preços.", 
                efeito: { capital: -35, agua: 0, solo: 0, pontos: +45 } 
            },
            { 
                texto: "Vender imediatamente para intermediários para recuperar dinheiro rápido.", 
                efeito: { capital: +20, agua: -5, solo: 0, pontos: +15 } 
            }
        ]
    },
    {
        titulo: "Defensivos Biológicos",
        descricao: "Sua equipe detectou focos de lagarta na lavoura. Como o Agro Forte deve agir para combater a ameaça mantendo o solo produtivo e biologicamente ativo?",
        imagem: "https://images.unsplash.com/photo-1464241353293-0f4ec87ffd1c?auto=format&fit=crop&w=800&q=80",
        opcoes: [
            { 
                texto: "Utilizar manejo integrado focado em biodefensivos (inimigos naturais e fungos benéficos).", 
                efeito: { capital: -20, agua: 0, solo: +20, pontos: +40 } 
            },
            { 
                texto: "Aplicar defensivos químicos pesados tradicionais de efeito imediato.", 
                efeito: { capital: -5, agua: -15, solo: -25, pontos: +15 } 
            }
        ]
    }
];

// Atualiza o painel visual das barras e pontuação na interface
function updateDOM() {
    // Garante travar os valores em uma escala aceitável de 0 a 100
    gameState.agua = Math.max(0, Math.min(100, gameState.agua));
    gameState.solo = Math.max(0, Math.min(100, gameState.solo));
    gameState.capital = Math.max(0, Math.min(100, gameState.capital));

    // injeta os valores textuais
    document.getElementById('level-val').innerText = gameState.nivel;
    document.getElementById('points-val').innerText = gameState.pontos;
    
    document.getElementById('txt-agua').innerText = gameState.agua + "%";
    document.getElementById('txt-solo').innerText = gameState.solo + "%";
    document.getElementById('txt-capital').innerText = gameState.capital + "%";

    // Expande ou reduz a largura das barras baseado nos dados atuais
    document.getElementById('bar-agua').style.width = gameState.agua + "%";
    document.getElementById('bar-solo').style.width = gameState.solo + "%";
    document.getElementById('bar-capital').style.width = gameState.capital + "%";

    // Aciona fim de jogo se algum recurso zerar completamente
    if (!gameState.isGameOver && (gameState.agua <= 0 || gameState.solo <= 0 || gameState.capital <= 0)) {
        endGame(false);
    }
}

// Renderiza a pergunta ativa e troca as imagens correspondentes
function loadQuestion() {
    if (gameState.isGameOver) return;

    if (gameState.currentQuestionIndex >= perguntasAgroForte.length) {
        endGame(true); // Se passou por todas as fases mantendo recursos ativos, venceu!
        return;
    }

    let perguntaAtual = perguntasAgroForte[gameState.currentQuestionIndex];
    
    document.getElementById('scenario-title').innerText = `Decisão Estratégica: ${perguntaAtual.titulo}`;
    document.getElementById('scenario-img').src = perguntaAtual.imagem;
    document.getElementById('question-text').innerText = perguntaAtual.descricao;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = "";

    perguntaAtual.opcoes.forEach((opcao) => {
        let btn = document.createElement('button');
        btn.className = "btn-option";
        btn.innerText = opcao.texto;
        btn.onclick = () => handleChoice(opcao.efeito);
        optionsContainer.appendChild(btn);
    });
}

// Aplica modificações numéricas baseadas nas escolhas
function handleChoice(efeito) {
    if (gameState.isGameOver) return;

    gameState.agua += efeito.agua;
    gameState.solo += efeito.solo;
    gameState.capital += efeito.capital;
    gameState.pontos += efeito.pontos;

    // Compensação especial inteligente: se guardou os grãos no silo na Q3, recebe retorno financeiro alto imediato
    if (gameState.currentQuestionIndex === 2 && efeito.pontos === 45) {
        gameState.capital += 55;
    }

    gameState.currentQuestionIndex++;
    
    // Altera o clima dinamicamente ao avançar de fase
    if (gameState.currentQuestionIndex === 2) {
        gameState.nivel = 2;
        document.getElementById('scenario-climate').innerHTML = "<strong>Clima:</strong> Monitorado por Satélites Preditivos";
    }

    updateDOM();
    loadQuestion();
}

// Finaliza a partida gerando telas limpas de vitória ou derrota técnica
function endGame(isVictory) {
    gameState.isGameOver = true;
    const oracleSection = document.getElementById('oracle-section');
    
    if (isVictory) {
        document.getElementById('scenario-title').innerText = "🏆 Vitória! Fazenda de Elite Tecnológica";
        document.getElementById('question-text').innerText = `Parabéns! Você aplicou o conceito de Agro Forte com precisão. Sua propriedade obteve recordes históricos de produção usando automação e biotecnologia sem esgotar o ecossistema. Pontuação Final: ${gameState.pontos} pontos!`;
        document.getElementById('scenario-img').src = "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=800&q=80";
        oracleSection.innerHTML = "<h3>Simulação Encerrada</h3><p style='text-align:center; font-weight:bold; color:var(--primary-color); padding-top:12px;'>Você demonstrou que alta produtividade anda unida ao respeito socioambiental!</p>";
    } else {
        document.getElementById('scenario-title').innerText = "❌ Colapso de Recursos";
        document.getElementById('question-text').innerText = "Sua fazenda esgotou uma de suas bases indispensáveis. Sem manter o equilíbrio financeiro e ambiental, o Agro para. Desenvolva novos planos tecnológicos e tente novamente.";
        document.getElementById('scenario-img').src = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80";
        oracleSection.innerHTML = "<h3>Game Over</h3><button onclick='window.location.reload()' class='btn-option' style='text-align:center; width:100%; border-color:#c62828;'>Tentar Nova Gestão</button>";
    }
}

// Gatilho automático ao abrir o navegador
window.onload = () => {
    updateDOM();
    loadQuestion();
};
