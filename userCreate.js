var SongsArray = [];
var javaobj = [];
var x = document.getElementById("audio");
var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
function stopAudio() {
    document.getElementById("currentSong").innerHTML = " ";
    x.pause();
    x.currentTime = 0;
}
function pauseAudio() {
    document.getElementById("currentSong").innerHTML = " ";
    x.pause();
}
list.onclick = function (e) {
    e.preventDefault();
    var elm = e.target;
    var audio = document.getElementById('audio');
    var source = document.getElementById('audioSource');
    source.src = elm.getAttribute('data-value');
    document.getElementById("currentSong").innerHTML = document.getElementById("name").innerHTML;
    audio.load(); //call this to just preload the audio without playing
    audio.play(); //call this to play the song right away
};

function init() {
    if (localStorage.songRecord) {
        SongsArray = JSON.parse(localStorage.songRecord);
        completeArray = JSON.parse(localStorage.songRecord);
        for (var i = 0; i < SongsArray.length; i++) {
            var songName = SongsArray[i].name;
            // var songAlbum = SongsArray[i].songAlbum;
            //  var songSinger = SongsArray[i].songSinger;
            //createTable(songName,songAlbum,songSinger);
             createTable(songName);
        }

    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            javaobj = JSON.parse(xhttp.response);
            console.log(javaobj[0].album);
            //document.getElementById("listItem").innerHTML = "Hello World";
            for (var i = 0; i < javaobj.length; i++) {
                var songName = javaobj[i].name;
                // var songAlbum = javaobj[i].album;
                //   var songSinger = javaobj[i].singers;
                createTable(songName);
            }
        }
    }
    xhttp.open("GET", "data.json", true);
    xhttp.send();
}//closing of init
function my() {
    if(document.getElementById("songName").value && document.getElementById("songAlbum").value && document.getElementById("songSinger").value){
    var songName = document.getElementById("songName").value;
    var songAlbum = document.getElementById("songAlbum").value;
    var songSinger = document.getElementById("songSinger").value;
    var songObj = {
        name: songName,
        album: songAlbum,
        singers: songSinger
    };
    SongsArray.push(songObj);
    localStorage.songRecord = JSON.stringify(SongsArray);
    createTable(songName);
    modal.style.display = "none";
    }

}
function createTable(songName) {
    var table = document.getElementById("songsList");
    var row = table.insertRow();
    var songNameCell = row.insertCell(0);
    songNameCell.innerHTML = songName;
    songNameCell.setAttribute("id", songName);
    var aTag = document.createElement('a');
    aTag.setAttribute('href', "#");
    aTag.innerHTML = "View Details";
    songNameCell.appendChild(aTag);
    aTag.classList.add("getInfo");
    aTag.setAttribute("id", songName);
    aTag.setAttribute("onclick", "myfunction(this)");
}
function myfunction(current) {
    document.getElementById("name").innerHTML = current.id;
    (document.getElementById("playSongTag")).setAttribute("data-value", current.id + ".mp3");
    for (var i = 0; i < SongsArray.concat(javaobj).length; i++) {
        if (current.id == SongsArray.concat(javaobj)[i].name) {
            console.log(SongsArray.concat(javaobj)[i]);
            document.getElementById("name").innerHTML = SongsArray.concat(javaobj)[i].name;
            document.getElementById("albumToDisplay").innerHTML = SongsArray.concat(javaobj)[i].album;
            document.getElementById("singerToDisplay").innerHTML = SongsArray.concat(javaobj)[i].singers;
        }
    }
}
// When the user clicks the button, open the modal 
btn.onclick = function() {
modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == modal) {
modal.style.display = "none";
}
}