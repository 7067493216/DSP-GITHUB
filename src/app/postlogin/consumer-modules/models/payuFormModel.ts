export class PayuFormModel {
    key: any;
    txnid: any;
    amount: any;
    productinfo: any;
    firstname: any;
    email: any;
    phone: any;
    lastname: any;
    udf1: any;
    udf2: any;
    udf3: any;
    udf4: any;
    udf5: any;
    surl: any;
    furl: any;
    hash: any;

    constructor(
        key: any,
        txnid: any,
        amount: any,

        productinfo: any,
        firstname: any,
        email: any,
        phone: any,
        lastname: any,
        udf1: any,
        udf2: any,
        udf3: any,
        udf4: any,
        udf5: any,
        surl: any,
        furl: any,
        hash: any,


    ) {

        this.key = key;
        this.txnid = txnid;
        this.amount = amount;

        this.productinfo = productinfo;
        this.firstname = firstname;
        this.email = email;
        this.phone = phone;
        this.lastname = lastname;
        this.udf1 = udf1;
        this.udf2 = udf2;
        this.udf3 = udf3;
        this.udf4 = udf4;
        this.udf5 = udf5;
        this.surl = surl;
        this.furl = furl;
        this.hash = hash;

    }
}