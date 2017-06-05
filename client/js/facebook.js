(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=469306980082723";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.fbAsyncInit = function() {
FB.init({
  appId      : 469306980082723,
  cookie     : true,  // enable cookies to allow the server to access
                      // the session
  xfbml      : true,  // parse social plugins on this page
  version    : 'v2.9' // use graph api version 2.8
});
FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
});
}

function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  if (response.status === 'connected') {
    testAPI();
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function testAPI() {
  FB.api('/me',{fields: 'name, email'}, function(response) {
    axios.post('http://localhost:3000/fblogin',{
      email : response.email,
      name : response.name
    })
    .then((result)=>{
      console.log(result)
      localStorage.setItem('token', result.data);
      $('#result').append("<p>Berhasil login melalui facebook. <a href=\"./index.html\">Ke halaman utama</a> </p>")
    })
    .catch((err)=>{
      console.log(err)
    })
  });
}