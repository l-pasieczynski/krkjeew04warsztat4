$(function () {

    // curl -X POST -i -H "Content-Type: application/json" -d'{"isbn":"34321","title":"Thinking in Java","publisher":"Helion","type":"programming","author":"Bruce Eckel"}' http://localhost:8282/books

    var bookListDiv = $(".book-list");
    bookListDiv.on("click", ".book-title", handleTitleClick);

    refreshBookList();

    function refreshBookList() {
        renderBookList(bookListDiv);
    }

    function renderBookList(renderingPoint) {
        $.ajax({
            url: "http://localhost:8282/books",
            type: "GET",
            dataType: "json",
        }).done(function (booksArr) {
            renderingPoint.empty();

            for (var i = 0; i < booksArr.length; i++) {
                var book = booksArr[i];
                var descriptionDiv = $('<div class="description">');
                var titleDiv = $('<div class="book-title">');
                titleDiv.text(book.title);
                titleDiv.data("id", book.id);
                titleDiv.append(descriptionDiv);

                renderingPoint.append(titleDiv);
            }
        }).fail(function (xhr, status, err) {
            console.log(xhr, status, err);
        });

    }


    function handleTitleClick() {
        var thisTitle = $(this);
        var id = thisTitle.data("id");

        $.ajax({
            url: "http://localhost:8282/books/" + id,
            type: "GET",
            dataType: "json",
        }).done(function (book) {
            var descriptionDiv = thisTitle.find(".description");
            descriptionDiv.empty();

            var authorDiv = $("<div>");
            authorDiv.text("Author: " + book.author);

            var publisherDiv = $("<div>");
            publisherDiv.text("Publisher: " + book.publisher);

            var typeDiv = $("<div>");
            typeDiv.text(book.type);

            var isbnDiv = $("<div>");
            isbnDiv.text(book.isbn);

            descriptionDiv.append(authorDiv);
            descriptionDiv.append(publisherDiv);
            descriptionDiv.append(typeDiv);
            descriptionDiv.append(isbnDiv);

            descriptionDiv.slideDown();

        }).fail(function (xhr, status, err) {
            console.log(xhr, status, err);
        });
    }

});