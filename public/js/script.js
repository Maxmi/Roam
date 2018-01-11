document.addEventListener('DOMContentLoaded', function() {

  // update user profile
  // document.getElementById('editProfile').addEventListener('click', (event)=> {
  //   event.preventDefault();
  //   let name = document.getElementById('name').value;
  //   let city = document.getElementById('city').value;
  //   // let userID
  //   fetches.updateUser(userID, name, city)
  //     .then(() => {
  //
  //     })
  // })


  // delete user's post
  const deletePost = postID => {
    return fetch(`/posts/${postID}`, {
      method: 'DELETE'
    });
  };

  const postsWrapper = document.getElementById('userPosts');

  postsWrapper.addEventListener('click', (event) => {
    if(event.target.classList.contains('delete')) {
      const postCard = event.target.closest('.postCard');
      const postID = postCard.lastChild.textContent;
      deletePost(postID)
        .then(() => {
          postsWrapper.removeChild(postCard);
          console.log('post removed')
        })
        .catch(err  => {
          console.error;
        });
    }
  });


  //update user's post
  // const updatePost = postID => {
  //     return fetch(`/posts/${postID}`, {
  //       method: 'put',
  //       headers: {
  //         'Content-Type': 'html'
  //       }
  //     })
  //       .then(res => {
  //         return res;
  //       });
  //   }




}); //most outer function
