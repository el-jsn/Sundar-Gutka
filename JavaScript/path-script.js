const play = document.querySelector('#play');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const audio = document.querySelector('audio');


play.addEventListener('click', () => {
  if(audio.paused){
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
    audio.play();
  }else{
    play.classList.add('fa-play');
    play.classList.remove('fa-pause');
    audio.pause();
  }
  
});

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;  
    if (progressPercent === 100) {
      play.classList.remove('fa-pause');
      play.classList.add('fa-play');
    }
  }


function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);



