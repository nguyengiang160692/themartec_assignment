
import axios from "axios";

export enum TypeSocial {
    Facebook = 'facebook',
    Linkedin = 'linkedin',
}

export abstract class SocialServiceAbstract {
    abstract initAxios(): void;
    abstract postNewFeed(message: string): void;
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

    public postNewFeed(message: string): void {
        throw new Error('Method postNewFeed not implemented.');
    }

    public setAccessToken(response: any): void {
        throw new Error('Method setAccessToken not implemented.');
    }
}

export class FacebookService extends SocialService {

    // "https://graph.facebook.com/v16.0/me?fields=id%2Cname&access_token="

    initAxios() {
        this._axios = axios.create({
            baseURL: 'https://graph.facebook.com/v16.0',
            timeout: 1000
        });
    }

    postNewFeed(message: string) {
        console.log(`Post new feed to Facebook: ${message}`);

        this._axios.post('/me', {}).then((res: any) => {
            console.log(res);
        }).catch((err: any) => {
            console.log(err);
        });
    }

    setAccessToken(authData: any) {
        this._accessToken = authData.facebook.loginResponse.accessToken;

        this._axios.defaults.params = {}
        this._axios.defaults.params['access_token'] = this._accessToken;
    }
}

export class LinkedinService extends SocialService {
    postNewFeed(message: string) {
        console.log(`Post new feed to Linkedin: ${message}`);
    }

    setAccessToken(response: any) {
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