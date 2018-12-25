import getUserId from "../utils/getUserId";

const Query = {
    users(parent, args, {prisma}, info){
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after
        }

        if (args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                },{
                    username_contains: args.query
                }]
            }
        }

        return prisma.query.users(opArgs, info)
    },
    posts(parent, args, {prisma}, info){
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            where: {
                isPublished: true,
            }
        };

        if (args.query) {
            opArgs.where.OR = [{
                title_contains: args.query
            },{
                content_contains: args.query
            }]
        }

        return prisma.query.posts(opArgs, info)
    },
    comments(parent, args, {prisma}, info){
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after
        };

        if (args.query) {
            opArgs.where = {
                OR: [{
                    content_contains: args.query
                }]
            }
        }

        return prisma.query.comments(opArgs, info)
    },
    req_user(parent, args, {prisma, request}, info){
        const userId = getUserId(request, false);

        if (userId === null) {
            return {}
        }

        return prisma.query.user({
            where: {
                id: userId
            }
        })
    },
    myPosts(parent, args, {prisma, request}, info){
        const userId = getUserId(request);
        const opArgs = {
            first: args.first,
            skip: args.skip,
            where: {
                author:{
                    id: userId
                }
            }
        }

        if (args.query) {
            opArgs.where.OR = [{
                title_contains: args.query
            },{
                content_contains: args.query
            }]
        }
        
        return prisma.query.users(opArgs, info)
    },
    async post(parent, args, {prisma, request}, info){
        const userId = getUserId(request, false)

        const posts = await prisma.query.posts({
            where: {
                id: args.id,
                OR: [{
                    isPublished: true
                },{
                    author: {
                        id: userId
                    }
                }]
            }
        }, info)

        if (posts.length === 0) {
            throw new Error("Post not found")
        }

        return posts[0]
    }
}

export {Query as default}