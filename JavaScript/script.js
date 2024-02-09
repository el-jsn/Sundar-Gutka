const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

//Song titles

const songs = ['Aar Nanak Paar Nanak', 'Dhiaan Dhar Mehsoos Kar', 'Faiz E Noor','Ab Hum Chali','Amrit Bani Har Har Teri','Apni Mehar Kar','Dhan Dhan Baba','Dhan Guru Nanak','Gun Gaanvan Din Raat','Ik Onkar Nanak','Koi Bole Ram Ram','Lakh Khushian Patshahian','Nanak Aadh Jugaadh Jiyo','Sabh Te Vada Satgur Nanak','Satguru Hoye Dayaal','Satguru Mera Poora','So Satgur Pyara Mere Naal Hai','Teg Bahadar Simriey','Vin Boleya Sabh Kish Janda','Visar Naahi Datar','Waheguru','Waheguru Waheguru','So Satgur Pyara Mere Naal Hao'];

let songIndex = Math.floor(Math.random() * songs.length);

loadSong(songs[songIndex]);

function loadSong(song) {
    title.innerText = song;
    audio.src = `../Kirtan/${song}.mp3`;
    cover.src = `../img/covers/${song}.jpeg`;
    cover.onerror = function(){
        cover.src = '../img/khanda.png';
    }
}

function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    audio.pause();
}

function prevSong(){
    songIndex--;

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

function nextSong(){
    songIndex++;

    if(songIndex > songs.length - 1){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function playSongAtIndex(index) {
    songIndex = index;
    loadSong(songs[songIndex]);
    playSong();
}




//Event Listeners
playBtn.addEventListener('click', ()=> {
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);

songs.forEach((song, index) => {
    const songListItem = document.createElement('li');
    songListItem.textContent = song;
    songListItem.onclick = () => playSongAtIndex(index);
    document.querySelector('.song-list ul').appendChild(songListItem);
});



