let menuToggle = document.querySelector('.menuToggle');
let navigation = document.querySelector('nav.navigation');
menuToggle.onclick = () => {
  navigation.classList.toggle('active');
};

let list = document.querySelectorAll('.list');
function activateLink() {
  list.forEach((item) => {
    item.classList.remove('active');
    this.classList.add('active');
  });
}
list.forEach((item) => item.addEventListener('click', activateLink));
