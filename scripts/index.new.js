/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */

 function playSong(songId) {
    while (document.getElementById("main").firstChild) {
        document.getElementById("main").removeChild(document.getElementById("main").lastChild);
      }
    
    let r = document.createElement("div");
    let songPlayed;
    player.songs.forEach(song => {
        if(song.id == songId)
            songPlayed = song;
    });
    const children = [{
        content:"PLAYING",
        type:'h1'
    },{
        content:songPlayed.title,
        type:'p'
    },{
        content:songPlayed.album,
        type:'p'
    },{
        content:songPlayed.artist,
        type:'p'
    },{
        content:calculateDuration(songPlayed.duration),
        type:'p'
    },{
        content:songPlayed.coverArt,
        type:'img'
    }]
    children.forEach(child => {
        t = document.createElement(child.type);
        if(child.type == 'img'){
            t.setAttribute("src", child.content);
            
            t.setAttribute("width", "100%");

            t.setAttribute("height", "100%");
        }
        t.innerHTML = child.content;
        r.appendChild(t);
    });
    r.classList.add("card");
    document.getElementById("main").appendChild(r);
    console.log(songPlayed);
    
}

/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(songId) {

    var wantedSong=player.songs.find(element => element.id==songId) ;
    let indexS=player.songs.indexOf(wantedSong);
    player.songs.splice(indexS,1);
    while (document.getElementById("songs").firstChild) {
        document.getElementById("songs").removeChild(document.getElementById("songs").lastChild);
     }
    
    while (document.getElementById("playlists").firstChild) {
        document.getElementById("playlists").removeChild(document.getElementById("playlists").lastChild);
    }

    for (let j = 0; j < player.playlists.length; j++) {
        const playlist = player.playlists[j];
        for (let i = 0; i < playlist.songs.length; i++) {
                let song = playlist.songs[i];
            if (song == songId)
                playlist.songs.splice(i,1);
        }
        };
    generateSongs();
    generatePlaylists();

}

/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong({ title, album, artist, duration, coverArt }) {
     //create new id
     var id = 1;
     player.songs.forEach(element => {
         if(element.id>id){
             id = element.id;
         }  
         });
     id++;
 
   //change duration to mm:ss format
  // durationArr=duration.split(":");
  // duration=parseInt(durationArr[0])*60+parseInt(durationArr[1]);
   duration=calculateDuration(duration);
   //create new song object
   var newSong = {
    id: id,
    title: title,
    album: album,
    artist: artist,
    duration: duration,
    coverArt: coverArt
   };
   
   //adding the new song to the songs array
   console.log(newSong); 
   player.songs.push(newSong);
   createSongElement(newSong);
 }


/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
    if(event.target.classList[1] =="play"){
        playSong(event.target.classList[0]);
    }
    if(event.target.classList[1] =="remove"){
        removeSong(event.target.classList[0]);
        
    }
    
   
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
    inputsArr = document.getElementsByTagName("input");
    addSong({
    title : inputsArr[0].value ,
    album : inputsArr[1].value ,
    artist : inputsArr[2].value ,
    duration : inputsArr[3].value ,
    coverArt : inputsArr[4].value 
    })}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children =  [{
        content:title,
        type:'p'
    },{
        content:album,
        type:'p'
    },{
        content:artist,
        type:'p'
    },{
        content:calculateDuration(duration),
        type:'p'
    },{
        content:coverArt,
        type:'img'
    },{
        content: "▶",
        type:'button',
        event:'play',
        class:id
    },{
        content: "🗑",
        type:'button',
        event:'remove',
        class:id
    }]
    const classes = ['card', 'song'];
    const attrs = {  };
    const eventListeners = {click:handleSongClickEvent};
    return createElement("div", children, classes, attrs, eventListeners);
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = [{
        content:name,
        type:'p'
    },{
        content:songs.length,
        type:'p'
    },{
        content:calculateDuration(playlistDuration(id)),
        type:'p'
    }];
    const classes = ['card', 'playlist'];
    const attrs = {};
    const eventListeners = {};
    return createElement("div", children, classes, attrs, eventListeners);
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"}, {click: (...) => {...}})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 * @param {Object} eventListeners - the event listeners on the element
 */
function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
    let r = document.createElement(tagName);
    children.forEach(child => {
        t = document.createElement(child.type);
        if(child.type == 'img'){
            t.setAttribute("src", child.content);

            t.setAttribute("width", "100%");

            t.setAttribute("height", "100%");

        }
        if(child.type == 'button'){
            t.classList.add(child.class);
            t.classList.add(child.event);
            t.addEventListener("click",eventListeners["click"]);
        }
        t.innerHTML = child.content;
        r.appendChild(t);
    });
    classes.forEach(cls => {
        r.classList.add(cls);
    });
    
    for(const property in attributes){
        r.setAttribute(property, attributes[property]);
    }
    classes.forEach(cls => {
        if(cls == "song")
            document.getElementById("songs").appendChild(r);
        if(cls == "playlist")
            document.getElementById("playlists").appendChild(r);
    });
    
}
function playlistDuration(id) {
    let arr = getPlaylistAndSongIndex(id, 1);
    let index = arr[0];
    let sum = 0;
    player.songs.forEach(song => {
      player.playlists[index].songs.forEach(songID => {
        if(song.id == songID){
          sum += song.duration;
        }
      });
    });
    return sum;
  }
//a function that converts duration in sec to mm:ss format.
function calculateDuration(duration){
  
    let minutes=Math.floor(duration/60);
    let seconds=duration%60;
    if(minutes<10)
      minutes="0"+minutes;
    if(seconds<10)
      seconds="0"+seconds;
    return minutes+":"+seconds;
}
function getPlaylistAndSongIndex(playlistID, songID){
    let indexOfSong = -1;
    let indexOfPlaylist = -1;
    for (let i = 0; i < player.playlists.length; i++) {
      const playlist = player.playlists[i];
      if(playlist.id == playlistID){
        indexOfPlaylist = i;
        for (let j = 0; j < playlist.songs.length; j++) {
          const song = playlist.songs[j];
          if(song == songID){
            indexOfSong = j;
          }
        }
      }
    }
    if(indexOfPlaylist == -1){
      throw "playlist index does not exisst";
    }
    return [indexOfPlaylist,indexOfSong];
}
/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
function generateSongs() {
    songs = player.songs;
    songs.sort(function(a, b){
        if(a.title < b.title) { return -1; }
        if(a.title > b.title) { return 1; }
        return 0;
    })
    songs.forEach(song => {
        createSongElement(song);
    });
}   

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */

function generatePlaylists() {
    playlists = player.playlists;
    playlists.sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    })
    playlists.forEach(playlist => {
        createPlaylistElement(playlist);
    });
}

// Creating the page structure
generateSongs()
generatePlaylists()

// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)

 