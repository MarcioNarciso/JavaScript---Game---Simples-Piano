const state = {
    view : {
        pianoKeys : document.querySelectorAll(".piano-keys .key"),
        volumeSlider : document.querySelector(".volume-slider input"),
        keysCheck : document.querySelector(".keys-check input")
    },
    values : {
        audio : new Audio(),
        mappedKeys : [],
    }
};

function initializePianoKeys() {
    
    state.view.pianoKeys.forEach((key) => {
        // Ao clicar na tecla do piano, torará um som correspondente e adicionará
        // efeitos visuais às teclas
        key.addEventListener('mousedown', (event) => {
            handleKeyDown(key.dataset.key);
        });

        // Ao soltar o clique na tecla do piano, removerá os efeitos visuais
        key.addEventListener('mouseup', (event) => {
            handleKeyUp(key.dataset.key);
        });

        // Ao passar o mouse pra outra tecla do piano, removerá os efeitos visuais
        key.addEventListener('mouseleave', (event) => {
            handleKeyUp(key.dataset.key);
        });

        // Mapeia as teclas do piano
        state.values.mappedKeys.push({
            key: key.dataset.key.toLowerCase(),
            isHeld : false
        });
    });

    /**
     * Quando o jogador apertar uma tecla no teclado correspondente à tecla do
     * piano, torará um som.
     * E quanto o jogador manter a tecla pressionada, não emitirá o som.
     */
    document.addEventListener("keydown", (event) => {
        // Tecla pressionada pelo jogador
        const pressedKey = event.key.toLowerCase();
        
        handleKeyDown(pressedKey);
    });

    /**
     * Quando o jogador soltar a tecla pressionada, libera a tecla do piano para
     * emitir som novamente na próxima vez que a ela for pressionada.
     */
    document.addEventListener("keyup", (event) => {
        // Tecla pressionada pelo jogador
        const pressedKey = event.key.toLowerCase();
        
        handleKeyUp(pressedKey);
    });
}

function playTune(key) {
    state.values.audio.src = "src/tunes/"+key+".wav";
    state.values.audio.play();
}

function showHideKeys() {
    state.view.pianoKeys.forEach((key) => {
        key.classList.toggle("hide");
    });
}

function handleVolume(event) {
    state.values.audio.volume = event.target.value;
}

function handleKeyDown(key) {
    // Tecla do piano correspondente a tecla pressionada
    const pressedPianoKey = state.values.mappedKeys.find((mappedKey) => mappedKey.key === key);

    if (pressedPianoKey && ! pressedPianoKey.isHeld) {
        playTune(key);
        pressedPianoKey.isHeld = true;

        // Adiciona o efeito de tecla pressionada no piano
        const clickedKey = document.querySelector('.piano-keys .key[data-key="'+key+'"]');
        clickedKey.classList.add("active");
    }
}

function handleKeyUp(key) {
    // Tecla do piano correspondente a tecla pressionada
    const pressedPianoKey = state.values.mappedKeys.find((mappedKey) => mappedKey.key === key);

    if (pressedPianoKey) {
        pressedPianoKey.isHeld = false;

        // Remove o efeito de tecla pressionada no piano
        const clickedKey = document.querySelector('.piano-keys .key[data-key="'+key+'"]');
        clickedKey.classList.remove("active");
    }
}

function initializeListeners() {
    initializePianoKeys();

    // Inicializa o listener do controle de volume
    state.view.volumeSlider.addEventListener("change", handleVolume);

    // Inicializa o listener do switch de teclas
    state.view.keysCheck.addEventListener('change', showHideKeys);
}

function initializeVolume() {
    state.values.audio.volume = state.view.volumeSlider.value;
}

function init() {
    initializeListeners();
    initializeVolume();
}

init();