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
      const postID = postCard.getAttribute('data-id');

      deletePost(postID)
        .then(() => {
          postsWrapper.removeChild(postCard);
        })
        .catch(err  => {
          console.error;
        });
    }
  });


  //making review editable
  postsWrapper.addEventListener('click', (event) => {
    if(event.target.classList.contains('edit')) {
      const postCard = event.target.closest('.postCard');
      // console.log(postCard);
      const post = postCard.children[3];
      // console.log(post);
      post.setAttribute('contenteditable', 'true');
      post.focus();
    }
  });


  //update review
  const updatePost = (postID, content) => {
    return fetch(`/posts/${postID}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({content})
    });
  };

  //saving updated info
  const posts = document.querySelectorAll('.content');
  posts.forEach(post => {
    post.addEventListener('blur', (event) => {
      // if(event.keyCode === 13) {
        const postID = event.target.getAttribute('data-id');
        // console.log(postID);
        const content = event.target.closest('.content').textContent;
        // console.log(content);
        updatePost(postID, content)
          .then(res => {
            res.json();
          });
      // }
    });
  });





}); //most outer function
