import { NameType } from './save-nsc.model';
export class PersonalInfo {
    applicationNo: string;
    userType: string;
    idProof: string;
    idNumber: string;
    mobile: string;
    secondrymobile: string;
    relation: string;
    relationName: string;
    email: string;
    secondryEmail: string;
    connectionDate: Date;
    agreementDate: Date;
    nameTypes: NameType[];
}
