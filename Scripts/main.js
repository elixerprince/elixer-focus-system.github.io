window.addEventListener('scroll', function() {
  var navbar = document.getElementById('top-navbar');
  var scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 0;
  var clientHeight = document.documentElement.clientHeight || window.innerHeight || 0;
  var scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

  //You can adjust the opacity change rate by modifying the multiplier (e.g., 0.01)
  var opacity = scrollPercentage * 0.03;

  //Ensures opacity doesn't exceed 1
  opacity = Math.min(opacity, 1);

  // Set the background color with the calculated opacity
  navbar.style.backgroundColor = 'rgba(0, 0, 0, ' + opacity + ')';
});

document.getElementById('signup-btn').addEventListener('click', function() {
  // Handle signup button click event
  window.location.href = 'signup.html';
});