document.addEventListener('DOMContentLoaded', function() {

  // update user profile
  document.getElementById('editProfile').addEventListener('click', (event)=> {
    event.preventDefault();
    let name = document.getElementById('name').value;
    let city = document.getElementById('city').value;
    let userID
    fetches.updateUser(userID, name, city)
      .then(() => {

      })
  })



  const postsWrapper = document.getElementById('userPosts');

  // delete user's post
  postsWrapper.addEventListener('click', (event) => {
    event.preventDefault();
    if(event.target.classList.contains('deletePost')) {
      const postCard = event.target.closest('.postCard');
      const postID
      fetches.deletePost(postID)
        .then(() => {
          postsWrapper.removeChild(postCard);
        })
    }
  });


  //update user's post



  }); //most outer function






});//end of document
