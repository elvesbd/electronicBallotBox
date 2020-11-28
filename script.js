let yourVotefor = document.querySelector('.d-1-1 span');
let office = document.querySelector('.d-1-2 span');
let description = document.querySelector('.d-1-4');
let warning = document.querySelector('.d-2');
let side = document.querySelector('.d-1-right');
let numbers = document.querySelector('.d-1-3');

let currentStage = 0;
let number = '';
let whiteVote = false;
let wishes = [];

function startStep() {
  let stage = phases[currentStage];

  let numberHtml = '';
  number = '';
  whiteVote = false;

  for(let i = 0; i < stage.numbers; i++) {
    if(i === 0) {
      numberHtml += '<div class="number flashes"></div>';
    } else {
      numberHtml += '<div class="number"></div>'
    }
  }

  yourVotefor.style.display = 'none';
  office.innerHTML = stage.title;
  description.innerHTML = '';
  warning.style.display = 'none';
  side.innerHTML = '';
  numbers.innerHTML = numberHtml;
};

function updateInterface() {
  let stage = phases[currentStage];
  let candidate = stage.candidates.filter( (item) => {
    if(item.number === number) {
      return true;
    } else {
      return false;
    }
  })
  if(candidate.length > 0) {
    candidate = candidate[0];
    yourVotefor.style.display = 'block';
    warning.style.display = 'block';
    description.innerHTML = `Nome: ${candidate.name}<br/> Partido: ${candidate.broken}`;

    let photosHtml = '';
    for(let i in candidate.photos) {
      if(candidate.photos[i].small) {
        photosHtml += `<div class="d-1-image small"><img src="images/${candidate.photos[i].url}" alt="Prefeito"/>${candidate.photos[i].subtitle}</div>`;
      } else {
        photosHtml += `<div class="d-1-image"><img src="images/${candidate.photos[i].url}" alt="Prefeito"/>${candidate.photos[i].subtitle}</div>`;
      }
    }
    side.innerHTML = photosHtml;
  } else {
    yourVotefor.style.display = 'block';
    warning.style.display = 'block';
    description.innerHTML = '<div class="warning--big flashes">VOTO NULO</div>'
  }
};

function clicked(n) {
  let elNumero = document.querySelector('.number.flashes');
  if(elNumero != null) {
    elNumero.innerHTML = n;
    number = `${number}${n}`;

    elNumero.classList.remove('flashes');

    if(elNumero.nextElementSibling != null) {
      elNumero.nextElementSibling.classList.add('flashes');
    } else {
      updateInterface();
    }
  }
};

function white() {
  if(number == '') {
    whiteVote = true;
    yourVotefor.style.display = 'block';
    warning.style.display = 'block';
    numbers.innerHTML = '';
    description.innerHTML = '<div class="warning--big flashes">VOTO EM BRANCO</div>'
    side.innerHTML = '';
  } else {
    alert('Para voto em branco não pode ter digitado nenhum número')
  }
};

function corrects() {
  startStep();
};

function confirm() {
  let stage = phases[currentStage];

  let votoConfirmado = false;

  if(whiteVote === true) {
    votoConfirmado = true;
      wishes.push({
        stage: phases[currentStage].title,
        voto: 'branco'
      });
  } else if(number.length === stage.numbers) {
    votoConfirmado = true;
      wishes.push({
        stage: phases[currentStage].title,
        voto: number
      });
  }

  if(votoConfirmado) {
    currentStage++;
    if(phases[currentStage] != undefined) {
      startStep()
    } else {
    document.querySelector('.screen').innerHTML = '<div class="warning--giant flashes">FIM</div>';
    console.log(wishes);
    }
  }
};

startStep();