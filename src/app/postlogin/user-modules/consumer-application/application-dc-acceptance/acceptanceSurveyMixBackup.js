{/* <mat-card class="my-card custom-scroll-enable-1">
    <div align="right">
        <button class="close-btn" mat-stroked-button (click)="onClose()" tabIndex="-1">
            <mat-icon>clear</mat-icon>
        </button>
    </div>
    <mat-toolbar class="label label-warning justify-content-center" style="font-size: 2em; font-weight: 900;">

        <span>{{data.modalTitle}}</span>


    </mat-toolbar>
    <!-- *ngFor="let basics of basicdetails"  ** app-consumer-application-view-page ** -->

    <!-- <div class="custom-scroll-disable">
        <ng-container *ngIf="consumerApplicationId">
            <consumer-application-view [consumerApplicationId]="consumerApplicationId">
            </consumer-application-view>

             <app-consumer-application-view-page >
            </app-consumer-application-view-page>

        </ng-container>
    </div> -->
    <br>
    <br>
    <div align="center">
        <h1
            style="color: black; background-color:  rgb(215, 214, 214); font-weight: 900; width: 95%; margin-right: 2%;">
            Application Details(<b>{{consumerApplicationDetail?.consumerApplicationNo}}</b>)</h1>
    </div>


    <table class="table table-bordered">

        <tr class="table-secondary">
            <th scope="col" colspan="4">
                <div align="center" style="font-weight: 900; font-size: 1.5em;">Consumer Details</div>
            </th>
        </tr>
        <tr>
            <th colspan="2" scope="row">Applicant Name (आवेदक का नाम) </th>
            <td colspan="2">{{consumerApplicationDetail?.consumerName}}</td>

        </tr>
        <tr>
            <th colspan="2" scope="row">Address (पता) </th>
            <td colspan="2">{{consumerApplicationDetail?.address}}</td>

        </tr>
        <tr>
            <th colspan="2" scope="row">Contact</th>
            <td colspan="2">{{consumerApplicationDetail?.consumerphonNumber}}</td>

        </tr>

        <tr>
            <th colspan="2" scope="row">IVRSNO (उपभोक्ता संख्या)</th>
            <td colspan="2">{{consumerApplicationDetail?.ivrsNo}}</td>

        </tr>

        <tr>
            <th colspan="2" scope="row">GST Number</th>
            <td colspan="2"><span *ngIf="consumerApplicationDetail?.gstNumber==null">NA</span><span
                    *ngIf="consumerApplicationDetail?.gstNumber!=null">{{consumerApplicationDetail?.gstNumber}}</span>
            </td>

        </tr>
        <!-- gstNumber -->

        <tr class="table-secondary">
            <th scope="col" colspan="4">
                <div align="center" style="font-weight: 900; font-size: 1.5em;">Application Details</div>
            </th>
        </tr>
        <tr>
            <th colspan="2" scope="row">Application Number</th>
            <td colspan="2">{{consumerApplicationDetail?.consumerApplicationNo}}</td>

        </tr>
        <tr>
            <th colspan="2" scope="row">Nature of Work (कार्य प्रकार)(Application type)</th>
            <td colspan="2">{{consumerApplicationDetail?.natureOfWorkName}}</td>

        </tr>
        <tr>
            <th colspan="2" scope="row">Scheme Type (योजना का प्रकार)</th>
            <td colspan="2">{{consumerApplicationDetail?.schemeTypeName}}</td>

        </tr>

        <tr>
            <th colspan="2" scope="row">Supply Voltage (सप्लाई वोल्टेज)</th>
            <td colspan="2">{{supplyVoltageString}}</td>

        </tr>
        <tr>
            <th colspan="2" scope="row">load Request (आवेदक द्वारा दर्ज किया गया भार)</th>
            <td colspan="2">
                {{consumerApplicationDetail?.loadRequested}}<span>{{consumerApplicationDetail?.loadRequestedName}}
                </span></td>

        </tr>
        <tr>
            <th colspan="2" scope="row">Land Area & Land area unit</th>
            <td colspan="2"> {{consumerApplicationDetail?.area}}<span>
                    {{consumerApplicationDetail?.landAreaUnit?.landAreaUnitName}}</span></td>

        </tr>

        <tr>
            <th colspan="2" scope="row">No. of Plot/flats </th>
            <td colspan="2">{{consumerApplicationDetail?.noOfPlot}}</td>

        </tr>
        <tr>
            <th colspan="2" scope="row">GST Number</th>
            <td colspan="2">{{consumerApplicationDetail?.gstNumber}}</td>

        </tr>
        <tr>
            <th colspan="2" scope="row">कॉलोनी आवेदक का प्रकार</th>
            <td colspan="2">{{consumerApplicationDetail?.individualOrGroupIdName}}</td>

        </tr>
        <tr>
            <th colspan="2" scope="row">Work Short Description (कार्य का संक्षिप्त विवरण)</th>
            <td colspan="2">{{consumerApplicationDetail?.shortDescriptionOfWork}}</td>

        </tr>

        <!-- connection-pradaai-for-ngb-details -->

        <tr class="table-secondary"
            *ngIf="consumerApplicationDetail?.natureOfWorkTypeId ==8 && consumerApplicationDetail?.applicationStatusId==33">
            <th scope="col" colspan="4">
                <div align="center" style="font-weight: 900; font-size: 1.5em;">Connection Granted Detail
                </div>
            </th>
        </tr>


        <!-- aadhaarNo: "898989890808"
active: true
address1: "60/2, Jatpura"
address2: "461444"
address3: "Bhopal"
affiliatedConsumerNo: null
applicationNumber: "DS1718090774573"
areaStatus: "AUTHORISED"
category: "GENERAL"
connectionDate: "11-06-2024"
connectionType: "PERMANENT"
consumerName: "Nirbhaydas Mukati"
consumerNameH: null
contractDemand: 0
contractDemandUnit: "KW"
created: "2024-06-11T07:50:44.784+00:00"
dateORe: "2024-06-11"
deleted: false
dtrName: "5044020249|Ramnarayan Yadav wala"
feederName: "3040301020101|OLD PHATAK 11 KV FEEDER"
groupNo: "DTX22"
isAffiliatedConsumer: "false"
isBeneficiary: "false"
isBpl: "false"
isCapacitorSurcharge: "false"
isDemandside: "false"
isEmployee: "false"
isGovernment: "false"
isSeasonal: "false"
isWeldingTransformerSurcharge: "false"
isXray: "false"
isiMotorType: "false"
locationCode: 2304402
meteringStatus: "UNMETERED"
ngbConsumerNo: null
ngbId: 56
ngbPushDate: null
nscAppId: null
phase: "THREE"
plotSize: 5
plotSizeUnit: "HCT"
poleDistance: 34
poleLatitude: null
poleLongitude: null
poleNo: 21212
portalName: "DSP"
premiseType: "RURAL"
primaryMobileNo: "7000116054"
propertyName: "khasra_no"
propertyValue: "332"
purposeOfInstallation: "(FLAT RATE) Permanent agricultural pump"
purposeOfInstallationId: 101
readingDiaryNo: "1"
registrationFeeAmount: 2500
registrationFeeAmountMrNo: "0002113043"
relation: "FATHER"
relativeName: "---test"
sanctionedLoad: 21
sanctionedLoadUnit: "HP"
securityDepositAmount: 12600
securityDepositAmountMrNo: "0002113043"
subCategoryCode: 512
tariffCategory: "LV5"
tarrifCode: "LV5.4"
tcEndDate: null
tcStartDate: null
ngbConsumerNo: null            -->

        <tr>
            <th colspan="2" scope="row">Consumer Number (IVRS no)</th>
            <td colspan="2">{{ngbPunchingDetails?.ngbConsumerNo}}</td>

        </tr>

        <tr>
            <th colspan="2" scope="row">DTR Name</th>
            <td colspan="2">{{ngbPunchingDetails?.dtrName}}</td>

        </tr>

        <tr>
            <th colspan="2" scope="row">FEEDER Name</th>
            <td colspan="2">{{ngbPunchingDetails?.feederName}}</td>

        </tr>

        <!-- ///////////////////////////////////////////////                         -->



        <!-- ////////////////////////////////// complain Details  start////////////////////////////////////////// -->

        <tr class="table-secondary" *ngIf="complainList!=null || complainList!=undefined">
            <!-- <th scope="col">S.No.</th> -->
            <th scope="col" colspan="4">
                <div align="center" style="font-weight: 900; font-size: 1.5em;">Complain by Consumer
                </div>
            </th>
        </tr>


        <tr *ngFor="let obj of complainList; let i=index;">
            <!-- <th scope="row" colspan="2">{{obj?.workIssueId}}</th> -->
            <th scope="row" colspan="2">{{i+1}}</th>

            <!-- <th colspan="1"  scope="row">Issue</th> -->
            <td colspan="2">{{obj?.feedback}}</td>
        </tr>



        <!-- ////////////////////////////////// complain Details  end////////////////////////////////////////// -->

        <!-- //////////////////////////////////////////// consumer Feedback start ////////////////////////////// -->
        <tr class="table-secondary" *ngIf="feedbackList!=null || feedbackList!=undefined">
            <!-- <th scope="col">S.No.</th> -->
            <th scope="col" colspan="4">
                <div align="center" style="font-weight: 900; font-size: 1.5em;">Feedback by Consumer
                </div>
            </th>
        </tr>


        <tr *ngFor="let obj of feedbackList; let i=index;">
            <!-- <th scope="row" colspan="2">{{obj?.workIssueId}}</th> -->
            <th scope="row" colspan="2">{{i+1}}</th>

            <!-- <th colspan="1"  scope="row">Issue</th> -->
            <td colspan="2">{{obj?.feedback}}</td>
        </tr>

        <!-- //////////////////////////////////////////// consumer Feedback end ////////////////////////////// -->

        <tr class="table-secondary">
            <th scope="col" colspan="2">
                <div align="center" style="font-weight: 900; font-size: 1.5em;">Contractor Details</div>
            </th>
            <th scope="col" colspan="2">
                <div align="center" style="font-weight: 900; font-size: 1.5em;">Work Order Details & Work Complation
                    Details</div>
            </th>
        </tr>
        <tr>
            <th scope="row">Contractor Name (कॉन्ट्रैक्टर का नाम)</th>
            <td><b>{{paymentView?.NAME_OF_CONTRACTOR}},
                </b>
                [{{paymentView?.CONTRACTOR_ID}}] </td>

            <th scope="row">DGM STC APPROVAL DATE</th>
            <td>
                <div *ngIf="consumerApplicationDetail?.dateOfDgmOandM!=null">
                    {{consumerApplicationDetail?.dateOfDgmOandM}}
                </div>
                <div *ngIf="consumerApplicationDetail?.dateOfDgmOandM==null">
                    Not Approved By DGM(STC)
                </div>
            </td>

        </tr>

        <tr>
            <th scope="row">Vendor Name (कॉन्ट्रैक्टर का नाम)</th>
            <td>Madhya Pradesh
                Madhya
                Kshetra Vidyut
                Vitaran Company Limited<strong>(MPMKVVCL)</strong> </td>

            <th scope="row">DGM (O&M) APPROVAL DATE</th>
            <td>
                <div *ngIf="consumerApplicationDetail?.dateOfDgmOandM!=null">
                    {{consumerApplicationDetail?.dateOfDgmOandM}}
                </div>
                <div *ngIf="consumerApplicationDetail?.dateOfDgmOandM==null">
                    Not Approved By DGM(O&M)
                </div>
            </td>

        </tr>
        <tr>
            <th rowspan="2" scope="row">Contractor State</th>
            <td rowspan="2">{{paymentView?.CONTRACTOR_STATE}}</td>
            <th scope="row">Work Order Date</th>
            <td>{{paymentView?.WORK_ORDER_DATE}}</td>

        </tr>

        <tr>
            <th scope="row">Work Order No.</th>
            <td>{{paymentView?.WORK_ORDER_NO}}</td>

        </tr>


        <tr class="table-secondary">
            <th scope="col" colspan="2">
                <div align="center" style="font-weight: 900; font-size: 1.5em;">Location Details</div>
            </th>
            <th scope="col" colspan="2">
                <div align="center" style="font-weight: 900; font-size: 1.5em;">Payment Details</div>
            </th>

        </tr>
        <tr>
            <th scope="row">Circle (वृत)</th>
            <td> {{paymentView?.NAME_OF_CIRCLE}}</td>
            <th scope="row">Registration Payment Fees</th>
            <td>{{paymentView?.PAYMENT_AMOUNT}}</td>

        </tr>
        <tr>
            <th scope="row">Division (संभाग )</th>
            <td> {{paymentView?.NAME_OF_DIVISION}}</td>
            <th scope="row">Registration Payment Date</th>
            <td>{{paymentView?.DATE_OF_REGISTRATION }}</td>

        </tr>

        <tr>
            <th scope="row">Distribution Center (वितरण केन्द्र)</th>
            <td>{{paymentView?.NAME_OF_DC}}</td>
            <th scope="row">Deemand Payment Fees</th>
            <td>{{paymentView?.SUPERVISION_PAYMENT_AMOUNT}}</td>

        </tr>
        <tr>
            <th rowspan="3" scope="row">Work Location Address (कार्य स्थल पता)</th>
            <td rowspan="3">{{consumerApplicationDetail?.workAllocationAddress}}</td>
            <th scope="row">Deemand Payment Date</th>
            <td>{{paymentView?.DATE_OF_SUPERVISION_PAYMENT }}</td>
        </tr>


        <tr>
            <th scope="row">Revise Payment Fees</th>
            <td></td>

        </tr>

        <tr>
            <th scope="row">Revise Payment Date</th>
            <td></td>

        </tr>












        <!-- <tr class="table-secondary">
            <th scope="col" colspan="3">
                <div align="center" style="font-weight: 900; font-size: 1.5em;">Work Order Details & Work Complation
                    Details</div>
            </th>
        </tr>

        <tr>
            <th scope="row">DGM STC APPROVAL DATE</th>
            <td colspan="2">
                <div *ngIf="consumerApplicationDetail?.dateOfDgmOandM!=null">
                    {{consumerApplicationDetail?.dateOfDgmOandM}}
                </div>
                <div *ngIf="consumerApplicationDetail?.dateOfDgmOandM==null">
                    Not Approved By DGM(STC)
                </div>
            </td>

        </tr>
        <tr>
            <th scope="row">DGM (O&M) APPROVAL DATE</th>
            <td colspan="2">
                <div *ngIf="consumerApplicationDetail?.dateOfDgmOandM!=null">
                    {{consumerApplicationDetail?.dateOfDgmOandM}}
                </div>
                <div *ngIf="consumerApplicationDetail?.dateOfDgmOandM==null">
                    Not Approved By DGM(O&M)
                </div>
            </td>

        </tr>

        <tr>
            <th scope="row">Work Order Date</th>
            <td colspan="2">{{paymentView?.WORK_ORDER_DATE}}</td>

        </tr>
        <tr>
            <th scope="row">Work Order No.</th>
            <td colspan="2">{{paymentView?.WORK_ORDER_NO}}</td>

        </tr> -->


        <tr class="table-secondary">
            <th scope="col" colspan="2">
                <div align="center" style="font-weight: 900; font-size: 1.5em;"> SURVEY Details</div>
            </th>

            <th scope="col" colspan="2">
                <div align="center" style="font-weight: 900; font-size: 1.5em;"> Geo Location Data</div>
            </th>
        </tr>



        <tr>
            <th scope="row">Surveyor Name</th>
            <td>{{consumerSurveyData?.surveyorName}}</td>
            <th scope="row">Start Latitude (प्रारंभिक अक्षांश)</th>
            <td>{{geoLocationData?.startingLatitude}}</td>
        </tr>

        <tr>
            <th scope="row">Surveyor Mobile No.</th>
            <td>{{consumerSurveyData?.surveyorMobile}}</td>
            <th scope="row">End Latitude (अंतिम अक्षांश)</th>
            <td>{{geoLocationData?.startingLatitude}}</td>
        </tr>

        <tr>
            <th scope="row">Schedule Survey Date</th>
            <td>{{consumerSurveyData?.scheduleSurveyDate | date: 'dd/MM/yyyy'}}</td>
            <th scope="row">Start Longitude (प्रारंभिक देशांतर)</th>
            <td> {{geoLocationData?.startingLongitude}}</td>
        </tr>

        <tr>
            <th scope="row">Schedule Survey Time</th>
            <td>{{consumerSurveyData?.scheduleSurveyTime}}</td>
            <th scope="row">End Longitude (अंतिम देशांतर)</th>
            <td>{{geoLocationData?.startingLongitude}}</td>
        </tr>


        <tr>
            <th scope="row">Survey File</th>
            <td><a href="javascript:void(0)" (click)="getFile(consumerSurveyData?.docSurvey?.uploadId)">
                    <div *ngIf="consumerSurveyData?.docSurvey!=null">Download
                        File</div>
                </a></td>

            <th scope="row">Start Geolocation Image</th>
            <td> <a *ngIf="geoLocationData?.startDoc?.uploadId != null " href="javascript:void(0)"
                    (click)="getFile(geoLocationData?.startDoc?.uploadId)">
                    Download
                    Image</a></td>
        </tr>

        <tr>
            <th scope="row">Survey status</th>
            <td>
                <div
                    *ngIf="consumerApplicationDetail?.applicationStatusId<8 || consumerSurveyData==null || consumerSurveyData==undefined ">
                    Survey not done.
                </div>
                <div
                    *ngIf=" (consumerApplicationDetail?.applicationStatusId>7 && consumerSurveyData!=null) || (consumerApplicationDetail?.applicationStatusId>7 && consumerSurveyData!=undefined )">
                    Survey done.
                    <br>
                    <div *ngIf="consumerSurveyData?.surveyStatus == 'REJECTED'">
                        <b>REJECTED REASON: </b> <span>{{consumerSurveyData?.rejectedReason}}</span>
                    </div>
                </div>
            </td>

            <th scope="row">End GeoLocation Image</th>
            <td> <a *ngIf="geoLocationData?.endDoc?.uploadId != null " href="javascript:void(0)"
                    (click)="getFile(geoLocationData?.endDoc?.uploadId)"> Download
                    Image</a></td>
        </tr>


    </table>

    <hr>
    <br>
    <div>
        <!-- && headingBoolean==false -->
        <div align="center">
            <h1
                style="color: black; background-color:  rgb(215, 214, 214); font-weight: 900; width: 95%; margin-right: 2%;">
                Application Documents</h1>
        </div>

        <div class="row">
            <div class="col-md-6" *ngIf="applicationDocumentData?.docEstimate!=null">
                <b>Doc-Estimate File : </b><span class="padding"><button type="button" class="btn btn-actionifo"
                        (click)="getDownloaddocEstimateFile()">Download</button>
                </span>
            </div>

            <div class="col-md-6" *ngIf="applicationDocumentData?.docAdministrative!=null">
                <b>Doc-Administrative File : </b><span class="padding"><button type="button" class="btn btn-actionifo"
                        (click)="getDownloaddocAdministrativeFile()">Download</button>
                </span>
            </div>

            <div class="col-md-6" *ngIf="applicationDocumentData?.docNoc!=null">
                <b>Doc-Noc File : </b><span class="padding"><button type="button" class="btn btn-actionifo"
                        (click)="getDownloaddocNocFile()">Download</button>
                </span>
            </div>
            <div class="col-md-6" *ngIf="applicationDocumentData?.docRegistry!=null">
                <b>Doc-Registry File : </b><span class="padding"><button type="button" class="btn btn-actionifo"
                        (click)="getDownloaddocRegistryFile()">Download</button>
                </span>
            </div>

            <div class="col-md-6" *ngIf="applicationDocumentData?.docReraPermission!=null">
                <b>Doc ReraPermission File : </b><span class="padding"><button type="button" class="btn btn-actionifo"
                        (click)="getDownloaddocReraPermissionFile()">Download</button>
                </span>
            </div>

            <div class="col-md-6" *ngIf="applicationDocumentData?.docT$cpPermission!=null">
                <b>Doc-T&CP File : </b><span class="padding"><button type="button" class="btn btn-actionifo"
                        (click)="getDownloaddocT$cpPermissionFile()">Download</button>
                </span>
            </div>

            <div class="col-md-6" *ngIf="applicationDocumentData?.docEnergyBillFile!=null">
                <b>Doc-EnergyBill File : </b><span class="padding"><button type="button" class="btn btn-actionifo"
                        (click)="getDownloaddocEnergyBillFile()">Download</button>
                </span>
            </div>

            <div class="col-md-6" *ngIf="applicationDocumentData?.docKhasraKhatoni!=null">
                <b>Khasra khatoni File : </b><span class="padding"><button type="button" class="btn btn-actionifo"
                        (click)="getDownloaddocKhasraKhatoniFile()">Download</button>
                </span>
            </div>

            <!-- docGst -->
            <div class="col-md-6" *ngIf="applicationDocumentData?.docGst!=null">
                <b>Doc-Gst File : </b><span class="padding"><button type="button" class="btn btn-actionifo"
                        (click)="getDownloaddocGstFile()">Download</button>
                </span>
            </div>

            <div *ngIf="applicationDocumentData?.docGroup!=null">
                <b>Doc-Group File : </b><span class="padding"><button type="button" class="btn btn-actionifo"
                        (click)="getDownloaddocGroupFile()">Download</button>
                </span>
            </div>

            <div *ngIf="applicationDocumentData?.docSamagraFile!=null">
                <b>Samagra File : </b><span class="padding"><button type="button" class="btn btn-actionifo"
                        (click)="getDownloaddocSamagraFile()">Download</button>
                </span>
            </div>

            <br>

        </div>
        <div class="text-danger" align="center" *ngIf="
    applicationDocumentData?.docEstimate == null &&
    applicationDocumentData?.docAdministrative == null &&
    applicationDocumentData?.docNoc == null &&
    applicationDocumentData?.docRegistry == null &&
    applicationDocumentData?.docReraPermission == null &&
    applicationDocumentData?.docT$cpPermission == null &&
    applicationDocumentData?.docKhasraKhatoni == null  &&
    applicationDocumentData?.docGst==null &&
    applicationDocumentData?.docGroup==null
  ">
            <!--  -->
            -------- File Not Available---------
        </div>
        <br>


    </div>
    <br><br>
    <hr>
<br>
<!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->


    <!-- <div style="display: flex; justify-content: space-between;" class="bottom5">
        <div></div>
        <div>
            <div style=" font-size: 2em; font-weight: 900; text-align: center;align-items: center; padding: 1em;"
                class="bottom2">Survey Details Filled By OIC</div>
        </div>
        <div style="padding:2em">
            <button class="close-btn" mat-stroked-button (click)="onClose()" tabIndex="-1">
                <mat-icon>clear</mat-icon>
            </button>
        </div>
    </div> -->

<div align="center">
<button type="button" class="btn btn-secondary p-3 fw-bold fs-4">Survey Details Filled By OIC</button>
</div>


    <br>
<div align="center" style="font-weight: 900; font-size: 2em;">Consumer Application Number : <span style="color: green;">{{consumerApplicationDetail.consumerApplicationNo}}</span></div>
    <br>
    
    <div align="center" style="font-size: 1.5em;font-weight: 800;">**** डीसी इंचार्ज सर्वे करने और एस्टीमेट जनरेट करने के लिए निम्न प्रक्रिया का पालन करें। ****</div>
    <br>
    1. DC Incharge को जबलपुर डिस्कॉम द्वारा बनाए गए GIS Desktop Application (  http://mpezgis.in/mpdiscom/login.php  )पर अपने कर्मचारी क्रमांक से लॉगिन करके सर्वेयर का चयन करना होगा और उसका मोबाइल नंबर पंजियन करना होगा |<br>
    2. DC Incharge को समबन्धित कार्य का नाम दर्ज़ करके वृत्त ,संभाग और वितरण केंद्र का चयन करना होगा ,कार्य का सन्दर्भ दर्ज करने के उपरांत सर्वेयर को समबन्धित कार्य से जोड़ना होगा जिससे की सर्वेयर द्वारा समबन्धित कार्य का GIS Mobile Applicatio द्वारा Pole by Pole सर्वे पूर्ण किया जा सके |<br>
    3. सर्वे पूर्ण करने के पश्चात सर्वेयर सर्वे को App के माध्यम से Complete घोषित करेगा। जिसके फलस्वरूप वितरण केन्द्र प्रभारी को सर्वे Accept/Reject करने का विकल्प उपलब्ध होगा ।<br>
    4. इसके पश्चात GIS system में एस्टीमेट जनरेशन किया जावेगा और Unique SB Project ID प्राप्त होगी | एस्टीमेट सर्वे के अनुरूप पाने पर DC Incharge को GIS Estimate को "Push to ERP " करना होगा |<br>
    5.ERP में एस्टीमेट जनरेशन GIS सिस्टम की Unique SB Project ID से linked होगा और Approval ERP के DOP approval के अनुरूप होगा |<br>
    6. नीचे दिए गए स्थान पर ERP नम्बर डाले |
    <br>


<form [formGroup]="jeSurveyBreakForm">

    <div class="row">
        <div class="col-md-3"></div>
        <div class="form-group col-md-3 mx-5">
            <label for="erpNumber" class="form-label">Enter ERP Estimate Number</label>
            <input type="number" class="form-control" formControlName="erpNo">
            <mat-error
            *ngIf="(jeSurveyBreakFormControls['erpNo'].touched || submitted) && jeSurveyBreakFormControls['erpNo'].errors">
            <div *ngIf="jeSurveyBreakFormControls['erpNo'].errors['required']">
                ERP NUMBER IS REQUIRED </div>
        </mat-error>
        
        </div>
        <div class="col-md-3">
            <button type="button" class="btn btn-primary mt-4" (click)="onSearch()">Search</button>
        </div>
        <div class="col-md-3"></div>
    </div>

</form>


<br>
<br>

<div *ngIf="natureOfWorkTypeId!=8">
<table class="demandApproveTable table table-bordered">
    <thead>
        <tr>

            <th>ERP No.</th>
            <th>Estimate sanction No.</th>
            <th>Estimate name</th>
            <th>Location</th>
            <th>scheme</th>
            <th>Supervision Amount</th>
            <th>Estimate Amount</th>
            <th>CGST@9%</th>
            <th>SGST@9%</th>
            <th>Estimate Status</th>
            <th>approved By</th>
        </tr>
    </thead>

    <tbody>
        <tr *ngFor="let item of newArray">
            <td>{{item?.PROJECT_NUMBER}}</td>
            <td>{{item?.ESTIMATE_NO}}</td>
            <td>{{item?.LONG_NAME}}</td>
            <td>{{item?.ORG}}</td>
            <td>{{item?.SCHEMECODE}}</td>
            <td>{{item?.SUPERVISION_COST}}</td>
            <!-- <td>{{item?.ESTIMATED_COST}}</td> -->
            <td>{{(item?.ESTIMATED_COST+item?.MINUS_COST)}}</td>
            <td>{{(item?.SUPERVISION_COST /100)*9}}</td>
            <td>{{(item?.SUPERVISION_COST /100)*9}}</td>
            <td>{{item?.STATUS}}</td>
            <td >{{item?.APPROVED_BY_NAME}}<span *ngIf="item?.APPROVED_BY_NAME==null">---Pending---</span></td>
        </tr>


    </tbody>



</table>
</div>

<div *ngIf="natureOfWorkTypeId==8">
    <table class="demandApproveTable table table-bordered">

        <thead>

            <tr>


                <th>आवेदन क्रमांक</th>
                <th>कुल प्राकलन राशि</th>
                <th>म.प्र द्वारा दी गई अनुदान राशि(40%)</th>
                <th>म.प्र विद्युत कंपनी द्वारा दी गई अनुदान राशि(10%)</th>
                <th>सिक्योरिटी डिपाजिट </th>
                <th>आवेदन शुल्क </th>
                <th>उपभोक्ता द्वारा वहन की गई राशि (50%)</th>
                <th>इ. आर. पी. नंबर </th>
                <th>स्कीम कोड </th>


            </tr>
        </thead>

        <tbody>
            <tr *ngFor="let item of newArray">


                <td>{{consumerApplicationDetail.consumerApplicationNo}}</td>
                <td>{{item?.totalAmount}}</td>
                <td>{{(item?.ESTIMATED_COST/100)*40}}</td>
                <td>{{(item?.ESTIMATED_COST/100)*10}}</td>
                <td>{{item?.securityDeposit}}</td>
                <td>2500</td>
                <td>{{(item?.ESTIMATED_COST/100)*50}}</td>
                <td>{{item?.PROJECT_NUMBER}}</td>
                <td>{{item?.SCHEMECODE}}</td>

            </tr>
        </tbody>



    </table>
</div>

<br>

<div>
    <input type="checkbox" (change)="onCheckBoxChange($event)" class="mx-2"><span>मैं सत्यापित करता हूं कि मेरे निर्देशन में कार्यस्थल के सर्वेक्षण के दौरान किए गए सभी माप, गणना और विश्लेषण सही और सटीक रूप से किए गए है।मेरे ज्ञान और विशेषज्ञता के आधार पर प्राकलन सर्वे के अनुरूप और सटीक है एवं दर्ज ERP प्राकलन इसी आवेदन से संबंधित है। *</span>
</div>

<br>
<div align="right">
<button type="button" [disabled]="checkedBoolean==true?false:true" class="btn btn-success" (click)="onSubmitServey()">Submit</button>
</div>




<!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
<br>
    <hr>
<br>

    <div class="card">
        <div class="card-body">
            <form [formGroup]="dcAcceptanceFg" (ngSubmit)="onSubmit()" autocomplete="off">
                <input type="hidden" formControlName="consumerApplicationId">
                <div>
                    <div class="row">
                        <div class="col-md-12">
                            <mat-radio-group aria-label="DC Accepted ? " formControlName="dcChanged"
                                (change)=onDcChangedChange($event)>
                                <label style="font-weight: 900; font-size: 1em;">वितरण केंद्र द्वारा की जाने वाली
                                    कार्यवाही। ? &nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <mat-radio-button value="true">Transfer To Other DC &nbsp;&nbsp;</mat-radio-button>
                                <mat-radio-button value="false">Accepted &nbsp;&nbsp;</mat-radio-button>
                                <mat-radio-button *ngIf="consumerApplicationDetail?.natureOfWorkTypeId !=8"
                                    value="shift" class="mx-3">&nbsp;&nbsp;Wrong Document
                                    Uploaded</mat-radio-button>
                                <mat-radio-button *ngIf="consumerApplicationDetail?.natureOfWorkTypeId ==8"
                                    value="faultApplicationForMkmy" class="mx-3">&nbsp;&nbsp;Wrong Document
                                    Uploaded</mat-radio-button>
                                <mat-radio-button value="faultApplication">&nbsp;&nbsp;Updation in
                                    application</mat-radio-button>
                                <!-- <mat-radio-button *ngIf="consumerApplicationDetail?.natureOfWorkTypeId ==8" value="faultApplicationForMkmy">&nbsp;&nbsp;Updation in application</mat-radio-button> -->
                            </mat-radio-group>
                            <mat-error *ngIf="dcAcceptanceFg.controls.dcChanged.hasError('required')">
                                Please select DC Accepted or Change or Wrong Documents ?
                            </mat-error>
                        </div>
                        <div style="height:10px;"></div>
                    </div>

                    <div *ngIf="dcAcceptanceFg.get('dcChanged').value == 'faultApplication'">
                        <mat-form-field>
                            <mat-label>Select Fault Field in Application</mat-label>
                            <mat-select formControlName="FaultApplicationFieldName"
                                [required]="dcAcceptanceFg.get('dcChanged').value == 'faultApplication'"
                                (selectionChange)="onFaultSelection($event)" multiple>
                                <mat-option *ngFor="let dataFault of ApplicationFaultArray"
                                    [value]="dataFault.id">{{dataFault.name}}</mat-option>
                            </mat-select>

                            
                            <!-- <mat-error
                            *ngIf="(applicationDcAcceptanceFormControls['FaultApplicationFieldName'].touched || isFormSubmit) && applicationDcAcceptanceFormControls['FaultApplicationFieldName'].errors">
                            <div *ngIf="applicationDcAcceptanceFormControls['FaultApplicationFieldName'].errors['required']">
                               Please Select Faulty Application Field</div>
                        </mat-error> -->
                        </mat-form-field>
                    </div>

                    <!-- ************************************************************** For change in Consumer Application start ************************************************** -->
                    <div style="background-color: rgb(215, 214, 214);">
                        <br>
                        <div style="font-weight: 900; font-size: 1.5em;" align="center">Changes in Consumer Application
                        </div>
                        <br>
                    </div>

                    <br>
                    <!-- changes in Nature of work type  -->
                    <div *ngIf="schemeTypeSelectedBoolean">
                        <section class="example-section">
                            <mat-checkbox class="example-margin"
                                (change)="onNatureOfWorkTypeCheckBoxSelection($event)">Are you want
                                changes in Scheme type of Consumer
                                Application</mat-checkbox>
                            <!-- <mat-checkbox class="example-margin" [disabled]="true">Disabled</mat-checkbox> -->
                        </section>

                        <form [formGroup]="changeNatureofWorkAndSchemeTypeForm">
                            <div class="row">

                                <div class="col-md-4 form-group">
                                    <mat-form-field class="half-width padding w-100">
                                        <mat-label>Scheme-Type<span class="required">*</span></mat-label>
                                        <mat-select formControlName="schemeTypeId"
                                            (selectionChange)="onSelectSchemeTypeId($event.value)">
                                            <!-- <mat-option value="">--कार्य का प्रकार चुने--</mat-option> -->
                                            <mat-option *ngFor="let schemeType of schemeTypeList"
                                                [value]="schemeType.schemeTypeId">
                                                {{schemeType.schemeTypeName}}</mat-option>
                                        </mat-select>
                                    </mat-form-field>
                                </div>

                                <div class="col-md-4 form-group">
                                    <label class="form-label">Remark</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea4" rows="2"
                                        style="resize: none;" formControlName="remark"
                                        placeholder="Please Enter remark here for change in Scheme-Type"></textarea>
                                </div>


                                <div class="col-md-4 form-group" *ngIf="natureofworktypechangesbuttonBollean">
                                    <button type="button" class="btn btn-primary mt-4"
                                        (click)="changeConsumerSchemeType()">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <br>
                    <!-- changes in consumer Application Status -->
                    <div *ngIf="applicationStatusSelectedBoolean">
                        <section class="example-section">
                            <mat-checkbox class="example-margin" (change)="onChangeStatusCheckBoxSelection($event)">Are
                                you want
                                changes in status of Consumer
                                Application</mat-checkbox>
                            <!-- <mat-checkbox class="example-margin" [disabled]="true">Disabled</mat-checkbox> -->
                        </section>
                        <form [formGroup]="consumerApplicationStatusChangeForm">
                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <mat-form-field class="half-width padding w-100">
                                        <mat-label>Application Status<span class="required">*</span></mat-label>
                                        <mat-select formControlName="applicationStatusId"
                                            (selectionChange)="onSelectApplicationStatus($event.value)">
                                            <!-- <mat-option value="">--कार्य का प्रकार चुने--</mat-option> -->
                                            <mat-option *ngFor="let StatusType of ApplicationStatusList"
                                                [value]="StatusType.applicationStatusId">
                                                {{StatusType.applicationStatusName}}</mat-option>
                                        </mat-select>
                                        <!-- <mat-error
                            *ngIf="(changeNatureofWorkAndSchemeTypeForm['natureOfWorkTypeId'].touched || isFormSubmit) && changeNatureofWorkAndSchemeTypeForm['natureOfWorkTypeId'].errors">
                            <div *ngIf="changeNatureofWorkAndSchemeTypeForm['natureOfWorkTypeId'].errors['required']">
                                कार्य का प्रकार चुने</div>
                        </mat-error> -->
                                    </mat-form-field>
                                </div>


                                <div class="col-md-6 form-group" *ngIf="consumerApplicationStatuschangesbuttonBollean">
                                    <button type="button" class="btn btn-primary mt-4"
                                        (click)="changeConsumerApplicationStatus()">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <br>

                    <!--  changes in group or Individuals -->
                    <div *ngIf="groupOrIndividualSelectedBoolean">
                        <section class="example-section">
                            <mat-checkbox class="example-margin"
                                (change)="onChangeGroupOrIndividualCheckBoxSelection($event)">Are you
                                want
                                changes in Group Or Individual of Consumer
                                Application</mat-checkbox>
                            <!-- <mat-checkbox class="example-margin" [disabled]="true">Disabled</mat-checkbox> -->
                        </section>
                        <form [formGroup]="consumerApplicationIndividualOrGroupChangeForm">
                            <div class="row">
                                <div class="col-md-3 form-group">
                                    <mat-form-field class="half-width padding w-100">
                                        <mat-label>Group/Individual<span class="required">*</span></mat-label>
                                        <mat-select formControlName="groupOrIndividual"
                                            (selectionChange)="onSelectGroupOrIndividual($event.value)">
                                            <!-- <mat-option value="">--कार्य का प्रकार चुने--</mat-option> -->
                                            <mat-option *ngFor="let data of displayInputFieldArray" [value]="data.id">
                                                {{data.name}}</mat-option>
                                        </mat-select>
                                        <!-- <mat-error
                            *ngIf="(changeNatureofWorkAndSchemeTypeForm['natureOfWorkTypeId'].touched || isFormSubmit) && changeNatureofWorkAndSchemeTypeForm['natureOfWorkTypeId'].errors">
                            <div *ngIf="changeNatureofWorkAndSchemeTypeForm['natureOfWorkTypeId'].errors['required']">
                                कार्य का प्रकार चुने</div>
                        </mat-error> -->
                                    </mat-form-field>
                                </div>

                                <div class="col-md-3 form-group">
                                    <label class="form-label">Remark</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea4" rows="3"
                                        formControlName="remark" placeholder="Please Enter remark here"
                                        style="resize: none;"></textarea>
                                </div>

                                <div class="col-md-3 form-group"
                                    *ngIf="consumerApplicationIndividualOrGroupChangeForm.get('groupOrIndividual').value == 2">
                                    <label class="form-label">Group File</label>
                                    <input type="file" class="form-control"
                                        (change)="onGroupFileSelectOnGroupChoose($event)">
                                </div>



                                <div class="col-md-3 form-group"
                                    *ngIf="consumerApplicationGroupOrIndividualchangesbuttonBollean">
                                    <button type="button" class="btn btn-primary mt-4"
                                        (click)="changeApplicationIndividualOrGroup()">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <br>

                    <!-- changes in consumer name and address  -->
                    <div *ngIf="nameAndAddressSelectedBoolean">
                        <section class="example-section">
                            <mat-checkbox class="example-margin"
                                (change)="onChangeNameAndAddressCheckBoxSelection($event)">Are you want
                                changes in name and address of Consumer </mat-checkbox>
                            <!-- <mat-checkbox class="example-margin" [disabled]="true">Disabled</mat-checkbox> -->
                        </section>

                        <form [formGroup]="consumerNameAndAddressChangeForm">
                            <div class="row">
                                <div class="col-md-3 form-group">
                                    <label class="form-label">Consumer Name</label>
                                    <input type="text" class="form-control" formControlName="name">
                                </div>

                                <div class="col-md-3 form-group">
                                    <label class="form-label">Remark</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea4" rows="3"
                                        style="resize: none;" formControlName="remark"
                                        placeholder="Please Enter remark here"></textarea>
                                </div>

                                <div class="col-md-3 form-group">
                                    <label class="form-label">Address</label>
                                    <input type="text" class="form-control" formControlName="address">
                                </div>


                                <div class="col-md-3 form-group" *ngIf="consumerNameAndAddresschangesbuttonBollean">
                                    <button type="button" class="btn btn-primary mt-4"
                                        (click)="changeConsumerNameAndAddress()">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <br>

                    <!-- changes in consumer name & addresss & mobileNumber -->
                    <div *ngIf="nameAndAddressAndMobileNumberBoolean">
                        <section class="example-section">
                            <mat-checkbox class="example-margin"
                                (change)="onChangeNameAndAddressAndMobileNoCheckBoxSelection($event)">Are you want
                                changes in name and address and mobile Number of Consumer </mat-checkbox>
                            <!-- <mat-checkbox class="example-margin" [disabled]="true">Disabled</mat-checkbox> -->
                        </section>

                        <form [formGroup]="consumerNameAndAddressAndMobileNumberChangeForm">
                            <div class="row">
                                <div class="col-md-3 form-group">
                                    <label class="form-label">Consumer Name</label>
                                    <input type="text" class="form-control" formControlName="name">
                                </div>


                                <div class="col-md-3 form-group">
                                    <label class="form-label">Address</label>
                                    <input type="text" class="form-control" formControlName="address">
                                </div>


                                <div class="col-md-3 form-group">
                                    <label class="form-label">Mobile Number</label>
                                    <input type="tel" class="form-control" formControlName="mobNo">
                                </div>


                                <div class="col-md-3 form-group"
                                    *ngIf="consumerNameAndAddressAndMobileNumberchangesbuttonBollean">
                                    <button type="button" class="btn btn-primary mt-4"
                                        (click)="changeConsumerNameAndAddressByConsumerMobileNo()">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <!-- ************************************************************** For change in Consumer Application end ************************************************** -->

                    <div *ngIf="dcAcceptanceFg.get('dcChanged').value == 'shift' && FileSelectionFieldNotShowBoolean==false" style="margin: 20px;">
                        <!-- [ngClass]="{'hidden':(dcAcceptanceFg.get('dcChanged').value == 'false' || dcAcceptanceFg.get('dcChanged').value == 'true' || dcAcceptanceFg.get('dcChanged').value == '') }" -->
                        <mat-form-field>
                            <mat-label>Select Wrong Document</mat-label>
                            <mat-select formControlName="fileSelection"
                                [required]="dcAcceptanceFg.get('dcChanged').value == 'shift' "
                                (selectionChange)="onFileSelection($event)" multiple>
                                <mat-option *ngFor="let dataFile of docDropdownArray"
                                    [value]="dataFile?.value">{{dataFile?.name}}</mat-option>
                            </mat-select>
                            <mat-error
                                *ngIf="(applicationDcAcceptanceFormControls['dcChanged'].touched || isFormSubmit) && applicationDcAcceptanceFormControls['dcChanged'].errors">
                                <div *ngIf="applicationDcAcceptanceFormControls['dcChanged'].errors['required']">
                                    Please Select Wrong Document</div>
                            </mat-error>
                        </mat-form-field>
                    </div>

                    <div *ngIf="dcAcceptanceFg.get('dcChanged').value == 'faultApplicationForMkmy'">
                        <form [formGroup]="mkmyDocForm">

                            <div class="form-group" *ngIf="applicationDocumentData?.docSamagraFile==null">
                                <label class="form-label">Samagra File<span class="text-danger">*</span></label>
                                <input type="file" class="form-control" (change)="onSamagraFileSelection($event)"
                                    formControlName="samgrFile">
                            </div>
                            <div class="form-group" *ngIf="applicationDocumentData?.docKhasraKhatoni==null">
                                <label class="form-label">Khasra Khatoni File<span class="text-danger">*</span></label>
                                <input type="file" class="form-control" (change)="onKKFileSelection($event)"
                                    formControlName="kkFile">
                            </div>

                            <div align="center"  *ngIf="applicationDocumentData?.docSamagraFile==null || applicationDocumentData?.docKhasraKhatoni==null">
                                <button type="button" class="btn btn-success"
                                    (click)="onMkmyDocSubmit()">Submit</button>
                            </div>
                        </form>


                        <div *ngIf="applicationDocumentData?.docSamagraFile==null && applicationDocumentData?.docKhasraKhatoni==null"> ------------------------ no any file need to upload --------------------- </div>
                    </div>





                    <!-- *ngIf="dcAcceptanceFg.get('dcChanged').value == 'true' "               [ngClass]="{'hidden':(dcAcceptanceFg.get('dcChanged').value == 'false' || dcAcceptanceFg.get('dcChanged').value == 'shift') }" -->
                    <div style="margin-bottom: 50px;" *ngIf="dcAcceptanceFg.get('dcChanged').value == 'true'"
                        style="margin-top: 10px;margin-bottom: 20px;">
                        <div>
                            <textarea [required]="dcAcceptanceFg.get('dcChanged').value == 'true'" class="form-control"
                                id="exampleFormControlTextarea4" rows="3" formControlName="dcChangedReason"
                                placeholder="Dc Change Reason "></textarea>
                        </div>
                        <mat-error
                            *ngIf="(applicationDcAcceptanceFormControls['dcChangedReason'].touched || isFormSubmit) && applicationDcAcceptanceFormControls['dcChangedReason'].errors">
                            <div *ngIf="applicationDcAcceptanceFormControls['dcChangedReason'].errors['required']">
                                Application DC Change Reason is required</div>

                        </mat-error>
                    </div>

                    <!-- ********************************************************** -->

                    <div class="row">
                        <div class="col-md-6">
                            <mat-form-field class="half-width padding  w-100"
                                *ngIf="dcAcceptanceFg.get('dcChanged').value == 'true'">
                                <mat-label>जिला<span class="required">*</span></mat-label>
                                <mat-select formControlName="districtId"
                                    (selectionChange)="onChangeSelectedDistrictType($event)">
                                    <mat-option value="">--जिला चुने--</mat-option>
                                    <mat-option *ngFor="let district of districtList" [value]="district">
                                        {{district.districtName}}</mat-option>
                                </mat-select>
                                <mat-error
                                    *ngIf="(applicationDcAcceptanceFormControls['districtId'].touched || submitted) && applicationDcAcceptanceFormControls['districtId'].errors">
                                    <div *ngIf="applicationDcAcceptanceFormControls['districtId'].errors['required']">
                                        Select District</div>
                                </mat-error>
                            </mat-form-field>
                        </div>

                        <!-- **************************************************************** -->


                        <!-- [required]="dcAcceptanceFg.get('dcChanged').value == 'true'" -->
                        <div class="col-md-6 ">
                            <mat-form-field class="half-width padding  w-100"
                                *ngIf="dcAcceptanceFg.get('dcChanged').value == 'true'">
                                <mat-label>Distribution Center (DC) <span class="required"></span></mat-label>
                                <mat-select [required]="dcAcceptanceFg.get('dcChanged').value == 'true'"
                                    formControlName="changedDcId">
                                    <mat-option value="">--Select Distribution Center (DC)--</mat-option>
                                    <mat-option *ngFor="let dList of dcList" [value]="dList.dcId">
                                        {{dList.dcName}}</mat-option>
                                </mat-select>

                                <mat-error
                                    *ngIf="(applicationDcAcceptanceFormControls['dcChanged'].touched || isFormSubmit) && applicationDcAcceptanceFormControls['dcChanged'].errors">
                                    <div *ngIf="applicationDcAcceptanceFormControls['dcChanged'].errors['required']">
                                        Select Distribution Center (DC)</div>
                                </mat-error>
                            </mat-form-field>
                        </div>
                    </div>
                </div>
                <br>

                <div style="font-size: 1.5em; font-weight: 800;color: red;">
                    **Note: कृपया आवेदन स्वीकार करने से पहले उसे ध्यानपूर्वक जांच लें क्योंकि स्वीकृत आवेदन में कोई
                    परिवर्तन नहीं
                    किया जाएगा।
                </div>
                <br>



                <div class="col text-center" style="margin-top:20px;" *ngIf="finalAcceptanceSubmitButtonShowBoolean">
                    <button type="submit" [disabled]="(dcAcceptanceFg.get('dcChanged').value == 'true'
                     || dcAcceptanceFg.get('dcChanged').value == 'false' || 
                     (dcAcceptanceFg.get('dcChanged').value == 'faultApplication' && dcAcceptanceFg.get('FaultApplicationFieldName').value == 1)
                      || (dcAcceptanceFg.get('dcChanged').value == 'shift' && selectedDocArray?.length!=0))?false:true 
                    "
                        class="btn btn-primary ">{{data.btnTitle}}</button>
                </div>
            </form>
        </div>
    </div>
    <br>
    <br>
    <br>
    <br>
</mat-card> */}













