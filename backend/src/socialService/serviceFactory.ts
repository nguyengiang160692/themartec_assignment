
import axios from "axios";
import { IPost, SocialStatus } from "../model/post";
import { IUser, IUserMeta } from "../model/user";

export enum TypeSocial {
    Facebook = 'facebook',
    Linkedin = 'linkedin',
}

export interface SocialAuthType {
    access_token: string,
    name: string,
    authUser: IUser
}

export abstract class SocialServiceAbstract {
    abstract initAxios(): void;
    abstract postNewFeed(message: string, newPostSavedDB: IPost): void;
    abstract setAccessToken(userMeta: any): void;
    abstract saveTokenDB(data: SocialAuthType): void;
    abstract getLikeShareComment(post: IPost): void;
}

export default class SocialService implements SocialServiceAbstract {

    _accessToken: string = ''
    _axios: any = null

    constructor() {
        this.initAxios();
    }

    public initAxios() {
        throw new Error('Method initAxios not implemented.');
    }

    public async postNewFeed(message: string, newPostSavedDB: IPost): Promise<void> {
        throw new Error('Method postNewFeed not implemented.');
    }

    public async setAccessToken(userMeta: IUserMeta): Promise<void> {
        throw new Error('Method setAccessToken not implemented.');
    }

    public async getLikeShareComment(post: IPost): Promise<void> {
        throw new Error('Method getLikeShareComment not implemented.');
    }

    public async saveTokenDB(data: SocialAuthType): Promise<void> {
        throw new Error('Method saveTokenDB not implemented.');
    }
}

export class FacebookService extends SocialService {

    // "https://graph.facebook.com/v16.0/me?fields=id%2Cname&access_token="

    initAxios() {
        this._axios = axios.create({
            baseURL: 'https://graph.facebook.com/v16.0'
        });
    }

    async postNewFeed(message: string, newPostSavedDB: IPost) {
        console.log(`Post new feed to Facebook: ${message}`);

        const pageId = process.env.FACEBOOK_PAGE_ID

        try {
            const res = await this._axios.post(`/${pageId}/feed`, {
                message: message,
                access_token: this._accessToken
            })

            // after successfully post now need to save the page_post_id to post model
            // those task dont need async
            newPostSavedDB.meta.facebook = {
                post_id: res.data.id,
                likes: 0,
                shares: 0,
                comments: 0,
            }

            newPostSavedDB.markModified('meta.facebook')
            newPostSavedDB.facebook_status = SocialStatus.POSTED

            await newPostSavedDB.save()

        } catch (err) {
            console.log(err);
        }
    }

    async setAccessToken(userMeta: IUserMeta) {
        this._accessToken = userMeta.pageAccessToken
        this._axios.defaults.params = {}
        this._axios.defaults.params['access_token'] = userMeta.pageAccessToken;
    }

    async saveTokenDB(data: SocialAuthType) {
        const user = data.authUser

        //extend the token before save to database  

        try {
            //get page token
            const pageId = process.env.FACEBOOK_PAGE_ID
            const res = await this._axios.get(`/${pageId}?fields=access_token&access_token=${data.access_token}`)
            const pageAccessToken = res.data.access_token;

            //extend token
            // https://developers.facebook.com/docs/pages/access-tokens/
            const shortLiveAccessToken = data.access_token
            const appId = process.env.FACEBOOK_APP_ID
            const appSecret = process.env.FACEBOOK_APP_SECRET

            const res2 = await this._axios.get(`oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${shortLiveAccessToken}`)

            const longLiveAccessToken = res2.data.access_token

            user.meta.facebook = <IUserMeta>{
                accessToken: longLiveAccessToken,
                pageAccessToken: pageAccessToken,
                name: data.name
            }

            user.markModified('meta.facebook')

            await user.save()
        } catch (err) {
            console.log(err);
        }
    }

    async getLikeShareComment(post: IPost) {
        try {
            const post_id = post.meta.facebook.post_id
            const res = await this._axios.get(`/${post_id}/?fields=likes.summary(true),shares.summary(true),comments.summary(true)`, {})

            // after successfully post now need to save the page_post_id to post model
            // those task dont need async
            post.meta.facebook = {
                ...post.meta.facebook,
                likes: res.data.likes.summary.total_count,
                shares: res.data.shares.summary.total_count,
                comments: res.data.comments.summary.total_count,
            }

            post.markModified('meta.facebook')
            post.facebook_status = SocialStatus.SUCCESS

            await post.save()

        } catch (err) {
            console.log(err);

            post.facebook_status = SocialStatus.ERROR_CRAWLING
            post.save()
        }
    }
}

export class LinkedinService extends SocialService {

    initAxios() {
        this._axios = axios.create({
            baseURL: 'https://www.linkedin.com/oauth/v2'
        });
    }

    async postNewFeed(message: string, newPostSavedDB: IPost) {
        console.log(`Post new feed to Linkedin: ${message}`);
    }

    async setAccessToken(userMeta: IUserMeta) {
        this._accessToken = '';
    }

    async saveTokenDB(data: SocialAuthType) {
        const user = data.authUser

        const res = await this._axios.post('/accessToken', {
            'grant_type': 'authorization_code',
            'code': data.access_token,
            'redirect_uri': process.env.LINKEDIN_REDIRECT_URI,
            'client_id': process.env.LINKEDIN_CLIENT_ID,
            'client_secret': process.env.LINKEDIN_CLIENT_SECRET
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        user.meta.linkedin = <IUserMeta>{
            accessToken: res.data.access_token,
            name: data.name
        }

        user.markModified('meta.linkedin')

        await user.save()
    }
}

export class SocialServiceFactory {
    static create(type: TypeSocial) {
        switch (type) {
            case TypeSocial.Facebook:
                return new FacebookService();
            case TypeSocial.Linkedin:
                return new LinkedinService();
            default:
                throw new Error('Invalid social type');
        }
    }
}