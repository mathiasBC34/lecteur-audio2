let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');
let body = document.querySelector('.bodyy')

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track'); 

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let stop_btn = document.querySelector('.fa-stop-circle');
let curr_track = document.createElement('audio');
let reloadIcon = document.querySelector('.fa-refresh');
let reloadButton = document.querySelector('.reload');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;
let isplayreturn = false;

const music_liste = [
    {
        img : 'images/DOOM.jpg',
        artist : 'DOOM_OST',
        music : 'music/DOOM_OST.mp3'
    },
    {
        img : 'images/doom-eternal.jpg',
        artist : 'DOOM ETERNAL',
        music : 'music/DOOM_ETERNAL.mp3'
    },
    {
        img : 'images/halo1.jpg',
        artist : 'HALO 1',
        music : 'music/HALO1.mp3'
    },
    {
        img : 'images/halo2.jpg',
        artist : 'HALO 2',
        music : 'music/Halo2.mp3'
    },
    {
        img : 'images/halo3.jpg',
        artist : 'HALO 3',
        music : 'music/Halo3.mp3'
    },
    {
        img : 'images/fond-ecran-minecraft-steve-champs.jpg',
        artist : 'minecraft',
        music : 'music/Minecraft theme song (5 Minutes).mp3'
    },
    {
        img : 'images/voit.jpg',
        artist : 'only',
        music : 'music/1nonly - Step Back! ft. SXMPRA (Official Lyric Video).mp3'
    },
    {
        img : 'images/bf4.jpg',
        artist : 'Battlefield 4',
        music : 'music/Battlefield 4 Warsaw Theme.mp3'
    },
    {
        img : 'images/arcane.jpg',
        artist : 'Arcane',
        music : 'music/Imagine Dragons & JID - Enemy (from the series Arcane League of Legends)  Official Music Video.mp3'
    },
    {
        img : 'images/lol.jpg',
        artist : 'lol',
        music : 'music/Lil Nas X - STAR WALKIN (League of Legends Worlds Anthem).mp3'
    },
    {
        img : 'images/kino.jpg',
        artist : 'kino',
        music : 'music/115.mp3'
    },
    {
        img : 'images/tranzit.jpg',
        artist : 'tranzit',
        music : 'music/Carrion (Tranzit song) Kevin Sherwood - Lyrics [OFFICIAL].mp3'
    },
    {
        img : 'images/origine.jpg',
        artist : 'origine',
        music : 'music/Archangel - Elena Siegman, Malukah, Clark S. Nova - Lyrics [Official].mp3'
    },
    {
        img : 'images/theGiante.jpg',
        artist : 'Giant',
        music : 'music/Beauty of Annihilation REMIX COD BO III.mp3'
    },
    {
        img : 'images/gorod.webp',
        artist : 'gorod',
        music : 'music/(Ace of Spades - Motorhead) Gorod Krovi Intro - Music Only.mp3'
    },
    {
        img : 'images/revelation.png',
        artist : 'revelation',
        music : 'music/The Gift Elena Siegman - lyrics [OFFICIAL].mp3'
    },
    {
        img : 'images/diemachine.jpg',
        artist : 'die machine',
        music : 'music/Alone [OFFICIAL] - Clark S. Nova - lyrics - Die Maschine song.mp3'
    },
    {
        img : 'images/194-1944233_call-of-duty-zombies-chronicles-ascension.jpg',
        artist : 'accension',
        music : 'music/Beauty of Annihilation - Elena Siegman - Lyrics [Official].mp3'
    },
    {
        img : 'images/Moon2.webp',
        artist : 'MOON',
        music : 'music/Coming Home - Elena Siegman (Moon Easter Egg song) Lyrics [OFFICIAL].mp3'
    },
    {
        img : 'images/zombiesshangrila1.webp',
        artist : 'shangrila',
        music : 'music/Pareidolia - Elena Siegman - Lyrics [Official].mp3'
    },
    
];

function go() {
    
}


loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_liste[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_liste[track_index].img + ")";
    body.style.backgroundImage = "url(" + music_liste[track_index].img + ")";
    track_name.textContent = music_liste[track_index].name;
    track_artist.textContent = music_liste[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_liste.length;

    updateTimer = setInterval(setUpdate, 1000);
}

reloadButton.addEventListener('click', e => {
    curr_track.onended = function playReload() {
        curr_track.removeEventListener('ended', nextTrack);
            curr_track.currentTime = 0;
            curr_track.play();
    }
})


function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function randomTracks() {
    isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
    isRandom = true;
    randomIcon.classList.add('randomActive');
}

function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}

function repeatTrack() {
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}


// debut du bouton stop
stop_btn.addEventListener('click', randomTrack);
/**
 * la fonction met en pause en ciblent l'icon stop
 */
function randomTrack(){
    curr_track.pause();
    curr_track.currentTime = 0;
    // play.setAttribute('fas fa-stop-circle fa-2x');
}
// fin bouton stop


/**
 * la function repeattrack gère le bouton répéter 
 */
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}

/**
 * cette function prend entre la function playtrack quand la muisque est joué et pausetrack quand la musique est en pause 
 */
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}

/**
 * elle prend en compte le bouton play et fait apparaitre le bouton pause
 */
function playTrack(){
    curr_track.play();
    isPlaying = true;
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
/**
 * elle prend en compte le bouton pause et fait apparaitre le bouton play
 */
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
/**
 * passe à la musique suivante
 */
function nextTrack(){
    if(track_index < music_liste.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_liste.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_liste.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
/**
 * revient à la muisque précédente
 */
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_liste.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
/**
 * cela track a quelle temps est la vidéo
 */
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
let actualTime = curr_track.duration * (seek_slider.value / 100);
/**
 * controle le volume
 */
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
/**
 * durée de la video pour le bouton
 */
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

function backwardFast() {
    isplayreturn ? pauseReload() : playReload();
}

function playReload() {
    let actutemps = curr_track.currentTime;
    if (actutemps == curr_track.duration-1) {
        curr_track.currentTime = 0;
        console.log('OK')
        curr_track.play();
        
    }
    else {
        console.log('merde');
    }
}

function pauseReload() {
    isplayreturn = false;
    reloadIcon.classList.remove('reload');
}