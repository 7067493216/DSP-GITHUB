export interface Designation {
    designationId: number;
    designation: string;
    designationShortForm: string;

}

export interface RootObject {
    code: string;
    message: string;
    list: Designation[];
    error?: any;
    token?: any;
}

