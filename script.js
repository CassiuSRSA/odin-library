const libraryContainer = document.querySelector(".library-container");
const modal = document.querySelector("dialog");
const form = document.querySelector("#book-form");
const closeModalBtn = document.querySelector("#close-modal");

let myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("Must use the new keyword to use construtor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    console.log(
      `${this.title} by ${this.author}, ${this.pages} pages, ${read ? " have read it." : " have not read it."}`,
    );
  };
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function renderBooks(library) {
  libraryContainer.textContent = "";
  library.forEach((item) => {
    const bookDiv = document.createElement("div");
    bookDiv.dataset.id = item.id;
    bookDiv.innerHTML = `
  <h3>${item.title}</h3> 
  <p>Author: ${item.author}</p>
  <p>Pages: ${item.pages}</p>
  <p>Read Status: ${item.read ? "Have read" : "Not read"}</p>
  <button type="button" data-id="${item.id}">Delete</button>
   <button type="button" data-id="${item.id}">Change Status</button>`;
    bookDiv.classList.add("card");
    libraryContainer.appendChild(bookDiv);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read =
    document.querySelector('input[name="read"]:checked').value === "true";
  console.log(read);

  addBookToLibrary(title, author, pages, read);

  form.reset();
  modal.close();

  renderBooks(myLibrary);
});

closeModalBtn.addEventListener("click", () => {
  modal.close();
});

libraryContainer.addEventListener("click", (e) => {
  const targetId = e.target.dataset.id;

  if (e.target.textContent === "Delete" && targetId) {
    myLibrary = myLibrary.filter((item) => item.id !== targetId);
    renderBooks(myLibrary);
  }

  if (e.target.textContent === "Change Status" && targetId) {
    myLibrary = myLibrary.map((item) => {
      if (item.id === targetId) {
        return { ...item, read: !item.read };
      } else {
        return item;
      }
    });
    renderBooks(myLibrary);
  }
});

addBookToLibrary("The Hobbit", "JK Rowling", 500, true);
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1178, true);
addBookToLibrary(
  "Harry Potter and the Philosopher's Stone",
  "J.K. Rowling",
  223,
  true,
);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("1984", "George Orwell", 328, true);

renderBooks(myLibrary);
