import {Injectable} from '@angular/core';

declare var OidcTokenManager:any;

interface IAuthConfig {
    authority:string;
    client_id:string;
}

@Injectable()
export class AuthManager {
    private config = {
        authority: "http://test:22530/",
        client_id: "test",
        redirect_uri: window.location.protocol + "//" + window.location.host + "/home/index/",
        post_logout_redirect_uri: window.location.protocol + "//" + window.location.host + "/home/index/",
        response_type: "id_token token",
        scope: "openid profile email api1 api2",
        silent_redirect_uri: window.location.protocol + "//" + window.location.host + "/auth/silent_renew.html",
        silent_renew: false,
        filter_protocol_claims: false
    };

    private mgr:any;

    constructor() {
        var cfg:IAuthConfig = (<any>window).notifierSettings.authConfig;
        this.config.authority = cfg.authority;
        this.config.client_id = cfg.client_id;
        this.mgr = new OidcTokenManager(this.config);
    }

    private authorize(scope, response_type) {
        this.config.scope = scope;
        this.config.response_type = response_type;
        this.mgr.redirectForToken();
    }

    public getToken() {
        // this.authorize("openid", "id_token");
        console.log(this.config)
    }
}