//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////














// import { HttpClient, HttpResponse } from '@angular/common/http';
// import { Component, OnInit, Inject, OnDestroy, ɵConsole, ViewChild, ElementRef } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
// import * as moment from 'moment';
// import { Subject } from 'rxjs';
// import { takeUntil, finalize } from 'rxjs/operators';
// import { CrudType } from 'src/app/shared-enum/crudType';
// import { NotificationService } from 'src/app/shared-services/notification.service';
// import { SpinnerService } from 'src/app/shared-services/spinner.service';
// import { onlycharPattern } from 'src/app/utils/app-validators';
// import { GenerateUrl } from 'src/environments/generate-url.model';
// import { ConsumerApplicationService } from '../../services/consumer-application.service';
// import { UserLoginService } from '../../services/user-login.service';
// import { DcAcceptanceModel } from '../../models/application-dc-acceptanceModel';
// import { NewApplicationService } from 'src/app/postlogin/consumer-modules/services/new-application.service';


// @Component({
//     selector: 'application-dc-acceptance',
//     templateUrl: './application-dc-acceptance.component.html',
//     styleUrls: ['./application-dc-acceptance.component.css']
// })
// export class ApplicationDcAcceptance implements OnInit, OnDestroy {
//     unsubscribe$: Subject<void> = new Subject();
//     consumerApplicationDetail: any;
//     consumerSurveyData: any;
//     userRoles: Array<any> = [];
//     dcAcceptanceFg: FormGroup;
//     otpVerificationForm: FormGroup;
//     supplyVoltageString: string = '';
//     supplyVolageName: Array<any> = [];
//     // consumerSurveyData:any
//     consumerDemandData: any
//     geoLocationData: any
//     applicationDocumentData: any
//     maskAadhaarNo: string = null;
//     userApplicationUrl: string = this.url.userApplicationUrl;
//     // userSurveyUrl: string = this.url.userSurveyUrl;

