let posts
let users

let xhr = new XMLHttpRequest()

let request = (url) => {
    xhr.open('GET', url, false);
    xhr.send()
    if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        return JSON.parse(xhr.response)
    }
}

posts = request('http://jsonplaceholder.typicode.com/posts')
users = request('http://jsonplaceholder.typicode.com/users')

let answer = []

users.forEach(({id, name, email, address, website, company}) => {
    answer.push({
        id, name, email, address, website, company, posts: []
    })
})

posts.forEach(({id, title, body, userId}) => {
    answer.forEach(el => {
        if (el.id === userId)
            el.posts.push({
                id, title, body,
                title_crop: title.slice(0, 20) + '...'
            })
    })
})

answer.forEach((el, i) => {
    if (el.name === 'Ervin Howell') {
        el.posts.forEach((el2) => {
            el2.comments = []
            let comm = request(`http://jsonplaceholder.typicode.com/posts/${el2.id}/comments`)
            comm.forEach(({name, email, body}) => el2.comments.push({
                name, email, body
            }))
        })
    }
})

console.log(answer)