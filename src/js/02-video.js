import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const timeFromLocalStorage = localStorage.getItem('videoplayer-current-time');
const writeCurrentPlayerTime = throttle(seconds => {
  localStorage.setItem('videoplayer-current-time', seconds);
}, 2000);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

if (timeFromLocalStorage != null) {
  player
    .setCurrentTime(timeFromLocalStorage)
    .then(function (seconds) {
      // seconds = the actual time that the player seeked to
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
}
player.on('timeupdate', function (data) {
  // data is an object containing properties specific to that event

  player
    .getCurrentTime()
    .then(function (seconds) {
      //console.log(seconds);
      writeCurrentPlayerTime(seconds);
    })
    .catch(function (error) {
      // an error occurred
    });
});