//     maxDate = new Date();
//     minDate = new Date();

//     dcList: Array<any> = [];
//     docDropdownArray: Array<any> = [];
//     selectedDocArray: Array<any> = [];

//     @ViewChild('surveyDoc') surveyDocElement: ElementRef;

//     isFormSubmit: boolean = false;

//     // isRejected;
//     enabledOTP: boolean = false;
//     invalidUser: boolean = false;
//     surveyRequired: boolean = true;
//     surveyUploaded: boolean = false;
//     useridFieldShouldbeHidden: boolean = false;
//     surveyFileName: string = 'Select Survey File... ';

//     surveyDoc;
//     crudType = this.data.crudType;

//     userSurveyUrl: string = this.url.userSurveyUrl;
//     mastersUrl: string = this.url.mastersUrl;

//     consumerApplicationId = this.data.consumerApplicationId;
//     consumerApplicationNo = this.data.consumerApplicationNo;
//     userDataAll: any;
//     DcAcceptanceModel: DcAcceptanceModel = new DcAcceptanceModel();
//     acceptanceBoolean: Boolean = false;
//     districtList: Array<any> = [];
//     varonChangeSelectedDistrictType: any;
//     districtIdnew: any;
//     ApplicationFaultArray: Array<any> = [
//         { 'id': 1, 'name': 'Nature Of Work Type' },
//         { 'id': 2, 'name': 'Scheme Type' },
//         { 'id': 3, 'name': 'Group/Individual' },
//         { 'id': 4, 'name': 'Name & Address' },
//         // { 'id': 5, 'name': 'Name , Address & Mobile Number' },
//         // { 'id': 6, 'name': 'Application Status' },
//         // {'id': 7 , 'name':'Nature Of Work Type'},
//     ];



