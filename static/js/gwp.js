document.addEventListener('DOMContentLoaded', () => {
  var width = window.innerWidth;
  var playIcon = document.querySelector('#playIcon');
  var info = document.getElementById('information');
  var intro = document.getElementById('introduction');
  $().ready(function() {
     $("#text").html("Text added by jQuery code.");
  });

  if (width >= 768) {
    playIcon.onmouseover = () => {
      info.style.display = "block";
      intro.style.display = "block";
  };

    playIcon.onmouseleave = () => {
      info.style.display = "none";
      intro.style.display = "none";
    }

  }
});
