import {Injectable} from "angular2/core";

@Injectable()
export class ConfirmService {
    activate: (message?: string, title?: string) => Promise<boolean>;
}