//     changeNatureofWorkAndSchemeTypeForm: FormGroup;
//     schemeTypeList = [];
//     natureofworktypechangesbuttonBollean: boolean = false;

//     consumerApplicationStatusChangeForm: FormGroup;
//     ApplicationStatusList: any;
//     consumerApplicationStatuschangesbuttonBollean: boolean = false

//     consumerApplicationIndividualOrGroupChangeForm: FormGroup;
//     consumerApplicationGroupOrIndividualchangesbuttonBollean: boolean = false;

//     consumerNameAndAddressChangeForm: FormGroup;
//     consumerNameAndAddresschangesbuttonBollean: boolean = false

//     consumerNameAndAddressAndMobileNumberChangeForm: FormGroup;
//     consumerNameAndAddressAndMobileNumberchangesbuttonBollean: boolean = false
//     userToken: any;
//     NatureOfworkTypeList: Array<any> = [];
//     consumerDetails: any;

//     natureOfWorkTypeSelectedboolean: boolean = false;
//     schemeTypeSelectedBoolean: boolean = false;
//     groupOrIndividualSelectedBoolean: boolean = false;
//     nameAndAddressSelectedBoolean: boolean = false;
//     nameAndAddressAndMobileNumberBoolean: boolean = false;
//     applicationStatusSelectedBoolean: boolean = false;

//     displayInputFieldArray: Array<any> = [
//         {
//             id: 1, name: "Individual"
//         },
//         {
//             id: 2, name: "Group"
//         }
//     ];

//     newDocGroupFile: any;
//     paymentView: any;
//     mkmyDocForm: FormGroup
//     onSamagraFileSelectionVar: any;
//     onKKFileSelectionVar: any
//     documentSubmitBoolean: Boolean = false;
//     FileSelectionFieldNotShowBoolean: boolean = false;


//     jeSurveyBreakForm: FormGroup
//     natureOfWorkTypeId: any
//     erpEstimateDataForMkmyArray: Array<any> = [];
//     EstimateAmount: Array<any> = [];
//     submitted: boolean = false;
//     checkedBoolean: boolean = false
//     buttonSearchBoolean: boolean = false;
//     newArray: Array<any> = [];
//     searchBOoleanCheck: boolean = false;
//     finalAcceptanceSubmitButtonShowBoolean: boolean = false;

//     constructor(
//         private userLoginService: UserLoginService,
//         private spinnerService: SpinnerService,
//         private url: GenerateUrl,
//         private http: HttpClient,
//         private fb: FormBuilder,
//         private consumerApplicationService: ConsumerApplicationService,
//         private notificationService: NotificationService,
//         private newApplicationService: NewApplicationService,


//         @Inject(MAT_DIALOG_DATA) public data: any,
//         public dialogRef: MatDialogRef<ApplicationDcAcceptance>,
//     ) {
//         let abc = sessionStorage.getItem('accessLeveOfUser');
//         let xyz = JSON.parse(abc);
//         console.log(xyz, "xxxxxxxxxxxxxyyyyyyyyyyyyyyyzzzzzzzzzzzzzz///////////////////");
//         this.userDataAll = xyz;
//         this.consumerApplicationDetail = this.data.row;
//         console.log(this.consumerApplicationDetail, "this.consumerApplicationDetail.....................");


//         let token = sessionStorage.getItem('consumertoken');
//         this.userToken = token;



//         //  forr Nature of work change ***************************************************************************
//         this.changeNatureofWorkAndSchemeTypeForm = this.fb.group({
//             // natureOfWorkType: [''],
//             // natureOfWorkTypeId: [''],
//             schemeTypeId: ['', Validators.required],
//             remark: ['', Validators.required]
//         });

//         this.newApplicationService.getNatureOfWorkTypeList().pipe(takeUntil(this.unsubscribe$))
//             .subscribe(data => {
//                 console.log('nature of work sarvaye page');
//                 this.NatureOfworkTypeList = data['list'];
//                 console.log(this.NatureOfworkTypeList);
//             });

//         this.newApplicationService.getSchemeTypeList().pipe(takeUntil(this.unsubscribe$))
//             .subscribe(data => {
//                 this.schemeTypeList = data['list'];
//                 this.schemeTypeList = data['list'].filter(x => x.schemeTypeId != 4)


//             });


//         //  for change in Consumer Application Status 
//         this.getApplicationStatus()
//         this.consumerApplicationStatusChangeForm = this.fb.group({
//             applicationStatusId: ['']
//         })

//         // for Group Or Individual 
//         this.consumerApplicationIndividualOrGroupChangeForm = this.fb.group({
//             groupOrIndividual: ['', Validators.required],
//             remark: ['', Validators.required]
//         })

//         // for change name and address
//         this.consumerNameAndAddressChangeForm = this.fb.group({
//             name: ['', Validators.required],
//             address: ['', Validators.required],
//             remark: ['']
//         });

//         // for change name and address and mobile number
//         this.consumerNameAndAddressAndMobileNumberChangeForm = this.fb.group({
//             name: [''],
//             address: [''],
//             mobNo: ['']
//         })


//         this.natureOfWorkTypeId = this.consumerApplicationDetail?.natureOfWorkTypeId;

//         let accessLeveOfUser = sessionStorage.getItem('accessLeveOfUser');
//         this.buildForm();

//     }



//     /////////////////////////////////////////////////////////// servey merge start ////////////////////////////////////////////////////////////////

//     buildForm() {
//         this.jeSurveyBreakForm = this.fb.group({
//             erpNo: ['', Validators.required]
//         })
//     }

//     get jeSurveyBreakFormControls() {
//         return this.jeSurveyBreakForm.controls
//     }



//     onSearch() {
//         this.submitted = true;
//         if (this.jeSurveyBreakForm.invalid) {
//             this.notificationService.error('Please Enter Erp Number First !');
//             this.searchBOoleanCheck
//             return
//         } else {

//             this.consumerApplicationService.getErpSerchForSurveyBreak(this.jeSurveyBreakForm.value.erpNo).subscribe((data: any) => {
//                 console.log(data, "ddaaatatttatatatataa.........................................");
//                 if (data.statusCode == "200") {
//                     this.searchBOoleanCheck = true
//                     console.log(this.searchBOoleanCheck, "this.searchBOoleanCheck.......111111111111111....");

//                     this.notificationService.success("Data Retreive Successfully ....111... !");
//                     this.newArray = data.data

//                 } else {
//                     this.newArray = [];
//                     this.notificationService.warn("Something went wrong !");
//                     this.searchBOoleanCheck = false
//                     console.log(this.searchBOoleanCheck, "this.searchBOoleanCheck............33333333333333333.........");

//                     return
//                 }
//             })
//             return

//             // this.consumerApplicationService.getErpDetailsForSurveyBreakFirst(this.jeSurveyBreakForm.value.erpNo).subscribe((ress: any) => {
//             //   console.log(ress, "resssssss.....first...............................");
//             //   if (ress.statusCode == "200") {
//             //     this.searchBOoleanCheck = true
//             //     console.log(this.searchBOoleanCheck,"this.searchBOoleanCheck.......111111111111111....");

//             //     this.notificationService.success("Data Retreive Successfully ....111... !");
//             //     this.newArray = ress.data

//             //   } else {
//             //     this.consumerApplicationService.getErpDetailsForSurveyBreakSecond(this.jeSurveyBreakForm.value.erpNo).subscribe((responsee: any) => {
//             //       console.log(responsee, "responsee.....second................");

//             //       if (responsee.statusCode == "200") {
//             //         this.searchBOoleanCheck = true
//             //         console.log(this.searchBOoleanCheck,"this.searchBOoleanCheck..........2222222222222...");

//             //         this.notificationService.success("Data Retreive Successfully ...222..... !");
//             //         this.newArray = responsee.data

//             //       } else {
//             //         this.notificationService.warn("Something went wrong !");
//             //         this.searchBOoleanCheck = false
//             //         console.log(this.searchBOoleanCheck,"this.searchBOoleanCheck............33333333333333333.........");

//             //         return
//             //       }

//             //     })
//             //   }

//             // })




