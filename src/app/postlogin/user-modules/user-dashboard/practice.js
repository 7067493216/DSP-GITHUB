// let abcArray = [
//     { applicationStatusId: 4 },
//     { applicationStatusId: 5 },
//     { applicationStatusId: 6 },
//     { applicationStatusId: 7 },
//     { applicationStatusId: 9 },
//     { applicationStatusId: 12 },
//     { applicationStatusId: 20 },
//     { applicationStatusId: 21 },
//     { applicationStatusId: 22 },
//     { applicationStatusId: 23 },
//     { applicationStatusId: 24 },
//     { applicationStatusId: 25 },
//     { applicationStatusId: 26 },
//     { applicationStatusId: 27 },
//     { applicationStatusId: 28 },
//     { applicationStatusId: 29 },
//     { applicationStatusId: 30 },
//     { applicationStatusId: 31 },
//     { applicationStatusId: 32 },
//     { applicationStatusId: 33 },
//     { applicationStatusId: 34 },
//     { applicationStatusId: 35 },
//     { applicationStatusId: 36 },
//     { applicationStatusId: 37 },
//     { applicationStatusId: 38 },
//     { applicationStatusId: 39 },
//     { applicationStatusId: 40 }
// ];

// abc = [];

// let list = [
//     {

//         "applicationStatus": {
//             "created": null,
//             "applicationStatusId": 39,
//             "applicationStatusName": "Refund Proposal By DGM",
//             "applicationStatusDescription": null,
//             "active": true,
//             "deleted": false
//         }

//     },
//     {

//         "applicationStatus": {
//             "created": null,
//             "applicationStatusId": 24,
//             "applicationStatusName": "Pending for generation of Work completion by Contractor at QC Portal",
//             "applicationStatusDescription": null,
//             "active": true,
//             "deleted": false
//         }

//     },
//     {

//         "applicationStatus": {
//             "created": null,
//             "applicationStatusId": 21,
//             "applicationStatusName": "Pending at Applicant end for Contractor Selection",
//             "applicationStatusDescription": null,
//             "active": true,
//             "deleted": false
//         },

//     },
//     {

//         "applicationStatus": {
//             "created": null,
//             "applicationStatusId": 34,
//             "applicationStatusName": "Pending for Contractor Selection After Tender By DGM-STC",
//             "applicationStatusDescription": null,
//             "active": true,
//             "deleted": false
//         }
//     },
//     {

//         "applicationStatus": {
//             "created": null,
//             "applicationStatusId": 21,
//             "applicationStatusName": "Pending at Applicant end for Contractor Selection",
//             "applicationStatusDescription": null,
//             "active": true,
//             "deleted": false
//         }
//     },
//     {

//         "applicationStatus": {
//             "created": null,
//             "applicationStatusId": 39,
//             "applicationStatusName": "Refund Proposal By DGM",
//             "applicationStatusDescription": null,
//             "active": true,
//             "deleted": false
//         }
//     },
//     {

//         "applicationStatus": {
//             "created": null,
//             "applicationStatusId": 21,
//             "applicationStatusName": "Pending at Applicant end for Contractor Selection",
//             "applicationStatusDescription": null,
//             "active": true,
//             "deleted": false
//         },

//     },
//     {

//         "applicationStatus": {
//             "created": null,
//             "applicationStatusId": 39,
//             "applicationStatusName": "Refund Proposal By DGM",
//             "applicationStatusDescription": null,
//             "active": true,
//             "deleted": false
//         },

//     },
//     {

//         "applicationStatus": {
//             "created": null,
//             "applicationStatusId": 33,
//             "applicationStatusName": "Connection Granted Successfully",
//             "applicationStatusDescription": null,
//             "active": true,
//             "deleted": false
//         },

//     },
//     {

//         "applicationStatus": {
//             "created": null,
//             "applicationStatusId": 12,
//             "applicationStatusName": "Demand Note Pending For Payment at Consumer End",
//             "applicationStatusDescription": null,
//             "active": true,
//             "deleted": false
//         }
//     },
//     {

