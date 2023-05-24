
export enum TypeSocial {
    Facebook = 'facebook',
    Linkedin = 'linkedin',
}

export abstract class SocialServiceAbstract {
    abstract postNewFeed(message: string): void;
}

export default class SocialService implements SocialServiceAbstract {
    public postNewFeed(message: string): void {
        throw new Error('Method not implemented.');
    }
}

export class FacebookService extends SocialService {
    postNewFeed(message: string) {
        console.log(`Post new feed to Facebook: ${message}`);
    }
}

export class LinkedinService extends SocialService {
    postNewFeed(message: string) {
        console.log(`Post new feed to Linkedin: ${message}`);
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