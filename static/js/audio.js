document.addEventListener('DOMContentLoaded', () => {
  var launch = document.getElementById("playLink");
  var interface = document.getElementById('interface');
  var intro = document.getElementById('introduction');
  var information = document.getElementById('information');
  var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

  launch.onclick = function() {
    interface.style.display = "block";
    launch.style.display = "none";
    intro.style.display = "none";
    information.style.display = "none";
    interface.scrollIntoView(false);
    if (isSafari) {
      document.getElementById('vib').innerHTML = "";
    }

    var tracks = [];
    var results = [];
    var title = document.querySelector('title').innerHTML;
    var loc = 0;
    var userSearch = "";
    var form = document.querySelector('.form-control');
    var audioBlock = document.querySelector('.audio');
    var searchBlock = document.querySelector('#searchDiv');

    var audioContext = new(window.AudioContext || window.webkitAudioContext);
    var sampleBuffer = document.querySelector('.play');
    var sound = document.querySelector('.play');
    var playButton = document.querySelector('.play');
    var stopButton = document.querySelector('.stop');
    var reverseButton = document.querySelector('#direction');
    var previousButton = document.querySelector('.previous');
    var nextButton = document.querySelector('.next');
    var mousepan = false;
    var loop = false;
    var forward = true;
    var playlist = tracks;
    var trackTitle = document.querySelector('.audiotrack');
    var loopButton = document.querySelector('#loop');
    var loopStart = document.querySelector('.loop-start');
    var loopEnd = document.querySelector('.loop-end');
    var loopStartValue = document.querySelector('.loopStart-value');
    var loopEndValue = document.querySelector('.loopEnd-value');
    var playbackSlider = document.querySelector('.playback-slider');
    var playbackRate = document.querySelector('.rate');
    var cutoffSlider = document.querySelector('.cutoff-slider');
    var cutoffValue = document.querySelector('.cutoff');
    var qSlider = document.querySelector('.q-slider');
    var qValue = document.querySelector('.q-value');
    var modSpeedSlider = document.querySelector('.modSpeed-slider');
    var modSpeed = document.querySelector('.modSpeed-value');
    var amplitudeAmountSlider = document.querySelector('.ampMod-slider');
    var amplitudeAmount = document.querySelector('.ampMod-value');
    var playbackModSlider = document.querySelector('.playbackMod-slider');
    var playbackModValue = document.querySelector('.playbackMod-value');
    var filterModSlider = document.querySelector('.filterMod-slider');
    var filterModValue = document.querySelector('.filterMod-value');
    var indication = document.querySelector('#indication');
    var ampModGain = audioContext.createGain();
    var playbackModGain = audioContext.createGain();
    var filterModGain = audioContext.createGain();
    var vca = audioContext.createGain();

  var playing = (playButton.disabled === true);


    document.querySelector('form').addEventListener('submit', searchSubmit);

    function track(trackID, trackName, trackPreview){
      this.trackID = trackID;
      this.name = trackName;
      this.preview = trackPreview;
    };

    function codeSearch() {
      document.querySelector("#search-track").style.display = "inline-block";
      indication.innerHTML = "Search for a sound";
    };

    codeSearch();


    // function to connect to FreeSound caption
    async function freeSound(search) {
      const fields = '&fields=name,id,previews';
      const token = "&token=2HrEIGsIAP3M5LfIqSlfz8xjU4oIGkGLHnhZMeU9";
      var freeSoundQuery = 'https://freesound.org/apiv2/search/text/?query='.concat(search, fields, token);
      const error = new Error("What a shame, no sounds found there, try something else");

      const resp = await fetching(freeSoundQuery);
      const unpacked = await unpack(resp);
      if (unpacked !== false) {
        indication.innerHTML = "Loading...";
        init();
        }
      };

      async function fetching(input) {
        return fetch(input)
         .then((resp) => resp.json()
           .catch(err => {
                    console.err(`'${err}' happened!`);
                    return {};
                }))
           // Transform the data into json
         .then((data) => {
           var searchResults = data;
           return searchResults;
           })
      }

    async function unpack(data) {
      var resultsLength = data.results.length;
      for (let i = 0; i <= resultsLength; i++) {
        try {
          track[i] = new track(data.results[i].id, data.results[i].name, data.results[i].previews['preview-lq-mp3']);
          tracks.push(track[i]);
        }
        catch(err) {
          if (tracks.length === 0) {
            indication.innerHTML = "No tracks found, try again!";
            return false;
          }
        }
    }
  };


    var searched = {};

    var searchCount = 0;

    function searchSubmit() {
      if (searchCount !== 0) {
        stopSound();
      }
      if (form.value !== "") {
        indication.innerHTML = "Searching...";
        loc = 0;
        tracks = [];
        searchCount++;
        searched.msg = form.value;
        userSearch = form.value;
        form.value = "";
        freeSound(userSearch);
        return false
      } else {
        return "unsuccessful";
      }
    };


    async function init() {
      let response = await sampleAssign();
      let loading = await loadSound(sampleURL);
    };

    function sampleAssign() {
        try {
          // console.log(tracks[loc].name);
          // console.log(tracks[loc].preview);
          let trackName = tracks[loc].name;
          sampleURL = tracks[loc].preview;
        }
        catch(err) {
          if (sample.length !== 0) {
          }
        }
        finally {
      }
  }
  };

    playButton.onclick = function () {
        playSound();
    };

    stopButton.onclick = function () {
        stopSound();
    };

    var reverseTasks = [
      _ => new Promise(resolve => {
        stopSound();
        setTimeout(() => {
          resolve();
        }, 300);
      }),
      _ => new Promise(resolve => {
        playSound();
        setTimeout(() => {
          resolve();
        }, 300);
      }),
    ]

    reverseButton.onclick = async function () {
      let checkRev = await reverseSound(document.querySelector('#radio-a').checked);
      var playing = (playButton.disabled === true);
      var stopped = (stopButton.disabled === true);
      if(playing){
        (function iterate(i) {
  	       reverseTasks[i]().then(() => {
      	      // console.log(i + ' done!');
      	       if (reverseTasks[++i]) iterate(i);
             });
           })(0);
        }
      };

    previousButton.onclick = async function () {
      if (loc >= 1) {
        loc--;
      }
      if(loc === 0) {
        previousButton.disabled = true;
      }
      if (tracks.length - loc > 1) {
        nextButton.disabled = false;
      }
      if(playing) {
        let stop = await stopSound();
        playButton.disabled = true;
        indication.innerHTML = 'Loading...' + '<br>'
        let go = await init();
     } else {
       let stop = await stopSound();
       playButton.disabled = true;
       indication.innerHTML = 'Loading...' + '<br>'
       let go = await init();
     }
    };

    nextButton.onclick = async function () {
        loc++;
        previousButton.disabled = false;
        if(loc === tracks.length -1) {
          nextButton.disabled = true;
        }
        if(playing) {
          let disabled = await disableButton(playButton);
          let stop = await stopSound();
          indication.innerHTML = 'Loading...' + '<br>'
          let go = await init();
       } else {
         let disabled = await disableButton(playButton);
         let stop = await stopSound();
         indication.innerHTML = 'Loading...' + '<br>'
         let go = await init();
       }
    };


    function enableButton(button) {
      button.disabled = false;
    }

    function disableButton(button) {
      button.disabled = true;
    }


    playbackSlider.oninput = function () {
        changeRate(playbackSlider.value);
    };

    qSlider.oninput = () => {
      changeQ(qSlider.value)
    };

    cutoffSlider.oninput = () => {
      changeCutoff(cutoffSlider.value)
    };

    modSpeedSlider.oninput = () => {
      changeSpeed(modSpeedSlider.value)
    };

    amplitudeAmountSlider.oninput = () => {
      changeAmount(amplitudeAmountSlider.value, "amplitudeAmountSlider");
    };

    if (!isSafari) {
      playbackModSlider.oninput = () => {
          changeAmount(playbackModSlider.value, "playbackModSlider");
      };
    }

    filterModSlider.oninput = () => {
      changeAmount(filterModSlider.value, "filterModSlider");
    };

    loopButton.onclick = () => {
      if (!document.querySelector('#radio-c').checked) {
          loop = true;
          loopOn();
      } else {
        sound.loop = false;
        loop = false;
      }
    };

    loopStart.oninput = () => {
        setLoopStart(loopStart.value);
    };

    loopEnd.oninput = () => {
        setLoopEnd(loopEnd.value);
    };


    // set our sound buffer, loop, and connect to destination
    function setupSound() {
        if (forward === true) {
          sound = audioContext.createBufferSource();
          sound.buffer = sampleBuffer;
          // console.log(sound.buffer);
        } else {
          sound = audioContext.createBufferSource();
          sound.buffer = reversed;
          // console.log(sound.buffer);
        }
        lfo = audioContext.createOscillator();
        biquadFilter = audioContext.createBiquadFilter();
        sound.loop = loop;
        sound.loopStart = loopStart.value;
        sound.loopEnd = loopEnd.value;
        sound.playbackRate.value = playbackSlider.value;
        sound.connect(biquadFilter);
        biquadFilter.connect(vca);
        biquadFilter.type = "lowpass";
        biquadFilter.frequency.value = cutoffSlider.value;
        biquadFilter.Q.value = qSlider.value;
        lfo.frequency.value = modSpeedSlider.value;
        ampModGain.gain.value = amplitudeAmountSlider.value;
        if (!isSafari) {
          playbackModGain.gain.value = playbackModSlider.value;
        }
        filterModGain.gain.value = filterModSlider.value;
        lfo.type = "sine";
        lfo.connect(ampModGain);
        lfo.connect(playbackModGain);
        lfo.connect(filterModGain);
        if (!isSafari) {
          playbackModGain.connect(sound.detune);
        }
        filterModGain.connect(biquadFilter.frequency);
        lfo.start(0);
        ampModGain.connect(vca.gain);
        vca.connect(audioContext.destination);
    }

    // function to load sounds via AJAX
    async function loadSound(url) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        request.onload = function () {
            audioContext.decodeAudioData(request.response, async function (buffer) {
                soundLength = buffer.duration;
                sampleBuffer = buffer;
                reversed = cloneAudioBuffer(buffer, audioContext);
                loopStart.setAttribute('max', Math.floor(soundLength));
                loopEnd.setAttribute('max', Math.floor(soundLength));
                playButton.disabled = false;
                nextButton.disabled = false;
                indication.innerHTML = "<br>";
                trackTitle.innerHTML = "["+userSearch+'] ' + ": " + tracks[loc].name + '<br>' + soundLength.toFixed(2) + "s";
                interface.scrollIntoView(true);

            });
        };

        request.send();
    }


    function cloneAudioBuffer(audioBuffer, context){
      var channels = [],
          numChannels = audioBuffer.numberOfChannels;

      //clone the underlying Float32Arrays
      for (var i = 0; i < numChannels; i++){
          channels[i] = new Float32Array(audioBuffer.getChannelData(i));
      }

      //create the new AudioBuffer (assuming AudioContext variable is in scope)
      var newBuffer = context.createBuffer(
                          audioBuffer.numberOfChannels,
                          audioBuffer.length,
                          audioBuffer.sampleRate
                      );

      //copy the cloned arrays to the new AudioBuffer, reversing them
      for (var i = 0; i < numChannels; i++){
          newBuffer.getChannelData(i).set(channels[i]);
          Array.prototype.reverse.call( newBuffer.getChannelData(i) );

      }

      return newBuffer;
  }


    function reverseSound(state){
      switch(state){
        case true:
          forward = true;
          break;
        case false:
          forward = false;
        };
    };

  var state = 0;


    // play sound and enable / disable buttons
    async function playSound() {
      let setup = await setupSound();
      let checkstate = await state++;
      let startup = await sound.start(0);
      let play = await UI('play');
      sound.onended = async function () {
          let uistop = await UI('stop');
      }
    }

    // stop sound and enable / disable buttons
    async function stopSound() {
        // let stop = await UI('stop');
        if (state !== 0) {
          let lfostopped = await lfo.stop(0);
          let stopped = await sound.stop(0);
        }
    }

    // change playback speed/rate
    function changeRate(rate) {
        sound.playbackRate.value = rate;
        playbackRate.innerHTML = "[" + rate + "]";
    }

    // change Filter Q
    function changeQ(value) {
        biquadFilter.Q.value = value;
        value = parseInt(value);
        switch(true) {
          case (value < 5):
            qValue.innerHTML = "[" + "Flat" + "]";
            break
          case (value < 12):
            qValue.innerHTML = "[" + "Broad" + "]";
            break
          case (value < 17):
            qValue.innerHTML = "[" + "Narrow" + "]";
            break
          case (value <= 20):
            qValue.innerHTML = "[" + "Thin" + "]";
        }
    }
    // change cutoff
    function changeCutoff(value) {
        biquadFilter.frequency.value = value;
        cutoffValue.innerHTML = "[" + value + "hz]";
    };

    // change modulation speed
    function changeSpeed(rate) {
        lfo.frequency.value = rate;
        modSpeed.innerHTML = "[" + rate + "hz]";
    };


    // change modulation amount
    function changeAmount(amt, name) {
      switch(name) {
        case ("amplitudeAmountSlider"):
          ampModGain.gain.value = amt;
          amplitudeAmount.innerHTML = "[" + amt + "]";
          break;
        case ("playbackModSlider"):
          playbackModGain.gain.value = amt;
          playbackModValue.innerHTML = "[" + amt + "]";
          break;
        case ("filterModSlider"):
          filterModGain.gain.value = amt;
          filterModValue.innerHTML = "[" + amt + "]";
      }
    };

    function loopOn(event){
        if(loop){
            sound.loop = true;
            loopStart.disabled = false;
            loopEnd.disabled = false;
        } else {
            loopStart.disabled = true;
            loopEnd.disabled = true;
        };
    }

    // change loopStart
    function setLoopStart(start) {
        sound.loopStart = start;
        loopStartValue.innerHTML = "[" + start +"s]";
    }

    // change loopEnd
    function setLoopEnd(end) {
        sound.loopEnd = end;
        loopEndValue.innerHTML = "[" + end +"s]";
    }

    async function UI(state){
        switch(state){
            case 'play':
                let stopOn = await enableButton(stopButton);
                let playOff = await disableButton(playButton);
                let loopOn = await enableButton(loopButton);
                playbackSlider.disabled = false;
                modSpeedSlider.disabled = false;
                amplitudeAmountSlider.disabled = false;
                if (!isSafari) {
                  playbackModSlider.disabled = false;
                }
                filterModSlider.disabled = false;
                cutoffSlider.disabled = false;
                qSlider.disabled = false;
                // console.log('ui play complete')
                break;
            case 'stop':
                stopButton.disabled = true;
                if (playButton.innerHTML !== 'Loading...') {
                  playButton.disabled = false;
                  }
                loopButton.disabled = true;
                playbackSlider.disabled = false;
                modSpeedSlider.disabled = false;
                amplitudeAmountSlider.disabled = false;
                if (!isSafari) {
                  playbackModSlider.disabled = false;
                }
                filterModSlider.disabled = false;
        }
    }

    /* ios enable sound output */
    	window.addEventListener('touchstart', function(){
    		//create empty buffer
    		var buffer = audioContext.createBuffer(1, 1, 22050);
    		var source = audioContext.createBufferSource();
    		source.buffer = buffer;
    		source.connect(audioContext.destination);
    		source.start(0);
    	}, false);
    });