//         "applicationStatus": {
//             "created": null,
//             "applicationStatusId": 12,
//             "applicationStatusName": "Demand Note Pending For Payment at Consumer End",
//             "applicationStatusDescription": null,
//             "active": true,
//             "deleted": false
//         }

//     },
// ];


// for (let i = 0; i < abcArray.length; i++) {
//     let currList = list.filter((x) => {
//         return x.applicationStatus.applicationStatusId == abcArray[i].applicationStatusId
//     })

//     abc.push(
//         {"applicationStatusId": abcArray[i].applicationStatusId,
//          "count": currList.length,
//          "data" : currList
//         }
//     );


// }

// console.log(abc,"aaaaaaabbbbbbbbccccccccc............................");







// {
//     "code": "200",
//         "message": "Payment Received",
//             "list": [
//                 {
//                     "Registration_Fees": "1180.00",
//                     "Registration_Fees_Transaction_Id": "ZHD52098085333",
//                     "Registration_Fees_Transaction_Date": "2024-06-24T12:31:31+05:30",
//                     "Demand_fees": "31715.00",
//                     "Demand_fees_Transaction_Id": "ZPHW2152967135",
//                     "Demand_fees_Transaction_Date": "2024-07-11T12:36:00+05:30",
//                     "Revised_Demand_fees": "12572.00",
//                     "Revised_Demand_fees_Transaction_Id": "ZIC50XD00XI08O",
//                     "Revised_Demand_fees_Transaction_Date": "2024-09-11T17:17:36+05:30",
//                     "Second_Revised_Demand_fees": "6947.00",
//                     "Second_Revised_Demand_fees_Transaction_Id": "U456W4C0001LMB",
//                     "Second_Revised_Demand_fees_Transaction_Date": "2024-11-19T12:28:10+05:30"
//                 }
//             ],
//                 "map": null,
//                     "error": null,
//                         "token": null
// }


















////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


let mergeStatusArrayStatic = [
    { "Sno": 1, "statusName": "कनेक्शन प्रदाय के लिए आवेदन।", "applicationStatusId": [32] },
    { "Sno": 2, "statusName": "आवेदन लंबित महाप्रबंधक स्तर पर।", "applicationStatusId": [35] },
    { "Sno": 3, "statusName": "आवेदन लंबित वितरण प्रभारी स्तर पर।", "applicationStatusId": [6, 7, 36] },
    { "Sno": 4, "statusName": "आवेदन लंबित उपमहाप्रबंधक(O&M/HTM) स्तर पर।", "applicationStatusId": [9, 23, 25] },
    { "Sno": 5, "statusName": "आवेदन लंबित उपमहाप्रबंधक(STC) स्तर पर।", "applicationStatusId": [27, 34] },
    { "Sno": 6, "statusName": "आवेदन लंबित उपभोक्ता स्तर पर।", "applicationStatusId": [12, 21, 30, 38] },
    { "Sno": 7, "statusName": " निरस्त किये गये आवेदन।", "applicationStatusId": [37, 29, 35] },
    { "Sno": 8, "statusName": "आवेदन लंबित ठेकेदार के स्तर पर।", "applicationStatusId": [20, 22, 24, 31] },
    { "Sno": 9, "statusName": "पूर्ण आवेदन।", "applicationStatusId": [28, 33] },
];

let list = [
    { "applicationStatus": { "applicationStatusId": 21, "applicationStatusName": "Pending at Applicant end for Contractor Selection", "active": true, "deleted": false } },
    { "applicationStatus": { "applicationStatusId": 7, "applicationStatusName": "Pending at Applicant end for Contractor Selection", "active": true, "deleted": false } },
    { "applicationStatus": { "applicationStatusId": 9, "applicationStatusName": "Pending at Applicant end for Contractor Selection", "active": true, "deleted": false } }
    // Add more list items as necessary...
];

let mainArray = [];

