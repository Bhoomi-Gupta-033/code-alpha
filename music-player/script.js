const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');
const playlistEl = document.getElementById('playlist');
const coverImg = document.getElementById('cover');
const body = document.body;

const songs = [
  {title:"Song 1", artist:"Artist 1", src:"songs/song1.mp3", cover:"songs/cover1.jpg", bg:"#ff7e5f,#feb47b"},
  {title:"Song 2", artist:"Artist 2", src:"songs/song2.mp3", cover:"songs/cover2.jpg", bg:"#6a11cb,#2575fc"},
  {title:"Song 3", artist:"Artist 3", src:"songs/song3.mp3", cover:"songs/cover3.jpg", bg:"#43cea2,#185a9d"}
];

let currentSongIndex = 0;
let isPlaying = false;

// Load playlist
songs.forEach((song,index)=>{
  const li = document.createElement('li');
  li.textContent = `${song.title} - ${song.artist}`;
  li.addEventListener('click',()=>{
    loadSong(index);
    playSong();
  });
  playlistEl.appendChild(li);
});

// Load song
function loadSong(index){
  currentSongIndex = index;
  const song = songs[index];
  audio.src = song.src;
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  coverImg.src = song.cover;
  body.style.background = `linear-gradient(135deg, ${song.bg})`;
  updateActiveSong();
}

// Play/Pause
function playSong(){
  isPlaying = true;
  audio.play();
  playBtn.innerHTML = '⏸️';
  coverImg.classList.add('playing');
}
function pauseSong(){
  isPlaying = false;
  audio.pause();
  playBtn.innerHTML = '▶️';
  coverImg.classList.remove('playing');
}

playBtn.addEventListener('click',()=>{
  isPlaying?pauseSong():playSong();
});

// Next/Prev
nextBtn.addEventListener('click',()=>{
  currentSongIndex = (currentSongIndex+1)%songs.length;
  loadSong(currentSongIndex);
  playSong();
});
prevBtn.addEventListener('click',()=>{
  currentSongIndex = (currentSongIndex-1+songs.length)%songs.length;
  loadSong(currentSongIndex);
  playSong();
});

// Update progress
audio.addEventListener('timeupdate',()=>{
  const progressPercent = (audio.currentTime/audio.duration)*100;
  progressBar.value = progressPercent || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

// Seek
progressBar.addEventListener('input',()=>{
  audio.currentTime = (progressBar.value/100)*audio.duration;
});

// Volume
volumeSlider.addEventListener('input',()=>{
  audio.volume = volumeSlider.value;
});

// Format time
function formatTime(time){
  if(isNaN(time)) return "0:00";
  const minutes = Math.floor(time/60);
  const seconds = Math.floor(time%60);
  return `${minutes}:${seconds<10?"0"+seconds:seconds}`;
}

// Highlight active
function updateActiveSong(){
  const lis = playlistEl.querySelectorAll('li');
  lis.forEach((li,i)=>li.classList.toggle('active',i===currentSongIndex));
}

// Autoplay next
audio.addEventListener('ended',()=>nextBtn.click());

// Load first
loadSong(currentSongIndex);
