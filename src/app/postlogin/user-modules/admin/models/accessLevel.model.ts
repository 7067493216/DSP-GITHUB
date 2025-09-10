export interface AccessLevel {
    accessLevel: string;
}

export interface RootObject {
    code: string;
    message: string;
    list: AccessLevel[];
    error?: any;
    token?: any;
}
