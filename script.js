//Получаем элементы DOM

const addPostButton = document.getElementById('add-post-button');
const titleInput = document.getElementById('post-title');
const bodyInput = document.getElementById('post-body');
const postsContainer = document.getElementById('posts-container');

//Добавляем обработчик на кнопку 

addPostButton.addEventListener('click', () => {
    const title = titleInput.value;
    const body = bodyInput.value;
    createPost(title, body, postsContainer);
});

//Функция для создания постов

function createPost(title, body, container) {
    const data = { title, body };
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
        .then(response => response.json())
        .then(post => {
            const html = createPostHtml(post);
            addHtmlToContainer(html, container);
        })
        .catch(error => console.error(error));
}

//Функция для создания HTML-разметки для отображения поста

function createPostHtml(post) {
    return `
    <div>
        <h2>${post.title}</h2>
        <p>${post.body}</p>
    </div>`
        ;
}

//Функция для добавления HTML на страницу

function addHtmlToContainer(html, container) {
    container.insertAdjacentHTML('beforeend', html);

    // Очищаем поля ввода
    titleInput.value = '';
    bodyInput.value = '';
}
