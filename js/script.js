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
    this.slider = document.querySelector(this.sliderSelector);
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

    this.createPrevNext();
    this.createDots();
  }



  createPrevNext() {
    this.prev = document.createElement("button");
    this.prev.type = "button";
    this.prev.innerText = "Poprzedni slide";
    this.prev.classList.add("slider-button");
    this.prev.classList.add("slider-button-prev");
    this.prev.addEventListener("click", this.slidePrev.bind(this));

    this.next = document.createElement("button");
    this.next.type = "button";
    this.next.innerText = "Następny slide";
    this.next.classList.add("slider-button");
    this.next.classList.add("slider-button-next");
    this.next.addEventListener("click", this.slideNext.bind(this));

    const nav = document.createElement("div");
    nav.classList.add("slider-nav");
    nav.setAttribute("aria-label", "Slider prev next");
    nav.appendChild(this.prev);
    nav.appendChild(this.next);
    this.slider.appendChild(nav);
  }

  createDots() {
    const ulDots = document.createElement("ul");
    ulDots.classList.add("slider-dots");
    ulDots.setAttribute("aria-label", "Slider pagination");

    //towrzymy pętle w ilości slajdów
    for (let i = 0; i<this.slides.length; i++) {
      /*każdorazowo tworzymy LI wraz z buttonem
      każdy button po kliknięciu zmieni slajd
      za pomocą metody changeSlide()*/

      const li = document.createElement("li");
      li.classList.add("slider-dots-element");

      const btn = document.createElement("button");
      btn.classList.add("slider-dots-button");
      btn.type = "button";
      btn.innerText = i + 1;
      btn.setAttribute("aria-label", "Set slide "+ ( 1 + 1));

      btn.addEventListener("click", () => this.changeSlide(i));

      li.appendChild(btn);

      ulDots.appendChild(li);

      /*wygenerowany przycisk wrzucamy do wspólnej tablicy
      dzięki temu potem łatwiej będzie nam sie do tych kropek odwoływać */

      this.dots.push(li);
    }
    this.slider.appnedChild(ulDots);
  }

}
