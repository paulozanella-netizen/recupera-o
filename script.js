// Estado inicial do jogo
let gameState = {
    nivel: 1,
    pontos: 0,
    agua: 70,
    solo: 65,
    capital: 80,
    currentQuestionIndex: 0
};

// Banco de dados de perguntas - Foco em Agro Forte e Sustentabilidade
const perguntasAgroForte = [
    {
        titulo: "Agricultura de Precisão",
        descricao: "Uma grande seca ameaça a região. Deseja investir em sensores IoT no solo e monitoramento por drones para mapear exatamente a necessidade hídrica da lavoura?",
        imagem: "https://images.unsplash.com/photo-1560493450-b15b2c90f438?auto=format&fit=crop&w=800&q=80",
        opcoes: [
            { 
                texto: "Sim, investir em tecnologia de ponta. (Custo Alto, Alta Eficiência)", 
                efeito: { capital: -30, agua: +20, solo: +15, pontos: +25 } 
            },
            { 
                texto: "Não, manter o manejo visual tradicional para economizar.", 
                efeito: { capital: 0, agua: -20, solo: -10, pontos: +5 } 
            }
        ]
    },
    {
        titulo: "Biotecnologia e Sementes",
        descricao: "Chegou o momento de comprar as sementes para a próxima safra. O mercado oferece sementes biotecnológicas de alta performance resistentes à escassez de água.",
        imagem: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80",
        opcoes: [
            { 
                texto: "Adotar sementes geneticamente melhoradas. (Garante a Safra)", 
                efeito: { capital: -40, agua: +25, solo: +5, pontos: +30 } 
            },
            { 
                texto: "Utilizar sementes convencionais mais baratas.", 
                efeito: { capital: +10, agua: -30, solo: -15, pontos: +10 } 
            }
        ]
    },
    {
        titulo: "Infraestrutura de Armazenamento",
        descricao: "Sua colheita mecanizada foi um sucesso recorde! No entanto, os preços de mercado estão baixos no momento. O que fazer?",
        imagem: "https://images.unsplash.com/photo-1595275372297-f7d6437db97d?auto=format&fit=crop&w=800&q=80",
        opcoes: [
            { 
                texto: "Construir silos inteligentes com atmosfera controlada para vender no futuro por um preço melhor.", 
                efeito: { capital: -35, agua: 0, solo: 0, pontos: +40 } // O bônus financeiro vem depois
            },
            { 
                texto: "Vender imediatamente para atravessadores locais para fazer caixa rápido.", 
                efeito: { capital: +20, agua: 0, solo: 0, pontos: +15 } 
            }
        ]
    },
    {
        titulo: "Manejo Biológico de Pragas",
        descricao: "Surgiu um alerta de infestação de lagartas na região. Como o Agro Forte deve agir para proteger as plantas sem degradar o solo?",
        imagem: "https://images.unsplash.com/photo-1464241353293-0f4ec87ffd1c?auto=format&fit=crop&w=800&q=80",
        opcoes: [
            { 
                texto: "Aplicar defensivos biológicos (macro e microrganismos benéficos).", 
                efeito: { capital: -15, agua: 0, solo: +20, pontos: +35 } 
            },
            { 
                texto: "Utilizar defensivos químicos pesados tradicionais de baixo custo.", 
                efeito: { capital: -5, agua: -10, solo: -25, pontos: +10 } 
            }
        ]
    }
];

