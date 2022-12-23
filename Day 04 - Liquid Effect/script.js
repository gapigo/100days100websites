const images = [
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
];

const texts = [
  ['Mirrorless', 'Take your vision into a picture'],
  ['Leica M6', 'Capture the moment you want'],
  ['Camera', 'Blur the background to focus your point'],
  ['Glowing', 'Take your vision into a picture'],
  ['Mirrorless', 'Take your vision into a picture'],
];

rgbKineticSlider = new rgbKineticSlider({
  slideImages: images,
  itemsTitles: texts,
  backgroundDisplacementSprite: 'https://i.ibb.co/N246LxD/map-9.jpg',
  cursorDisplacementSprite: 'https://i.ibb.co/KrVr51f/displace-circle.png',
  cursorImgEffect: true,
  cursorTextEffect: false,
  cursorScaleIntensity: 0.65,
  cursorMomentum: 0.14,
  swipe: true,
  swipeDistance: window.innerWidth * 0.4,
  swipeScaleIntensity: 2,

  slideTransitionDuration: 1,
  transitionScaleIntensity: 30,
  transitionScaleAmplitude: 160,

  nav: true,
  navElement: '.main-nav',
  imagesRgbEffect: true,
  imagesRgbIntensity: 0.9,
  navImagesRgbIntensity: 80,

  textsDisplay: true,
  textsSubTitleDisplay: true,
  textsTiltEffect: true,
  googleFonts: ['Josefim Sans: 700', 'Poppins: 400'],
  buttonMode: false,
  textsRgbEffect: true,
  textsRgbIntensity: 0.03,
  navTextsRgbIntensity: 15,
  textTitleColor: '#fff',
  textTitleSize: 125,
  mobileTextTitleSpasing: 3,
  textSubTitleColor: 'white',
  textSubTitleSize: 21,
  mobileTextSubTitleSize: 21,
  textSubTitleLetterspacing: 2,
  textSubTitleOffsetTop: 90,
  mobileTextSubTitleOffsetTop: 90,
});
