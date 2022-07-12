"use strict";
const elResultBoxSecond = document.querySelector(".result-box-second");
const elHeaderBottomBoxButton = document.querySelector(".header-button");
const elHeaderBottomBoxSpan = document.querySelector(".header-bottom-box-span");
const elBookmarksList = document.querySelector(".bookmarks-list");
const elresultButtonFirst = document.querySelector(".result-button-first");
const elform = document.querySelector(".form");
const elHeaderInput = document.querySelector(".header-input");
const headerBottomBoxButton = document.querySelector(".header-bottom-box-button");
const elprevButton = document.querySelector(".prev-button");
const elBottomDivIn = document.querySelector(".bottom-div-in");
const elNextButton = document.querySelector(".next-button");
const elCanvasButton = document.querySelector(".canvas-button");
const elOffcanvasBody = document.querySelector(".offcanvas-body")

let inputSearch = "search+terms";
let bookmarks = [];
let books = [];
let canvas = []
let selectedId = "";
let orederByNewest = "&";

const token = window.localStorage.getItem("token");

if (!token) {
  window.location.replace("index.html");
}

logout.addEventListener("click", function () {
  window.localStorage.removeItem("token");
  window.location.replace("home.html");
});

const renderBookmarks = function (arr, htmlElement) {
  arr.forEach((bookmark) => {
    const newItem = document.createElement("li");
    newItem.textContent = bookmark.volumeInfo.title;
    newItem.setAttribute("class", "newItem");
    htmlElement.appendChild(newItem);
  });
};
// renderBookmarks(bookmarks, elBookmarksList);

// const renderCanvas = function (can, htmlElement) {
//   can.forEach((canvas) => {
//     const newCanvas = document.createElement("p");
//     newCanvas.textContent = canvas.volumeInfo.title;
//     newCanvas.setAttribute("class", "mt-1");
//     htmlElement.appendChild(newCanvas);
//   });
// };

// renderCanvas(canvas, elOffcanvasBody)

const renderBooks = function (arr, htmlElement) {
  arr.forEach((books) => {
    const html = `
    <li class="result-box-second-item">
    <img src="${books.volumeInfo.imageLinks?.smallThumbnail}" alt="rasm kelmadi" class="result-box-second-item-img mb-4" width="250" height="250">
    <div class="result-box-second-box">
      <h4 class="result-box-paragraph mb-1">
        ${books.volumeInfo.title}
      </h4>
      <p class="result-box-ps mb-1">
        ${books.volumeInfo.authors}
      </p>
      <p class="result-box-texts mb-1">
        ${books.volumeInfo.publishedDate}
      </p>
      <div class="result-box-bottom">
        <button class="result-button-first bookmarks-btn" id="${books.id}">
          Bookmark
        </button>
      
        <button class="btn ms-2 canvas-button bg-success bg-opacity-10" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight">More Info</button>

      <div class="offcanvas canvas-box offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasRightLabel">${books.volumeInfo.title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          ...
        </div>
      </div>

      </div>
      <a href= "${books.volumeInfo.previewLink}" class="end-btn text-white mt-2 w-100 ">
        Read
      </a>
    </div>
  </li>
    `;
    // elresultButtonFirst.dataset.BokmarksBtnId = books.id;
    htmlElement.insertAdjacentHTML("beforeend", html);
    // elCanvasButton.dataset.canvasButton = books.id;
  });
};

headerBottomBoxButton.addEventListener("submit", function (evt) {
  evt.preventDefault();

  orederByNewest = "&";
  orederByNewest += "orderBy=newest";
  getBooks();
});

// elResultBoxSecond.addEventListener("click", function (evt) {
//   if (evt.target.matches(".result-button-first")) {
//     const foundBookmark = books.items.find(
//       (volume) => volume.id === evt.target.id
//     );
//     bookmarks.push(foundBookmark);
//     renderBookmarks(bookmarks, elBookmarksList);
//   }
// });

// elResultBoxSecond.addEventListener("click", function(evt){
//   if (evt.target.matches(".canvas-button")) {
//     const foundCanvas = books.items.find(
//       (volume) => volume.id === evt.target.id);
//       canvas.push(foundCanvas);
//       renderBookmarks(canvas, elOffcanvasBody)
//   }
// })

const getBooks = async function () {
  const request = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${inputSearch}&maxResults=10${orederByNewest}`
  );

  books = await request.json();

  renderBooks(books.items, elResultBoxSecond);
};

getBooks();

elform.addEventListener("submit", (event) => {
  event.preventDefault();

  inputSearch = elHeaderInput.value;
  elHeaderInput.value = null;
  elResultBoxSecond.innerHTML = null;
  if (inputSearch === "") {
    alert("kitob topilmadi!");
  }
  getBooks();
});