// Atualizar elementos visuais na tela
function updateDOM() {
    // Limitar recursos entre 0 e 100
    gameState.agua = Math.max(0, Math.min(100, gameState.agua));
    gameState.solo = Math.max(0, Math.min(100, gameState.solo));
    gameState.capital = Math.max(0, Math.min(100, gameState.capital));

    // Atualizar textos e níveis
    document.getElementById('level-val').innerText = gameState.nivel;
    document.getElementById('points-val').innerText = gameState.pontos;
    
    document.getElementById('txt-agua').innerText = gameState.agua + "%";
    document.getElementById('txt-solo').innerText = gameState.solo + "%";
    document.getElementById('txt-capital').innerText = gameState.capital + "%";

    // Atualizar barras de progresso
    document.getElementById('bar-agua').style.width = gameState.agua + "%";
    document.getElementById('bar-solo').style.width = gameState.solo + "%";
    document.getElementById('bar-capital').style.width = gameState.capital + "%";

    // Verificar se o jogador perdeu
    if (gameState.agua <= 0 || gameState.solo <= 0 || gameState.capital <= 0) {
        endGame(false);
    }
}

// Carregar pergunta na tela
function loadQuestion() {
    if (gameState.currentQuestionIndex >= perguntasAgroForte.length) {
        endGame(true); // Se acabaram as perguntas, o jogador venceu
        return;
    }

    let q = perguntasAgroForte[gameState.currentQuestionIndex];
    
    // Atualizar cartão de cenário
    document.getElementById('scenario-title').innerText = `Decisão: ${q.titulo}`;
    document.getElementById('scenario-desc').innerText = q.descricao;
    document.getElementById('scenario-img').src = q.imagem;

    // Limpar e construir opções
    const container = document.getElementById('options-container');
    container.innerHTML = "";

    q.opcoes.forEach((opcao, index) => {
        let btn = document.createElement('button');
        btn.className = "btn-option";
        btn.innerText = opcao.texto;
        btn.onclick = () => handleChoice(opcao.efeito);
        container.appendChild(btn);
    });
}

// Processar a escolha do jogador
function handleChoice(efeito) {
    gameState.agua += efeito.agua;
    gameState.solo += efeito.solo;
    gameState.capital += efeito.capital;
    gameState.pontos += efeito.pontos;

    // Se investiu no silo inteligente na Q3, dá um retorno extra de capital na rodada seguinte
    if (gameState.currentQuestionIndex === 2 && efeito.pontos === 40) {
        gameState.capital += 60; // Retorno financeiro do armazenamento inteligente
    }

    gameState.currentQuestionIndex++;
    
    // Avançar de nível visual a cada 2 perguntas
    if (gameState.currentQuestionIndex === 2) {
        gameState.nivel = 2;
        document.getElementById('scenario-climate').innerText = "Clima: Transição e Otimização";
    }

    updateDOM();
    
    // Se o jogo não acabou pelas regras do updateDOM, carrega a próxima
    if (gameState.agua > 0 && gameState.solo > 0 && gameState.capital > 0) {
        loadQuestion();
    }
}

// Finalizar o jogo (Vitória ou Derrota)
function endGame(isVictory) {
    const oracleCard = document.getElementById('oracle-section');
    if (isVictory) {
        document.getElementById('scenario-title').innerText = "🏆 Vitória! Fazenda de Elite";
        document.getElementById('scenario-desc').innerText = `Parabéns! Você consolidou o Agro Forte. Sua propriedade utiliza tecnologia de ponta, é altamente produtiva e mantém o equilíbrio sustentável. Pontuação Final: ${gameState.pontos} pontos!`;
        document.getElementById('scenario-img').src = "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=800&q=80";
        oracleCard.innerHTML = "<h3>Fim de Jogo</h3><p>Sua gestão foi exemplar para o futuro do planeta.</p>";
    } else {
        document.getElementById('scenario-title').innerText = "❌ Falência do Ecossistema";
        document.getElementById('scenario-desc').innerText = "Infelizmente, sua estratégia falhou em equilibrar os recursos. Sem capital, água ou solo saudável, a produção parou. Lembre-se: o Agro Forte depende de decisões inteligentes e tecnologia aplicada de forma consciente.";
        document.getElementById('scenario-img').src = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80";
        oracleCard.innerHTML = "<h3>Game Over</h3><p>Tente novamente balancear seus investimentos.</p>";
    }
}

// Inicialização do Jogo ao carregar a página
window.onload = () => {
    updateDOM();
    loadQuestion();
};
