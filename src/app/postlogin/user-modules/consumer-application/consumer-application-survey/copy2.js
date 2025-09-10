//   // for non-mkmy
//   else if (this.consumerApplicationDetail?.natureOfWorkTypeId!=5 && this.radioButtonBoolean == false) {
//     this.notificationService.warn("Please confirm first, Aaavedak Ka prakar is right/wrong");
//     return
// }
// else {

//     let formData: FormData = new FormData();
//     formData.append("consumerApplicationNo", this.aavedakKaPrakarConfirmationByDGM.consumerApplicationNo)
//     formData.append("isAvedakGovernmentERP", this.aavedakKaPrakarConfirmationByDGM.isAvedakGovernmentERP)
//     formData.append("isAvedakGovernmentRevise", this.aavedakKaPrakarConfirmationByDGM.isAvedakGovernmentRevise)
//     this.consumerApplicationService.aavedakKaPrakarConfirmationByDgm(formData).subscribe((respo: any) => {
//         if (respo?.code == "204") {
//             console.log(respo, "wwoowwww...............................................");
//             // this.ReturnAmtBooleanOpen = false;
//             this.ExtraaButtonValidationCheck = false;
//             this.ShowingErrorValForOtherButtonsCheck = false;
//             this.ShowingErrorValForOtherButtonsCheckForNsc = false;
//             console.log(this.applicationServeyErpFg.controls.erpNo.value, "erpEstimatGenrate method  erpEstimatGenrate method");
//             console.log('ccccccccccccccccccccccccccccc', this.consumerApplicationDetail?.consumerApplicationId);
//             this.consumerApplicationService.getErpEstimateAmount(this.applicationServeyErpFg.controls.erpNo.value, this.consumerApplicationDetail?.consumerApplicationId, 1).subscribe(data => {
//                 if (data['code'] == "200") {
//                     // data['list'].estimateAmount = JSON.parse(data['list'].estimateAmount);
//                     // data['list'].estimateAmount = JSON.parse(data['list'].estimateAmount);
//                     console.log('222222222222', data['list'].estimateAmount);
//                     this.erpConfirmationVariable = true;
//                     this.storedErpNo = this.applicationServeyErpFg.controls.erpNo.value
//                     this.EstimateAmount = data['list'];
//                     this.notificationService.success(data['message']);
//                 } else if (data['code'] == "406" && data['message'] == "Scheme code not matched") {
//                     this.notificationService.error("आपके द्वारा दर्ज ERP No संबंधित स्कीम से संबंधित नही है।");
//                     return
//                 }
//                 else if (data['code'] == "406" && data['message'] == "Estimate is wrongly created in ERP") {
//                     this.notificationService.warn("ERP में एस्टीमेट गलत बनाया गया है।");
//                     return
//                 } else if (data['code'] == "406" && data['message'] == "This ERP Number Is Already Associated With Another Application Number.") {
//                     this.notificationService.error("This ERP Number Is Already Associated With Another Application Number => " + data['list']);
//                     return
//                 }
//                 else {
//                     this.notificationService.error(data['message']);
//                     return
//                 }
//             }, (error) => {
//             });

//         } else {
//             this.notificationService.warn(respo?.message)
//             return
//         }

//     }, (error: any) => {
//         console.log(error, "errror..................");
//         this.notificationService.warn(error?.message)
//         return
//     }
//     )

// }






// // for mkmy
// else if (this.consumerApplicationDetail?.natureOfWorkTypeId!=5 && this.radioButtonBoolean == false) {
//     this.notificationService.warn("Please confirm first, Aaavedak Ka prakar is right/wrong");
//     return
// }
// else {

//     let formData: FormData = new FormData();
//     formData.append("consumerApplicationNo", this.aavedakKaPrakarConfirmationByDGM.consumerApplicationNo)
//     formData.append("isAvedakGovernmentERP", this.aavedakKaPrakarConfirmationByDGM.isAvedakGovernmentERP)
//     // formData.append("isAvedakGovernmentRevise", this.aavedakKaPrakarConfirmationByDGM.isAvedakGovernmentRevise)
//     this.consumerApplicationService.aavedakKaPrakarConfirmationByDgm(formData).subscribe((respo: any) => {
//         if (respo?.code == "204") {
//             console.log(respo, "wwoowwww...............................................");
//             this.consumerApplicationService.getErpDetailsByErpNumber(JSON.parse(this.applicationServeyErpFgOfMkmy.value.erpNo), this.consumerApplicationDetail?.consumerApplicationNo).subscribe((data: any) => {
//                 console.log(data, "Mkmy........Data.....................");
//                 if (data.code == "200") {
//                     this.erpEstimateDataForMkmyArray = data.list;
//                     this.mkmyerpConfirmationVariable = true
//                     this.erpNoOfMkmyVariable = this.applicationServeyErpFgOfMkmy.value.erpNo;
//                     this.notificationService.success("Data retrive Successfully");
//                 } else if (data.code == "307") {
//                     let messageFirst = "Amount more than the sanction estimate amount 195972 for for 25 DTR";
//                     let messageSecond = "Amount more than the sanction estimate amount 195972 for for 63 DTR";
//                     if (data.message === messageFirst) {
//                         this.notificationService.warn("25 डीटीआर के लिए स्वीकृत प्राक्कलन राशि 195972 से अधिक राशि है।")
//                     }
//                     else if (data.message === messageSecond) {
//                         this.notificationService.warn('63 डीटीआर के लिए स्वीकृत प्राक्कलन राशि 337173 से अधिक राशि है।')
//                     }
//                     return
//                 } else if (data.code == "406") {
//                     this.notificationService.error("This ERP Number Is Already Associated With Another Application Number.");
//                     return
//                 }
//                 else {
//                     this.notificationService.warn("आपके द्वारा दर्ज ERP No संबंधित स्कीम से संबंधित नही है।");
//                     return;
//                 }
//                 // this.erpEstimateDataForMkmyArray = data.list[0];
//                 // this.mkmyerpConfirmationVariable = true
//                 // this.erpNoOfMkmyVariable = this.applicationServeyErpFgOfMkmy.value.erpNo

//             })

//         } else {
//             console.log(respo, "ooohhhssssshhhiiiittttt.................");
//             this.notificationService.warn(respo?.message)
//             return
//         }

//     }, (error: any) => {
//         this.notificationService.warn(error?.message)
//         console.log(error, "errror..................");
//         return
//     }
//     )

// }