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
            await post.create(value)

            const postOnSocial = [TypeSocial.Facebook, TypeSocial.Linkedin]

            postOnSocial.forEach((socialType: TypeSocial) => {
                // post to social using social_service.ts
                const socialService = SocialServiceFactory.create(socialType);

                socialService.postNewFeed(value.content);
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

export default router;