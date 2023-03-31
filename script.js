// Declaração e inicialização de variáveis
let currentColor = 'black'; // define a cor atual como preto
let canDraw = false; // define a variável para verificar se é possível desenhar na tela
let screen = document.querySelector('#tela'); // seleciona o elemento com o id "tela"
let ctx = screen.getContext('2d'); // define o contexto de renderização 2D da tela
//Events

// Event listeners para interação com o usuário
// Itera sobre todos os elementos com a classe "color" dentro do elemento com a classe "colorArea"
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);// adiciona um evento de clique para cada elemento encontrado
});
screen.addEventListener('mousedown', mouseDownEvent); // adiciona um evento de clique do mouse para a tela
screen.addEventListener('mousemove', mouseMoveEvent); // adiciona um evento de movimento do mouse para a tela
screen.addEventListener('mouseup', mouseUpEvent); // adiciona um evento de soltura do mouse para a tela
document.querySelector('.clear').addEventListener('click', clearScreen); // adiciona um evento de clique do botão "clear" para limpar a tela

// Funções para manipulação do desenho
function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color');// obtém o valor do atributo "data-color" do elemento clicado
    currentColor = color;// define a cor atual com o valor obtido

    document.querySelector('.color.active').classList.remove('active'); // remove a classe "active" do elemento de cor ativa atualmente
    e.target.classList.add('active'); // adiciona a classe "active" ao elemento clicado

};
function mouseDownEvent(e) {
    canDraw = true  // define a variável como verdadeira para permitir o desenho na tela
    mouseX = e.pageX - screen.offsetLeft;   // define a posição X inicial do mouse em relação à tela
    mouseY = e.pageY - screen.offsetTop;    // define a posição X inicial do mouse em relação à tela
}
function mouseMoveEvent(e) {
    if (canDraw) {  // verifica se é possível desenhar na tela
        draw(e.pageX, e.pageY); // chama a função de desenho, passando a posição atual do mouse como parâmetro
    }
}
function mouseUpEvent() {
    canDraw = false;    // define a variável como falsa para impedir o desenho na tela
}

function draw(x, y) {
    let pointX = x - screen.offsetLeft;  // define a posição X atual do mouse em relação à tela
    let pointY = y - screen.offsetTop;  // define a posição Y atual do mouse em relação à tela

    ctx.beginPath();  // inicia um novo caminho de desenho
    ctx.lineWidth = 5;  // define a largura da linha para 5 pixels
    ctx.lineJoin = "round";  // define o estilo das junções de linha como arredondado
    ctx.moveTo(mouseX, mouseY);  // move o ponto inicial do caminho para as coordenadas (mouseX, mouseY)
    ctx.lineTo(pointX, pointY);  // adiciona uma linha do ponto atual do caminho para as coordenadas (pointX, pointY)
    ctx.closePath();  // fecha o caminho de desenho atual
    ctx.strokeStyle = currentColor;  // define a cor do traço que será usada para desenhar
    ctx.stroke();  // desenha o caminho de desenho atual

    mouseX = pointX;  // atualiza a coordenada X do mouse com a posição atual do mouse em relação à tela
    mouseY = pointY;  // atualiza a coordenada Y do mouse com a posição atual do mouse em relação à tela
}

function clearScreen() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);  // redefine a transformação do contexto de renderização para sua matriz de identidade
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);  // limpa todo o conteúdo do canvas (área de desenho)
}