const menu = document.querySelector('#menu');
// menu.setAttribute('data-active-index', 1);
Array.from(document.querySelectorAll('.menu-item')).forEach((item, index) => {
  console.log('a');
  item.onmouseover = () => {
    menu.dataset.activeIndex = index;
  };
});
console.log(menu);
