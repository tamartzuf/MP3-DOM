/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */

//document style
 document.getElementById("songs").style.textAlign = "center";
 document.getElementById("playlists").style.textAlign = "center";
 document.getElementById("songs").style.font = "italic bold 20px arial,serif";
 document.getElementById("playlists").style.font = "italic bold 20px arial,serif";
 
 // convert duration to mm:ss format
function convertDuration(duration)
{
  let minutes=Math.floor(duration/60);
  let seconds=duration%60;
  if(minutes<10)
    minutes="0"+minutes;
  if(seconds<10)
    seconds="0"+seconds;
  return minutes+":"+seconds;
}
//sort the songs by title
function sort(){
    player.songs.sort(function (a, b) {
        if (a.title < b.title){
        return -1; }
        else if (a.title > b.title){
        return 1; }
        return 0;
    });
}
 
 sort();

 //insert each playlist element inside div tag
player.songs.forEach(song=>{
    const songEl = song;
    let div = createSongElement(songEl);
    div.style.border = "thick solid #0000FF"; //create border to each song
    document.getElementById("songs").appendChild(div);  
});

//insert each playlist element inside div tag
player.playlists.forEach(playlist=>{
    const playlistEl = playlist;
    let div = createPlaylistElement(playlistEl);
    div.style.border = "thick solid #0000FF"; //create border to each playlist
    document.getElementById("playlists").appendChild(div);  
});


//play song
function playS(song)
{
    console.log(`Playing ${song.title} from ${song.album} by ${song.artist} | ${convertDuration(song.duration)}.`);
}

//play song by id
function playSong(songId) {
    var wantedSong = player.songs.find(res => res.id == songId); //finds the song with the ID
    if(wantedSong===null){
      throw new Error("ID not found"); //if id not exist, throw error
    }
    playS(wantedSong);
    clear();
    document.getElementById(songId).style.backgroundColor = 'red';
}

//change all the songs background beside one to white
function clear()
{
    for (let i = 1; i <= player.songs.length; i++) 
    {
        document.getElementById(i).style.backgroundColor = 'white';
    }
}

//sum the songs total duration
function totaldurtion(songs =  [])
{
    let sum = 0 ;
    for (let i = 0; i < songs.length; i++) {
        const element = songs[i];
        var wantedSong = player.songs.find(res => res.id == element);
        sum += wantedSong.duration;
    }
    return sum;
}

 //Creates a song DOM element based on a song object.
function createSongElement({ id, title, album, artist, duration, coverArt }) {
/*const artistEl = createElement("span", [artist]);
  
  const durationEl = createElement("span", ["" + duration] ,["duration", "short-duration"], {onclick: `console.log('${duration}')`});

  const coverImageArtUrl = "https://townsquare.media/site/295/files/2015/09/Razors-Edge.jpg";
  const imgEl = createElement("img", [] ,["album-art"], {src: coverImageArtUrl});

  return createElement("div", ["Artist: ", artistEl, "Duration: ", durationEl, imgEl]);
}
*/
    const children = [ title, album , artist , duration , coverArt];
    const classes = []
    const attrs = { onclick: `playSong(${id})`}
    return createElement("div", children, classes, attrs,id)
}


 //Creates a playlist DOM element based on a playlist object.
function createPlaylistElement({ id, name, songs }) {
    const children = [name , songs.length  ,"mintues : " + totaldurtion(songs)%60];
    const classes = []
    const attrs = {}
    return createElement1("div", children, classes, attrs,id)
}


/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 */

//creates element to playlists
 function createElement1(tagName, children = [], classes = [], attributes = {},id) {
     /*
    const el = document.createElement(tagName);
    
    // Children
    for(const child of children) {
      el.append(child);
    }
  
    // Classes
    for(const cls of classes) {
      el.classList.add(cls);
    }
  
    // Attributes
    for (const attr in attributes) {
      el.setAttribute(attr, attributes[attr]);
    }
  
    return el;
  }
   */
   
    let tag = document.createElement(tagName);
    for (let i = 0; i < children.length; i++) {
        const element = children[i];
        let p  = document.createElement("p");
        p.innerHTML = children[i];
        tag.appendChild(p);
    }
    classes.forEach(element => {
        tag.classlist.add(element);
    });

    for (const att in attributes) {
        tag.setAttribute(att, attributes[att]);   
    }

    return tag;
 }

 //creates element 
function createElement(tagName, children = [], classes = [], attributes = {},id) {
    let tag = document.createElement(tagName);
    tag.setAttribute("id",id);
    for (let i = 0; i < children.length; i++) 
    {
        if(i+1 == children.length)
        {
            let img  = document.createElement("img");
            img.setAttribute("src" , children[i]);
            tag.appendChild(img);
        }
        else
            {
                let p  = document.createElement("p");
                if(typeof children[i] === 'string')
                    p.innerHTML = children[i];
                else
                    p.innerHTML = convertDuration(children[i]);
                tag.appendChild(p);
                    
            }   
    }
    classes.forEach(element => {
        tag.classlist.add(element);
    });

    for (const att in attributes) {
        tag.setAttribute(att, attributes[att]);   
    }

    return tag;

}


