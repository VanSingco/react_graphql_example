let users = [{
    id: '123',
    username: 'vansingco',
    firstName: 'van zachary',
    lastName: 'singco',
    email: 'vansingco@gmail.com',
    password: 'singco143',
    age: 20
},
{
    id: '124',
    username: 'sheena',
    firstName: 'heena mae',
    lastName: 'singco',
    email: 'sheena@gmail.com',
    password: 'singco143',
    age: 23
},
{
    id: '125',
    username: 'roan',
    firstName: 'roan',
    lastName: 'singco',
    email: 'roan@gmail.com',
    password: 'singco143',
    age: 25
}]

let posts = [{
    id: '1',
    title: 'Design',
    content: 'Design like a pro',
    published: true,
    author: '123'
},
{
    id: '2',
    title: 'Programming',
    content: 'be a programmer to change the world',
    published: true,
    author: '125'
},
{
    id: '3',
    title: 'Graphics',
    content: 'Be createive to your design',
    published: false,
    author: '124'
}]

let comments = [
    {id: '12', content: 'hey nice', author: '123', post: '1'},
    {id: '13', content: 'asdadsad', author: '124', post: '2'},
    {id: '14', content: 'dddddddd', author: '125', post: '3'},
    {id: '15', content: 'heyddddd', author: '123', post: '1'}
]

const db = {
    users,
    posts,
    comments
}

export {db as default}