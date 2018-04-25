// Function to create custom confirmation box to display when user wants to delete a post
function CustomConfirm() {
  const close = () => {
    document.getElementById('dialogbox').style.display = 'none';
    document.getElementById('dialogoverlay').style.display = 'none';
  };

  this.render = function(dialog, fn) {
    const dialogoverlay = document.getElementById('dialogoverlay');
    const dialogbox = document.getElementById('dialogbox');
    dialogoverlay.style.display = 'block';
    dialogbox.style.left = '400px';
    dialogbox.style.top = '100px';
    dialogbox.style.display = 'block';

    document.getElementById('dialogboxbody').innerHTML = dialog;

    const foot = document.getElementById('dialogboxfoot');
    foot.innerHTML =
      `<button id='yes'>Yes</button>
      <button id='no'>No</button>`;

    document.getElementById('yes').addEventListener('click', () => {
      this.yes(fn);
    });
    document.getElementById('no').addEventListener('click', () => {
      close();
    });
  };

  this.yes = function(fn) {
    fn();
    close();
  };
}

//close dialogbox by clicking on X
document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('dialogoverlay').style.display = 'none';
});