//             // if (this.natureOfWorkTypeId == 8) {
//             //   this.consumerApplicationService.getErpDetailsByErpNumber(JSON.parse(this.jeSurveyBreakForm.value.erpNo), this.consumerApplicationDetail?.consumerApplicationNo).subscribe((data: any) => {
//             //     console.log(data, "Mkmy........Data......8888888888888888888888888888888...............");
//             //     if (data.code == "200") {
//             //       this.erpEstimateDataForMkmyArray = data.list;
//             //       this.buttonSearchBoolean = true;
//             //       this.notificationService.success("Data retrive Successfully");
//             //     }else if(data.code=="307"){
//             //       let messageFirst = "Amount more than the sanction estimate amount 195972 for for 25 DTR";
//             //       let messageSecond = "Amount more than the sanction estimate amount 195972 for for 63 DTR";
//             //       if(data.message===messageFirst){
//             //         this.notificationService.warn("25 डीटीआर के लिए स्वीकृत प्राक्कलन राशि 195972 से अधिक राशि है।")
//             //       }
//             //       else if(data.message===messageSecond){
//             //         this.notificationService.warn('63 डीटीआर के लिए स्वीकृत प्राक्कलन राशि 337173 से अधिक राशि है।')
//             //       }
//             //       return
//             //   }else if(data.code=="406"){
//             //       this.notificationService.error("This ERP Number Is Already Associated With Another Application Number.");
//             //       return
//             //   }
//             //    else {
//             //       this.notificationService.warn("आपके द्वारा दर्ज ERP No संबंधित स्कीम से संबंधित नही है।");
//             //       return;
//             //   }

//             //   })


//             // } else {
//             //   this.consumerApplicationService.getErpEstimateAmount(this.jeSurveyBreakForm.value.erpNo, this.consumerApplicationDetail.consumerApplicationId).subscribe(data => {
//             //     console.log(data,"!!!!!!!!!!!!!888888888888888888888888888");

//             //     if (data['code'] == "200") {
//             //       console.log('222222222222', data['list']);
//             //       this.EstimateAmount = data['list'];
//             //       this.notificationService.success(data['message']);
//             //       this.buttonSearchBoolean = true
//             //     } else if(data['code'] == "406"){
//             //       this.notificationService.error("This ERP Number Is Already Associated With Another Application Number.");
//             //       return
//             //   }
//             //    else if (data['code'] == "406") {
//             //       this.notificationService.warn("ERP में एस्टीमेट गलत बनाया गया है।");
//             //       return
//             //   }
//             //   else {
//             //       this.notificationService.error("आपके द्वारा दर्ज ERP No संबंधित स्कीम से संबंधित नही है।");
//             //       return
//             //   }
//             //   }, (error) => {
//             //     this.notificationService.warn(error);
//             //     this.buttonSearchBoolean=false
//             //     return
//             //   });
//             // }
//         }

//     }

//     onCheckBoxChange(e: any) {
//         console.log(e, "$$$$$$$$$$$$$event.............");
//         this.checkedBoolean = e.target.checked

//     }

//     onSubmitServey() {
//         console.log(this.searchBOoleanCheck, "searchBOoleanCheck...................................");


//         if (this.checkedBoolean == false) {
//             this.notificationService.warn("Please Select Checkbox First !");
//             return
//         } else {
//             if (this.searchBOoleanCheck == false) {
//                 this.notificationService.error("You have not Completed Above Process. Please Enter ERP nUMBER and Search First !");
//                 return
//             } else {
//                 this.consumerApplicationService.submitJeSurveyBrerak(this.consumerApplicationDetail?.consumerApplicationNo, this.jeSurveyBreakForm.value.erpNo).subscribe((daata: any) => {
//                     console.log(daata, "daataa...............................");
//                     if (daata.code == "200") {
//                         this.notificationService.success("Data Submitted Successfully");
//                         this.finalAcceptanceSubmitButtonShowBoolean = true;
//                     } else {
//                         this.notificationService.warn(daata.message);
//                         this.finalAcceptanceSubmitButtonShowBoolean = false;

//                         return
//                     }

//                 })



//             }

//         }

//     }

//     /////////////////////////////////////////////////////////// survey merge end //////////////////////////////////////////////////////////////////





//     getApplicationStatus() {
//         this.consumerApplicationService.getAll_Application_Status().subscribe(
//             (res) => {
//                 console.log(
//                     res.list,
//                     "lllllllllllllllllllllllllllllllllllllllllllllllllll"
//                 );

//                 this.ApplicationStatusList = res.list;
//             },
//             (error) => { }
//         );
//     }

//     async ngOnInit() {

//         console.log(this.changeNatureofWorkAndSchemeTypeForm, " this.changeNatureofWorkAndSchemeTypeForm..............................");

//         //  this.changeNatureofWorkAndSchemeTypeForm.controls['natureOfWorkTypeId'].setValue(this.consumerApplicationDetail?.natureOfWorkTypeId);
//         this.changeNatureofWorkAndSchemeTypeForm.controls['schemeTypeId'].setValue(this.consumerApplicationDetail?.schemeTypeId);
//         this.consumerApplicationStatusChangeForm.controls['applicationStatusId'].setValue(this.consumerApplicationDetail?.applicationStatusId);
//         this.consumerApplicationIndividualOrGroupChangeForm.controls['groupOrIndividual'].setValue(this.consumerApplicationDetail?.individualOrGroup?.individualOrGroupId)
//         this.consumerNameAndAddressChangeForm.controls['name'].setValue(this.consumerApplicationDetail.consumerName);
//         this.consumerNameAndAddressChangeForm.controls['address'].setValue(this.consumerApplicationDetail.address);
//         this.consumerNameAndAddressAndMobileNumberChangeForm.controls['name'].setValue(this.consumerApplicationDetail.consumerName);
//         this.consumerNameAndAddressAndMobileNumberChangeForm.controls['address'].setValue(this.consumerApplicationDetail.address);
//         //this.consumerNameAndAddressAndMobileNumberChangeForm.controls['mobNo'].setValue('')
//         // this.changeNatureofWorkAndSchemeTypeForm.get('natureOfWorkTypeId').disable();
//         this.changeNatureofWorkAndSchemeTypeForm.get('schemeTypeId').disable();
//         this.consumerApplicationStatusChangeForm.get('applicationStatusId').disable();
//         this.consumerApplicationIndividualOrGroupChangeForm.get('groupOrIndividual').disable();
//         this.consumerNameAndAddressChangeForm.get('name').disable()
//         this.consumerNameAndAddressChangeForm.get('address').disable()
//         this.consumerNameAndAddressAndMobileNumberChangeForm.get('name').disable()
//         this.consumerNameAndAddressAndMobileNumberChangeForm.get('address').disable();
//         this.consumerNameAndAddressAndMobileNumberChangeForm.get('mobNo').disable()

//         console.log()
//         this.loadForm();

//         this.getDistrict()



//         // if (this.consumerApplicationDetail?.natureOfWorkTypeId != 8) {
//         this.getApplicationDocumentData();
//         // }else{
//         //     this.docDropdownArray = [
//         //         {
//         //             "name": "Samagra File",
//         //             "value": this.applicationDocumentData?.docSamagraFile
//         //         },
//         //         {
//         //             "name": "Khasra-Khatoni File",
//         //             "value": this.applicationDocumentData?.docKhasraKhatoni
//         //         }
//         //     ]

//         // }

//         this.getPymentView();

//     }

//     formatDate(inputDate) {
//         const date = new Date(inputDate);

//         // Get year, month, and day
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
//         const day = String(date.getDate()).padStart(2, '0');

//         // Create the formatted date string
//         const formattedDate = `${year}-${month}-${day}`;

//         return formattedDate;
//     }
//     //const formattedDateString = formatDate(inputDateString);
//     formatDateNew(inputDate) {
//         const date = new Date(inputDate);

//         // Get day, month, and year
//         const day = String(date.getDate()).padStart(2, '0');
//         const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
//         const year = date.getFullYear();

//         // Create the formatted date string
//         const formattedDate = `${day}-${month}-${year}`;

//         return formattedDate;
//     }


//     getPymentView() {
//         this.consumerApplicationService.getPaymentDetailsDuringView(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((data: any) => {
//             console.log(data, "rrrrrrrrrrrrrrrrrrrrrrrrrrrr*********************rrrrrrrrrrrrrrrrrrrrrrrrrr");
//             if (data.code == "200") {
//                 const formattedDateStringRegistration = this.formatDate(data.list[0][0].DATE_OF_REGISTRATION)
//                 console.log(formattedDateStringRegistration, "formattedDateStringRegistration................");

//                 const formattedDateStringNewRegistration = this.formatDateNew(formattedDateStringRegistration);
//                 console.log(formattedDateStringNewRegistration, "formattedDateStringNewRegistration.....................");

//                 data.list[0][0].DATE_OF_REGISTRATION = formattedDateStringNewRegistration;

//                 // Demand
//                 const formattedDateStringDeemand = this.formatDate(data.list[0][0].DATE_OF_SUPERVISION_PAYMENT)
//                 console.log(formattedDateStringDeemand, "formattedDateStringDeemand................");

//                 const formattedDateStringNewDeemand = this.formatDateNew(formattedDateStringDeemand);
//                 console.log(formattedDateStringNewDeemand, "formattedDateStringNewDeemand.....................");

//                 data.list[0][0].DATE_OF_SUPERVISION_PAYMENT = formattedDateStringNewDeemand;

//                 this.paymentView = data.list[0][0]
//             } else {
//                 return
//             }
//         })
//     }




//     // get Consumer Application Details By Application Number
//     getApplicationDetails(ApplicationNo: any) {
//         this.consumerApplicationService.getConsumerApplicationDetailsByApplicationNumber(ApplicationNo).subscribe((data: any) => {
//             console.log(data, "Application Details Data...........................................newwww..................");
//             if (data.code == "200") {
//                 this.consumerApplicationDetail = data.list[0];
//                 //  this.changeNatureofWorkAndSchemeTypeForm.controls['natureOfWorkTypeId'].setValue(this.consumerApplicationDetail?.natureOfWorkTypeId);
//                 this.changeNatureofWorkAndSchemeTypeForm.controls['schemeTypeId'].setValue(this.consumerApplicationDetail?.schemeTypeId);
//                 this.consumerApplicationStatusChangeForm.controls['applicationStatusId'].setValue(this.consumerApplicationDetail?.applicationStatusId);
//                 this.consumerApplicationIndividualOrGroupChangeForm.controls['groupOrIndividual'].setValue(this.consumerApplicationDetail.individualOrGroup?.individualOrGroupId)
//                 this.consumerNameAndAddressChangeForm.controls['name'].setValue(this.consumerApplicationDetail.consumerName);
//                 this.consumerNameAndAddressChangeForm.controls['address'].setValue(this.consumerApplicationDetail.address);
//                 this.consumerNameAndAddressAndMobileNumberChangeForm.controls['name'].setValue(this.consumerApplicationDetail.consumerName);
//                 this.consumerNameAndAddressAndMobileNumberChangeForm.controls['address'].setValue(this.consumerApplicationDetail.address);
//             } else {
//                 this.notificationService.warn("Something went wrong !");
//                 return
//             }
//         })
//     }

//     ////////////////////////////////////////////////////////////////////////////////////// consumer Application Details changes started /////////////////////////////////////////////

//     // ******************** For change nature of workType *******************

//     onSelectNatureOfWorkTypeId(e: any) {

//     }

//     onSelectSchemeTypeId(e: any) {

//     }

//     onNatureOfWorkTypeCheckBoxSelection(e: any) {
//         console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeee..........................");
//         if (e.checked == true) {
//             this.natureofworktypechangesbuttonBollean = true
//             // this.changeNatureofWorkAndSchemeTypeForm.get('natureOfWorkTypeId').enable();
//             this.changeNatureofWorkAndSchemeTypeForm.get('schemeTypeId').enable();
//         } else {
//             this.natureofworktypechangesbuttonBollean = false
//             // this.changeNatureofWorkAndSchemeTypeForm.get('natureOfWorkTypeId').disable();
//             this.changeNatureofWorkAndSchemeTypeForm.get('schemeTypeId').disable();
//         }

//     }

//     changeConsumerSchemeType() {
//         console.log(this.changeNatureofWorkAndSchemeTypeForm.value, "this.changeNatureofWorkAndSchemeTypeForm.value...");

//         // saveJeRemarkForConsumerApplicationUpdate
//         if (this.changeNatureofWorkAndSchemeTypeForm.value.remark == null || this.changeNatureofWorkAndSchemeTypeForm.value.remark == undefined || this.changeNatureofWorkAndSchemeTypeForm.value.remark == "") {
//             this.notificationService.error("Please Enter Remark !");
//             return
//         } else if (this.changeNatureofWorkAndSchemeTypeForm.invalid) {
//             this.notificationService.warn("Invalid Form !");
//             return
//         }
//         else {

//             this.consumerApplicationService.changeConsumerSchemeType(this.consumerApplicationDetail.consumerApplicationNo, this.changeNatureofWorkAndSchemeTypeForm.value.schemeTypeId).subscribe((data: any) => {
//                 console.log(data, "changeConsumerSchemeType......................................................");
//                 if (data.code == "202") {
//                     if (data.message == "No changes needed") {
//                         this.notificationService.warn(data.message)
//                     } else if (data.message == "Changes saved successfully") {
//                         this.notificationService.success(data.message);
//                         let PayLoad = {
//                             "consumerAppNo": this.consumerApplicationDetail.consumerApplicationNo,
//                             "jeRemark": this.changeNatureofWorkAndSchemeTypeForm.value.remark
//                         }
//                         this.consumerApplicationService.saveJeRemarkForConsumerApplicationUpdate(PayLoad).subscribe((resp: any) => {
//                             console.log(resp, "saveJeRemarkForConsumerApplicationUpdate...........response......");
//                         })
//                         this.getApplicationDetails(this.consumerApplicationDetail.consumerApplicationNo);
//                     }

//                 } else if (data.code == "406") {
//                     this.notificationService.warn(data.message);
//                     return
//                 } else {
//                     this.notificationService.error(data.message);
//                     return
//                 }
//             })

//         }

//     }


//     // changeNatureOfWorkTypeOfConsumer() {
//     //     // consumerApplicationNo: any, newNatureOfWorkId: any, schemeTypeId: any, token: any
//     //     this.consumerApplicationService.changeNatureOfWorkTypeOfConsumer(this.consumerApplicationDetail.consumerApplicationNo, this.changeNatureofWorkAndSchemeTypeForm.value.natureOfWorkTypeId, this.changeNatureofWorkAndSchemeTypeForm.value.schemeTypeId, this.userToken).subscribe((data: any) => {
//     //         console.log(data, "changeNatureOfWorkTypeOfConsumer.......................................");
//     //         if (data.code == "202") {
//     //             if (this.changeNatureofWorkAndSchemeTypeForm.value.natureOfWorkTypeId == 4 || this.changeNatureofWorkAndSchemeTypeForm.value.natureOfWorkTypeId == 8) {
//     //                 this.consumerApplicationService.changeApplicationIndividualOrGroup(this.consumerApplicationDetail.consumerApplicationNo, 1, this.userToken).subscribe((data: any) => {
//     //                     console.log(data, "changeApplicationIndividualOrGroup...........................................");
//     //                     if (data.code == "202") {
//     //                         this.getApplicationDetails(this.consumerApplicationDetail.consumerApplicationNo);
//     //                         this.notificationService.success(data.message);

//     //                     } else {
//     //                         this.notificationService.warn(data.message);
//     //                         return
//     //                     }

//     //                 })
//     //             } else {
//     //                 this.getApplicationDetails(this.consumerApplicationDetail.consumerApplicationNo);
//     //                 this.notificationService.success("Changes Successfully");
//     //             }

//     //         } else {
//     //             this.notificationService.warn(data.message);
//     //             return
//     //         }

//     //     })
//     // };

//     // **************************Get All Consumer Details ****************

