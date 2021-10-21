/*
window.onload = function(){
    const submitMessage = document.querySelector('#submit')
    submitMessage.addEventListener("submit", function) = submit
}

const submit = function( e ) {
    e.preventDefault()
  
    const n = document.querySelector( '#name' ),
          e = document.querySelector( '#email' ),
          s = document.querySelector( '#subject' ),
          me = document.querySelector( '#message' ),
          json = { name: n.value, email: e.value, subject: s.value, message: m.value},
          body = JSON.stringify( json )
  
    fetch( '/submit-message', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      return response.json()
    })
    .then( function( json ) {
      console.log(json)
  
      reload(json)
      document.querySelector(".enterForm").reset();
    })
  
    return false
  }

  const reload = (json) => {
    var newH3 = document.createElement('h3')
      var h3Text = '<h3>'
      var i = 0
        while (json[i]!=undefined) {
            h3Text +='<p>Hi, '
            h3Text += json[i].name
            h3Text += ' we have recieved your message and will get back to you at '
            h3Text += json[i].email
            h3Text += '.</p>'
        i++
      }
      h3Text += '</h3>'
      newH3.innerHTML = h3Text
      document.querySelector('#newText').remove()
      document.body.appendChild(newH3)
  }
  

  function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);

    const value = Object.fromEntries(data.entries());

    value.topics = data.getAll("topics");

    console.log({ value });
  }

  const form = document.querySelector("form");
  form.addEventListener("submit", handleSubmit);
  */

  function onSubmit(e){
    e.preventDefault()

    const n = document.querySelector( '#name' ),
          e = document.querySelector( '#email' ),
          s = document.querySelector( '#subject' ),
          me = document.querySelector( '#message' ),
          json = { name: n.value, email: e.value, subject: s.value, message: m.value},
          body = JSON.stringify( json )

          fetch( '/submit-message', {
            method:'POST',
            body 
          })
          .then( function( response ) {
            return response.json()
          })
          .then( function( json ) {
            console.log(json)
        
            reload(json)
            document.querySelector(".enterForm").reset();
          })
        
          return false
        }
      
    const reload = (json) => {
    var newH3 = document.createElement('h3')
    var h3Text = '<h3>'
    var i = 0
    while (json[i]!=undefined) {
      h3Text +='<p>Hi, '
      h3Text += json[i].name
      h3Text += ' we have recieved your message and will get back to you at '
      h3Text += json[i].email
      h3Text += '.</p>'
    i++
    }
    h3Text += '</h3>'
    newH3.innerHTML = h3Text
    document.querySelector('#newText').remove()
    document.body.appendChild(newH3)
  }

  const submitMessage = document.querySelector('#submit');
  submitMessage.addEventListener('click', onSubmit);

