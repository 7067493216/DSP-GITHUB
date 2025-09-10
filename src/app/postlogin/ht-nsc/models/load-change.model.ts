export interface LoadChangeModel {
    consumerId: string;
    effectiveDate: Date;
    newLoad: NewLoad[];
    purposeOfInstallation: number;
}
export interface NewLoad {
    contractType: number;
    value: string;
}


