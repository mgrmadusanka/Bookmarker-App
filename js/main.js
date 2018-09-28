//listen for form submit
document.getElementById('bookmarkForm').addEventListener('submit', saveBookmark);

//save bookmark
function saveBookmark(e) {
    //get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    
    if(!validateForm(siteName, siteUrl)) {
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    };

    //test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null) {
        //init array
        var bookmarks = [];

        //add to array
        bookmarks.push(bookmark);

        //set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        //get bookmarks from localstorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        //add bookmark to array
        bookmarks.push(bookmark);

        //reset back to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //clear form
    document.getElementById('bookmarkForm').reset();

    //refetch bookmarks
    fetchBookmarks();

    //prevent form from submitting
    e.preventDefault();
}

//delete bookmark
function deleteBookmark(url) {
    //get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //loop throught bookmarks
    for(var i = 0; i < bookmarks.length; i++) {
        if(bookmarks[i].url == url) {
            //remove from array
            bookmarks.splice(i, 1);
        }
    }

    //reset back to localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //refetch bookmarks
    fetchBookmarks();
}

//fetch bookmarks
function fetchBookmarks() {
    //get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="bookmark">' +
                                      '<h3>'+name+'</h3>' +
                                      '<a href="'+ url+'" class="btnVisit" target="_blank">Vist</a>' +
                                      '<a class ="btnDelete" onclick="deleteBookmark(\''+url+'\')">Delete</a>' +
                                      '</div>';
    }
}

//validate form
function validateForm(siteName, siteUrl) {
    if(!siteName || !siteUrl) {
        alert('Please fill in the form!');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)) {
        alert('Plese use a valid URL!');
        return false;
    }

    return true;
}