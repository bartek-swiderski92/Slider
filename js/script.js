class Slider {
  constructor(elemSelector) {
    this.currentSlide = 0; //aktualny slide
    this.sliderSelector = elemSelector; //selektor elementu który zamieniamy na slider
    this.elem = null; //tutaj pobierzemy element który zamienimy na slider
    this.slider = null; //tutaj wygenerujemy slider
    this.slides = null; //tutaj pobierzmy slajdy
    this.prev = null; //przycisk prev
    this.next = null; //przycisk next
    this.dots = []; //przycisk kropek

    this.generateSlider();
  }
  generateSlider() {
    //pobieramy element który zamieniamy na slider
    this.slider = document.querySelector(this.slideSelector);
    this.slider.classList.add("slider");

    //tworzymy kontener dla slajdów
    const slidesCnt = document.createElement("div");
    slidesCnt.classList.add("slider-slides-cnt");

    //pobieramy element slajdów
    this.slides = this.slider.children;

    /* to jest żywa kolekcja, więc przy przeniesieniu
     każdego slajda jej długość maleje */
    while (this.slides.length) {
      this.slides[0].classList.add("slider-slide");
      /* jeżeli element appendujemy do innego elementu
      to tak jakbyśmy go usuwali z tej kolekcji
      bo jeden element nie może być równocześnie w dwóch miejscach */
      slidesCnt.appendChild(this.slides[0]);
    }
    //musimy na nowo pobrać slajdy, bo powyższa kolekcja jest już pusta
    this.slides = slidesCnt.querySelectorAll(".slider-slide");

    //wygenerowaliśmy kontener ze slajdami, wstawimy go więc do slidera
    this.slider.appendChild(slidesCnt);
  }
}
