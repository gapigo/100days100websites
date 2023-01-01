const startNumber = 9;
const flipCard = document.querySelector('.flip-card');

// const countToDate = new Date('2023-01-02');
const countToDate = new Date().setHours(new Date().getHours() + 24);
let previousTimeBetweenDates;
setInterval(() => {
  const currentDate = new Date();
  const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000);

  flipAllCards(timeBetweenDates);
  previousTimeBetweenDates = timeBetweenDates;
}, 250);

function flipAllCards(time) {
  const seconds = time % 60;
  const minutes = Math.floor((time / 60) % 60);
  const hours = Math.floor(time / 3600);

  flip(document.querySelector('[data-hours-tens]'), Math.floor(hours / 10));
  flip(document.querySelector('[data-hours-ones]'), hours % 10);
  flip(document.querySelector('[data-minutes-tens]'), Math.floor(minutes / 10));
  flip(document.querySelector('[data-minutes-ones]'), minutes % 10);
  flip(document.querySelector('[data-seconds-tens]'), Math.floor(seconds / 10));
  flip(document.querySelector('[data-seconds-ones]'), seconds % 10);
}

function flip(flipCard, newNumber) {
  const topHalf = flipCard.querySelector('.top');
  const startNumber = parseInt(topHalf.textContent);

  if (newNumber == null || newNumber === startNumber) return;
  const bottomHalf = flipCard.querySelector('.bottom');
  const topFlip = document.createElement('div');
  topFlip.classList.add('top-flip');
  const bottomFlip = document.createElement('div');
  bottomFlip.classList.add('bottom-flip');

  topHalf.textContet = startNumber;
  bottomHalf.textContent = startNumber;
  topFlip.textContent = startNumber;
  bottomFlip.textContent = newNumber;
  flipCard.addEventListener('animationstart', (e) => {
    topHalf.textContent = newNumber;
  });
  flipCard.addEventListener('animationend', (e) => {
    bottomHalf.textContent = newNumber;
    topFlip.remove();
    bottomFlip.remove();
    // flip(flipCard);
  });
  flipCard.append(topFlip, bottomFlip);
}

flip(flipCard);
