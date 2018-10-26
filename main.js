var words = [
  {
    word: "mathematics",
    possibleWords: ["maths", "schema", "matte", "mist", "haem"]
  },
  {
    word: "interdimensional",
    possibleWords: ["inter", "dimension", "dimensional", "media", "dirt", "lan", "intern"]
  },
  {
    word: "mutagen",
    possibleWords: ["tame", "mute", "agent"]
  }
];

var playBtn = document.querySelector("#playBtn");
var reloadBtn = document.querySelector('#reloadBtn');
var displayed = document.querySelector("#word");
var currentWord = "";
var possibleWords = [];
var inputContainer = document.querySelector(".inputs");
var currentSelected = 0;
var lettersContainer = document.querySelector('#letters');

function loadGame() {
  // Set current word to random item in array
  let index = Math.floor(Math.random() * words.length);
  currentWord = words[index].word;
  possibleWords = words[index].possibleWords;

  // get number of possible words in word
  let numPossible = possibleWords.length;

  // spawn inputs with number of possible words
  for (let i = 0; i < numPossible; i++) {
    var div = document.createElement('div');
    var input = document.createElement('input');
    var radio = document.createElement('input');
    
    div.setAttribute('class', 'col');

    input.setAttribute('class', 'form-control d-inline inputs disabled');
    input.setAttribute('type', 'text');
    input.setAttribute('disabled', 'true');
    input.setAttribute('id', 'inputFor-' + i);
    input.setAttribute('maxlength', possibleWords[i].length);
    input.setAttribute('placeholder', possibleWords[i].length + ' letters');

    radio.setAttribute('type', 'radio');
    radio.setAttribute('id', i);
    radio.setAttribute('name', 'currentSelectedInput');

    radio.onclick = function(e) {
      currentSelected = 'inputFor-' + e.target.id;
      
      var inputs = document.getElementsByClassName('inputs');
      
      for (let j = 0; j < inputs.length; j++) {
        inputs[j].setAttribute('disabled', 'true');
        inputs[j].classList.add('disabled');
      }
      
      focusedInput = document.getElementById(currentSelected);
      focusedInput.classList.remove('disabled');
      focusedInput.removeAttribute('disabled');
      focusedInput.focus();
    }
    
    div.append(radio);
    div.append(input);

    inputContainer.append(div);
  }
  
  // Display current word
  displayed.innerHTML = "Current word: " + currentWord;
  displayed.classList.add("revealed");

  // spawn buttons
  for (let k = 0; k < words[index].word.length; k++) {
    var btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('class', 'btn btn-outline-info btn-sm');
    btn.textContent = words[index].word.charAt(k);

    lettersContainer.appendChild(btn);

    btn.onclick = function(e) {
      var inputs = document.getElementsByClassName('inputs');
      
      for (let l = 0; l < inputs.length; l++) {
        var max = inputs[l].maxLength;
        
        if (inputs[l].classList.contains('disabled')) {
          // do nothing
        }
        
        else {
          inputs[l].value = inputs[l].value + e.target.textContent;
          // while (inputs[l].value < max) {
          //   console.log('this returns true');
          // }
        }
      }
    }
  }
}

playBtn.onclick = function() {
  loadGame();
  this.disabled = true;
}

reloadBtn.onclick = function() {
  window.location.href = window.location.href;
}

checkBtn.onclick = function() {
  console.log(possibleWords);
  var inputs = document.getElementsByClassName('inputs');
  for (let i = 0; i < inputs.length; i++) {
    const el = inputs[i];
    var isFound = possibleWords.includes(el);
    if (isFound === false) {
      alert('One of your guesses isn\'t correct. Please try again.');
      break;
    }
    else {
      alert('Congratulations!');
    }
  }
}