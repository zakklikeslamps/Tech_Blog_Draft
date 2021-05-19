const addComment = async (event) => {

    event.preventDefault();

    const comment = document.querySelector('#user-comment').nodeValue.trim();
    const post_id = window.location.toString().split('/') [ 
        
        window.location.toString().split('/').length - 1 
    
    ];

    if (comment) {

        const resonse = await fetch('api/comment', {

            method: 'POST',
            body: JSON.stringify({ comment, post_id }),
            headers: { 'Content-Type': 'application/json'}

        });

        if (response.ok) {

            document.location.reload();

        } else {

            alert(response.statusText);

        }

    }

};

document.querySelector('.add-comment').addEventListener('submit', addComment);