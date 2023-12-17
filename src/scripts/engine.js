const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input");

const mappedKeys = [];
const audio = new Audio();

pianoKeys.forEach((key) => {
    key.addEventListener('click', () => playTune(key.dataset.key));
    mappedKeys.push(key.dataset.key);
})

function playTune(key) {
    audio.src = "src/tunes/"+key+".wav";
    audio.play();

    const clickedKey = document.querySelector('.piano-keys .key[data-key="'+key+'"]');
    // clickedKey.activeElement.active();
    clickedKey.classList.add("active");

    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 150);
}

document.addEventListener("keydown", (event) => {
    if (mappedKeys.includes(event.key)) {
        playTune(event.key.toLowerCase());
    }
});

volumeSlider.addEventListener("change", handleVolume);

function handleVolume(event) {
    audio.volume = event.target.value;
}

keysCheck.addEventListener('change', showHideKeys);

function showHideKeys() {
    pianoKeys.forEach((key) => {
        key.classList.toggle("hide");
    });
}