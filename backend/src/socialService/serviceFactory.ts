
import axios from "axios";
import { IPost, SocialStatus } from "../model/post";

export enum TypeSocial {
    Facebook = 'facebook',
    Linkedin = 'linkedin',
}

export abstract class SocialServiceAbstract {
    abstract initAxios(): void;
    abstract postNewFeed(message: string, newPostSavedDB: IPost): void;
    abstract setAccessToken(response: any): void;
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

    public async setAccessToken(response: any): Promise<void> {
        throw new Error('Method setAccessToken not implemented.');
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
                ...newPostSavedDB.meta.facebook
            }

            newPostSavedDB.markModified('meta.facebook')
            newPostSavedDB.facebook_status = SocialStatus.POSTED

            await newPostSavedDB.save()

        } catch (err) {
            console.log(err);
        }
    }

    async setAccessToken(authData: any) {
        //have to convert page token before using
        const userToken = authData.facebook.loginResponse.accessToken;

        const pageId = process.env.FACEBOOK_PAGE_ID

        //TODO: should use long live use access token and then save both token in database for next use
        // https://developers.facebook.com/docs/pages/access-tokens/
        const res = await this._axios.get(`/${pageId}?fields=access_token&access_token=${userToken}`)

        this._accessToken = res.data.access_token

        this._axios.defaults.params = {}
        this._axios.defaults.params['access_token'] = this._accessToken;
    }
}

export class LinkedinService extends SocialService {
    async postNewFeed(message: string, newPostSavedDB: IPost) {
        console.log(`Post new feed to Linkedin: ${message}`);
    }

    async setAccessToken(response: any) {
        this._accessToken = '';
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