//     getAllTheDetailsOfConsumerByLoginId() {
//         // loginId: any, token: any
//         let consumerLoginId: any;
//         this.consumerApplicationService.getAllTheDetailsOfConsumerByLoginId(consumerLoginId, this.userToken).subscribe((data: any) => {
//             console.log(data, "getAllTheDetailsOfConsumerByLoginId..................");
//             if (data.code == "200") {
//                 this.consumerDetails = data.list[0];
//                 this.notificationService.success("Data Retreive Successfully");
//             } else {
//                 this.notificationService.warn(data.message);
//                 return
//             }

//         })
//     }


//     // ***********application status *******************

//     onSelectApplicationStatus(e: any) {

//     }

//     onChangeStatusCheckBoxSelection(e: any) {
//         console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeee..........................");
//         if (e.checked == true) {
//             this.consumerApplicationStatuschangesbuttonBollean = true
//             this.consumerApplicationStatusChangeForm.get('applicationStatusId').enable();
//         } else {
//             this.consumerApplicationStatuschangesbuttonBollean = false
//             this.consumerApplicationStatusChangeForm.get('applicationStatusId').disable();
//         }
//     }


//     changeConsumerApplicationStatus() {
//         //  consumerApplicationNo: any, applicationStatusNo: any, token: any
//         let applicationStatusNo: any;
//         this.consumerApplicationService.changeConsumerApplicationStatus(this.consumerApplicationDetail.consumerApplicationNo, this.consumerApplicationStatusChangeForm.value.applicationStatusId, this.userToken).subscribe((data: any) => {
//             console.log(data, "changeConsumerApplicationStatus.......................................");
//             if (data.code == "202") {
//                 this.getApplicationDetails(this.consumerApplicationDetail.consumerApplicationNo);
//                 this.notificationService.success(data.message);
//                 location.reload();
//             } else {
//                 this.notificationService.warn(data.message);
//                 return
//             }
//         })
//     }

//     //  ******************Group or Individual *****************

//     onSelectGroupOrIndividual(e: any) {
//         console.log(e, "onSelectGroupOrIndividual...............................");

//     }

//     onGroupFileSelectOnGroupChoose(e: any) {
//         console.log(e, "onGroupFileSelectOnGroupChoose....................................");
//         // docIndividualOrGroup
//         this.newDocGroupFile = e.target.files[0];
//     }

//     onChangeGroupOrIndividualCheckBoxSelection(e: any) {
//         console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeee..........................");
//         if (e.checked == true) {
//             this.consumerApplicationGroupOrIndividualchangesbuttonBollean = true
//             this.consumerApplicationIndividualOrGroupChangeForm.get('groupOrIndividual').enable();
//         } else {
//             this.consumerApplicationGroupOrIndividualchangesbuttonBollean = false
//             this.consumerApplicationIndividualOrGroupChangeForm.get('groupOrIndividual').disable();
//         }
//     }

//     changeApplicationIndividualOrGroup() {
//         //  consumerApplicationNo: any, individualOrGroupId: any, token: any
//         if (this.consumerApplicationIndividualOrGroupChangeForm.value.remark == null || this.consumerApplicationIndividualOrGroupChangeForm.value.remark == undefined || this.consumerApplicationIndividualOrGroupChangeForm.value.remark == "") {
//             this.notificationService.error("Please Enter Remark !");
//             return
//         } else if (this.consumerApplicationIndividualOrGroupChangeForm.invalid) {
//             this.notificationService.warn("Invalid Form !");
//             return
//         }
//         else {
//             let formData: FormData = new FormData();
//             formData.append('docIndividualOrGroup', this.newDocGroupFile)
//             this.consumerApplicationService.changeApplicationIndividualOrGroup(formData, this.consumerApplicationDetail.consumerApplicationNo, this.consumerApplicationIndividualOrGroupChangeForm.value.groupOrIndividual, this.userToken).subscribe((data: any) => {
//                 console.log(data, "changeApplicationIndividualOrGroup...........................................");
//                 if (data.code == "202") {
//                     this.getApplicationDetails(this.consumerApplicationDetail.consumerApplicationNo);
//                     this.notificationService.success(data.message);
//                     let PayLoad = {
//                         "consumerAppNo": this.consumerApplicationDetail.consumerApplicationNo,
//                         "jeRemark": this.consumerApplicationIndividualOrGroupChangeForm.value.remark
//                     }
//                     this.consumerApplicationService.saveJeRemarkForConsumerApplicationUpdate(PayLoad).subscribe((resp: any) => {
//                         console.log(resp, "saveJeRemarkForConsumerApplicationUpdate...........response......");
//                     })
//                 } else {
//                     this.notificationService.warn(data.message);
//                     return
//                 }

//             })
//         }



//     }


//     // ***************** change name and address ************************************

//     onChangeNameAndAddressCheckBoxSelection(e: any) {
//         console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeee..........................");
//         if (e.checked == true) {
//             this.consumerNameAndAddresschangesbuttonBollean = true
//             this.consumerNameAndAddressChangeForm.get('name').enable();
//             this.consumerNameAndAddressChangeForm.get('address').enable();
//         } else {
//             this.consumerNameAndAddresschangesbuttonBollean = false
//             this.consumerNameAndAddressChangeForm.get('name').disable();
//             this.consumerNameAndAddressChangeForm.get('address').disable();
//         }
//     }


//     changeConsumerNameAndAddress() {
//         //  consumerApplicationNo:any,newConsumerName:any,newAddress:any,token:any
//         if (this.consumerNameAndAddressChangeForm.value.remark == null || this.consumerNameAndAddressChangeForm.value.remark == undefined || this.consumerNameAndAddressChangeForm.value.remark == "") {
//             this.notificationService.error("Please Enter Remark !");
//             return
//         } else if (this.consumerNameAndAddressChangeForm.invalid) {
//             this.notificationService.warn("Invalid Form");
//             return
//         }
//         else {
//             this.consumerApplicationService.changeConsumerNameAndAddress(this.consumerApplicationDetail.consumerApplicationNo, this.consumerNameAndAddressChangeForm.value.name, this.consumerNameAndAddressChangeForm.value.address, this.userToken).subscribe((data: any) => {
//                 console.log(data, "changeConsumerNameAndAddress..........");
//                 if (data.code == "202") {
//                     this.getApplicationDetails(this.consumerApplicationDetail.consumerApplicationNo);
//                     this.notificationService.success("Data changes Successfully");
//                     let PayLoad = {
//                         "consumerAppNo": this.consumerApplicationDetail.consumerApplicationNo,
//                         "jeRemark": this.consumerNameAndAddressChangeForm.value.remark
//                     }
//                     this.consumerApplicationService.saveJeRemarkForConsumerApplicationUpdate(PayLoad).subscribe((resp: any) => {
//                         console.log(resp, "saveJeRemarkForConsumerApplicationUpdate...........response......");
//                     })
//                 } else {
//                     this.notificationService.warn(data.message);
//                     return
//                 }

//             })
//         }

//     }




//     // ****************change consumer name address and mobile number *********************

//     onChangeNameAndAddressAndMobileNoCheckBoxSelection(e: any) {
//         console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeee..........................");
//         if (e.checked == true) {
//             this.consumerNameAndAddressAndMobileNumberchangesbuttonBollean = true
//             this.consumerNameAndAddressAndMobileNumberChangeForm.get('name').enable()
//             this.consumerNameAndAddressAndMobileNumberChangeForm.get('address').enable();
//             this.consumerNameAndAddressAndMobileNumberChangeForm.get('mobNo').enable()
//         } else {
//             this.consumerNameAndAddressAndMobileNumberchangesbuttonBollean = false
//             this.consumerNameAndAddressAndMobileNumberChangeForm.get('name').disable()
//             this.consumerNameAndAddressAndMobileNumberChangeForm.get('address').disable();
//             this.consumerNameAndAddressAndMobileNumberChangeForm.get('mobNo').disable()
//         }
//     }

//     changeConsumerNameAndAddressByConsumerMobileNo() {
//         // consumerMobileNo:any,newConsumerName:any,newAddress:any,token:any
//         this.consumerApplicationService.changeConsumerNameAndAddressByConsumerMobileNo(this.consumerNameAndAddressAndMobileNumberChangeForm.value.mobNo, this.consumerNameAndAddressAndMobileNumberChangeForm.value.name, this.consumerNameAndAddressAndMobileNumberChangeForm.value.address, this.userToken).subscribe((data: any) => {
//             console.log(data, "changeConsumerNameAndAddressByConsumerMobileNo...........");
//             if (data.code == "202") {
//                 this.getApplicationDetails(this.consumerApplicationDetail.consumerApplicationNo);
//                 this.notificationService.success("Data changes Successfully");
//             } else {
//                 this.notificationService.warn(data.message);
//                 return
//             }
//         })
//     }


//     ///////////////////////////////////////////////////////////////////////////////// consumer Application Details changes end ///////////////////////////////////////////////////////////





//     getDistrict() {
//         this.consumerApplicationService
//             .getDistrictList()
//             .pipe(takeUntil(this.unsubscribe$))
//             .subscribe((data) => {
//                 this.districtList = data["list"];
//                 console.log("this.districtList", this.districtList);
//             });
//     }




//     getConsumerSurveyData() {
//         this.consumerApplicationService.getConsumerSurveyData(this.consumerApplicationDetail?.consumerApplicationId).subscribe((consumerSurveyData: any) => {
//             if (consumerSurveyData['code'] == "200") {
//                 this.consumerSurveyData = consumerSurveyData['list'][0];
//             }
//         })
//     }

//     getConsumerDemandData() {
//         this.consumerApplicationService.getConsumerDemandData(this.consumerApplicationDetail?.consumerApplicationId).subscribe((consumerDemandData: any) => {
//             if (consumerDemandData['code'] == "200") {
//                 this.consumerDemandData = consumerDemandData['list'][0];
//             }
//         })
//     }

//     getGeoLocationData() {
//         this.consumerApplicationService.getGeoLocationData(this.consumerApplicationDetail?.consumerApplicationNo).subscribe((geoLocationData: any) => {
//             console.log('geoLocationData', geoLocationData);
//             if (geoLocationData['code'] == "200") {
//                 this.geoLocationData = geoLocationData['list'][0];
//             }

//         })
//     }

//     getApplicationDocumentData() {
//         this.consumerApplicationService.getApplicationDocumentData(this.consumerApplicationDetail.consumerApplicationId).subscribe((applicationDocumentData: any) => {
//             console.log('applicationDocumentData', applicationDocumentData);
//             if (applicationDocumentData['code'] == "200") {
//                 this.applicationDocumentData = applicationDocumentData['list'][0];
//                 console.log('applicationDocumentData:>-  !!!', applicationDocumentData);
//                 console.log(applicationDocumentData, "applicationDocumentData..................................");

//                 if (this.consumerApplicationDetail?.natureOfWorkTypeId == 1) {
//                     if (this.applicationDocumentData?.docGst != null) {
//                         this.docDropdownArray = [
//                             {
//                                 "name": "Gst File",
//                                 "value": this.applicationDocumentData?.docGst
//                             }
//                         ]
//                         console.log(this.docDropdownArray, " this.docDropdownArray....");
//                     } else {
//                         this.docDropdownArray = [];
//                         console.log(this.docDropdownArray, " this.docDropdownArray....");
//                     }

//                 } else if (this.consumerApplicationDetail?.natureOfWorkTypeId == 2) {
//                     if (this.applicationDocumentData?.docGst != null) {
//                         this.docDropdownArray = [
//                             {
//                                 "name": "Gst File",
//                                 "value": this.applicationDocumentData?.docGst
//                             }
//                         ]
//                         console.log(this.docDropdownArray, " this.docDropdownArray....");
//                     } else {
//                         this.docDropdownArray = [];
//                         console.log(this.docDropdownArray, " this.docDropdownArray....");
//                     }

//                 } else if (this.consumerApplicationDetail?.natureOfWorkTypeId == 3) {
//                     if (this.applicationDocumentData?.docGst != null) {
//                         this.docDropdownArray = [
//                             {
//                                 "name": "T&CP PERMISSION FILE",
//                                 "value": this.applicationDocumentData?.docT$cpPermission
//                             },
//                             {
//                                 "name": "RERA PERMISSION FILE",
//                                 "value": this.applicationDocumentData?.docReraPermission
//                             },
//                             {
//                                 "name": "Gst File",
//                                 "value": this.applicationDocumentData?.docGst
//                             }
//                         ]
//                         console.log(this.docDropdownArray, " this.docDropdownArray....");
//                     } else {
//                         this.docDropdownArray = [
//                             {
//                                 "name": "T&CP PERMISSION FILE",
//                                 "value": this.applicationDocumentData?.docT$cpPermission
//                             },
//                             {
//                                 "name": "RERA PERMISSION FILE",
//                                 "value": this.applicationDocumentData?.docReraPermission
//                             }
//                         ];
//                         console.log(this.docDropdownArray, " this.docDropdownArray....");
//                     }

//                 } else if (this.consumerApplicationDetail?.natureOfWorkTypeId == 4) {
//                     if (this.applicationDocumentData?.docGst != null) {
//                         if (this.applicationDocumentData?.docGroup != null) {
//                             this.docDropdownArray = [
//                                 {
//                                     "name": "Registery File",
//                                     "value": this.applicationDocumentData?.docRegistry
//                                 },
//                                 {
//                                     "name": "NOC File",
//                                     "value": this.applicationDocumentData?.docNoc
//                                 },
//                                 {
//                                     "name": "Group Permission File",
//                                     "value": this.applicationDocumentData?.docGroup
//                                 },
//                                 {
//                                     "name": "Gst File",
//                                     "value": this.applicationDocumentData?.docGst
//                                 }
//                             ]
//                             console.log(this.docDropdownArray, " this.docDropdownArray....");

//                         } else {
//                             this.docDropdownArray = [
//                                 {
//                                     "name": "Registery File",
//                                     "value": this.applicationDocumentData?.docRegistry
//                                 },
//                                 {
//                                     "name": "NOC File",
//                                     "value": this.applicationDocumentData?.docNoc
//                                 },
//                                 {
//                                     "name": "GstFile",
//                                     "value": this.applicationDocumentData?.docGst
//                                 }
//                             ]
//                             console.log(this.docDropdownArray, " this.docDropdownArray....");
//                         }

//                     } else {
//                         if (this.applicationDocumentData?.docGroup != null) {
//                             this.docDropdownArray = [
//                                 {
//                                     "name": "Registery File",
//                                     "value": this.applicationDocumentData?.docRegistry
//                                 },
//                                 {
//                                     "name": "NOC File",
//                                     "value": this.applicationDocumentData?.docNoc
//                                 },
//                                 {
//                                     "name": "Group Permission File",
//                                     "value": this.applicationDocumentData?.docGroup
//                                 }
//                             ];
//                             console.log(this.docDropdownArray, " this.docDropdownArray....");
//                         } else {
//                             this.docDropdownArray = [
//                                 {
//                                     "name": "Registery File",
//                                     "value": this.applicationDocumentData?.docRegistry
//                                 },
//                                 {
//                                     "name": "NOC File",
//                                     "value": this.applicationDocumentData?.docNoc
//                                 }
//                             ];
//                             console.log(this.docDropdownArray, " this.docDropdownArray....");
//                         }

//                     }

