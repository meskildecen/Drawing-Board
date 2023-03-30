// Obter elementos HTML
const canvas = document.getElementById('tela');
const colorButtons = document.querySelectorAll('.color');

// Configurar contexto 2D
const ctx = canvas.getContext('2d');

// Configurar cor inicial
let currentColor = 'black';

// Adicionar evento de clique para cada botão de cor
colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover classe 'active' de todas as cores
        colorButtons.forEach(b => b.classList.remove('active'));

        // Definir cor atual e adicionar classe 'active' ao botão clicado
        currentColor = button.getAttribute('data-color');
        button.classList.add('active');
    });
});

// Variáveis para controlar desenho de linhas
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Lista de pontos desenhados
let points = [];

// Adicionar eventos de mousedown, mousemove e mouseup para desenhar linhas contínuas
canvas.addEventListener('mousedown', event => {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;

    // Limpar lista de pontos se usuário começar a desenhar novamente
    if (points.length === 0) {
        points.push([]);
    }
});

canvas.addEventListener('mousemove', event => {
    if (isDrawing) {
        const x = event.offsetX;
        const y = event.offsetY;

        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Adicionar pontos à lista
        const currentSet = points[points.length - 1];
        currentSet.push({ x, y, color: currentColor });

        lastX = x;
        lastY = y;
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;

    // Adicionar novo conjunto de pontos à lista
    points.push([]);
});

// Adicionar evento de teclado para desfazer (Ctrl + Z)
document.addEventListener('keydown', event => {
    if (event.ctrlKey && event.key === 'z') {
        event.preventDefault();

        // Remover último conjunto de pontos da lista
        const lastSet = points.pop();

        // Limpar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Desenhar pontos restantes
        points.forEach(set => {
            ctx.strokeStyle = set[0].color;
            ctx.beginPath();
            set.forEach((point, index) => {
                if (index === 0) {
                    ctx.moveTo(point.x, point.y);
                } else {
                    ctx.lineTo(point.x, point.y);
                }
            });
            ctx.stroke();
        });

        // Adicionar conjunto removido de volta à lista
        if (lastSet) {
            points.push(lastSet);
        }
    }
});