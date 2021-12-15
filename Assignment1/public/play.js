//old function for getting and printing on h3 "You have submitted 'insert title' by 'insert artist'"
const submitSongFunction = function( k ) {
    console.log('In submitSong')
    k.preventDefault()
    
    const a = document.querySelector( '#artist' ),
          t = document.querySelector( '#title' ),
          json = { artist: a.value, title: t.value},
          body = JSON.stringify( json )
    
    fetch('/playlists/playlists', {
      method:'POST',
      body 
    })

    .then( function( response ) {
      return response.json()
    })
    .then( function( json ) {
      console.log(json)
    
      reload(json)
      document.querySelector("#enter").reset();
    })
    .catch( function( err ) {
      console.log(err);
    })
    
    return false
  }
  
  const reload = (json) => {
    var newH33 = document.createElement('h3')
      var h3Text2 = '<h3 id="newText2">'
      h3Text2 +='<p>You have submitted '
      h3Text2 += json[json.length-1].title
      h3Text2 += ' by '
      h3Text2 += json[json.length-1].artist
      h3Text2 += '.</p>'
      h3Text2 += '</h3>'
      newH33.innerHTML = h3Text2
      if(document.querySelector('#newText2') != null){
        document.querySelector('#newText2').remove()
      }
      // document.querySelector('#newText2').remove()
      var trythis = document.querySelector('#thislocation')
      trythis.appendChild(newH33)
  }
    
  
  function handleSubmit(event) {
    console.log('In reload5')
    event.preventDefault();
  
    const data = new FormData(event.target);
  
    const value = Object.fromEntries(data.entries());
  
    value.topics = data.getAll("topics");
  
    console.log({ value });
  }
  
    
    window.onload = function(){
      console.log('window.onload 1')
      const submitSong = document.querySelector('#submitSong2')
      console.log('window.onload 2')
      submitSong.onmousedown = submitSongFunction
    }