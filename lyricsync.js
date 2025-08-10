const lyricSpans = document.querySelectorAll('#layout #lyrics #lyric-container span');
const audio = document.getElementById('demoAudio');
console.log(lyricSpans);

function highlightLyric() {
  const currentTime = audio.currentTime;
  
  let activeSpan = null;
  for (let i = 0; i < lyricSpans.length; i++) {
    const startTime = parseFloat(lyricSpans[i].dataset.time);
    console.log(startTime);
    const nextTime = i < lyricSpans.length - 1 
      ? parseFloat(lyricSpans[i+1].dataset.time) 
      : audio.duration;
    
    if (currentTime >= startTime && currentTime < nextTime) {
      activeSpan = lyricSpans[i];
      break;
    }
  }
  
  lyricSpans.forEach(span => span.classList.remove('active'));
  if (activeSpan) {
    activeSpan.classList.add('active');
    // Optionally scroll into view:
    activeSpan.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Bind to audio timeupdate
audio.addEventListener('timeupdate', highlightLyric);

// Clicking a lyric jumps to that timestamp
lyricSpans.forEach(span => {
  span.addEventListener('click', () => {
    audio.currentTime = parseFloat(span.dataset.time);
    audio.play();
  });
});


document.querySelectorAll('#demo .song-ref').forEach(ref => {
    ref.addEventListener('click', () => {
      const time = parseFloat(ref.dataset.time);
      
      // Open the lyric section
      openMagazine('lyrics'); 
      
      // Wait for lyrics content to load before seeking
      setTimeout(() => {
        audio.addEventListener('loadedmetadata', () => {
          audio.currentTime = time;
          audio.play();
        }, { once: true });
      }, 10); // adjust delay to match your open() animation/content load time
    });
  });
  

