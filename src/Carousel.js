const imgs = document.getElementById('img');
const img = document.querySelectorAll('#img img');
const magicNum = 1800;

function carousel() {
  let i = 0;
  i += 1;

  if (i > img.length - 1) {
    i = 0;
  }

  imgs.style.transform = 'translateX($( -i * 500)px)';
}

setInterval(carousel, magicNum);
