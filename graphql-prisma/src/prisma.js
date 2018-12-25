import { Prisma } from "prisma-binding";
import { fragmentReplacements } from "./resolver/index";

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://192.168.99.100:4466',
    secret: 'VanSingco##143',
    fragmentReplacements
})

export {prisma as default}

// prisma.query.users(null, '{id name email username posts{id title}}').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// });

// prisma.query.comments(null, '{id content author{username} post{id title}}').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.mutation.createUser({
//     data: {
//         name: 'vanske singco', 
//         email: 'vansingco19@gmail.com', 
//         username: 'vanske19'}},
//         '{id name email username}'
//     ).then((data) => {console.log(JSON.stringify(data, undefined, 2))})

// prisma.mutation.createPost({
//     data: {
//         title: 'Web design Modern',
//         content: 'Create your own design be creative',
//         isPublished: false,
//         author: {
//             connect: {
//                 id: "cjpgovv6z00240825i1ik0pl5"
//             }
//         }
//     }},'{id title content author{id username}}').then((data) => {
//         console.log(JSON.stringify(data, undefined, 2));
//         return prisma.query.users(null, '{id name email username posts{id title}}')
//     }).then(data => {
//         console.log(JSON.stringify(data, undefined, 2));
//     })

// prisma.mutation.updatePost({
//     where: {
//         id: "cjpdw2zo2003s07302movn6r9"
//     }, 
//     data: {
//         title: "Web development"
//     }
//     }).then((data) => {
//         console.log(JSON.stringify(data, undefined, 2));
//         return prisma.query.users(null, '{id name email username posts{id title}}')
//     }).then(data => {
//         console.log(JSON.stringify(data, undefined, 2));
//     })

// const updatePost = async (postId, authorId, data) => {
//     const postExist = await prisma.exists.Post({id: postId})
//     const userExist = await prisma.exists.User({id: authorId})

//     if (!postExist) {
//         throw new Error('post not found!')
//     }
//     if (!userExist) {
//         throw new Error('user not found')
//     }

//     const post = await prisma.mutation.updatePost({
//         where: {
//             id: postId
//         }, 
//         data: {
//             ...data,
//             author: {
//                 connect: {
//                     id: authorId
//                 }
//             }
            
//         }
//     }, '{author {id name username posts{id title content}} }')

//     return post;
// }

// const createPost = async (authorId, data)  => {
//     const userExist = await prisma.exists.User({id: authorId})

//     if (!userExist) {
//         throw new Error("User not found!")
//     }

//     const post = await prisma.mutation.createPost({
//         data: {
//             ...data,
//             author: {
//                 connect: {
//                     id: authorId
//                 }
//             }
//         }
//     }, '{author {id name username posts{id title content}} }')

//     return post;
// }

// createPost("cjpgovv6z00240825i1ik0pl5", {
//     title: "programming2", 
//     content: "learn how to program", 
//     isPublished: true}
// ).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch(err => {
//     console.log(err)
// })

// updatePost("cjpgpa24p00290825vgru8n5a", "cjpgovv6z00240825i1ik0pl5", {
//     title: "web design",
//     isPublished: true
// }).then((post) => {
//     console.log(JSON.stringify(post, undefined, 2))
// }).catch((err) => {
//     console.log(err)
// });

