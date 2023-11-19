function handleSubmit(event) {
    event.preventDefault()

    const searchBar = document.querySelector('#search')
    const userInput = searchBar.value

    searchGitHub(userInput)
}

function searchGitHub(userInput) {
    fetch(`https://api.github.com/search/users?q=${userInput}`)
    .then((resp) => resp.json())
    .then((data) => {
        displayUserResults(data.items)
    })
    .catch((error) => {
        console.log("Error:", error)
    })
}

function displayUserResults(users) {
    const userList = document.querySelector('#user-list')
    userList.innerHTML = ''
    users.forEach((user) => {
        const createUserList = document.createElement('li')
        const userName = document.createElement('h3')
        const avatar = document.createElement('img')
        const reposLink = document.createElement('a')

        userName.innerText = user.login
        avatar.src = user.avatar_url
        reposLink.innerText = 'Repos Link'
        reposLink.href = user.repos_url

        createUserList.appendChild(userName)
        createUserList.appendChild(avatar)
        createUserList.appendChild(reposLink)

        userList.appendChild(createUserList)
    })
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM is loaded')
    const submitButton = document.querySelector('#github-form')

    submitButton.addEventListener('submit', handleSubmit)
})    