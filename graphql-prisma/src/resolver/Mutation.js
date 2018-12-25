import bcrypt from 'bcryptjs';
import getUserId from '../utils/getUserId';
import generateToken from '../utils/generateToken';
import hashPassword from '../utils/hashPassword'

const Mutation = {
    async loginUser(parent, args, {prisma}, info){
        const user = await prisma.query.user({
            where: {
                email: args.data.email
            }
        })

        if (!user) {
            throw new Error('User not found!')
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password)
        
        if(!isMatch){
            throw new Error('Password not match')
        }

        return {
            user,
            token: generateToken(user.id)
        }
    },
    async createUser(parent, args, {prisma}, info){

        const emailExist = await prisma.exists.User({email: args.data.email})
        const usernameExist = await prisma.exists.User({username: args.data.username})


        if (emailExist) {
            throw new Error(`Email ${args.data.email} is already taken`)
        }

        if (usernameExist){
            throw new Error(`Username ${args.data.username} is already taken`)
        }

        
        const password = await hashPassword(args.data.password);
        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
                password
            }
        })

        return {
            user,
            token: generateToken(user.id)
        }

    },


    async deleteUser(parent, args, {prisma, request}, info){
        const userId = getUserId(request)

        const userExists = await prisma.exists.User({id: userId});

        if (!userExists) {
            throw new Error('user not found')
        }
        
        return prisma.mutation.deleteUser({where: {id: userId}}, info)

    
    },

    async updateUser(parent, {data}, {prisma, request}, info){
        const userId = getUserId(request)
        if (typeof args.data.password === 'string') {
            args.data.password = await hashPassword(args.data.password);
        }

        return prisma.mutation.updateUser({
            where: {
                id: userId
            },
            data,
        }, info)

    },

    async createPost(parent, args, {prisma, request}, info){
        const userId = getUserId(request)

        return prisma.mutation.createPost({
            data: {
                title: args.data.title,
                content: args.data.content,
                isPublished: args.data.isPublished,
                author: {
                    connect: {
                        id: userId
                    }
                }
            }
        }, info)
        
    },

    async updatePost(parent, {id, data}, {prisma, request}, info){
        const userId = getUserId(request)
        const postExists = await prisma.exists.Post({id, author: {id: userId}})
        const postPublished = await prisma.exists.Post({id, isPublished: true});


        if (!postExists) {
            throw new Error('Unable to update post')
        }

        if (postPublished && data.isPublished === false) {
            prisma.mutation.deleteComment({post: {id}})
        }

        return prisma.mutation.updatePost({
            where: {id},
            data
        }, info)

    },

    async deletePost(parent, args, {prisma, request}, info){

        const userId = getUserId(request)

        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!postExists) {
            throw new Error('Unable to delete post')
        }

        return prisma.mutation.deletePost({where: {id: args.id}}, info)
    },

    async createComment(parent, args, {prisma, request}, info){
        const userId = getUserId(request)
        const postExist = await prisma.exists.Post({id: args.data.post, isPublished: true});

        if (!postExist) {
            throw new Error("post not found")
        }

        return prisma.mutation.createComment({
            data: {
                content: args.data.content,
                post: {
                    connect: {
                        id: args.data.post
                    }
                },
                author: {
                    connect: {
                        id: userId
                    }
                }
            }
        }, info)
        
    },

    async updateComment(parent, {id, data}, {prisma, request}, info){
        const userId = getUserId(request)

        const commentExists = await prisma.exists.Comment({
            id,
            author: {
                id: userId
            }
        })

        if (!commentExists) {
            throw new Error('Unable to update comment')
        }

        return prisma.mutation.updateComment({where: {id}, data}, info)
    },

    async deleteComment(parent, args, {prisma, request}, info){
        const userId = getUserId(request)

        const commentExists = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!commentExists) {
            throw new Error("Unable to delete comment")
        }

        return prisma.mutation.deleteComment({where: {id: args.id}}, info)
    },

}

export {Mutation as default}