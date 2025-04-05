const imgs = document.querySelectorAll('.img-select a')

const imgBtns = [...imgs];

let imgId = 1

//slide topor
const  images =[
  { 'id': '1', 'url': './assets/img/banne/carro17.webp' },
  { 'id': '2', 'url': './assets/img/banne/heder2.jpg' },
  { 'id': .'3', .'url': './assets/img/banne/heder3.webp' },
  { '.id': '.4', '.url': './assets/img/banne/heder4.webp' },
];

const containerItems = document.querySelector("#container-items");

const loadImages = (images) =>{
  images.forEach(image => {
    containerItems.innerHTML += `
    <div class='item'>
    <img src='${image.url}'>
    </div>
    `; 
  });
};

loadImages(images, containerItems);

let items = document.querySelectorAll (".item");
const previus = () =>{
const lastItem = items[items.length - 1];
containerItems.insertBefore(lastItem, items[0]);
items = document.querySelectorAll(".item");
};
const next = () =>{
  containerItems.appendChild(items[0]);
  items = document.querySelectorAll(".item");
};



document.querySelector("#previous").addEventListener("click", previus);
document.querySelector("#next").addEventListener("click", next);

let autoPlayInterval;
const startAutoPlay = () =>{
  autoPlayInterval = setInterval(() =>{
    next();
  }, 3000);
};


const stopAutoPlay = () =>{
clearInterval(autoPlayInterval);
};

startAutoPlay();

const interactiveElements = [containerItems, ... document.querySelectorAll('.container-shadow, .item, .item img')];

interactiveElements.forEach(element =>{
  element.addEventListener("mouseenter", stopAutoPlay);
  element.addEventListener("mouseleave", stopAutoPlay);

});

containerItems.addEventListener("mouseenter", stopAutoPlay);
containerItems.addEventListener("mouseleave", startAutoPlay);




//fim do slide

//membro

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");

const carouselChildreans = [...carousel.children];

let isDragging = false,
isAutoplay = true,
startX,
startScrollLeft,
timeoutid;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildreans.slice(-cardPerView).reverse().forEach(card => {
  carousel.insertAdjacentHTML("afterbegin", card. outerHTML)
});
carouselChildreans.slice(0, cardPerView).forEach( card => {
  carousel.insertAdjacentHTML("beforeend", card. outerHTML)
});

carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

arrowBtns.forEach(btn => {
     btn.addEventListener("click", () => {
      carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
     })
});
//função quando o usuario começa
const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging")
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}
//funçÂo enquato o usuario arrasta
const dragging = (e) =>{
  if(!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX)
};
//funçÂo enquato o usuario para

const dragStop = () =>{
isDragging = false;
carousel.classList.remove("dragging");
};

const infiniteScroll = () =>{
 //se ocarousel esdiver no innicio, rola para ofinal
 if ( carousel .scrollLeft === 0){
  carousel.classList.add("no-transition");
  carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
  carousel.scrollLeft.remove("no-tansition");
 }

 //se ocarousel esdiver no final, rola para o inicio
 else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth -carousel.offsetWidth){
  carousel.classList.remove("no-transition");
  carousel.scrollLeft = carousel.offsetWidth;
 }
  clearTimeout(timeoutid)
  if (!wrapper.matches(":hover") )isAutoplay();
};

const autoplay =()=>{
if (window.innerWidth <800 || !isAutoplay) return;
timeoutid = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
};


autoplay();

carousel.addEventListener("mousedown", dragStart)
carousel.addEventListener("mousemove", dragging)
carousel.addEventListener("mouseup", dragStop)
carousel.addEventListener("scroll", infiniteScroll)

wrapper.addEventListener("mauseenter", () =>
clearTimeout (timeoutid));

wrapper.addEventListener ("mouseleave", autoplay)

// fim do membro