//                 } else if (this.consumerApplicationDetail?.natureOfWorkTypeId == 5) {
//                     if (this.applicationDocumentData?.docGst != null) {
//                         this.docDropdownArray = [
//                             {
//                                 "name": "KHASRA KHATONI FILE",
//                                 "value": this.applicationDocumentData?.docKhasraKhatoni
//                             },
//                             {
//                                 "name": "Gst File",
//                                 "value": this.applicationDocumentData?.docGst
//                             }
//                         ]
//                         console.log(this.docDropdownArray, " this.docDropdownArray....");
//                     } else {
//                         this.docDropdownArray = [
//                             {
//                                 "name": "KHASRA KHATONI FILE",
//                                 "value": this.applicationDocumentData?.docKhasraKhatoni
//                             }
//                         ];
//                         console.log(this.docDropdownArray, " this.docDropdownArray....");
//                     }

//                 } else if (this.consumerApplicationDetail?.natureOfWorkTypeId == 6) {
//                     if (this.applicationDocumentData?.docGst != null) {
//                         this.docDropdownArray = [
//                             {
//                                 "name": "Administrative Section Along with Order",
//                                 "value": this.applicationDocumentData?.docAdministrative
//                             },
//                             {
//                                 "name": "GstFile",
//                                 "value": this.applicationDocumentData?.docGst
//                             }
//                         ]
//                         console.log(this.docDropdownArray, " this.docDropdownArray....");
//                     } else {
//                         this.docDropdownArray = [
//                             {
//                                 "name": "Administrative Section Along with Order",
//                                 "value": this.applicationDocumentData?.docAdministrative
//                             }
//                         ];
//                         console.log(this.docDropdownArray, " this.docDropdownArray....");
//                     }

//                 } else if (this.consumerApplicationDetail?.natureOfWorkTypeId == 7) {
//                     if (this.applicationDocumentData?.docGst != null) {
//                         this.docDropdownArray = [
//                             {
//                                 "name": "Energy Bill File",
//                                 "value": this.applicationDocumentData?.docEnergyBillFile
//                             },
//                             {
//                                 "name": "GstFile",
//                                 "value": this.applicationDocumentData?.docGst
//                             }
//                         ]
//                         console.log(this.docDropdownArray, " this.docDropdownArray....");
//                     } else {
//                         this.docDropdownArray = [
//                             {
//                                 "name": "Energy Bill File",
//                                 "value": this.applicationDocumentData?.docEnergyBillFile
//                             }
//                         ];
//                         console.log(this.docDropdownArray, " this.docDropdownArray....");
//                     }

//                 }
//             } else {
//                 this.applicationDocumentData = null;
//             }
//         })
//     }


//     /////////////  Administrative file download ********************************////////************************ Start ***//////////////
//     getDownloaddocAdministrativeFile() {
//         let filePathWithBackslashes = this.applicationDocumentData.docAdministrative.documentPath;
//         let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
//         // console.log(filePathWithForwardSlashes);
//         // console.log(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes);
//         window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
//     }
//     /////////////  Administrative file download ********************************////////************************ end ***//////////////

//     //////////////// Estimate file Download *********************************//////////////////*********start************************ */
//     getDownloaddocEstimateFile() {
//         let filePathWithBackslashes = this.applicationDocumentData.docEstimate.documentPath;
//         let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
//         window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
//     }
//     //////////////// Estimate file Download *********************************//////////////////*************end************************ */

//     /////////////  Noc file download ********************************////////************************ end ***//////////////
//     getDownloaddocNocFile() {
//         let filePathWithBackslashes = this.applicationDocumentData.docNoc.documentPath;
//         let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
//         // console.log(filePathWithForwardSlashes);
//         // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
//         window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
//     }
//     /////////////  Noc file download ********************************////////************************ end ***//////////////

//     /////////////  Registry file download ********************************////////************************ end ***//////////////
//     getDownloaddocRegistryFile() {
//         let filePathWithBackslashes = this.applicationDocumentData.docRegistry.documentPath;
//         let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
//         // console.log(filePathWithForwardSlashes);
//         // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
//         window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
//     }
//     /////////////  Registry file download ********************************////////************************ end ***//////////////

//     /////////////  ReraPermission file download ********************************////////************************ end ***//////////////
//     getDownloaddocReraPermissionFile() {
//         let filePathWithBackslashes = this.applicationDocumentData.docReraPermission.documentPath;
//         let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
//         // console.log(filePathWithForwardSlashes);
//         // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
//         window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
//     }
//     /////////////  ReraPermission file download ********************************////////************************ end ***//////////////

//     /////////////  docT$cpPermission file download ********************************////////************************ end ***//////////////
//     getDownloaddocT$cpPermissionFile() {
//         let filePathWithBackslashes = this.applicationDocumentData.docT$cpPermission.documentPath;
//         let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
//         // console.log(filePathWithForwardSlashes);
//         // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
//         window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
//     }
//     /////////////  docT$cpPermission file download ********************************////////************************ end ***//////////////

//     /////////////  docKhasraKhatoni file download ********************************////////************************ end ***//////////////
//     getDownloaddocKhasraKhatoniFile() {
//         let filePathWithBackslashes = this.applicationDocumentData.docKhasraKhatoni.documentPath;
//         let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
//         // console.log(filePathWithForwardSlashes);
//         // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
//         window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
//     }
//     /////////////  docKhasraKhatoni file download ********************************////////************************ end ***//////////////

//     ///////////////////////////// group Permission file ************************///////////////**************start ///////////////////// */
//     getDownloaddocGroupFile() {
//         let filePathWithBackslashes = this.applicationDocumentData.docGroup.documentPath;
//         let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
//         // console.log(filePathWithForwardSlashes);
//         // console.log(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes);
//         window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)
//     }
//     ///////////////////////////// group Permission file ************************///////////////**************end ///////////////////// */

//     ///////////////////////////// samagra file ************************///////////////**************end ///////////////////// */
//     getDownloaddocSamagraFile() {

//         let filePathWithBackslashes = this.applicationDocumentData.docSamagraFile.documentPath;
//         let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
//         window.open(this.url.userContextPath + "/erp/downloadpdf?path=D:/UploadDocsNew/" + filePathWithForwardSlashes)

//     }
//     ///////////////////////////// samagra file ************************///////////////**************end ///////////////////// */


//     loadForm() {
//         this.dcAcceptanceFg = this.fb.group({
//             consumerApplicationId: [this.consumerApplicationId, Validators.compose([Validators.required])],
//             changedDcId: [''],
//             districtId: [''],
//             dcChanged: ['', Validators.compose([Validators.required])],
//             dcChangedReason: [''],
//             fileSelection: [''],
//             FaultApplicationFieldName: ['']
//             // scheduleSurveyDate: [''],
//             // scheduleSurveyTime: [''],
//             // surveyorName: [''],
//             // surveyorMobile: ['']
//         });
//     }

//     onFileSelection(e: any) {
//         console.log(e.value, "file ssellleectttteddd........................");
//         this.selectedDocArray = e.value;
//         console.log(this.selectedDocArray, "this.selectedDocArray.....????????????");



//     }

//     onFaultSelection(e: any) {
//         console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee..............");
//         // this.dcAcceptanceFg.controls['FaultApplicationFieldName'].setValue(e.value);
//         console.log(this.dcAcceptanceFg, "this.dcAcceptanceFg................................................");
//         let arr = e.value;
//         if (arr.length == 0) {
//             this.natureOfWorkTypeSelectedboolean = false;
//             this.schemeTypeSelectedBoolean = false;
//             this.groupOrIndividualSelectedBoolean = false;
//             this.nameAndAddressSelectedBoolean = false;
//             this.nameAndAddressAndMobileNumberBoolean = false;
//             this.applicationStatusSelectedBoolean = false;
//         } else {
//             this.natureOfWorkTypeSelectedboolean = false;
//             this.schemeTypeSelectedBoolean = false;
//             this.groupOrIndividualSelectedBoolean = false;
//             this.nameAndAddressSelectedBoolean = false;
//             this.nameAndAddressAndMobileNumberBoolean = false;
//             this.applicationStatusSelectedBoolean = false;

//             for (let i = 0; i < arr.length; i++) {
//                 if (arr[i] == 1) {
//                     this.natureOfWorkTypeSelectedboolean = true;
//                 } else if (arr[i] == 2) {
//                     this.schemeTypeSelectedBoolean = true;
//                 } else if (arr[i] == 3) {
//                     this.groupOrIndividualSelectedBoolean = true
//                 } else if (arr[i] == 4) {
//                     this.nameAndAddressSelectedBoolean = true
//                 } else if (arr[i] == 5) {
//                     this.nameAndAddressAndMobileNumberBoolean = true
//                 } else if (arr[i] == 6) {
//                     this.applicationStatusSelectedBoolean = true
//                 } else {
//                     this.natureOfWorkTypeSelectedboolean = false;
//                     this.schemeTypeSelectedBoolean = false;
//                     this.groupOrIndividualSelectedBoolean = false;
//                     this.nameAndAddressSelectedBoolean = false;
//                     this.nameAndAddressAndMobileNumberBoolean = false;
//                     this.applicationStatusSelectedBoolean = false;




//                 }
//             }


//             console.log(this.dcAcceptanceFg, "this.dcAcceptanceFg");

//         }





//         // [
//         //     { 'id': 1, 'name': 'Nature Of Work Type' },
//         //     { 'id': 2, 'name': 'Scheme Type' },
//         //     { 'id': 3, 'name': 'Group/Individual' },
//         //     { 'id': 4, 'name': 'Name & Address' },
//         //     { 'id': 5, 'name': 'Name , Address & Mobile Number' },
//         //     { 'id': 6, 'name': 'Application Status' },

//         // ]


//     }

//     get applicationDcAcceptanceFormControls() {
//         return this.dcAcceptanceFg.controls;
//     }


//     onChangeSelectedDistrictType(value) {
//         console.log(
//             "onChangeSelectedDistrictType",
//             "get distribution list by district id",
//             value.value.districtId
//         );
//         this.varonChangeSelectedDistrictType = value.value;
//         if (value.value.districtId) {
//             this.districtIdnew = value.value.districtId
//             this.dcAcceptanceFg.value.dcId = '';
//             this.consumerApplicationService
//                 .getDistributionByID(value.value.districtId)
//                 .pipe(takeUntil(this.unsubscribe$))
//                 .subscribe((data) => {
//                     this.dcList = data["list"][0];
//                 });
//         } else {
//             this.dcList = null;
//         }
//     }


//     onDcChangedChange(ob: MatRadioChange) {


//         let mrButton: MatRadioButton = ob.source;
//         console.log(mrButton.value, "mrButton........mrButton......sssssssssssssssssssssssssssssssssssssssskkkkkkkkkkkkkkkkkkkkkk...??????");

//         if (mrButton.value == "true") { // districtId
//             // this.faultApplicationFieldName
//             // this.DcAcceptanceModel.faultApplicationFieldName = false;
//             this.dcAcceptanceFg.controls['changedDcId'].setValidators(Validators.compose([Validators.required]));
//             this.dcAcceptanceFg.controls['districtId'].setValidators(Validators.compose([Validators.required]));
//             this.dcAcceptanceFg.controls['dcChangedReason'].setValidators(Validators.compose([Validators.required]));
//             this.dcAcceptanceFg.controls['fileSelection'].disable();
//             this.dcAcceptanceFg.controls['fileSelection'].reset();

//             this.dcAcceptanceFg.controls['fileSelection'].clearValidators;
//             this.dcAcceptanceFg.controls['changedDcId'].updateValueAndValidity();
//             this.dcAcceptanceFg.controls['districtId'].updateValueAndValidity();
//             this.dcAcceptanceFg.controls['dcChangedReason'].updateValueAndValidity();
//             // this.dcAcceptanceFg.controls['fileSelection'].setValue('');
//             this.dcAcceptanceFg.controls['fileSelection'].updateValueAndValidity();
//             this.dcAcceptanceFg.controls['FaultApplicationFieldName'].clearValidators()
//             this.dcAcceptanceFg.controls['FaultApplicationFieldName'].setValue('');
//             this.dcAcceptanceFg.controls['FaultApplicationFieldName'].updateValueAndValidity();
//             this.FileSelectionFieldNotShowBoolean = false;
//             console.log(this.dcAcceptanceFg, "this.dcAcceptanceFg");
//         } else if (mrButton.value == "false") {
//             // this.DcAcceptanceModel.faultApplicationFieldName = false;
//             this.dcAcceptanceFg.controls['fileSelection'].clearValidators;
//             this.dcAcceptanceFg.controls['fileSelection'].disable();
//             this.dcAcceptanceFg.controls['fileSelection'].reset();
//             this.dcAcceptanceFg.controls['changedDcId'].clearValidators();
//             this.dcAcceptanceFg.controls['districtId'].clearValidators();
//             this.dcAcceptanceFg.controls['dcChangedReason'].clearValidators();
//             this.dcAcceptanceFg.controls['dcChangedReason'].setValue('');
//             this.dcAcceptanceFg.controls['changedDcId'].setValue('');
//             this.dcAcceptanceFg.controls['changedDcId'].updateValueAndValidity();
//             this.dcAcceptanceFg.controls['districtId'].setValue('');
//             this.dcAcceptanceFg.controls['districtId'].updateValueAndValidity();
//             this.dcAcceptanceFg.controls['dcChangedReason'].updateValueAndValidity();
//             this.dcAcceptanceFg.controls['fileSelection'].updateValueAndValidity();
//             this.dcAcceptanceFg.controls['FaultApplicationFieldName'].clearValidators()
//             this.dcAcceptanceFg.controls['FaultApplicationFieldName'].setValue('');
//             this.dcAcceptanceFg.controls['FaultApplicationFieldName'].updateValueAndValidity();
//             this.FileSelectionFieldNotShowBoolean = false;
//             console.log(this.dcAcceptanceFg, "this.dcAcceptanceFg");
//         } else if (mrButton.value == "shift") {