for (let i = 0; i < mergeStatusArrayStatic.length; i++) {
    // Reset newArray for each status
    let newArray = list.filter((data) => {
        return mergeStatusArrayStatic[i].applicationStatusId.includes(data.applicationStatus.applicationStatusId);
    });

    // Push the filtered data with corresponding status ID into mainArray
    mainArray.push({
        "id": mergeStatusArrayStatic[i].Sno,
        "data": newArray,
        "count": newArray.length
    });
}

console.log(mainArray);








[
        {
            "id": 225,
            "conAppNo": "SV202307557",
            "totalNoOfDtr": 2,
            "vendorName": "AWADH TRANSFORMERS",
            "serialNo": "232323232",
            "invoiceNO": "623565236236",
            "yearOfManufacture": "01-2006",
            "capacityOfDtr": null,
            "auticationId": "CZC20160512195",
            "shuffling": null,
            "circleName": null,
            "childApplicationNo": null,
            "shufflingFlag": 0,
            "itemNo": "M-0106034",
            "materialName": "Distribution Transformer",
            "meterialSpecification": null,
            "capacityOfPtr": null,
            "totalNoOfPtr": 0,
            "divisionName": null,
            "consumerName": null,
            "address": null,
            "contractorAuthenticationNo": null,
            "workOrderNumber": null,
            "materialRecivedInLab": null,
            "circleId": null,
            "dtrPassOrFail": null,
            "applicationId": null,
            "instalationDate": "2009-07-07T18:30:00.000Z",
            "regionId": null,
            "regionName": null,
            "dtrAcceptOrNot": null,
            "remark": null,
            "date": null,
            "parantApplicationNo": null,
            "dc_NAME": null,
            "taAcceptDtrOrNotDate": null
        },
         {
            "id": 225,
            "conAppNo": "SV202307557",
            "totalNoOfDtr": 2,
            "vendorName": "AWADH TRANSFORMERS",
            "serialNo": "232323232",
            "invoiceNO": "623565236236",
            "yearOfManufacture": "01-2006",
            "capacityOfDtr": null,
            "auticationId": "CZC20160512195",
            "shuffling": null,
            "circleName": null,
            "childApplicationNo": null,
            "shufflingFlag": 0,
            "itemNo": "M-0106034",
            "materialName": "Distribution Transformer",
            "meterialSpecification": null,
            "capacityOfPtr": null,
            "totalNoOfPtr": 0,
            "divisionName": null,
            "consumerName": null,
            "address": null,
            "contractorAuthenticationNo": null,
            "workOrderNumber": null,
            "materialRecivedInLab": null,
            "circleId": null,
            "dtrPassOrFail": null,
            "applicationId": null,
            "instalationDate": "2009-07-07T18:30:00.000Z",
            "regionId": null,
            "regionName": null,
            "dtrAcceptOrNot": null,
            "remark": null,
            "date": null,
            "parantApplicationNo": null,
            "dc_NAME": null,
            "taAcceptDtrOrNotDate": null
        },
         {
            "id": 225,
            "conAppNo": "SV202307557",
            "totalNoOfDtr": 2,
            "vendorName": "AWADH TRANSFORMERS",
            "serialNo": "232323232",
            "invoiceNO": "623565236236",
            "yearOfManufacture": "01-2006",
            "capacityOfDtr": null,
            "auticationId": "CZC20160512195",
            "shuffling": null,
            "circleName": null,
            "childApplicationNo": null,
            "shufflingFlag": 0,
            "itemNo": "M-0106034",
            "materialName": "Distribution Transformer",
            "meterialSpecification": null,
            "capacityOfPtr": null,
            "totalNoOfPtr": 0,
            "divisionName": null,
            "consumerName": null,
            "address": null,
            "contractorAuthenticationNo": null,
            "workOrderNumber": null,
            "materialRecivedInLab": null,
            "circleId": null,
            "dtrPassOrFail": null,
            "applicationId": null,
            "instalationDate": "2009-07-07T18:30:00.000Z",
            "regionId": null,
            "regionName": null,
            "dtrAcceptOrNot": null,
            "remark": null,
            "date": null,
            "parantApplicationNo": null,
            "dc_NAME": null,
            "taAcceptDtrOrNotDate": null
        }
    ]


































