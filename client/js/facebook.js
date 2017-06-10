(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=469306980082723";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  if (response.status === 'connected') {
    testAPI();
  } else {
    FB.login(function(response) {
      if (response.authResponse) {
       console.log('Welcome!  Fetching your information.... ');
       FB.api('/me', function(response) {
         console.log('Good to see you, ' + response.name + '.');
       });
      } else {
       console.log('User cancelled login or did not fully authorize.');
      }
    });
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response)
  });
}

function logoutFacebook() {
  FB.getLoginStatus(function(response) {
    if(response.status == 'connected') {
      FB.logout(function(response) {
        localStorage.removeItem("token");
        console.log(response);
      });
    } else {
      localStorage.removeItem("token");
    }
    window.location.href = '/login.html'
  });
}

function testAPI() {
  FB.api('/me',{fields: 'name, email'}, function(response) {
    axios.post('http://localhost:3000/fblogin',{
      email : response.email,
      name : response.name
    })
    .then((result)=>{
      localStorage.setItem('token', result.data);
      window.location.href = './index.html'
    })
    .catch((err)=>{
      console.log(err)
    })
  });
}