//             if (this.consumerApplicationDetail?.natureOfWorkTypeId == 1 && this.applicationDocumentData?.docGst == null) {
//                 this.dcAcceptanceFg.controls['fileSelection'].disable();
//                 this.dcAcceptanceFg.controls['fileSelection'].reset();
//                 this.dcAcceptanceFg.controls['fileSelection'].clearValidators;
//                 this.dcAcceptanceFg.controls['changedDcId'].clearValidators();
//                 this.dcAcceptanceFg.controls['districtId'].clearValidators();
//                 this.dcAcceptanceFg.controls['dcChangedReason'].clearValidators();
//                 this.dcAcceptanceFg.controls['dcChangedReason'].setValue('');
//                 this.dcAcceptanceFg.controls['changedDcId'].setValue('');
//                 this.dcAcceptanceFg.controls['changedDcId'].updateValueAndValidity();
//                 this.dcAcceptanceFg.controls['districtId'].setValue('');
//                 this.dcAcceptanceFg.controls['districtId'].updateValueAndValidity();
//                 this.dcAcceptanceFg.controls['dcChangedReason'].updateValueAndValidity();
//                 this.dcAcceptanceFg.controls['fileSelection'].updateValueAndValidity();
//                 this.dcAcceptanceFg.controls['FaultApplicationFieldName'].clearValidators()
//                 this.dcAcceptanceFg.controls['FaultApplicationFieldName'].setValue('');
//                 this.dcAcceptanceFg.controls['FaultApplicationFieldName'].updateValueAndValidity();
//                 this.notificationService.warn("No Document Required for this Application");
//                 this.FileSelectionFieldNotShowBoolean = true;
//                 return
//             }
//             else if (this.consumerApplicationDetail?.natureOfWorkTypeId == 2 && this.applicationDocumentData?.docGst == null && this.applicationDocumentData?.docGroup == null) {
//                 this.dcAcceptanceFg.controls['fileSelection'].disable();
//                 this.dcAcceptanceFg.controls['fileSelection'].reset();
//                 this.dcAcceptanceFg.controls['fileSelection'].clearValidators;
//                 this.dcAcceptanceFg.controls['changedDcId'].clearValidators();
//                 this.dcAcceptanceFg.controls['districtId'].clearValidators();
//                 this.dcAcceptanceFg.controls['dcChangedReason'].clearValidators();
//                 this.dcAcceptanceFg.controls['dcChangedReason'].setValue('');
//                 this.dcAcceptanceFg.controls['changedDcId'].setValue('');
//                 this.dcAcceptanceFg.controls['changedDcId'].updateValueAndValidity();
//                 this.dcAcceptanceFg.controls['districtId'].setValue('');
//                 this.dcAcceptanceFg.controls['districtId'].updateValueAndValidity();
//                 this.dcAcceptanceFg.controls['dcChangedReason'].updateValueAndValidity();
//                 this.dcAcceptanceFg.controls['fileSelection'].updateValueAndValidity();
//                 this.dcAcceptanceFg.controls['FaultApplicationFieldName'].clearValidators()
//                 this.dcAcceptanceFg.controls['FaultApplicationFieldName'].setValue('');
//                 this.dcAcceptanceFg.controls['FaultApplicationFieldName'].updateValueAndValidity();
//                 this.notificationService.warn("No Document Required for this Application");
//                 this.FileSelectionFieldNotShowBoolean = true;
//                 return
//             } else {
//                 this.dcAcceptanceFg.controls['fileSelection'].setValidators(Validators.required);
//                 this.dcAcceptanceFg.controls['fileSelection'].enable();
//                 this.dcAcceptanceFg.controls['fileSelection'].reset();
//                 this.dcAcceptanceFg.controls['changedDcId'].clearValidators();
//                 this.dcAcceptanceFg.controls['districtId'].clearValidators();
//                 this.dcAcceptanceFg.controls['dcChangedReason'].clearValidators();
//                 this.dcAcceptanceFg.controls['dcChangedReason'].setValue('');
//                 this.dcAcceptanceFg.controls['changedDcId'].setValue('');
//                 this.dcAcceptanceFg.controls['changedDcId'].updateValueAndValidity();
//                 this.dcAcceptanceFg.controls['districtId'].setValue('');
//                 this.dcAcceptanceFg.controls['districtId'].updateValueAndValidity();
//                 this.dcAcceptanceFg.controls['dcChangedReason'].updateValueAndValidity();
//                 this.dcAcceptanceFg.controls['fileSelection'].updateValueAndValidity();
//                 this.dcAcceptanceFg.controls['FaultApplicationFieldName'].clearValidators()
//                 this.dcAcceptanceFg.controls['FaultApplicationFieldName'].setValue('');
//                 this.dcAcceptanceFg.controls['FaultApplicationFieldName'].updateValueAndValidity();
//                 this.FileSelectionFieldNotShowBoolean = false;
//             }

//             //  this.DcAcceptanceModel.faultApplicationFieldName = false;

//             console.log(this.dcAcceptanceFg, "this.dcAcceptanceFg");
//         } else if (mrButton.value == "faultApplication") {
//             //   this.DcAcceptanceModel.faultApplicationFieldName = true
//             this.dcAcceptanceFg.controls['FaultApplicationFieldName'].setValidators(Validators.required);
//             this.dcAcceptanceFg.controls['FaultApplicationFieldName'].enable();
//             // this.dcAcceptanceFg.controls['FaultApplicationFieldName'].reset();
//             this.dcAcceptanceFg.controls['FaultApplicationFieldName'].updateValueAndValidity();
//             this.dcAcceptanceFg.controls['fileSelection'].clearValidators();
//             this.dcAcceptanceFg.controls['fileSelection'].disable();
//             this.dcAcceptanceFg.controls['fileSelection'].reset();
//             this.dcAcceptanceFg.controls['changedDcId'].clearValidators();
//             this.dcAcceptanceFg.controls['districtId'].clearValidators();
//             this.dcAcceptanceFg.controls['dcChangedReason'].clearValidators();
//             this.dcAcceptanceFg.controls['dcChangedReason'].setValue('');
//             this.dcAcceptanceFg.controls['changedDcId'].setValue('');
//             this.dcAcceptanceFg.controls['changedDcId'].updateValueAndValidity();
//             this.dcAcceptanceFg.controls['districtId'].setValue('');
//             this.dcAcceptanceFg.controls['districtId'].updateValueAndValidity();
//             this.dcAcceptanceFg.controls['dcChangedReason'].updateValueAndValidity();
//             this.dcAcceptanceFg.controls['fileSelection'].updateValueAndValidity();
//             this.FileSelectionFieldNotShowBoolean = false;
//             console.log(this.dcAcceptanceFg, "this.dcAcceptanceFg");

//         }
//         else if (mrButton.value == "faultApplicationForMkmy") {
//             this.dcAcceptanceFg.controls['fileSelection'].clearValidators();
//             // this.dcAcceptanceFg.controls['fileSelection'].enable();
//             this.dcAcceptanceFg.controls['fileSelection'].setValue("");
//             this.dcAcceptanceFg.controls['changedDcId'].clearValidators();
//             this.dcAcceptanceFg.controls['districtId'].clearValidators();
//             this.dcAcceptanceFg.controls['dcChangedReason'].clearValidators();
//             this.dcAcceptanceFg.controls['dcChangedReason'].setValue('');
//             this.dcAcceptanceFg.controls['changedDcId'].setValue('');
//             this.dcAcceptanceFg.controls['changedDcId'].updateValueAndValidity();
//             this.dcAcceptanceFg.controls['districtId'].setValue('');
//             this.dcAcceptanceFg.controls['districtId'].updateValueAndValidity();
//             this.dcAcceptanceFg.controls['dcChangedReason'].updateValueAndValidity();
//             this.dcAcceptanceFg.controls['fileSelection'].updateValueAndValidity();

//             this.dcAcceptanceFg.controls['FaultApplicationFieldName'].clearValidators()
//             this.dcAcceptanceFg.controls['FaultApplicationFieldName'].setValue('');
//             this.dcAcceptanceFg.controls['FaultApplicationFieldName'].updateValueAndValidity();
//             console.log(this.dcAcceptanceFg, "this.dcAcceptanceFg");

//             this.mkmyDocForm = this.fb.group({
//                 samgrFile: [""],
//                 kkFile: [""]
//             })
//             this.FileSelectionFieldNotShowBoolean = false;
//         }
//         else {
//             console.log("some other value:  " + ob.value);
//             console.log(this.dcAcceptanceFg, "this.dcAcceptanceFg");
//         }
//     }
//     onKKFileSelection(e: any) {
//         console.log(e, "e,,,,,,,,,,,,,,,,");
//         this.onKKFileSelectionVar = e.target.files[0];
//     }

//     onSamagraFileSelection(e: any) {
//         console.log(e, "eeeeee,,,,,,,,,,");
//         this.onSamagraFileSelectionVar = e.target.files[0];
//     }

//     onMkmyDocSubmit() {
//         if (this.mkmyDocForm.invalid) {
//             this.notificationService.warn("Invalid Form !");
//             return
//         } else {
//             let formData: FormData = new FormData();
//             formData.append("docSamagraFile", this.onSamagraFileSelectionVar)
//             formData.append("docKhasraKhatoni", this.onKKFileSelectionVar)
//             formData.append("consumerApplicationNo", this.consumerApplicationDetail?.consumerApplicationNo)

//             this.consumerApplicationService.uploadMkmyDocuments(formData, this.userToken).subscribe((respo: any) => {
//                 console.log(respo, "respo..........................................");
//                 if (respo?.code == "204") {
//                     this.notificationService.success(respo?.message);
//                     this.documentSubmitBoolean = true;
//                 } else {
//                     this.notificationService.warn(respo?.message);
//                     return
//                 }
//             })

//         }
//     }




//     onClose() {
//         this.dialogRef.close();
//     }


//     onSubmit() {

//         console.log(this.docDropdownArray, "this.docDropdownArray......mmmmmmmmmmmmmmm");
//         console.log(this.selectedDocArray, "selectedDocArray......nnnnnnnnnnnnn");
//         console.log(this.applicationDocumentData?.docSamagraFile, "selectedDocArray......nnnnnnnnnnnnn");
//         console.log(this.applicationDocumentData?.docKhasraKhatoni, "selectedDocArray......nnnnnnnnnnnnn");
//         console.log(this.consumerApplicationDetail?.natureOfWorkTypeId, "selectedDocArray......nnnnnnnnnnnnn");
//         if (this.consumerApplicationDetail?.natureOfWorkTypeId == 8 && this.dcAcceptanceFg.get('dcChanged').value != 'true') {
//             if ((this.applicationDocumentData?.docSamagraFile == null && this.documentSubmitBoolean == false) || (this.applicationDocumentData?.docKhasraKhatoni == null && this.documentSubmitBoolean == false)) {
//                 this.notificationService.warn("File is required !");
//                 return;
//             }
//         }

//         if (this.dcAcceptanceFg.value.dcChanged == "shift") {

//             if (this.selectedDocArray.length == 0) {
//                 this.notificationService.warn("Please select atleat one Document !");
//                 return
//             }
//             let s = []
//             for (let i = 0; i < this.docDropdownArray.length; i++) {
//                 for (let j = 0; j < this.selectedDocArray.length; j++) {
//                     if (this.docDropdownArray[i].value?.uploadId == this.selectedDocArray[j].uploadId && this.docDropdownArray[i].docStatus == null) {
//                         this.docDropdownArray[i].docStatus = 3
//                     }
//                 }
//             }

//             for (let k = 0; k < this.docDropdownArray.length; k++) {
//                 if (this.docDropdownArray[k].docStatus == null) {
//                     this.docDropdownArray[k].docStatus = 2

//                 }
//                 s.push(
//                     {
//                         "docFileId": this.docDropdownArray[k].value.uploadId,
//                         "docStatus": this.docDropdownArray[k].docStatus
//                     }
//                 )
//             }

//             console.log(this.docDropdownArray, "yyyyyyyyyyyyyyy", s);
//             this.DcAcceptanceModel.rejectFile = s
//             this.dcAcceptanceFg.value.dcChanged = false

//         } else if (this.dcAcceptanceFg.value.dcChanged == "faultApplication") {
//             this.dcAcceptanceFg.value.dcChanged = false;
//             this.selectedDocArray = [];
//             this.DcAcceptanceModel.rejectFile = null
//         } else if (this.dcAcceptanceFg.value.dcChanged == "faultApplicationForMkmy") {
//             this.dcAcceptanceFg.value.dcChanged = false;

//         }
//         else {
//             this.selectedDocArray = [];
//             this.DcAcceptanceModel.rejectFile = null
//         }

//         console.log('submit button clicked');
//         this.isFormSubmit = true;


//         console.log(' before submit -- this.dcAcceptanceFg', this.dcAcceptanceFg);


//         this.DcAcceptanceModel.changedDcId = this.dcAcceptanceFg.value.changedDcId;
//         this.DcAcceptanceModel.consumerApplicationId = this.dcAcceptanceFg.value.consumerApplicationId
//         this.DcAcceptanceModel.dcChanged = this.dcAcceptanceFg.value.dcChanged
//         this.DcAcceptanceModel.dcChangedReason = this.dcAcceptanceFg.value.dcChangedReason;

//         console.log();

//         if (this.dcAcceptanceFg.valid) {
//             console.log(' submit -- this.dcAcceptanceFg', this.dcAcceptanceFg);
//             if (this.natureOfWorkTypeSelectedboolean == true) {
//                 console.log("change nature of work type............................");
//                 this.consumerApplicationService.changeStatusForConsumerUpdate(this.consumerApplicationDetail.consumerApplicationNo, this.userToken).subscribe((data: any) => {
//                     console.log(data, "changeStatusForConsumerUpdate...............................");
//                     if (data.code == "200") {
//                         this.notificationService.success(data.message);
//                         this.onClose();
//                     } else {
//                         this.notificationService.warn(data.message);
//                         return
//                     }
//                 })
//             } else {
//                 this.getApplicationDocumentDataForCheck();
//             }
//         } else {
//             this.notificationService.error("! invalid Form");
//             console.log("abcd");

//             return
//         }
//     }

//     getApplicationDocumentDataForCheck() {
//         this.consumerApplicationService.getApplicationDocumentData(this.data.row.consumerApplicationId).subscribe((applicationDocumentData: any) => {
//             console.log('applicationDocumentData', applicationDocumentData);
//             if (applicationDocumentData['code'] == "200") {
//                 this.applicationDocumentData = applicationDocumentData['list'][0];
//                 console.log('applicationDocumentData:>-  !!!', applicationDocumentData);

//                 if (applicationDocumentData['list'][0]?.consumerApplicationDetail?.natureOfWorkTypeId == 2 && applicationDocumentData['list'][0]?.consumerApplicationDetail?.individualOrGroup == null) {
//                     this.notificationService.warn("Please Select Individual/Group First");
//                     return;
//                 } else if (applicationDocumentData['list'][0]?.consumerApplicationDetail?.natureOfWorkTypeId == 2 && applicationDocumentData['list'][0]?.consumerApplicationDetail?.individualOrGroup?.individualOrGroupId == 2 && applicationDocumentData['list'][0]?.docGroup == null) {
//                     this.notificationService.warn("Group file is required !");
//                     return
//                 } else {

//                     this.consumerApplicationService.saveDcAcceptanceData(this.DcAcceptanceModel).subscribe(
//                         data => {
//                             console.log(data);
//                             if (data['code'] == "201") {
//                                 this.acceptanceBoolean = true;
//                                 this.notificationService.success(data['message']);
//                                 this.onClose();
//                             } else {
//                                 this.acceptanceBoolean = false
//                                 this.notificationService.error(data['message']);
//                                 return
//                             }
//                         });
//                 }


//             } else {
//                 if (this.consumerApplicationDetail?.natureOfWorkTypeId == 8) {
//                     this.consumerApplicationService.saveDcAcceptanceData(this.DcAcceptanceModel).subscribe(
//                         data => {
//                             console.log(data);
//                             if (data['code'] == "200") {
//                                 this.acceptanceBoolean = true;
//                                 this.notificationService.success(data['message']);
//                                 this.onClose();
//                             } else {
//                                 this.acceptanceBoolean = false
//                                 this.notificationService.error(data['message']);
//                                 return
//                             }
//                         });
//                 }
//                 this.applicationDocumentData = null;
//             }
//         })
//     }




//     async ngOnDestroy() {
//         this.unsubscribe$.next();
//         this.unsubscribe$.complete();
//     }


// }
