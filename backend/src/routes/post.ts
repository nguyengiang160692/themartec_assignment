import express from 'express';
import { IUser } from '../model/user';
import post, { qualityPost } from '../model/post';
import { ErrorResponse } from '../http/respose';
import passport from 'passport';
import { TypeSocial, SocialServiceFactory } from '../socialService/serviceFactory';

const router = express.Router();

router.use(passport.authenticate('bearer', { session: false }))

//create new post
router.post('/', async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }
    const authUser: IUser = req.user as IUser;

    if (authUser) {

        const { error, value } = qualityPost.validate(req.body);

        if (error) {
            return res.status(400).send(<ErrorResponse>{
                message: error.details[0].message,
            })
        }

        try {
            let newPost = new post({
                content: value.content,
                user: authUser._id,
                facebook_status: 0,
                linkedin_status: 0,
                meta: {
                    facebook: {},
                    linkedin: {}
                }
            })

            await newPost.save()

            const postOnSocialNetworks = [
                // TypeSocial.Facebook,
                TypeSocial.Linkedin
            ]

            postOnSocialNetworks.forEach(async (socialType: TypeSocial) => {
                // post to social using social_service.ts
                const socialService = SocialServiceFactory.create(socialType);

                await socialService.setAccessToken(authUser.meta[socialType])
                await socialService.postNewFeed(value.content, newPost);
            })

        } catch (err: any) {
            return res.status(400).send(<ErrorResponse>{
                message: err.message,
            })
        }

        return res.send({
            message: 'Create new post success!'
        })
    }

    return res.status(401).send(<ErrorResponse>{
        message: 'Unauthorized'
    })
});

router.post('/sync-insight', async (req, res) => {
    //get all post in database

    const posts = await post.find({})
    const facebookService = SocialServiceFactory.create(TypeSocial.Facebook);
    const linkedinService = SocialServiceFactory.create(TypeSocial.Linkedin);

    posts.forEach(async (post: any) => {
        facebookService.getLikeShareComment(post)
        linkedinService.getLikeShareComment(post)
    });
})

export default router;