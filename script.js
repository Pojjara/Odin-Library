let myLibrary = [{title: 'The Hobbit', author: 'J.R.R. Tolkien', pages: '295', read: false}, {title: 'Harry Potter and the Prisoner of Azkaban', author: 'J.K. Rowling', pages: '317', read: true}];

function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        if(this.read == true){
            return `${this.title} by ${this.author}, ${this.pages} pages, read`
        }
        else {
            return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`
        }
    }
}

function addBookToLibrary(){

    let title = document.querySelector('#Title').value
    let author = document.querySelector('#Author').value
    let pages = document.querySelector('#Pages').value
    let isRead = document.querySelector('#isRead').checked

    const book = new Book(title, author, pages, isRead)

    if(title != '' && author != '' && pages != ''){
        // Check if books isnt already in myLibrary array
        let isInLibrary = false;
        myLibrary.forEach(function(arrayItem){
            if(arrayItem.title === title && arrayItem.author === author){
                isInLibrary = true;
            }
        })
        if(isInLibrary == false){
            myLibrary.push(book).value
        }
        //
        document.querySelector('.addbook').hidden = false;
        document.querySelector('.form').hidden = true
        document.querySelector('#error-message').hidden = true;
        displayBooks()
    }
    else {
        document.querySelector('#error-message').hidden = false;
    }

    
    
}

function displayBooks(){
    // Removes all books from page right before generating new page after adding a new book to make sure books are not double
    if(document.querySelector('#books-container') != null){
        document.querySelector('#books-container').remove()
    }
    const container = document.querySelector(".container");
    const div = document.createElement('div');
    div.setAttribute('id', 'books-container')
    container.appendChild(div)
    const booksContainer = document.querySelector('#books-container')
    myLibrary.forEach( function (arrayItem){
        const div = document.createElement('div');
        div.classList.add('books-card')

        const divTitle = document.createElement('div');
        divTitle.classList.add('div-title')
        divTitle.textContent = 'Title: ' + arrayItem.title

        const divAuthor = document.createElement('div');
        divAuthor.classList.add('div-author')
        divAuthor.textContent = 'Author: ' + arrayItem.author

        const divPages = document.createElement('div');
        divPages.classList.add('div-pages')
        divPages.textContent = 'Pages: ' + arrayItem.pages

        const divRead = document.createElement('div')
        divRead.classList.add('div-read')
        const divReadButton = document.createElement('button')
        divReadButton.classList.add('btn')
        divReadButton.classList.add('btn-readstatus')

        divRead.appendChild(divReadButton)

        
        
        if(arrayItem.read == true){
            divReadButton.style['background-color'] = 'Green'
            divReadButton.style['border'] = 'none'
            divReadButton.textContent = 'Read: Yes'
        }
        else {
            divReadButton.style['background-color'] = 'Red'
            divReadButton.style['border'] = 'none'
            divReadButton.textContent = "Read: No"
        }

        div.appendChild(divTitle)
        div.appendChild(divAuthor)
        div.appendChild(divPages)
        div.appendChild(divRead)
        booksContainer.appendChild(div)
    })

    setDataAttributes()
    addSubmitButton()
    AddBookButton()
    addDelButton()
    changeReadStatus()
}

displayBooks()
function addSubmitButton(){
    const sumbitButton = document.querySelector('#btn');
    sumbitButton.addEventListener('click', btnClick);
    sumbitButton.addEventListener('click', addBookToLibrary);
    function btnClick(event){
        event.preventDefault();
    }   
}


///// Add Book button code
function AddBookButton(){
    const addBook = document.querySelector('.addbook');
    addBook.addEventListener('click', function(){
        addBook.hidden = true
        document.querySelector('.form').hidden = false;
    });
}

/////

function setDataAttributes(){
    const allbooks = document.querySelectorAll('.books-card');
    allbooks.forEach(setAttributes)

    function setAttributes(arrayItem,index){
        arrayItem.setAttribute('data-index', index);
    }
}

/////// Delete button stuff

// Function to add delete button to each book card
function addDelButton(){
    const card = document.querySelectorAll('.books-card')
    card.forEach(book=>{
        // Creating button

        let divForDel = document.createElement('div');
        divForDel.classList.add('btn-container')
        let del = document.createElement('BUTTON');
        del.classList.add('btn')
        del.classList.add('btn-del')
        del.textContent = 'Remove'
        divForDel.appendChild(del)

        //
        book.prepend(divForDel)
    })

    const addedBooks = document.querySelectorAll('.btn-del')
    addedBooks.forEach(book => {
        book.addEventListener('click', function removeBook(){
            const booktoremove = book.parentElement.parentElement
            booktoremove.remove()
        
        })
    
}) 
}

function changeReadStatus(){
    const allreadstatuses = document.querySelectorAll('.btn-readstatus')
        allreadstatuses.forEach(book => {
            book.addEventListener('click', function (){

                if(book.style['background-color'] == 'red'){
                    book.style['background-color'] = 'Green'
                    book.textContent = 'Read: Yes'
                    let newReadStatus = true
                    indexOfBook = book.parentElement.parentElement.dataset.index
                    updateReadStatus(indexOfBook,newReadStatus)
                }
                else if(book.style['background-color'] == 'green') {
                    book.style['background-color'] = 'Red'
                    book.textContent = "Read: No"
                    let newReadStatus = false
                    indexOfBook = book.parentElement.parentElement.dataset.index
                    updateReadStatus(indexOfBook,newReadStatus)
                }
            })
        })
}

function updateReadStatus(index, newContent){
    myLibrary[index].read = newContent
}