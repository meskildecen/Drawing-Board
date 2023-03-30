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

// Adicionar evento de clique para desenhar no canvas
canvas.addEventListener('click', event => {
  // Obter posição do clique em relação ao canvas
  const x = event.offsetX;
  const y = event.offsetY;
  
  // Desenhar um círculo na posição do clique com a cor atual
  ctx.fillStyle = currentColor;
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, 2 * Math.PI);
  ctx.fill();
});