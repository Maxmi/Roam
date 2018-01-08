const getUserPosts = (userID) => {
  return fetch('/posts')
    .then(res => {
      return res.json();
    });
};

const addPost = post => {
  return fetch('/posts', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: 'JSON.stringify({post})'
  });
};

const updatePost = postID => {
  return fetch(`/posts/${postID}`, {
    method: 'put',
    headers: {
      'Content-Type': 'html'
    }
  })
    .then(res => {
      return res;
    });
};


const deletePost = postID => {
  return fetch(`/posts/${postID}`, {
    method: 'delete'
  })
}
