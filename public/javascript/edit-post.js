async function editFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length-1
    ];
    console.log(id);

    const post_title = document.querySelector('input[name="post-title"]').value;

    const post_text = document.querySelector('textarea').value;

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: post_title,
            post_text: post_text
          }),
          headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok){
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
  
  }
  
  document.querySelector('#edit-post-form').addEventListener('submit', editFormHandler);