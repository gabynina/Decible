const submitMessageFunction = function( e ) {
  console.log('In submitMessage')
  e.preventDefault()
  
  const n = document.querySelector( '#name' ),
        em = document.querySelector( '#email' ),
        s = document.querySelector( '#subject' ),
        me = document.querySelector( '#message' ),
        json = { name: n.value, email: em.value, subject: s.value, message: me.value},
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
    document.querySelector("#enterForm").reset();
  })
  
  return false
}

const reload = (json) => {
  console.log('In reload')
  var newH3 = document.createElement('h3')
    var h3Text = '<h3 id="newText">'
    // var i = 0
    //   while (json[i]!=undefined) {
    //     h3Text +='<p>Hi, '
    //     h3Text += json[i].name
    //     h3Text += ' we have recieved your message and will get back to you at '
    //     h3Text += json[i].email
    //     h3Text += '.</p>'
    //   i++
    // }
    h3Text +='<p>Hi, '
    h3Text += json[json.length-1].name
    h3Text += ' we have recieved your message and will get back to you at '
    h3Text += json[json.length-1].email
    h3Text += '.</p>'
    h3Text += '</h3>'
    newH3.innerHTML = h3Text
    if(document.querySelector('#newText') != null){
      document.querySelector('#newText').remove()
    }
    // document.querySelector('#newText').remove()
    document.body.appendChild(newH3)
}
  

function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const value = Object.fromEntries(data.entries());

  value.topics = data.getAll("topics");

  console.log({ value });
}

  
  window.onload = function(){
    //const submitMessage = document.querySelector('#submit')
    //submitMessage.addEventListener("submit", function()) = submit
    console.log('window.onload 1')
    const submitMessage = document.querySelector('#submit')
    console.log('window.onload 2')
    submitMessage.onmousedown = submitMessageFunction
    console.log('window.onload 3')
    // submitMessage.addEventListener("click", submitMessageFunction)
    console.log('window.onload 4')
  }
