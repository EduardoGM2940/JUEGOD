let puntajeJugador = 0;
let puntajeComputadora = 0;
let rondaActual = 0;
let totalRondas = 5;
let juegoIniciado = false;

// Control de sonido
let isMuted = false;
const backgroundMusic = document.getElementById("background-music");

function iniciarJuegoConMusica() {
    // Cerrar el modal
    document.getElementById("instrucciones-modal").style.display = "none";

    // Reproducir la música de fondo si está pausada
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    }
}

function iniciarJuego() {
    puntajeJugador = 0;
    puntajeComputadora = 0;
    rondaActual = 0;
    totalRondas = parseInt(document.getElementById("num-rondas").value);
    juegoIniciado = true;
    document.getElementById("num-rondas").disabled = true;
    document.getElementById("resultado").innerText = "";
    document.getElementById("puntaje-acumulado").innerText = "";
    document.getElementById("gif-img").style.display = "none"; // Ocultar el GIF al iniciar
}

function calcularResultado() {
    if (!juegoIniciado) {
        iniciarJuego();
    }

    if (rondaActual >= totalRondas) {
        document.getElementById("resultado").innerText = "El juego ha terminado. Por favor, reinicia el juego.";
        return;
    }

    const player = document.getElementById("player-strategy").value;
    const strategies = player === "lilo" ? ["stitch", "nani"] : ["leroy", "lilo"];
    const computer = strategies[Math.floor(Math.random() * strategies.length)];
    let resultado = "";

    const payoff = {
        "lilo-lilo": [5, 5],
        "lilo-stitch": [0, 10],
        "stitch-lilo": [10, 0],
        "stitch-stitch": [-1, -1],
        "stitch-leroy": [-1, -1],
        "lilo-nani": [5, 5],
        "nani-lilo": [5, 5],
        "leroy-stitch": [-1, -1],
        "leroy-lilo": [-1, -1]
    };

    const gifs = {
        "lilo-lilo": "https://i.gifer.com/SAzs.gif",
        "lilo-stitch": "https://i.pinimg.com/originals/28/0e/bc/280ebc35f36d9571f08cd61ab422235d.gif",
        "stitch-lilo": "https://i.makeagif.com/media/5-18-2021/BVauIE.gif",
        "stitch-stitch": "https://64.media.tumblr.com/c72cbb396d266d601c7e6327f716691d/tumblr_pas1v4vVzV1x5kx98o3_400.gif",
        "stitch-leroy": "https://64.media.tumblr.com/c72cbb396d266d601c7e6327f716691d/tumblr_pas1v4vVzV1x5kx98o3_400.gif",
        "lilo-nani": "https://64.media.tumblr.com/2dd5c2957105b7635f677c0e25028d1e/f3ad5e58692f6fc5-1e/s540x810/e0643498928245259fe9d04d0e880fff5a156e6e.gifv",
        "leroy-lilo": "https://64.media.tumblr.com/c72cbb396d266d601c7e6327f716691d/tumblr_pas1v4vVzV1x5kx98o3_400.gif",
        "leroy-stitch": "https://64.media.tumblr.com/c72cbb396d266d601c7e6327f716691d/tumblr_pas1v4vVzV1x5kx98o3_400.gif"
    };

    const key = `${player}-${computer}`;
    const [playerPoints, computerPoints] = payoff[key] || [0, 0];
    resultado = `Jugador: ${player} vs Computadora: ${computer}\n`;

    puntajeJugador += playerPoints;
    puntajeComputadora += computerPoints;

    const gifURL = gifs[key];
    document.getElementById("gif-img").src = gifURL;
    document.getElementById("gif-img").style.display = "block";

    document.getElementById("resultado").innerText = resultado;
    document.getElementById("puntaje-acumulado").innerText = `Puntaje: Jugador - ${puntajeJugador} | Computadora - ${puntajeComputadora}`;
    
    rondaActual++;
}

function reiniciarJuego() {
    puntajeJugador = 0;
    puntajeComputadora = 0;
    rondaActual = 0;
    juegoIniciado = false;
    document.getElementById("num-rondas").disabled = false;
    document.getElementById("resultado").innerText = "";
    document.getElementById("puntaje-acumulado").innerText = "";
    document.getElementById("gif-img").style.display = "none";
}

function toggleMute() {
    isMuted = !isMuted;
    backgroundMusic.muted = isMuted;
    document.getElementById("mute-btn").innerText = isMuted ? "Activar Sonido" : "Silenciar";
}
