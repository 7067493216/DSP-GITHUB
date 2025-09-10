// <!-- <mat-card style="height: 500px; overflow: scroll;" class="my-card"> -->
// <mat-card class="my-card custom-scroll-enable-1">
//     <mat-toolbar class="label label-warning">
//         <span>{{data.modalTitle}}</span>
//         <span class="fill-remaining-space"></span>
//         <button class="close-btn" mat-stroked-button (click)="onClose()" tabIndex="-1">
//             <mat-icon>clear</mat-icon>
//         </button>
//     </mat-toolbar>
//     <!-- *ngFor="let basics of basicdetails"  app-consumer-application-view-page -->

//     <!-- <div class="custom-scroll-disable">
//         <ng-container *ngIf="consumerApplicationDetail">
//             <consumer-application-view [consumerApplicationId]="consumerApplicationDetail?.consumerApplicationId">
//             </consumer-application-view>
//         </ng-container>
//     </div> -->

//     <div align="center">
//         <h1
//             style="color: black; background-color:  rgb(215, 214, 214); font-weight: 900; width: 95%; margin-right: 2%;">
//             Application Details(<b>{{consumerApplicationDetail?.consumerApplicationNo}}</b>)</h1>
//     </div>

//     <table class="table table-striped" style="line-height:26px;font-size: 15px;">
//         <tbody>

//             <tr>
//                 <td><b>Applicant Name (आवेदक का नाम) : </b><span
//                         class="padding">{{consumerApplicationDetail?.consumerName}} </span></td>
//                 <td><b>Father/Husband Name (पिता/पति का नाम) : </b><span class="padding">
//                         {{consumerApplicationDetail?.guardianName}}</span>
//                 </td>
//             </tr>

//             <tr>
//                 <td><b>Address (पता) : </b><span class="padding">
//                         {{consumerApplicationDetail?.address}}</span>
//                 </td>
//                 <!-- <td><b>IVRS No (उपभोक्ता संख्या): </b><span class="padding">
//                         {{consumerApplicationDetail?.consumers?.ivrsNo}}</span>
//                 </td> -->
//             </tr>

//             <tr>
//                 <td colspan="2"><b>Contact : </b><span class="padding">
//                         {{consumerApplicationDetail?.consumers.consumerLoginId}}</span>
//                 </td>
//             </tr>

//             <tr>
//                 <div *ngIf="consumerApplicationDetail?.ivrsNo !== null; then thenBlockivrs">
//                     This content is not shown
//                 </div>

//                 <ng-template #thenBlockivrs>

//                     <td colspan="2"><b>IVRSNO (उपभोक्ता संख्या) : </b><span
//                             class="padding"><b>{{consumerApplicationDetail?.ivrsNo}} </b>
//                             <!-- [{{consumerApplicationDetail?.loadRequested}}]  -->
//                         </span>
//                     </td>
//                 </ng-template>
//             </tr>



//             <tr>
//                 <td><b>Nature of Work (कार्य प्रकार)(Application type) : </b><span class="padding">
//                         {{consumerApplicationDetail?.natureOfWorkType.natureOfWorkName}}
//                     </span>
//                 </td>
//                 <td><b>Scheme Type (योजना का प्रकार) : </b><span class="padding">
//                         {{consumerApplicationDetail?.schemeType.schemeTypeName}}
//                     </span>
//                 </td>
//             </tr>

//             <!-- supply voltage -->
//             <tr>
//                 <div *ngIf="supplyVoltageString !== ''; then thenBlockSupplyVoltage">
//                     This content is not shown
//                 </div>

//                 <ng-template #thenBlockSupplyVoltage>

//                     <td colspan="2"><b>Supply Voltage (सप्लाई वोल्टेज) : </b><span
//                             class="padding"><b>{{supplyVoltageString}} </b>

//                         </span>
//                     </td>
//                 </ng-template>
//             </tr>

//             <tr>
//                 <div *ngIf="consumerApplicationDetail?.loadRequested !== null; then thenBlockLoadReuest">
//                     This content is not shown
//                 </div>

//                 <ng-template #thenBlockLoadReuest>

//                     <td colspan="1"><b>load Request (आवेदक द्वारा दर्ज किया गया भार) : </b><span
//                             class="padding"><b>{{consumerApplicationDetail?.loadRequested}} </b>
//                             <!-- [{{consumerApplicationDetail?.loadRequested}}]  -->
//                         </span>
//                     </td>
//                     <!-- load  Unit -->

//                     <td colspan="1"><b>load unit (लोड यूनिट ) : </b><span
//                             class="padding"><b>{{consumerApplicationDetail?.loadRequestedId?.loadRequestedName}} </b>
//                         </span>
//                     </td>

//                 </ng-template>
//             </tr>


//             <tr>
//                 <div *ngIf="consumerApplicationDetail?.schemeType?.schemeTypeId === 1; then thenBlockSchemeTypeIs1">
//                     This content is not shown
//                 </div>

//                 <ng-template #thenBlockSchemeTypeIs1>

//                     <td colspan="2"><b>Contractor Name (कॉन्ट्रैक्टर का नाम) : </b><span
//                             class="padding"><b>{{consumerApplicationDetail?.contractorId?.contractorCompanyName}}, </b>
//                             [{{consumerApplicationDetail?.contractorId?.contractorAuthenticationId}}] </span>
//                     </td>
//                 </ng-template>
//             </tr>

//             <tr>
//                 <div
//                     *ngIf="consumerApplicationDetail?.schemeType?.schemeTypeId === 1  ; then thenBlockSchemeTypeWithStatus">
//                     This content is not shown
//                 </div>

//                 <ng-template #thenBlockSchemeTypeWithStatus>

//                     <div
//                         *ngIf="consumerApplicationDetail?.applicationStatus?.applicationStatusId > 3  ; then thenBlockContractorStatus else elseBlockContractorStatus">
//                         This content is not shown
//                     </div>

//                     <ng-template #thenBlockContractorStatus>

//                         <td><b>Contractor Class Type: </b><span
//                                 class="padding">{{consumerApplicationDetail?.contractorId?.contractorUserClass}} </span>
//                         </td>

//                         <td>
//                             <b>Contractor's Status: </b><span class="padding text-success"><strong>
//                                     <!--  The contractor has accepted this application.-->

//                                 </strong>
//                             </span>
//                         </td>
//                     </ng-template>

//                     <ng-template #elseBlockContractorStatus>

//                         <td><b>Contractor Class Type: </b><span
//                                 class="padding">{{consumerApplicationDetail?.contractorId?.contractorUserClass}} </span>
//                         </td>

//                         <td>
//                             <b>Contractor's Status: </b><span class="padding text-danger"><strong>The
//                                     <!-- contractor has rejected this application.-->
//                                 </strong>
//                             </span>
//                         </td>
//                     </ng-template>

//                 </ng-template>
//             </tr>

//             <tr>
//                 <div *ngIf="consumerApplicationDetail?.schemeType?.schemeTypeId === 2; then thenBlockSchemeTypeIs2">
//                     This content is not shown
//                 </div>

//                 <ng-template #thenBlockSchemeTypeIs2>

//                     <td colspan="2"><b>Vendor Name (कॉन्ट्रैक्टर का नाम): </b><span class="padding">Madhya Pradesh
//                             Madhya
//                             Kshetra Vidyut
//                             Vitaran Company Limited <strong>(MPMKVVCL)</strong></span>
//                     </td>
//                 </ng-template>
//             </tr>

//             <tr>


//                 <td><b>Circle (वृत) : </b><span class="padding">
//                         {{consumerApplicationDetail?.distributionCenter?.dcSubdivision?.subdivisionDivision?.divisionCircle?.circle}}
//                     </span>
//                 </td>

//                 <td><b>Division (संभाग ) : </b><span class="padding">
//                         {{consumerApplicationDetail?.distributionCenter?.dcSubdivision?.subdivisionDivision?.division}}
//                     </span>
//                 </td>

//             </tr>


//             <tr>
//                 <td colspan="2"><b>Distribution Center (वितरण केन्द्र) : </b><span class="padding">
//                         {{consumerApplicationDetail?.distributionCenter?.dcName}}
//                     </span>
//                 </td>
//             </tr>

//             <!-- if work laction is difference -->
//             <tr>
//                 <div
//                     *ngIf="consumerApplicationDetail?.workAllocationAddress != null; then thenBlockWorkAllocationDifference">
//                     This content is not shown
//                 </div>

//                 <ng-template #thenBlockWorkAllocationDifference>
//                     <td><b>Work Location Address (कार्य स्थल पता): </b><span class="padding">
//                             {{consumerApplicationDetail?.workAllocationAddress}}</span></td>
//                 </ng-template>
//             </tr>

//             <!-- land area -->
//             <!-- alnd are Unit  -->
//             <tr>
//                 <div *ngIf="consumerApplicationDetail?.area != null; then thenBlockArea">
//                     This content is not shown
//                 </div>

//                 <ng-template #thenBlockArea>
//                     <td><b>Area (भूमि क्षेत्रफल): </b><span class="padding">
//                             {{consumerApplicationDetail?.area}}</span></td>
//                     <td><b>land area unit (भूमि क्षेत्रफल इकाई): </b><span class="padding">
//                             {{consumerApplicationDetail?.landAreaUnit?.landAreaUnitName}}</span></td>
//                 </ng-template>
//             </tr>


//             <!-- no Of Plot -->
//             <tr>
//                 <div *ngIf="consumerApplicationDetail?.noOfPlot != null; then thenBlockNoOfPlot">
//                     This content is not shown
//                 </div>

//                 <ng-template #thenBlockNoOfPlot>
//                     <td><b>No. of Plots (): </b><span class="padding">
//                             {{consumerApplicationDetail?.noOfPlot}}</span></td>
//                 </ng-template>
//             </tr>


//             <!--gst number  -->
//             <tr>
//                 <div *ngIf="consumerApplicationDetail?.gstNumber != null; then thenBlockGstNumber">
//                     This content is not shown
//                 </div>

//                 <ng-template #thenBlockGstNumber>
//                     <td colspan="2"><b>GST Number(): </b><span class="padding">
//                             {{consumerApplicationDetail?.gstNumber}}</span></td>
//                 </ng-template>
//             </tr>

//             <!--Individual Or Group -->
//             <tr>
//                 <div *ngIf="consumerApplicationDetail?.individualOrGroup != null; then thenBlockIndividualOrGroup">
//                     This content is not shown
//                 </div>

//                 <ng-template #thenBlockIndividualOrGroup>
//                     <td colspan="2"><b>Individual(Consumer)/Group(Colonizer): </b><span class="padding">
//                             {{consumerApplicationDetail?.individualOrGroup?.name}}</span></td>
//                 </ng-template>
//             </tr>

//             <tr>
//                 <td *ngIf="consumerApplicationDetail?.dgmStcDate!=null"><b>DGM STC APPROVAL DATE: </b><span
//                         class="padding">
//                         {{consumerApplicationDetail?.dgmStcDate}}
//                     </span>
//                 </td>

//                 <td *ngIf="consumerApplicationDetail?.dateOfDgmOandM!=null"><b>DGM (O&M) APPROVAL DATE: </b><span
//                         class="padding">
//                         {{consumerApplicationDetail?.dateOfDgmOandM}}
//                     </span>
//                 </td>

//             </tr>

//             <tr>
//                 <td ><b>Work Short Description (कार्य का संक्षिप्त विवरण) : </b><span
//                         class="padding">{{consumerApplicationDetail?.shortDescriptionOfWork}}
//                     </span>
//                 </td>

//                 <td ><b>GST Number : </b><span
//                     class="padding">{{consumerApplicationDetail.gstNumber}}
//                 </span>
//             </td>

//             </tr>


//             <tr *ngIf="applicationDocumentData && consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId!=2">
//                 <td colspan="2">
//                     <!-- docEstimate -->

//                     <div align="center">
//                         <h1
//                             style="color: black; background-color:  rgb(215, 214, 214); font-weight: 900; width: 95%; margin-right: 2%;">
//                             Application Documents</h1>
//                     </div>

//                     <br>

//                     <div class="row">
//                         <div class="col-md-3" *ngIf="applicationDocumentData?.docEstimate!=null">
//                             <b>Doc-Estimate File : </b><span class="padding"><button type="button" class="btn btn-success"
//                                     (click)="getDownloaddocEstimateFile()">Download</button>
//                             </span>
//                             <br>
//                             <br>
//                             <br>
//                         </div>
    
//                         <div class="col-md-3" *ngIf="applicationDocumentData?.docAdministrative!=null">
//                             <b>Doc-Administrative File : </b><span class="padding"><button type="button"
//                                     class="btn btn-success" (click)="getDownloaddocAdministrativeFile()">Download</button>
//                             </span>
//                             <br>
//                             <br>
//                             <br>
//                         </div>
    
//                         <div class="col-md-3" *ngIf="applicationDocumentData?.docNoc!=null">
//                             <b>Doc-Noc File : </b><span class="padding"><button type="button" class="btn btn-success"
//                                     (click)="getDownloaddocNocFile()">Download</button>
//                             </span>
//                             <br>
//                             <br>
//                             <br>
//                         </div>
//                         <div class="col-md-3" *ngIf="applicationDocumentData?.docRegistry!=null">
//                             <b>Doc-Registry File : </b><span class="padding"><button type="button" class="btn btn-success"
//                                     (click)="getDownloaddocRegistryFile()">Download</button>
//                             </span>
//                              <br>
//                              <br>
//                              <br>
//                         </div>
    
//                         <div class="col-md-3" *ngIf="applicationDocumentData?.docReraPermission!=null">
//                             <b>Doc ReraPermission File : </b><span class="padding"><button type="button"
//                                     class="btn btn-success" (click)="getDownloaddocReraPermissionFile()">Download</button>
//                             </span>
//                              <br>
//                              <br>
//                              <br>
//                         </div>
    
//                         <div class="col-md-3" *ngIf="applicationDocumentData?.docT$cpPermission!=null">
//                             <b>Doc-Registry File : </b><span class="padding"><button type="button" class="btn btn-success"
//                                     (click)="getDownloaddocT$cpPermissionFile()">Download</button>
//                             </span>
//                              <br>
//                              <br>
//                              <br>
//                         </div>
    
//                         <div class="col-md-3" *ngIf="applicationDocumentData?.docKhasraKhatoni!=null">
//                             <b>Doc-Registry File : </b><span class="padding"><button type="button" class="btn btn-success"
//                                     (click)="getDownloaddocKhasraKhatoniFile()">Download</button>
//                             </span>
//                              <br>
//                              <br>
//                              <br>
//                         </div>
//                     </div>

//                     <!-- <div class="col-md-3" *ngIf="applicationDocumentData?.docEstimate!=null">
//                         <b>Doc-Estimate File : </b><span class="padding"><button type="button" class="btn btn-success"
//                                 (click)="getDownloaddocEstimateFile()">Download</button>
//                         </span>
//                         <br>
//                         <br>
//                         <br>
//                     </div>

//                     <div class="col-md-3" *ngIf="applicationDocumentData?.docAdministrative!=null">
//                         <b>Doc-Administrative File : </b><span class="padding"><button type="button"
//                                 class="btn btn-success" (click)="getDownloaddocAdministrativeFile()">Download</button>
//                         </span>
//                         <br>
//                         <br>
//                         <br>
//                     </div>

//                     <div class="col-md-3" *ngIf="applicationDocumentData?.docNoc!=null">
//                         <b>Doc-Noc File : </b><span class="padding"><button type="button" class="btn btn-success"
//                                 (click)="getDownloaddocNocFile()">Download</button>
//                         </span>
//                         <br>
//                         <br>
//                         <br>
//                     </div>
//                     <div class="col-md-3" *ngIf="applicationDocumentData?.docRegistry!=null">
//                         <b>Doc-Registry File : </b><span class="padding"><button type="button" class="btn btn-success"
//                                 (click)="getDownloaddocRegistryFile()">Download</button>
//                         </span>
//                          <br>
//                          <br>
//                          <br>
//                     </div>

//                     <div class="col-md-3" *ngIf="applicationDocumentData?.docReraPermission!=null">
//                         <b>Doc ReraPermission File : </b><span class="padding"><button type="button"
//                                 class="btn btn-success" (click)="getDownloaddocReraPermissionFile()">Download</button>
//                         </span>
//                          <br>
//                          <br>
//                          <br>
//                     </div>

//                     <div class="col-md-3" *ngIf="applicationDocumentData?.docT$cpPermission!=null">
//                         <b>Doc-Registry File : </b><span class="padding"><button type="button" class="btn btn-success"
//                                 (click)="getDownloaddocT$cpPermissionFile()">Download</button>
//                         </span>
//                          <br>
//                          <br>
//                          <br>
//                     </div>

//                     <div class="col-md-3" *ngIf="applicationDocumentData?.docKhasraKhatoni!=null">
//                         <b>Doc-Registry File : </b><span class="padding"><button type="button" class="btn btn-success"
//                                 (click)="getDownloaddocKhasraKhatoniFile()">Download</button>
//                         </span>
//                          <br>
//                          <br>
//                          <br>
//                     </div> -->

//                 </td>
//             </tr>
//         </tbody>
//     </table>










//     <!--for colony legal  -->
//     <h5 *ngIf="ExtraaButtonValidationCheck==true" style="color: crimson;">Complete This process first</h5>
//     <div *ngIf="consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId == 3">
//         <div style="border: 1px black;">
//             <form [formGroup]="LoadConfirmationForm">
//                 <div style="display: flex; padding: 2em;">
//                     <div>
//                         <mat-form-field>
//                             <mat-label>उपमहाप्रबंधक द्वारा सत्यापित<br> किया जाने वाला भार</mat-label>
//                             <br>
//                             <input matInput type="number" formControlName="jeLoad">
//                         </mat-form-field>
//                     </div> <br>

//                     <div>
//                         <mat-form-field>
//                             <mat-label>Select Load Unit<br>(लोड इकाई )</mat-label><br>
//                             <mat-select formControlName="jeLoadUnit">
//                                 <mat-option value="KVA">KVA</mat-option>
//                                 <!-- <mat-option value="KW">KW</mat-option> -->
//                             </mat-select>
//                         </mat-form-field>
//                     </div>
//                 </div>

//                 <div>
//                     <div style="display: flex; justify-content: flex-start;">
//                         <div>
//                             <label>सत्यापित करे कि कॉलोनी का कुल भार 1500 केवीए या उससे कम है | कॉलोनी का कुल भार 1500
//                                 केवीए से अधिक होने पर सप्लाई अफ़्फोर्डिंग चार्जेज लागु नहीं होंगे | </label>
//                         </div>
//                         <div class="mx-2">
//                             <mat-radio-group formControlName="loadConfirmation">
//                                 <mat-radio-button class="mx-2" value="YES">YES</mat-radio-button>
//                                 <mat-radio-button value="NO">NO</mat-radio-button>
//                             </mat-radio-group>

//                         </div>

//                         <div>
//                             <button type="button" class="btn btn-primary"
//                                 [disabled]="loadConfirmationBoolean==true?true:false"
//                                 (click)="OnLoadSubmit()">Submit</button>
//                         </div>
//                     </div>
//                 </div>

//             </form>
//             <br>
//         </div>
//     </div>




//     <!-- //////////////////////////////// for line-shiftng (govt)  and line-shifting(non-govt)  *******start******  /////////////////////////// -->


//     <h5 *ngIf="ReturnAmtBooleanOpen==true" style="color: crimson;">Complete This process first</h5>
//     <div
//         *ngIf="consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId==1 || consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId==2 || consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId==6 || consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId==7">
//         <div style="border: 1px black;padding: 1vh;  width: 80%; display: flex; justify-content: space-between; ">
//             <div></div>
//             <div>
//                 <form [formGroup]="LineShiftingReturnAmountForm">
//                     <div class="row">
//                         <div class="form-group col-md-9">
//                             <label class="form-label">अगर प्राकलन में वापसी योग्य राशि है तो कृपया राशि दर्ज करे</label>
//                             <input type="number" style="width: 100%;" class="form-control" inputmode="numeric" min="0"
//                                 id="returnAmount" (keydown)="checkValue($event)" formControlName="returnAmt">
//                             <div
//                                 *ngIf="LineShiftingReturnAmountForm.get('returnAmt').hasError('pattern') && LineShiftingReturnAmountForm.get('returnAmt').touched">
//                                 Please enter a positive integer.
//                             </div>
//                         </div>
//                         <div class="col-md-3">
//                             <button type="button" class="btn btn-primary" style="margin-top: 2.5em;"
//                                 [disabled]="LineShiftingReturnAmountFormBoolean==true?true:false"
//                                 (click)="onSubmitLineShiftingReturnAmountForm()">Submit</button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//             <div></div>
//         </div>
//     </div>

//     <!-- //////////////////////////////// for line-shiftng (govt)  and line-shifting(non-govt)    *******end*******     /////////////////////////// -->



//     <!-- //////////////////////////////////////////////////////////for nsc or Load enhancement or oyt ///////////////////////////////////////////////////////******************* -->

//     <div *ngIf="ShowingErrorValForOtherButtonsCheckForNsc==true" style="color: crimson; font-size: bold;">Complete This
//         process first</div>
//     <div
//         *ngIf="consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId==2 || consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId==7 || consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId==5">
      
//         <div style="border: 1px black;  width: 80%;">
//             <form [formGroup]="nscLoadEnhancementOytForm">

//                 <div class="row">

//                     <div class="col-md-3"></div>


//                     <div class="col-md-3">
//                         <mat-form-field>
//                             <mat-label>उपमहाप्रबंधक द्वारा सत्यापित<span><br></span> किया जाने वाला भार</mat-label>
//                             <br>
//                             <input matInput type="number" formControlName="loadConfirmationForNsc">
//                         </mat-form-field>
//                     </div>


//                     <div class="col-md-3">
//                         <mat-form-field>
//                             <mat-label>Select Load Unit</mat-label>
//                             <br>
//                             <mat-select formControlName="jeLoadUnitNew">
//                                 <mat-option
//                                     *ngIf="consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId==2 || consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId==7"
//                                     value="KVA">KVA</mat-option>
//                                 <mat-option
//                                     *ngIf="consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId==2 || consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId==7"
//                                     value="KW">KW</mat-option>
//                                 <mat-option *ngIf=" consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId==5"
//                                     value="HP">HP</mat-option>

//                             </mat-select>
//                         </mat-form-field>
//                     </div>


//                     <div class="col-sm-3">
//                         <div>
//                             <button type="button" class="btn btn-primary" style="margin-top: 1em;"
//                                 [disabled]="NscSubmitBoolean==true?true:false"
//                                 (click)="OnLoadForNscSubmit()">Submit</button>
//                         </div>
//                     </div>

//                 </div>


//             </form>
//             <br>
//         </div>

//         <br>

//         <div class="col-md-12" *ngIf="consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId==5">

//             <form [formGroup]="selectForm" (ngSubmit)="generateBlocks()">
//                 <div class="row">
//                     <div class="col-sm-4">
//                         <mat-form-field class="half-width padding">

//                             <mat-label>आवेदन का प्रकार का चयन करें <span class="required">*</span></mat-label>
//                             <mat-select formControlName="individualOrGroupId"
//                                 (selectionChange)=" displayInputField($event)">
//                                 <mat-option>--आवेदन का प्रकार--</mat-option>
//                                 <mat-option *ngFor="let data of displayInputFieldArray"
//                                     [value]="data.id">{{data.name}}</mat-option>

//                             </mat-select>
//                         </mat-form-field>
//                     </div>

//                     <div class="col-sm-4 me-3" *ngIf="displayinputfield && !ChooseGroupSubmit ">
//                         <mat-form-field class="example-full-width">
//                             <mat-label>मुख्य आवेदक के अतरिक्त आवेदकों की संख्या (अधिकतम १०)</mat-label>
//                             <input matInput placeholder="Enter number" formControlName="numberofgroup">
//                         </mat-form-field>
//                     </div>
//                     <div class="col-sm-4" *ngIf="displayinputfield && !ChooseGroupSubmit">
//                         <button type="submit" class="btn btn-info">Generate</button>
//                     </div>
//                 </div>
//             </form>

//             <div *ngIf="displayInput && !ChooseGroupSubmit">
//                <div class="form-group">
//                     <form [formGroup]="empForm">
//                         <div formArrayName="employees">
//                             <div *ngFor="let employee of employees().controls; let samIndex=index">
//                                 <table class="table w-100 pens_additem" [formGroupName]="samIndex">
//                                     <tr>
//                                         <td class="w-5">
//                                             {{samIndex+1}}.
//                                         </td>
//                                         <td class="w-30">
//                                             <div class="form-group">
//                                                 <label class="lable-text">
//                                                     समग्र :
//                                                 </label>
//                                                 <div class="input-group customes-ingroups">
//                                                     <input type="text" formControlName="samagraId"
//                                                         class="form-control" />
                                                   
//                                                     <span class="input-group-addon">
//                                                         <button type="submit" class="btn btn-success"
//                                                             (click)="getSamagraDetails($event,samIndex)">Go</button>
                                                       
//                                                     </span>
//                                                 </div>
//                                                 <div *ngIf="employee['controls'].samagra?.errors?.required"
//                                                     style="color: red;font-size: medium;">
//                                                     Samagra is Required
//                                                 </div>
//                                             </div>
//                                         </td>
//                                         <td class="w-30">
//                                             <div class="form-group">
//                                                 <label class="lable-text">
//                                                     आवेदक का नाम :
//                                                 </label>
//                                                 <input type="text" formControlName="consumerName" class="form-control"
//                                                     [readonly]="true" />
//                                             </div>
//                                             <div *ngIf="employee['controls'].consumerName?.errors?.required"
//                                                 style="color: red;font-size: medium;">
//                                                 Name is Required
//                                             </div>
//                                         </td>

//                                         <td class="w-30">
//                                             <div class="form-group">
//                                                 <label class="lable-text">
//                                                     पिता का नाम :
//                                                 </label>
//                                                 <input type="text" formControlName="guardianName"
//                                                     class="form-control" />
//                                             </div>
//                                             <div *ngIf="employee['controls'].guardianName?.errors?.required"
//                                                 style="color: red;font-size: medium;">
//                                                 FatherName is Required
//                                             </div>
//                                         </td>
//                                         <td class="w-30">
//                                             <div class="form-group">
//                                                 <label class="lable-text">
//                                                     खसरा :
//                                                 </label>
//                                                 <input type="text" formControlName="khasraNo" class="form-control" />
//                                             </div>
//                                             <div *ngIf="employee['controls'].khasraNo?.errors?.required"
//                                                 style="color: red;font-size: medium;">
//                                                 khasra is Required
//                                             </div>
//                                         </td>

//                                         <td class="w-30">
//                                             <div class="form-group">
//                                                 <label class="lable-text">
//                                                     लोड(भार):
//                                                 </label>
//                                                 <input type="text" formControlName="loadRequested"
//                                                     class="form-control" />
//                                             </div>
//                                             <div *ngIf="employee['controls'].loadRequested?.errors?.required"
//                                                 style="color: red;font-size: medium;">
//                                                 load is Required
//                                             </div>
//                                         </td>
                                       
//                                     </tr>
//                                 </table>
//                             </div>
//                         </div>

//                         <div class="col-md-4">
//                             <div class="form-group">
//                                 <label>सह आवेदकों से संबंधित हस्ताक्षरीकृत घोषणा और खसरा खतौनी दस्तावेज <span
//                                         class="required" style="color: red;">*</span></label>
//                                 <input class="form-control change-bg-color" type="file"
//                                     (change)="GroupPeopleCommonFile($event)">
                              
//                             </div>
//                         </div>

//                         <div class="form-group" *ngIf="displayInput">
//                             <button type="button" class="btn btn-primary" (click)="submitgroup()">submit
//                                 Group</button>
//                         </div>
//                     </form>
//                 </div>

//             </div>



          



//         </div>
//     </div>



//     <!-- /////////////////////////////////////////////////////////////////////////////////////////////////////////////////******************* -->


//     <!-- /////////////////////////////////////////////////////////////////////////////////survey for mkmy start////////////////////////////////////////////////////////////////////////////////////////////////////// -->

//     <div style="color: crimson; font-size: bold;" *ngIf="displayinputfieldForMkmy">सर्वप्रथम प्रक्रिया का निष्पादन करे
//     </div>
//     <div *ngIf="consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId==8">



//         <br>

//         <div class="col-md-12" *ngIf="consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId==8 ">

//             <form [formGroup]="selectFormForMkmy" (ngSubmit)="generateBlocksForMkmyFormArray()">
//                 <div class="row">

//                     <div class="col-md-4">
//                         <label class="form-label" style="font-size: 1.1em; font-weight: 700;">आवेदन का प्रकार का चयन
//                             करें <span class="text-danger">*</span> </label>
//                         <select class="form-control" formControlName="individualOrGroupId" placeholder="--आवेदन का प्रकार का चयन
//                         करें--" (change)=" displayInputFieldForMkmy($event)">
//                             <option *ngFor="let data of displayInputFieldArray" [value]="data.id">{{data.name}}</option>
//                         </select>
//                         <span class="text-danger"
//                             *ngIf="(selectFormForMkmy['controls'].individualOrGroupId.touched || submittedGenerateBlock) && selectFormForMkmy['controls'].individualOrGroupId.errors?.required">
//                             कृपया आवेदन का प्रकार का चयन करें
//                         </span>
//                     </div>

//                     <br>

//                     <div class="col-md-4" *ngIf="displayInputMkmy && !closeWrittenDiv">
//                         <label style="font-size: 1.1em; font-weight: 700;" class="form-label">मुख्य आवेदक के अतरिक्त
//                             आवेदकों की
//                             संख्या (अधिकतम १०)</label>
//                         <input type="number" class="form-control" formControlName="numberofgroup"
//                             placeholder="Enter number">

//                         <span class="text-danger"
//                             *ngIf="(selectFormForMkmy['controls'].numberofgroup.touched || submittedGenerateBlock) && selectFormForMkmy['controls'].numberofgroup.errors?.required">
//                             कृपया आवेदकों की संख्या दर्ज करे
//                         </span>
//                     </div>



//                     <div class="col-sm-4" *ngIf="displayInputMkmy && !closeWrittenDiv">
//                         <button type="submit" style="margin-top: 1.8em;" class="btn btn-info ">Generate</button>

//                     </div>


//                 </div>

//                 <br>
//                 <br>

//                 <div *ngIf="(individualOrGroupIdVariable==1 || individualOrGroupIdVariable==2) ">

//                     <form [formGroup]="MkmyUpdateForm">

//                         <div class="row">

//                             <div class="form-group col-md-4">
//                                 <label class="form-label">Address</label>
//                                 <input type="text" class="form-control" formControlName="address">
//                                 <div *ngIf="submitted && MkmyUpdateForm['controls'].address?.errors?.required"
//                                     style="color: red;font-size: medium;">
//                                     address is Required </div>
//                             </div>

//                             <div class="form-group col-md-4">
//                                 <label class="form-label">Guardian Name</label>
//                                 <input type="text" class="form-control" formControlName="guardianName">
//                                 <div *ngIf="submitted && MkmyUpdateForm['controls'].guardianName?.errors?.required"
//                                     style="color: red;font-size: medium;">
//                                     guardianName is Required </div>
//                             </div>

//                             <div class="form-group col-md-4">
//                                 <label class="form-label">Aadhar Number</label>
//                                 <input type="number" id="aadharNumber" class="form-control" maxlength="12"
//                                     formControlName="aadharNo">
//                                 <div *ngIf="submitted && MkmyUpdateForm['controls'].aadharNo?.errors?.required"
//                                     style="color: red;font-size: medium;">
//                                     aadharNo is Required </div>
//                             </div>

//                             <div class="form-group col-md-4">
//                                 <label class="form-label">Pincode</label>
//                                 <input type="number" class="form-control" formControlName="pinCode">
//                                 <div *ngIf="submitted && MkmyUpdateForm['controls'].pinCode?.errors?.required"
//                                     style="color: red;font-size: medium;">
//                                     pinCode is Required </div>
//                             </div>

//                             <div class="form-group col-md-4">
//                                 <label class="form-label">Khasra</label>
//                                 <input type="text" class="form-control" formControlName="khasra">
//                                 <div *ngIf="submitted && MkmyUpdateForm['controls'].khasra?.errors?.required"
//                                     style="color: red;font-size: medium;">
//                                     khasra is Required </div>
//                             </div>

//                             <div class="form-group col-md-4">
//                                 <label class="form-label">Area</label>
//                                 <input type="text" class="form-control" formControlName="area">
//                                 <div *ngIf="submitted && MkmyUpdateForm['controls'].area?.errors?.required"
//                                     style="color: red;font-size: medium;">
//                                     area is Required </div>
//                             </div>

//                             <div class="form-group col-md-4"
//                                 *ngIf="mkmyApplicationDetails.districtId==null || mkmyApplicationDetails.dcId==null">
//                                 <mat-form-field class="half-width padding">
//                                     <mat-label>जिला<span class="required">*</span></mat-label>
//                                     <mat-select formControlName="districtId"
//                                         (selectionChange)="onChangeSelectedDistrictType($event)">
//                                         <mat-option value="">--जिला चुने--</mat-option>
//                                         <mat-option *ngFor="let district of districtResponseArray"
//                                             [value]="district.districtId">
//                                             {{district.districtName}}</mat-option>
//                                     </mat-select>
//                                     <div *ngIf="submitted && MkmyUpdateForm['controls'].districtId?.errors?.required"
//                                         style="color: red;font-size: medium;">
//                                         districtId is Required </div>
//                                 </mat-form-field>
//                             </div>

//                             <div class="form-group col-md-4"
//                                 *ngIf="mkmyApplicationDetails.dcId==null || mkmyApplicationDetails.districtId==null">
//                                 <mat-form-field class="half-width padding">
//                                     <mat-label>वितरण केन्द्र <span class="required">*</span></mat-label>
//                                     <mat-select formControlName="dcId" (selectionChange)="onChangeDc($event)">
//                                         <mat-option value="">--वितरण केन्द्र चुने--</mat-option>
//                                         <mat-option *ngFor="let dList of dcResponseArray" [value]="dList.dcId">
//                                             {{dList.dcName}}</mat-option>
//                                     </mat-select>
//                                     <div *ngIf="submitted && MkmyUpdateForm['controls'].dcId?.errors?.required"
//                                         style="color: red;font-size: medium;">
//                                         dcId is Required </div>
//                                 </mat-form-field>
//                             </div>

//                             <div class="form-group col-md-4">
//                                 <label class="form-label">Load</label>
//                                 <input type="number" class="form-control" formControlName="loadRequested">
//                                 <div *ngIf="submitted && MkmyUpdateForm['controls'].loadRequested?.errors?.required"
//                                     style="color: red;font-size: medium;">
//                                     loadRequested is Required </div>
//                             </div>

//                             <div class="form-group col-md-4">
//                                 <label class="form-label">Load Unit</label>
//                                 <input type="text" class="form-control" formControlName="loadRequestedId"
//                                     [readonly]="true">
//                                 <div *ngIf="submitted && MkmyUpdateForm['controls'].loadRequestedId?.errors?.required"
//                                     style="color: red;font-size: medium;">
//                                     loadRequestedId is Required </div>
//                             </div>

//                             <div class="form-group col-md-4" *ngIf="!castValue">
//                                 <label class="form-label">Caste Category</label>
//                                 <input type="text" class="form-control" formControlName="castCategory"
//                                     [readonly]="true">
//                                 <div *ngIf="submitted && MkmyUpdateForm['controls'].castCategory?.errors?.required"
//                                     style="color: red;font-size: medium;">
//                                     castCategory is Required </div>
//                             </div>

//                             <div class="col-md-4" *ngIf="castValue">
//                                 <mat-form-field class="half-width padding">
//                                     <mat-label>उपभोक्ता श्रेणी चुने<span class="required">*</span></mat-label>
//                                     <mat-select formControlName="casteCategory">
//                                         <mat-option value="">उपभोक्ता श्रेणी चुने</mat-option>
//                                         <mat-option *ngFor="let cast of casttList" [value]="cast.name">
//                                             {{cast.name}}</mat-option>
//                                     </mat-select>

//                                 </mat-form-field>
//                             </div>


//                             <div class="form-group col-md-4">
//                                 <label class="form-label">Samagra Number</label>
//                                 <input type="text" class="form-control" formControlName="samagraId">
//                                 <div *ngIf="submitted && MkmyUpdateForm['controls'].samagraId?.errors?.required"
//                                     style="color: red;font-size: medium;">
//                                     samagraId is Required </div>
//                             </div>




//                             <div class="form-group col-md-4">
//                                 <label class="form-label">Nature of work</label>
//                                 <input type="text" class="form-control" formControlName="natureOfWork"
//                                     [readonly]="true">
//                                 <div *ngIf="submitted && MkmyUpdateForm['controls'].natureOfWork?.errors?.required"
//                                     style="color: red;font-size: medium;">
//                                     natureOfWork is Required </div>
//                             </div>

//                             <div class="form-group col-md-4">
//                                 <label class="form-label">Consumer Name</label>
//                                 <input type="text" class="form-control" formControlName="consumerName"
//                                     [readonly]="true">
//                                 <div *ngIf="submitted && MkmyUpdateForm['controls'].consumerName?.errors?.required"
//                                     style="color: red;font-size: medium;">
//                                     consumerName is Required </div>
//                             </div>

//                             <div class="form-group col-md-4">
//                                 <label class="form-label">Short Description</label>
//                                 <input type="text" class="form-control" formControlName="shortDescription">
//                                 <div *ngIf="submitted && MkmyUpdateForm['controls'].shortDescription?.errors?.required"
//                                     style="color: red;font-size: medium;">
//                                     Short Description is Required </div>
//                             </div>

//                             <div class="form-group col-md-4">
//                                 <label class="form-label">Mobile Number</label>
//                                 <input type="text" class="form-control" formControlName="phoneNumber">
//                                 <div *ngIf="submitted && MkmyUpdateForm['controls'].phoneNumber?.errors?.required"
//                                     style="color: red;font-size: medium;">
//                                     phoneNumber is Required </div>
//                             </div>
//                             <br>

//                             <form [formGroup]="mkmyIndivForm" *ngIf=" individualOrGroupIdVariable==1">
//                                 <h3 style="color: red;">*** Note *** : वर्तमान में 11 KV लाइन में 200 मीटर की बाध्यता
//                                     है। आपसे
//                                     अनुरोध है कि कृप्या 11 KV लाइन में 200 मीटर या उससे कम मात्रा ही दर्ज करें।</h3>

//                                 <div class="row">

//                                     <div class="col-md-4">
//                                         <label class="form-label">11Kv लाइन की दूरी</label>
//                                         <input class="form-control" formControlName="KvDistance">
//                                         <div *ngIf="mkmyIndivForm['controls'].KvDistance?.errors?.required"
//                                             style="color: red;font-size: medium;">
//                                             11KvDistance is Required
//                                         </div>
//                                         <div style="color: black;font-size: medium;">Distance must
//                                             be less than or equal to 200m</div>
//                                     </div>



//                                     <div class="col-md-4">
//                                         <mat-form-field>
//                                             <mat-label>Cutpoint लिया गया <span class="required">*</span></mat-label>
//                                             <mat-select formControlName="cutpoint">
//                                                 <mat-option value="YES">YES</mat-option>
//                                                 <mat-option value="NO">NO</mat-option>
//                                             </mat-select>
//                                             <div *ngIf="mkmyIndivForm['controls'].cutpoint?.errors?.required"
//                                                 style="color: red;font-size: medium;">
//                                                 Cutpoint is Required
//                                             </div>
//                                         </mat-form-field>
//                                     </div>

//                                     <div class="col-md-4">
//                                         <mat-form-field>
//                                             <mat-label>DTR क्षमता <span class="required">*</span></mat-label>
//                                             <mat-select formControlName="dtr">
//                                                 <mat-option value="63">63</mat-option>
//                                                 <mat-option value="25">25</mat-option>
//                                             </mat-select>
//                                             <div *ngIf="mkmyIndivForm['controls'].dtr?.errors?.required"
//                                                 style="color: red;font-size: medium;">
//                                                 DTR is Required
//                                             </div>
//                                         </mat-form-field>
//                                     </div>


//                                 </div>
//                             </form>
//                             <br>
//                             <br>
//                             <div class="mt-5">
//                                 <button type="button" class="btn btn-primary"
//                                     [disabled]="checkUpdateBoolean==true?true:false"
//                                     (click)="parentDetailsSubmit()">Submit</button>
//                             </div>

//                         </div>

//                     </form>

//                 </div>
//             </form>

//             <br>
//             <br>

//             <div *ngIf="displayinputfieldForMkmy && !closeWrittenDiv">


//                 <div class="form-group">
//                     <form [formGroup]="empFormForMkmy">

//                         <h3 style="color: red;">*** Note *** : वर्तमान में 11 KV लाइन में 200 मीटर की बाध्यता है। आपसे
//                             अनुरोध है कि कृप्या 11 KV लाइन में 200 मीटर या उससे कम मात्रा ही दर्ज करें।</h3>

//                         <div class="row">

//                             <div class="col-md-4">
//                                 <label class="form-label">11Kv लाइन की दूरी</label>
//                                 <input class="form-control" formControlName="KvDistance">
//                                 <div *ngIf="empFormForMkmy['controls'].KvDistance?.errors?.required"
//                                     style="color: red;font-size: medium;">
//                                     11KvDistance is Required
//                                 </div>
//                                 <div *ngIf="distanceBoolean==true" style="color: red;font-size: medium;">Distance must
//                                     be less than or equal to 200m</div>
//                             </div>



//                             <div class="col-md-4">
//                                 <mat-form-field>
//                                     <mat-label>Cutpoint लिया गया <span class="required">*</span></mat-label>
//                                     <mat-select formControlName="cutpoint">
//                                         <mat-option value="YES">YES</mat-option>
//                                         <mat-option value="NO">NO</mat-option>
//                                     </mat-select>
//                                     <div *ngIf="empFormForMkmy['controls'].cutpoint?.errors?.required"
//                                         style="color: red;font-size: medium;">
//                                         Cutpoint is Required
//                                     </div>
//                                 </mat-form-field>
//                             </div>

//                             <div class="col-md-4">
//                                 <mat-form-field>
//                                     <mat-label>DTR क्षमता <span class="required">*</span></mat-label>
//                                     <mat-select formControlName="dtr">
//                                         <mat-option value="63">63</mat-option>
//                                         <mat-option value="25">25</mat-option>
//                                     </mat-select>
//                                     <div *ngIf="empFormForMkmy['controls'].dtr?.errors?.required"
//                                         style="color: red;font-size: medium;">
//                                         DTR is Required
//                                     </div>
//                                 </mat-form-field>
//                             </div>


//                         </div>
//                         <div formArrayName="employeesForMkmy">
//                             <div *ngFor="let employee of employeesForMkmy().controls; let samIndex=index">
//                                 <table class="table w-100 pens_additem" [formGroupName]="samIndex">
//                                     <tr>
//                                         <td class="w-5">
//                                             {{samIndex+1}}.
//                                         </td>
//                                         <td class="w-30">
//                                             <div class="form-group">
//                                                 <label class="lable-text">
//                                                     आवेदन क्रमांक :
//                                                 </label>
//                                                 <div class="input-group customes-ingroups">
//                                                     <input type="text" formControlName="childApplicationNumber"
//                                                         class="form-control" />
//                                                     <span class="input-group-addon">
//                                                         <button type="submit" class="btn btn-success"
//                                                             (click)="getApplicationDetailsByApplicationIdForMkmy($event,samIndex)">Go</button>
//                                                     </span>
//                                                 </div>
//                                                 <div *ngIf="employee['controls'].childApplicationNumber?.errors?.required && FormArrayBooleanVariableOfMkmy"
//                                                     style="color: red;font-size: medium;">
//                                                     Application Number is Required
//                                                 </div>
//                                             </div>
//                                         </td>


//                                         <td class="w-30">
//                                             <div class="form-group">
//                                                 <label class="lable-text">
//                                                     आवेदक का नाम :
//                                                 </label>
//                                                 <input type="text" formControlName="consumerName" class="form-control"
//                                                     [readonly]="true" />
//                                             </div>
//                                             <div *ngIf="employee['controls'].consumerName?.errors?.required && FormArrayBooleanVariableOfMkmy"
//                                                 style="color: red;font-size: medium;">
//                                                 Name is Required
//                                             </div>
//                                         </td>

//                                         <td class="w-30">
//                                             <div class="form-group">
//                                                 <label class="lable-text">
//                                                     पिता का नाम :
//                                                 </label>
//                                                 <input type="text" formControlName="guardianName" class="form-control"
//                                                     [readonly]="true" />
//                                             </div>
//                                             <div *ngIf="employee['controls'].guardianName?.errors?.required && FormArrayBooleanVariableOfMkmy"
//                                                 style="color: red;font-size: medium;">
//                                                 FatherName is Required
//                                             </div>
//                                         </td>
//                                         <td class="w-30">
//                                             <div class="form-group">
//                                                 <label class="lable-text">
//                                                     लोड(भार):
//                                                 </label>
//                                                 <input type="text" formControlName="load" class="form-control" />
//                                             </div>
//                                             <div *ngIf="employee['controls'].load?.errors?.required && FormArrayBooleanVariableOfMkmy"
//                                                 style="color: red;font-size: medium;">
//                                                 load is Required
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 </table>
//                             </div>
//                         </div>
//                         <div class="form-group" *ngIf="displayInputMkmy">
//                             <button type="button" class="btn btn-primary" (click)="submitgroupforMkmy()">आवेदन दर्ज करे
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>

//         <div style="border: 1px black;  width: 80%;"
//             *ngIf="(closeWrittenDiv==true && mkmySubmitBoolean==false) || individualOrGroupIdVariable==1">
//             <form [formGroup]="mkmySurveyForm">

//                 <div class="row">

//                     <div class="col-md-3">

//                     </div>


//                     <div class="col-md-3">
//                         <div>
//                             <label class="form-label">उपमहाप्रबंधक द्वारा सत्यापित <br>किया जाने वाला भार</label>
//                             <br>
//                             <input class="form-control" type="number" formControlName="loadConfirmationForMkmy"
//                                 [readonly]="true">
//                         </div>
//                     </div>


//                     <div class="col-md-3">
//                         <label>Select Load Unit</label>
//                         <input type="text" formControlName="jeLoadUnitNew" class="form-control" [readonly]="true" />
//                     </div>


//                     <div class="col-md-3">
//                         <button type="button" class="btn btn-primary" [disabled]="mkmySubmitBoolean==true?true:false"
//                             style="margin-top: 2.5em;" (click)="OnLoadForMkmySubmit()">Submit</button>
//                     </div>



//                 </div>

//                 <!-- <div style="display: flex; padding: 2em;">
//                     <div style="display: flex; justify-content: flex-start;">
//                         <div class="mx-2 ">
//                             <div style="display: flex; padding: 2em;">
//                                 <div>
//                                     <label class="form-label">उपमहाप्रबंधक द्वारा सत्यापित किया जाने वाला भार</label>
//                                     <input class="form-control" type="number" formControlName="loadConfirmationForMkmy"
//                                         [readonly]="true">
//                                 </div> <br>
//                                 <div>
//                                     <label>Select Load Unit</label>
//                                     <input type="text" formControlName="jeLoadUnitNew" class="form-control"
//                                         [readonly]="true" />
//                                 </div>
//                             </div>
//                         </div>
//                         <div>
//                             <button type="button" class="btn btn-primary"
//                                 [disabled]="mkmySubmitBoolean==true?true:false" style="margin-top: 2.5em;"
//                                 (click)="OnLoadForMkmySubmit()">Submit</button>
//                         </div>
//                     </div>
//                 </div> -->

//             </form>
//             <br>
//         </div>
//     </div>

//     <!-- /////////////////////////////////////////////////////////////////////////////////survey for mkmy end////////////////////////////////////////////////////////////////////////////////////////////////////// -->



//     <!-- for colony illegal -->
//     <h5 *ngIf="ShowingErrorValForOtherButtonsCheck==true" style="color: crimson;">Complete This process first</h5>
//     <div *ngIf="consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId==4">
//         <!--*ngIf="consumerApplicationDetail.natureOfWorkType.natureOfWorkTypeId == 4" -->
//         <div style="border: 1px black;  width: 80%;">
//             <form [formGroup]="LoadConfirmationForColonyIllegalForm">

//                 <div style="display: flex; padding: 2em;">
//                     <div style="display: flex; justify-content: flex-start;">
//                         <div style="margin-top: 3em;">
//                             <label>सत्यापित करे कि कॉलोनी का कुल भार 400 KW या उससे कम है |कॉलोनी का कुल भार दर्ज
//                                 करे।</label>
//                         </div>

//                         <div style=" text-align: center; align-items: center;margin-top:4%">
//                             <mat-radio-group formControlName="loadConfirmation">
//                                 <mat-radio-button class="mx-2" value="YES">YES</mat-radio-button>
//                                 <mat-radio-button value="NO">NO</mat-radio-button>
//                             </mat-radio-group>

//                         </div>

//                         <div class="mx-2 ">
//                             <!-- <div class="form-group col-md-3">
//                              <label class="form-control" class="required">Load</label>
//                              <input class="form-control" type="number" formControlName="loadConfirmationForColonyIllegal">
//                             </div> -->

//                             <div style="display: flex; padding: 2em;">
//                                 <div>
//                                     <mat-form-field>
//                                         <mat-label>उपमहाप्रबंधक द्वारा सत्यापित किया जाने वाला भार</mat-label>
//                                         <input matInput type="number"
//                                             formControlName="loadConfirmationForColonyIllegal">
//                                     </mat-form-field>
//                                 </div> <br>
//                                 <div>
//                                     <mat-form-field>
//                                         <mat-label>Select Load Unit</mat-label>
//                                         <mat-select formControlName="jeLoadUnitNew">
//                                             <!-- <mat-option value="KVA">KVA</mat-option> -->
//                                             <mat-option value="KW">KW</mat-option>
//                                         </mat-select>
//                                     </mat-form-field>
//                                 </div>
//                             </div>
//                         </div>
//                         <div>
//                             <button type="button" class="btn btn-primary" style="margin-top: 2.5em;"
//                                 (click)="OnLoadForColonyIllegalSubmit()">Submit</button>
//                         </div>
//                     </div>
//                 </div>

//             </form>
//             <br>
//         </div>
//     </div>



//     <!-- //////////////////////////////mkmy** start ********************//////////////////////// -->
//     <div *ngIf="consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId==8">
//         <div>
//             <form [formGroup]="applicationServeyErpFgOfMkmy">
//                 <div class="form-group">
//                     <!-- <label><strong>&nbsp;
//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**** डीसी इंचार्ज सर्वे करने और एस्टीमेट जनरेट
//                             करने के
//                             लिए निम्न प्रक्रिया का पालन करें। ****</strong></label>
//                     <label>1. DC Incharge को जबलपुर डिस्कॉम द्वारा बनाए गए GIS Desktop Application (&nbsp; <span style="display: inline-block;
//                         border-bottom: 1px solid blue;
//                         color: blue;cursor: pointer;"> http://mpezgis.in/mpdiscom/login.php </span>&nbsp; )पर अपने
//                         कर्मचारी क्रमांक से लॉगिन करके सर्वेयर का चयन करना होगा और उसका मोबाइल नंबर पंजियन करना होगा |
//                         <br> 2. DC Incharge को समबन्धित कार्य का नाम दर्ज़ करके वृत्त ,संभाग और वितरण केंद्र का चयन करना
//                         होगा
//                         ,कार्य का सन्दर्भ दर्ज करने के उपरांत सर्वेयर को समबन्धित कार्य से जोड़ना होगा जिससे की सर्वेयर
//                         द्वारा समबन्धित कार्य का GIS Mobile Applicatio द्वारा Pole by Pole सर्वे पूर्ण किया जा सके |
//                         <br> 3. सर्वे पूर्ण करने के पश्चात सर्वेयर सर्वे को App के माध्यम से Complete घोषित करेगा। जिसके
//                         फलस्वरूप वितरण केन्द्र प्रभारी को सर्वे Accept/Reject करने का विकल्प उपलब्ध होगा ।
//                         <br> 4. इसके पश्चात GIS system में एस्टीमेट जनरेशन किया जावेगा और Unique SB Project ID प्राप्त
//                         होगी
//                         | एस्टीमेट सर्वे के अनुरूप पाने पर DC Incharge को GIS Estimate को "Push to ERP " करना होगा |
//                         <br> 5.ERP में एस्टीमेट जनरेशन GIS सिस्टम की Unique SB Project ID से linked होगा और Approval ERP
//                         के
//                         DOP approval के अनुरूप होगा |
//                         <br> 6. नीचे दिए गए स्थान पर ERP नम्बर डाले |</label> -->
//                     <div>

//                     </div>

//                     <div class="col-md-9 erp-style">
//                         डिमांड नोट जारी करने के लिए ERP एस्टीमेट नंबर दर्ज करे
//                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

//                         <mat-form-field class="half-width padding">
//                             <mat-label>ERP Number............</mat-label>
//                             <input matInput placeholder="ERP Number" formControlName="erpNo">
//                             <mat-error></mat-error>
//                         </mat-form-field>
//                     </div>
//                     <div align="center">
//                         <button type="button" mat-raised-button color="primary" (click)="erpEstimatGenrateOfMkmy()">
//                             खोजें............</button>
//                     </div>
//                 </div>

//             </form>

//             <table class="demandApproveTable table table-bordered">

//                 <thead>

//                     <tr>


//                         <th>आवेदन क्रमांक</th>
//                         <th>कुल प्राकलन राशि</th>
//                         <th>म.प्र द्वारा दी गई अनुदान राशि(40%)</th>
//                         <th>म.प्र विद्युत कंपनी द्वारा दी गई अनुदान राशि(10%)</th>
//                         <th>सिक्योरिटी डिपाजिट </th>
//                         <th>आवेदन शुल्क </th>
//                         <th>उपभोक्ता द्वारा वहन की गई राशि (50%)</th>
//                         <th>इ. आर. पी. नंबर </th>
//                         <th>स्कीम कोड </th>


//                     </tr>
//                 </thead>

//                 <tbody>
//                     <tr *ngFor="let item of erpEstimateDataForMkmyArray">


//                         <td>{{item?.consumerApplicationNumber}}</td>
//                         <td>{{item?.totalAmount}}</td>
//                         <td>{{item?.govMafBill}}</td>
//                         <td>{{item?.mpmkMafBill}}</td>
//                         <td>{{item?.securityDeposit}}</td>
//                         <td>{{item?.avedanShulk}}</td>
//                         <td>{{item?.carryAmountByApplicant}}</td>
//                         <td>{{item?.erpNumber}}</td>
//                         <td>{{item?.schemeCode}}</td>

//                     </tr>
//                 </tbody>



//             </table>

//         </div>

//         <div>

//             <form [formGroup]="mkmyValidatedFormForErpEstimate">


//                 <div class="form-group">

//                     <div class="col-sm-4 my-2">
//                         <input class="form-control" type="file" accept=" image/jpeg,application/pdf"
//                             formControlName="estimateFile" id="formFileMultiple" (change)="onFileChangedMkmy($event)" />

//                         <div>
//                             <p style="font-size: 12px; font-weight: 800; color: black;">UPLOAD ERP ESTIMATE</p>
//                         </div>

//                         <div>

//                             <p *ngIf=" mkmyFilesizeValidators" class="d-block"
//                                 style="color: red; font-size: 12px; float: left;font-weight: 800;text-align: -webkit-left;">
//                                 File must be less than 2 MB </p>

//                             <br *ngIf=" mkmyFietypeValidators">
//                             <p *ngIf=" mkmyFietypeValidators" class="d-block"
//                                 style="color: red; font-size: 12px; float: left;font-weight: 800;text-align: -webkit-left;">
//                                 upload only pdf files </p>
//                         </div>



//                     </div>

//                     <label><input type="checkbox" formControlName="cb" (change)="checkboxMkmyChane($event)"> मैं
//                         सत्यापित करता हूं कि मेरे निर्देशन में
//                         कार्यस्थल
//                         के सर्वेक्षण के दौरान किए गए सभी माप, गणना और विश्लेषण सही और सटीक रूप से किए गए है।मेरे ज्ञान
//                         और
//                         विशेषज्ञता के आधार पर प्राकलन सर्वे के अनुरूप और सटीक है एवं दर्ज ERP प्राकलन इसी आवेदन से
//                         संबंधित
//                         है। <span class="required">*</span></label>
//                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                     <button type="button" mat-raised-button color="primary"
//                         [disabled]="mkmyerpConfirmationVariable==false?true:false"
//                         (click)="mkmycheckBoxTureCompalsury()" [disabled]="mkmyValidatedBoolean==true?true:false">
//                         Validated</button>

//                 </div>

//             </form>
//         </div>

//     </div>
//     <!-- //////////////////////////////mkmy***** end ******************/////////////////////// -->
//     <div *ngIf="consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId!=8">

//         <div>
//             <form [formGroup]="applicationServeyErpFg">
//                 <div class="form-group">
//                     <!-- <label><strong>&nbsp;
//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**** डीसी इंचार्ज सर्वे करने और एस्टीमेट जनरेट
//                             करने के
//                             लिए निम्न प्रक्रिया का पालन करें। ****</strong></label>
//                     <label>1. DC Incharge को जबलपुर डिस्कॉम द्वारा बनाए गए GIS Desktop Application (&nbsp; <span style="display: inline-block;
//                         border-bottom: 1px solid blue;
//                         color: blue;cursor: pointer;"> http://mpezgis.in/mpdiscom/login.php </span>&nbsp; )पर अपने
//                         कर्मचारी क्रमांक से लॉगिन करके सर्वेयर का चयन करना होगा और उसका मोबाइल नंबर पंजियन करना होगा |
//                         <br> 2. DC Incharge को समबन्धित कार्य का नाम दर्ज़ करके वृत्त ,संभाग और वितरण केंद्र का चयन करना
//                         होगा
//                         ,कार्य का सन्दर्भ दर्ज करने के उपरांत सर्वेयर को समबन्धित कार्य से जोड़ना होगा जिससे की सर्वेयर
//                         द्वारा समबन्धित कार्य का GIS Mobile Applicatio द्वारा Pole by Pole सर्वे पूर्ण किया जा सके |
//                         <br> 3. सर्वे पूर्ण करने के पश्चात सर्वेयर सर्वे को App के माध्यम से Complete घोषित करेगा। जिसके
//                         फलस्वरूप वितरण केन्द्र प्रभारी को सर्वे Accept/Reject करने का विकल्प उपलब्ध होगा ।
//                         <br> 4. इसके पश्चात GIS system में एस्टीमेट जनरेशन किया जावेगा और Unique SB Project ID प्राप्त
//                         होगी
//                         | एस्टीमेट सर्वे के अनुरूप पाने पर DC Incharge को GIS Estimate को "Push to ERP " करना होगा |
//                         <br> 5.ERP में एस्टीमेट जनरेशन GIS सिस्टम की Unique SB Project ID से linked होगा और Approval ERP
//                         के
//                         DOP approval के अनुरूप होगा |
//                         <br> 6. नीचे दिए गए स्थान पर ERP नम्बर डाले |</label> -->

//                     <div>
//                     </div>
//                     <div class="col-md-9 erp-style">
//                         डिमांड नोट जारी करने के लिए ERP एस्टीमेट नंबर दर्ज करे
//                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

//                         <mat-form-field class="half-width padding">
//                             <mat-label>ERP Number</mat-label>
//                             <input matInput placeholder="ERP Number" formControlName="erpNo">
//                             <mat-error></mat-error>
//                         </mat-form-field>
//                     </div>
//                     <div align="center">
//                         <button type="button" mat-raised-button color="primary" (click)="erpEstimatGenrate()">
//                             खोजें</button>
//                     </div>
//                 </div>

//             </form>

//             <table class="demandApproveTable table table-bordered">
//                 <thead>
//                     <tr>

//                         <th>ERP No.</th>
//                         <th>Estimate sanction No.</th>
//                         <th>Estimate name</th>
//                         <th>Location</th>
//                         <th>scheme</th>
//                         <th>Supervision Amount</th>
//                         <th>Estimate Amount</th>
//                         <th>CGST@9%</th>
//                         <th>SGST@9%</th>
//                         <th>Estimate Status</th>
//                         <th>approved By</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     <tr *ngFor="let item of EstimateAmount">
//                         <td>{{item?.erpNo}}</td>
//                         <td>{{item?.estimateSanctionNo}}</td>
//                         <td>{{item?.estimateName}}</td>
//                         <td>{{item?.location}}</td>
//                         <td>{{item?.schema}}</td>
//                         <td>{{item?.supervisionAmount}}</td>
//                         <td>{{item?.estimateAmount}}</td>
//                         <td>{{item?.cgst}}</td>
//                         <td>{{item?.sgst}}</td>
//                         <td>{{item?.estimateStatus}}</td>
//                         <td>{{item?.approvedBy}}</td>
//                     </tr>


//                 </tbody>



//             </table>

//         </div>

//         <div>

//             <form [formGroup]="applicationServeyCheckBoxFg">


//                 <div class="form-group">

//                     <div class="col-sm-4 my-2">
//                         <input class="form-control" type="file" accept=" image/jpeg,application/pdf"
//                             formControlName="estimateFile" id="formFileMultiple" (change)="onFileChanged($event)" />

//                         <div>
//                             <p style="font-size: 12px; font-weight: 800; color: black;">UPLOAD ERP ESTIMATE</p>
//                         </div>

//                         <div>

//                             <p *ngIf=" filesizeValidators" class="d-block"
//                                 style="color: red; font-size: 12px; float: left;font-weight: 800;text-align: -webkit-left;">
//                                 File must be less than 2 MB </p>

//                             <br *ngIf=" fietypeValidators">
//                             <p *ngIf=" fietypeValidators" class="d-block"
//                                 style="color: red; font-size: 12px; float: left;font-weight: 800;text-align: -webkit-left;">
//                                 upload only pdf files </p>
//                         </div>



//                     </div>

//                     <label><input type="checkbox" formControlName="cb"> मैं सत्यापित करता हूं कि मेरे निर्देशन में
//                         कार्यस्थल
//                         के सर्वेक्षण के दौरान किए गए सभी माप, गणना और विश्लेषण सही और सटीक रूप से किए गए है।मेरे ज्ञान
//                         और
//                         विशेषज्ञता के आधार पर प्राकलन सर्वे के अनुरूप और सटीक है एवं दर्ज ERP प्राकलन इसी आवेदन से
//                         संबंधित
//                         है। <span class="required">*</span></label>
//                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                     <button type="button" mat-raised-button color="primary"
//                         [disabled]="erpConfirmationVariable==false?true:false" (click)="checkBoxTureCompalsury()">
//                         Validated</button>

//                 </div>

//             </form>
//         </div>



//         <div class="card-body">
//             <form [formGroup]="applicationServeyFg" (ngSubmit)="onSubmit()" autocomplete="off">
//                 <input type="hidden" formControlName="consumerApplicationId">
//                 <div class="survey-style">


//                     <div class="col-md-9 erp-style">
//                         प्राकलन की वर्तमान स्थिति (Work Flow) जानने के लिए ERP एस्टीमेट नंबर दर्ज करे |
//                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

//                         <mat-form-field class="half-width padding">
//                             <mat-label>ERP Number</mat-label>
//                             <input matInput placeholder="ERP Number" formControlName="erpEstimateNo">
//                         </mat-form-field>
//                     </div>
//                     <div align="center">
//                         <button type="submit" mat-raised-button color="primary">खोजें</button>
//                     </div>

//                 </div>

//             </form>

//             <table class="demandApproveTable table table-bordered">
//                 <thead>
//                     <tr>

//                         <th class="custom-srno">User Id.</th>
//                         <th class="custom-particulatr">Notification On Date</th>
//                         <th class="custom-amount">Action Perfornmed Date</th>
//                         <th> Status</th>
//                         <th>Action Perfornmed</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     <tr *ngFor="let item of EstimateStatusList">
//                         <td>{{item?.pendingOn}}</td>
//                         <td>{{item?.notificationOnDate}}</td>
//                         <td>{{item?.actionPerformedDate}}</td>
//                         <td>{{item?.status}}</td>
//                         <td>{{item?.actionPerformed}}</td>
//                     </tr>

//                 </tbody>

//             </table>

//         </div>

//     </div>

// </mat-card>





// import { HttpClient, HttpResponse } from '@angular/common/http';
// import { Component, OnInit, Inject, OnDestroy, ɵConsole, ViewChild, ElementRef } from '@angular/core';
// import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
// import * as moment from 'moment';
// import { Subject } from 'rxjs';
// import { takeUntil, finalize } from 'rxjs/operators';
// import { NewApplicationService } from 'src/app/postlogin/consumer-modules/services/new-application.service';
// import { CrudType } from 'src/app/shared-enum/crudType';
// import { NotificationService } from 'src/app/shared-services/notification.service';
// import { SpinnerService } from 'src/app/shared-services/spinner.service';
// import { GenerateUrl } from 'src/environments/generate-url.model';
// import { ConsumerApplicationService } from '../../services/consumer-application.service';
// import { checkBoxChoose } from '../../models/checkBoxChoose';
// import { SubmitFormArraySurvey } from '../../models/surveyFormArraySubmitModel';
// import { FormArrayPayload } from '../../models/FinalPayLoadForFormArrayOfSurveyModel';
// import { MkmySurveyPayload } from '../../models/mkmySurveyModel';
// import { MkmyUpdatePayload } from '../../models/mkmyUpdatePayloadModel';
// import { MkmyIndiv } from '../../models/mkmyIndiv';


// @Component({
//     selector: 'consumer-application-survey',
//     templateUrl: './consumer-application-survey.component.html',
//     styleUrls: ['./consumer-application-survey.component.css']
// })
// export class ConsumerApplicationSurveyComponent implements OnInit, OnDestroy {
//     LoadConfirmationForm: FormGroup;
//     nscLoadEnhancementOytForm: FormGroup;
//     LoadConfirmationForColonyIllegalForm: FormGroup;
//     selectForm: FormGroup;
//     selectFormForMkmy: FormGroup
//     mkmyIndivBoolean: boolean = false
//     empForm: FormGroup;
//     empFormForMkmy: FormGroup
//     mkmySurveyForm: FormGroup;
//     mkmyIndivForm: FormGroup
//     LineShiftingReturnAmountForm: FormGroup
//     displayinputfield: boolean = false;
//     displayinputfieldForMkmy: boolean = false;
//     displayInputFieldVal: any;
//     displayInputFieldValForMkmy: any
//     submitGroupVar: boolean = false;
//     distanceBoolean: boolean = false
//     closeWrittenDiv: boolean = false;
//     ShowingErrorValForOtherButtonsCheckforMkmy: boolean = false;
//     mkmyApplicationDetails: any;
//     individualOrGroupIdVariable: number = 0;
//     ParentApplicationBoolean: boolean = false;
//     submitted: boolean = false;
//     submittedGenerateBlock: boolean = false;
//     MkmyUpdateForm: FormGroup;
//     dcResponseArray: any;
//     districtResponseArray: any;
//     MkmyUpdatePayload: MkmyUpdatePayload = new MkmyUpdatePayload();
//     mkmyIndiv: MkmyIndiv = new MkmyIndiv();
//     checkUpdateBoolean: boolean = false;
//     mainApplicationUpdatedLoadRequested: any;
//     mkmyValidatedBoolean: boolean = false;
//     varonChangeSelectedDistrictType: any;
//     districtIdnew: any;
//     castValue: boolean = false;
//     casttList: Array<any> = [
//         { name: 'GENERAL' },
//         { name: 'OBC' },
//         { name: 'SC' },
//         { name: 'ST' },
//     ]

//     displayInputFieldArray: Array<any> = [
//         {
//             id: 1, name: "Individual"
//         },
//         {
//             id: 2, name: "Group"
//         }
//     ];

//     displayInput: boolean = false;
//     displayInputMkmy: boolean = false;
//     samgraInputNumber: string = "";
//     FormArrayBooleanVariable: boolean = false;
//     FormArrayBooleanVariableOfMkmy: boolean = false;
//     listOfFormArray: Array<any> = [];
//     //   displayinputfield: boolean = false;
//     // radioButtonForm: FormGroup;
//     // rdVal:boolean = false;
//     rdPopup: boolean = false;
//     unsubscribe$: Subject<void> = new Subject();
//     consumerApplicationDetail: any;
//     consumerSurveyData: any;
//     file: File;
//     erpConfirmationVariable: boolean = false;
//     mkmyerpConfirmationVariable: boolean = false;
//     fietypeValidators: boolean = false;
//     filesizeValidators: boolean = false;
//     mkmyFile: any;
//     mkmyFietypeValidators: boolean = false;
//     mkmyFilesizeValidators: boolean = false;
//     userRoles: Array<any> = [];
//     applicationServeyFg: FormGroup;
//     applicationServeyErpFg: FormGroup;
//     mkmyValidatedFormForErpEstimate: FormGroup;
//     applicationServeyErpFgOfMkmy: FormGroup
//     erpNoOfMkmyVariable: any
//     applicationServeyCheckBoxFg: FormGroup;
//     userApplicationUrl: string = this.url.userApplicationUrl;
//     userContextPath: string = this.url.userContextPath
//     // userSurveyUrl: string = this.url.userSurveyUrl;
//     isChecked: boolean = false;
//     checkBoxValuecheck: checkBoxChoose = new checkBoxChoose();
//     loadConfirmationBoolean: boolean = false;
//     ExtraaButtonValidationCheck: boolean = false;
//     LineShiftingReturnAmountFormBoolean: boolean = false;
//     ReturnAmtBooleanOpen: Boolean = false;
//     loadPatchValue = 0;
//     loadAddupVar: any;
//     ParentFinalLoad: any

//     maxDate = new Date();
//     minDate = new Date();
//     userDataAll: any;
//     groupPeopleCommonFile: any;
//     closeLoadUnitDiv: boolean = false

//     consumerDemandData: any
//     geoLocationData: any
//     applicationDocumentData: any
//     maskAadhaarNo: string = null;

//     @ViewChild('surveyDoc') surveyDocElement: ElementRef;

//     isFormSubmit: boolean = false;

//     // isRejected;

//     surveyRequired: boolean = true;
//     surveyUploaded: boolean = false;

//     surveyFileName: string = 'Select Survey File... ';

//     surveyDoc;
//     crudType = this.data.crudType;

//     userSurveyUrl: string = this.url.userSurveyUrl;

//     consumerApplicationId = this.data.consumerApplicationId;

//     // charitra code
//     NatureOfworkTypeList: Array<any> = [];
//     natureofitemslist: Array<any> = [5];
//     EstimateStatusList: Array<any> = [];
//     EstimateAmount: any;
//     erpEstimateDataForMkmyArray = [];
//     ShowingErrorVal: boolean = false;
//     ShowingErrorValForOtherButtonsCheck: boolean = false;

//     NscSubmitBoolean: boolean = false;
//     mkmySubmitBoolean: boolean = false;
//     ShowingErrorValForOtherButtonsCheckForNsc: boolean = false

//     SubmitFormArraySurvey: SubmitFormArraySurvey = new SubmitFormArraySurvey();
//     groupCommonFileBoolean: boolean = false;
//     FormArrayPayload: FormArrayPayload = new FormArrayPayload();
//     ChooseGroupSubmit: boolean = false;
//     MkmySurveyPayload: MkmySurveyPayload = new MkmySurveyPayload();
//     storedErpNo:any
//     // charitra code end
//     constructor(
//         private spinnerService: SpinnerService,
//         private url: GenerateUrl,
//         private http: HttpClient,
//         private fb: FormBuilder,
//         private consumerApplicationService: ConsumerApplicationService,
//         private notificationService: NotificationService,
//         private newApplicationService: NewApplicationService,


//         @Inject(MAT_DIALOG_DATA) public data: any,
//         public dialogRef: MatDialogRef<ConsumerApplicationSurveyComponent>,
//     ) {
//         let abc = sessionStorage.getItem('accessLeveOfUser');
//         let xyz = JSON.parse(abc);
//         console.log(xyz, "xxxxxxxxxxxxxyyyyyyyyyyyyyyyzzzzzzzzzzzzzz///////////////////");
//         this.userDataAll = xyz;

//         console.log(this.data, "ryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy%%%%%%%%%%%%%yyyyyyyyyyyyyyyy");

//         this.consumerApplicationDetail = this.data.row


//     }

//     ngOnInit() {

//         this.LineShiftingReturnAmountForm = this.fb.group({
//             returnAmt: ["", [Validators.required, Validators.pattern('^[0-9][0-9]*$')]],
//         })
//         // this.radioButtonForm = this.fb.group({
//         //     rd: ['', Validators.required]
//         // })

//         this.BuildLoadForm();
//         this.BuildFormForColonyIlegalLoad();
//         this.BuildNscLoadEnhancementOytForm();
//         this.BuildMkmyForm()
//         // this.BuildLineShiftingReturnAmountForm();
//         this.loadForm();
//         this.loadForm1();
//         this.loadFormMkmy();
//         this.loadFormCheckBox();
//         // let consumerApplicationData = await this.http.get(this.userApplicationUrl + '/get/' + this.data.consumerApplicationId).toPromise();
//         // this.consumerApplicationDetail = consumerApplicationData['list'][0];
//         console.log(this.consumerApplicationDetail, "8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888");

//         if (this.consumerApplicationDetail != undefined && this.consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId == 8) {
//             this.consumerApplicationService.getMkmyApplicationDetails(this.consumerApplicationDetail.consumerApplicationNo).subscribe((resp: any) => {
//                 console.log(resp, "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbwwwwwwwwwwwwwwwww......................");
//                 if (resp.code == "200") {
//                     this.mkmyApplicationDetails = resp.list[0];
//                     console.log(this.mkmyApplicationDetails, "this.mkmyApplicationDetails.........................ssssssssssssss");
//                     this.MkmyUpdateForm = this.fb.group({
//                         address: [this.mkmyApplicationDetails.address, Validators.required],
//                         guardianName: [this.mkmyApplicationDetails.guardianName, Validators.required],
//                         aadharNo: [this.mkmyApplicationDetails.aadharNo, [Validators.required, Validators.pattern(/^\d{1,12}$/)]],
//                         pinCode: [this.mkmyApplicationDetails.pinCode, Validators.required],
//                         khasra: [this.mkmyApplicationDetails.khasra, Validators.required],
//                         area: [this.mkmyApplicationDetails.area, Validators.required],
//                         dcId: ["", Validators.required],
//                         loadRequested: [this.mkmyApplicationDetails.loadRequested, Validators.required],
//                         districtId: ["", Validators.required],
//                         castCategory: [this.mkmyApplicationDetails.castCategory, Validators.required],
//                         casteCategory: ['', Validators.required],
//                         samagraId: [this.mkmyApplicationDetails.samagraId, Validators.required],
//                         shortDescription: [this.mkmyApplicationDetails.shortDescription, Validators.required],
//                         // individualOrGroup: [this.mkmyApplicationDetails,Validators.required],
//                         loadRequestedId: ["HP", Validators.required],
//                         natureOfWork: ["MKMY", Validators.required],
//                         consumerName: [this.mkmyApplicationDetails.consumerName, Validators.required],
//                         phoneNumber: [this.mkmyApplicationDetails.phoneNumber, Validators.required],
//                     })


//                     if (this.mkmyApplicationDetails.districtId == null) {
//                         this.consumerApplicationService.getDistrictList().subscribe((districtResponse: any) => {
//                             console.log(districtResponse, "districtResponse........districtResponse");
//                             if (districtResponse.code == "200") {
//                                 this.districtResponseArray = districtResponse.list
//                             }
//                         })
//                     }


//                     if (this.mkmyApplicationDetails.dcId == null && this.mkmyApplicationDetails.districtId == null && this.mkmyApplicationDetails.castCategory == null) {
//                         this.MkmyUpdateForm.get('address').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('guardianName').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('aadharNo').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('pinCode').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('khasra').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('area').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('dcId').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('loadRequested').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('districtId').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('casteCategory').setValidators(Validators.required);
//                         this.castValue = true
//                         this.MkmyUpdateForm.get('castCategory').clearValidators();
//                         this.MkmyUpdateForm.get('samagraId').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('shortDescription').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('loadRequestedId').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('natureOfWork').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('consumerName').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('phoneNumber').setValidators(Validators.required);

//                         this.MkmyUpdateForm.updateValueAndValidity();

//                     } else if (this.mkmyApplicationDetails.dcId == null && this.mkmyApplicationDetails.districtId != null && this.mkmyApplicationDetails.castCategory == null) {


//                         this.MkmyUpdateForm.get('address').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('guardianName').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('aadharNo').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('pinCode').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('khasra').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('area').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('dcId').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('loadRequested').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('districtId').clearValidators();
//                         this.MkmyUpdateForm.get('casteCategory').setValidators(Validators.required);
//                         this.castValue = true
//                         this.MkmyUpdateForm.get('castCategory').clearValidators();
//                         this.MkmyUpdateForm.get('samagraId').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('shortDescription').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('loadRequestedId').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('natureOfWork').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('consumerName').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('phoneNumber').setValidators(Validators.required);

//                         this.MkmyUpdateForm.updateValueAndValidity();

//                     } else if (this.mkmyApplicationDetails.dcId != null && this.mkmyApplicationDetails.districtId == null && this.mkmyApplicationDetails.castCategory == null) {

//                         this.MkmyUpdateForm.get('address').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('guardianName').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('aadharNo').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('pinCode').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('khasra').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('area').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('dcId').clearValidators();
//                         this.MkmyUpdateForm.get('loadRequested').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('districtId').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('casteCategory').setValidators(Validators.required);
//                         this.castValue = true
//                         this.MkmyUpdateForm.get('castCategory').clearValidators();
//                         this.MkmyUpdateForm.get('samagraId').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('shortDescription').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('loadRequestedId').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('natureOfWork').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('consumerName').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('phoneNumber').setValidators(Validators.required);

//                         this.MkmyUpdateForm.updateValueAndValidity();

//                     } else if (this.mkmyApplicationDetails.dcId != null && this.mkmyApplicationDetails.districtId != null && this.mkmyApplicationDetails.castCategory == null) {
//                         this.MkmyUpdateForm.get('address').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('guardianName').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('aadharNo').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('pinCode').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('khasra').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('area').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('dcId').clearValidators();
//                         this.MkmyUpdateForm.get('loadRequested').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('districtId').clearValidators();
//                         this.MkmyUpdateForm.get('casteCategory').setValidators(Validators.required);
//                         this.castValue = true
//                         this.MkmyUpdateForm.get('castCategory').clearValidators();
//                         this.MkmyUpdateForm.get('samagraId').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('shortDescription').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('loadRequestedId').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('natureOfWork').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('consumerName').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('phoneNumber').setValidators(Validators.required);

//                         this.MkmyUpdateForm.updateValueAndValidity();
//                     }
//                     //////////
//                     if (this.mkmyApplicationDetails.dcId == null && this.mkmyApplicationDetails.districtId == null && this.mkmyApplicationDetails.castCategory != null) {
//                         this.MkmyUpdateForm.get('address').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('guardianName').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('aadharNo').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('pinCode').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('khasra').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('area').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('dcId').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('loadRequested').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('districtId').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('casteCategory').clearValidators();
//                         this.castValue = false
//                         this.MkmyUpdateForm.get('castCategory').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('samagraId').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('shortDescription').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('loadRequestedId').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('natureOfWork').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('consumerName').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('phoneNumber').setValidators(Validators.required);

//                         this.MkmyUpdateForm.updateValueAndValidity();

//                     } else if (this.mkmyApplicationDetails.dcId == null && this.mkmyApplicationDetails.districtId != null && this.mkmyApplicationDetails.castCategory != null) {


//                         this.MkmyUpdateForm.get('address').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('guardianName').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('aadharNo').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('pinCode').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('khasra').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('area').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('dcId').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('loadRequested').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('districtId').clearValidators();
//                         this.MkmyUpdateForm.get('casteCategory').clearValidators();
//                         this.castValue = false
//                         this.MkmyUpdateForm.get('castCategory').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('samagraId').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('shortDescription').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('loadRequestedId').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('natureOfWork').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('consumerName').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('phoneNumber').setValidators(Validators.required);

//                         this.MkmyUpdateForm.updateValueAndValidity();

//                     } else if (this.mkmyApplicationDetails.dcId != null && this.mkmyApplicationDetails.districtId == null && this.mkmyApplicationDetails.castCategory != null) {

//                         this.MkmyUpdateForm.get('address').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('guardianName').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('aadharNo').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('pinCode').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('khasra').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('area').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('dcId').clearValidators();
//                         this.MkmyUpdateForm.get('loadRequested').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('districtId').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('casteCategory').clearValidators();
//                         this.castValue = false
//                         this.MkmyUpdateForm.get('castCategory').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('samagraId').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('shortDescription').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('loadRequestedId').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('natureOfWork').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('consumerName').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('phoneNumber').setValidators(Validators.required);

//                         this.MkmyUpdateForm.updateValueAndValidity();

//                     } else if (this.mkmyApplicationDetails.dcId != null && this.mkmyApplicationDetails.districtId != null && this.mkmyApplicationDetails.castCategory != null) {
//                         this.MkmyUpdateForm.get('address').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('guardianName').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('aadharNo').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('pinCode').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('khasra').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('area').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('dcId').clearValidators();
//                         this.MkmyUpdateForm.get('loadRequested').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('districtId').clearValidators();
//                         this.MkmyUpdateForm.get('casteCategory').clearValidators();
//                         this.castValue = false
//                         this.MkmyUpdateForm.get('castCategory').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('samagraId').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('shortDescription').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('loadRequestedId').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('natureOfWork').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('consumerName').setValidators(Validators.required);
//                         this.MkmyUpdateForm.get('phoneNumber').setValidators(Validators.required);

//                         this.MkmyUpdateForm.updateValueAndValidity();
//                     }



//                 }
//             })


//         }
//         //getMkmyApplicationDetails
//         //     this.consumerApplicationDetail.consumerApplicationNo

//         const createdDate = moment(this.consumerApplicationDetail['created'], "DD-MM-YYYY").format();
//         this.minDate = new Date(createdDate);

//         this.applicationServeyFg.get('consumerApplicationId').setValue(this.consumerApplicationDetail.consumerApplicationId);
//         if (this.crudType == CrudType.update) {

//             this.consumerApplicationService.getConsumerSurveyData(this.consumerApplicationDetail.consumerApplicationId).subscribe((consumerSurveyData: any) => {
//                 console.log('consumerSurveyData', consumerSurveyData);
//                 if (consumerSurveyData['code'] == "200") {
//                     this.consumerSurveyData = consumerSurveyData['list'][0];
//                 }
//             })


//             this.loadEditForm(this.consumerSurveyData);
//         }

//         this.newApplicationService.getNatureOfWorkTypeList().pipe(takeUntil(this.unsubscribe$))
//             .subscribe(data => {
//                 console.log('nature of work sarvaye page');
//                 this.NatureOfworkTypeList = data['list'];
//                 console.log(this.NatureOfworkTypeList);
//             });

//         this.empForm = this.fb.group({
//             employees: this.fb.array([])
//         });


//         this.selectForm = this.fb.group({
//             individualOrGroupId: ["", Validators.required],
//             numberofgroup: ["", [Validators.required]],
//         });

//         this.empFormForMkmy = this.fb.group({
//             mkmyLoad: [this.loadPatchValue, Validators.required],  //mkmySurveyForm  //loadConfirmationForMkmy
//             KvDistance: ["", Validators.required],
//             dtr: ["", Validators.required],
//             cutpoint: ["", Validators.required],
//             employeesForMkmy: this.fb.array([]),
//         });

//         //employeesForMkmy
//         this.selectFormForMkmy = this.fb.group({
//             individualOrGroupId: ["", Validators.required],
//             numberofgroup: ["", [Validators.required]],
//         });

//         this.mkmyValidatedFormForErpEstimate = this.fb.group({
//             estimateFile: ["", Validators.required],
//             cb: ["", Validators.required]

//         })

//         this.mkmyIndivFormBuild();



//         if (this.consumerApplicationDetail.natureOfWorkType.natureOfWorkTypeId != 8) {
//             this.getApplicationDocumentData();
//         }



//     }

//     mkmyIndivFormBuild() {
//         this.mkmyIndivForm = this.fb.group({
//             KvDistance: ['', Validators.required],
//             cutpoint: ['', Validators.required],
//             dtr: ['', Validators.required]
//         })
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
//         window.open(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes)
//     }
//     /////////////  Administrative file download ********************************////////************************ end ***//////////////


//     //////////////// Estimate file Download *********************************//////////////////*********start************************ */
//     getDownloaddocEstimateFile() {
//         let filePathWithBackslashes = this.applicationDocumentData.docEstimate.documentPath;
//         let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
//         window.open(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes)
//     }
//     //////////////// Estimate file Download *********************************//////////////////*************end************************ */

//     /////////////  Noc file download ********************************////////************************ end ***//////////////
//     getDownloaddocNocFile() {
//         let filePathWithBackslashes = this.applicationDocumentData.docNoc.documentPath;
//         let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
//         // console.log(filePathWithForwardSlashes);
//         // console.log(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes);
//         window.open(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes)
//     }
//     /////////////  Noc file download ********************************////////************************ end ***//////////////


//     /////////////  Registry file download ********************************////////************************ end ***//////////////
//     getDownloaddocRegistryFile() {
//         let filePathWithBackslashes = this.applicationDocumentData.docRegistry.documentPath;
//         let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
//         // console.log(filePathWithForwardSlashes);
//         // console.log(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes);
//         window.open(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes)
//     }
//     /////////////  Registry file download ********************************////////************************ end ***//////////////

//     /////////////  ReraPermission file download ********************************////////************************ end ***//////////////
//     getDownloaddocReraPermissionFile() {
//         let filePathWithBackslashes = this.applicationDocumentData.docReraPermission.documentPath;
//         let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
//         // console.log(filePathWithForwardSlashes);
//         // console.log(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes);
//         window.open(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes)
//     }
//     /////////////  ReraPermission file download ********************************////////************************ end ***//////////////

//     /////////////  docT$cpPermission file download ********************************////////************************ end ***//////////////
//     getDownloaddocT$cpPermissionFile() {
//         let filePathWithBackslashes = this.applicationDocumentData.docT$cpPermission.documentPath;
//         let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
//         // console.log(filePathWithForwardSlashes);
//         // console.log(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes);
//         window.open(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes)
//     }
//     /////////////  docT$cpPermission file download ********************************////////************************ end ***//////////////

//     /////////////  docKhasraKhatoni file download ********************************////////************************ end ***//////////////
//     getDownloaddocKhasraKhatoniFile() {
//         let filePathWithBackslashes = this.applicationDocumentData.docKhasraKhatoni.documentPath;
//         let filePathWithForwardSlashes = filePathWithBackslashes.replace(/\\/g, '/');
//         // console.log(filePathWithForwardSlashes);
//         // console.log(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes);
//         window.open(this.url.userContextPath + "/erp/downloadpdf?path=C:/UploadDocs/" + filePathWithForwardSlashes)
//     }
//     /////////////  docKhasraKhatoni file download ********************************////////************************ end ***//////////////




//     onChangeDc(e: any) {
//         console.log(e, "eeeeeeeeeeeeeeedddddccccccccc..........................");

//     }

//     // onChangeSelectedDistrictType(e: any) {
//     //     console.log(e, "eeeeeeeeedistiiiicccctttt...................................");


//     // }

//     onChangeSelectedDistrictType(value) {
//         console.log(
//             "onChangeSelectedDistrictType",
//             "get distribution list by district id",
//             value.value.districtId
//         );
//         this.varonChangeSelectedDistrictType = value.value;
//         if (value.value.districtId) {
//             this.districtIdnew = value.value.districtId
//             this.MkmyUpdateForm.value.dcId = '';
//             this.newApplicationService
//                 .getDistributionByID(value.value.districtId)
//                 .pipe(takeUntil(this.unsubscribe$))
//                 .subscribe((data) => {
//                     this.dcResponseArray = data["list"][0];
//                 });
//         } else {
//             this.dcResponseArray = null;
//         }
//     }

//     //     BuildLineShiftingReturnAmountForm(){
//     // this.LineShiftingReturnAmountForm = this.fb.group({
//     //     jeReturnAmount:["", Validators.required],
//     //     consumerApplicationNumber:[this.consumerApplicationDetail.consumerApplicationNo,Validators.required]
//     // })
//     //     }

//     onSubmitLineShiftingReturnAmountForm() {

//         if (this.LineShiftingReturnAmountForm.invalid) {
//             this.notificationService.error("! Please enter Return Amount first..");
//             return
//         } else if (this.LineShiftingReturnAmountForm.value.returnAmt < 0) {
//             this.notificationService.error("! Return Amount must be grater than or equal to zero ");
//             return
//         }
//         else {
//             let formData: FormData = new FormData();
//             formData.append('jeReturnAmount', this.LineShiftingReturnAmountForm.value.returnAmt);
//             formData.append('consumerApplicationNumber', this.consumerApplicationDetail.consumerApplicationNo);
//             this.consumerApplicationService.updateOfReturnAmountOfSurvey(formData).subscribe((data: any) => {
//                 console.log(data, "kkkkkkkkkkkkkkkkkkkkkk");
//                 if (data.code == "200") {
//                     this.notificationService.success("submitted successfully");
//                     this.LineShiftingReturnAmountFormBoolean = true
//                 } else {
//                     this.notificationService.warn("something went wrong !");
//                     this.LineShiftingReturnAmountFormBoolean = false;
//                     return

//                 }

//             })
//         }
//     }

//     employees(): FormArray {
//         return this.empForm.get("employees") as FormArray;
//     }
//     newEmployee(): FormGroup {
//         return this.fb.group({
//             samagraId: ["", Validators.required],
//             consumerName: ["", Validators.required],
//             guardianName: ["", Validators.required],
//             khasraNo: ["", Validators.required],
//             loadRequested: ["", Validators.required],
//             // parentConsumerApplicationNumber:[this.consumerApplicationDetail.consumerApplicationNo,Validators.required]
//         });
//     }
//     add() {
//         console.log(this.newEmployee(), "this.newEmployee()this.newEmployee()this.newEmployee()^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");

//         this.employees().push(this.newEmployee());
//     }
//     remove(empIndex: number) {
//         this.employees().removeAt(empIndex);
//     }
//     onSubmitsam() {
//         console.log(this.empForm.value);
//     }



//     displayInputField(event: any) {
//         console.log(event,"this.empForm,,,,,,,");
        
//       //  this.empForm.reset();
//         console.log(".........................", event);
//         this.displayInputFieldVal = event.value;
//         if (event.value == 2) {
//             this.displayInput = true;
//             if (this.displayInput === true) {
//                 //  this.add();
//                 this.displayinputfield = true;
//             }
//         } else {
//             this.displayInput = false;
//             this.displayinputfield = false;
//         }
//     }
//     generateBlocks() {
//         console.log(this.employees().length, "this.employees()this.employees()this.employees()this.employees()this.employees()", typeof (this.employees()));

//         const formArray = this.empForm.get('employees') as FormArray;
//         while (formArray.length !== 0) {
//             formArray.removeAt(0);
//         }

//         // this.employees().reset();
//         // this.displayinputfield = false;
//         // alert(this.selectForm.value.numberofgroup);
//         if (this.selectForm.value.numberofgroup <= 10) {
//             this.displayInput = true;
//             for (let index = 0; index < this.selectForm.value.numberofgroup; index++) {
//                 this.add();
//             }
//         } else {
//             this.notificationService.warn("१०  से कम संख्या दर्ज करे");
//             return
//         }

//         this.selectForm.value.numberofgroup = 0;

//     }


//     employeesForMkmy(): FormArray {
//         return this.empFormForMkmy?.get("employeesForMkmy") as FormArray;
//     }
//     newEmployeeForMkmy(): FormGroup {
//         return this.fb.group({
//             parentApplicationNumber: [this.consumerApplicationDetail.consumerApplicationNo, Validators.required],
//             childApplicationNumber: ["", Validators.required],
//             consumerName: ["", Validators.required],
//             guardianName: ["", Validators.required],
//             // elevenKvDistance: ["", Validators.required],
//             // dtrCapacity: ["", Validators.required],
//             // cutPoint: ["", Validators.required],
//             load: ["", Validators.required]
//             // parentConsumerApplicationNumber:[this.consumerApplicationDetail.consumerApplicationNo,Validators.required]

//             //         "parentApplicationNumber": "",
//             // "childApplicationNumber": "DS2023092061",
//             // "load": "100",
//             // "cutPoint": "50",
//             // "elevenKvDistance": "25",
//             // "dtrCapacity": "200"
//         });
//     }
//     mkmyadd() {
//         console.log(this.newEmployeeForMkmy(), "this.newEmployeeForMkmy()this.newEmployeeForMkmy()this.newEmployeeForMkmy()^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");

//         this.employeesForMkmy().push(this.newEmployeeForMkmy());
//     }
//     removemkmy(empIndex: number) {
//         this.employeesForMkmy().removeAt(empIndex);
//     }
//     onSubmitsamMkmy() {
//         console.log(this.empFormForMkmy.value);
//     }

//     displayInputFieldForMkmy(event: any) {
//         this.empForm.reset();
//         console.log(".........................", event.target.value);
//         this.displayInputFieldValForMkmy = event.target.value;
//         if (event.target.value == 2) {
//             this.displayInputMkmy = true;
//             this.MkmyUpdatePayload.individualOrGroupId = 2;
//             //if (this.displayInputMkmy === true) {
//             //  this.add();
//             // this.displayinputfieldForMkmy = true;
//             //  }
//             this.individualOrGroupIdVariable = 2
//         } else {
//             this.displayInputMkmy = false;
//             this.displayinputfieldForMkmy = false;
//             this.individualOrGroupIdVariable = 1;
//             this.mkmySurveyForm = this.fb.group({
//                 loadConfirmationForMkmy: [this.mkmyApplicationDetails.loadRequested, Validators.required],
//                 jeLoadUnitNew: ['HP', Validators.required]
//             })

//             this.MkmyUpdatePayload.individualOrGroupId = 1;
//         }
//     }

//     generateBlocksForMkmyFormArray() {
//         this.submittedGenerateBlock = true;
//         console.log(this.employeesForMkmy().length, "this.employeesForMkmy()this.employeesForMkmy()this.employeesForMkmy()this.employeesForMkmy()this.employeesForMkmy()", typeof (this.employeesForMkmy()));
//         // if(this.mkmySubmitBoolean==false){
//         // this.notificationService.error("first chose above form load and unit first.... !");
//         // return;
//         // }else{
//         if (this.individualOrGroupIdVariable == 2 && this.ParentApplicationBoolean == false) {
//             this.notificationService.error("please Submit Details First");
//             return
//         }
//         const formArrayFormkmy = this.empFormForMkmy.get('employeesForMkmy') as FormArray;
//         while (formArrayFormkmy.length !== 0) {
//             formArrayFormkmy.removeAt(0);
//         }
//         if (this.selectFormForMkmy.value.numberofgroup <= 10) {
//             this.displayInputMkmy = true;
//             this.displayinputfieldForMkmy = true
//             for (let index = 0; index < this.selectFormForMkmy.value.numberofgroup; index++) {
//                 this.mkmyadd();
//             }
//             this.closeLoadUnitDiv = true
//         } else {
//             this.notificationService.warn("१०  से कम संख्या दर्ज करे");
//             return
//         }
//         this.selectFormForMkmy.value.numberofgroup = 0;
//         //}


//     }


//     getApplicationDetailsByApplicationIdForMkmy(event: any, e: any) {
//         console.log(event, "evvveeennntntttt");
//         console.log(this.empFormForMkmy.value.employeesForMkmy, "formValue.....");
//         let applicationNumbermkmy = this.empFormForMkmy.value.employeesForMkmy[e].childApplicationNumber;
//         console.log(applicationNumbermkmy, "ffffiiiinnnaaallllyyy");
//         let count = 0;
//         for (let x = 0; x < this.empFormForMkmy.value.employeesForMkmy.length; x++) {

//             if (this.empFormForMkmy.value.employeesForMkmy[x].childApplicationNumber == applicationNumbermkmy) {

//                 count += 1;
//             } else {

//             }
//         }

//         if (count > 1) {
//             this.notificationService.error("you have already added this Application Number. ! Please Enter Different Application Number");
//             return;
//         }

//         //  https://rooftop-uat.mpcz.in:8888/deposit_schemeee/api/consumer/consumer-application/getConsumerApplicationDetailsByConsumerApplicationNo/DS1698323331645

//         if (applicationNumbermkmy == this.consumerApplicationDetail.consumerApplicationNo) {
//             this.notificationService.warn("मुख्य आवेदक,अपने आवेदन क्रमांक का चयन नही कर सकता है।");
//             return
//         }

//         this.consumerApplicationService.getConsumerApplicationDetailsByApplicationNumber(applicationNumbermkmy).subscribe((data: any) => {
//             console.log(data, "dattttaaaaahhhhhhhhhhhhhhhhhhhhhhhhhhhhh..,,,,,,,..........,,,,,,,,,,");
//             if (data.code == "200") {
//                 let mkmyConsumerDetails = data.list[0];
//                 console.log(mkmyConsumerDetails, "mkmyConsumerDetails...................................");
//                 if (mkmyConsumerDetails.natureOfWorkType.natureOfWorkTypeId != 8) {
//                     this.notificationService.error("आवेदन क्रमांक किसान मित्र योजना से संबंधित होना चाहिए। ");
//                     return
//                 } else {
//                     const formArrayNewMkmy = this.empFormForMkmy.get('employeesForMkmy') as FormArray
//                     const formGroupNewMkmy = formArrayNewMkmy.at(e) as FormGroup;
//                     console.log(formGroupNewMkmy, "formGroupNewMkmy''''''''''''''''''''''''''''''''''");

//                     formGroupNewMkmy.patchValue({
//                         consumerName: data.list[0].consumerName,
//                         guardianName: data.list[0].guardianName
//                     })
//                 }

//             } else {
//                 const formArrayNewMkmy = this.empFormForMkmy.get('employeesForMkmy') as FormArray
//                 const formGroupNewMkmy = formArrayNewMkmy.at(e) as FormGroup;
//                 console.log(formGroupNewMkmy, "formGroupNewMkmy''''''''''''''''''''''''''''''''''");
//                 this.notificationService.warn(" Invalid Application number ! please fill correct Application number")
//                 formGroupNewMkmy.reset();
//             }

//         })


//     }

//     parentDetailsSubmit() {
//         this.submitted = true;
//         console.log(this.MkmyUpdateForm, "this.MkmyUpdateForm..............this.MkmyUpdateForm.....////////////////");



//         if (this.MkmyUpdateForm.value.loadRequested >= 3) {
//             if ((this.individualOrGroupIdVariable == 1 && this.mkmyIndivForm.invalid) || (this.individualOrGroupIdVariable == 1 && this.MkmyUpdateForm.invalid)) {
//                 this.notificationService.error("Invalid Form !");
//                 return;
//             }
//             if (this.individualOrGroupIdVariable == 1 && this.mkmyIndivForm.valid && this.MkmyUpdateForm.valid) {

//                 if (this.mkmyIndivForm.value.KvDistance > 200) {
//                     this.notificationService.error("Distance must be less than or equal to 200m !");
//                     return
//                 }
//                 this.mkmyIndiv.consumerAppNo = this.consumerApplicationDetail.consumerApplicationNo
//                 this.mkmyIndiv.mkmyCutPoint = this.mkmyIndivForm.value.cutpoint
//                 this.mkmyIndiv.mkmyDistance = this.mkmyIndivForm.value.KvDistance
//                 this.mkmyIndiv.mkmyDtrCapacity = this.mkmyIndivForm.value.dtr
//                 this.consumerApplicationService.mkmyIndivSubmit(this.mkmyIndiv).subscribe((responseData: any) => {
//                     console.log(responseData, "responseData...............................");
//                     if (responseData.code == "200") {
//                         this.mkmyIndivBoolean = true;
//                     } else {
//                         this.mkmyIndivBoolean = false
//                         this.notificationService.warn(responseData.message);
//                         return
//                     }
//                 })
//             }

//             if (this.MkmyUpdateForm.invalid) {
//                 console.log(this.MkmyUpdateForm, "invalid mkmy form,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");

//                 this.notificationService.error("Enter details first !");
//                 return;
//             } else {

//                 const numberString = this.MkmyUpdateForm.value.aadharNo.toString();
//                 const length = numberString.length;
//                 if (length != 12) {
//                     console.log(length, "length/////////////////");
//                     this.notificationService.error(" Aadhar number must be numeric and have a maximum of 12 digits.");
//                     return
//                 }
//                 const pincodeString = this.MkmyUpdateForm.value.pinCode.toString();
//                 const pincodeLength = pincodeString.length;
//                 if (pincodeLength != 6) {
//                     console.log(pincodeLength, "length/////////////////");
//                     this.notificationService.error(" Pincode must be numeric and have a maximum of 6 digits.");
//                     return
//                 }



//                 if (this.mkmyApplicationDetails.dcId == null && this.mkmyApplicationDetails.districtId == null) {
//                     this.MkmyUpdatePayload.dcId = this.MkmyUpdateForm.value.dcId;
//                     this.MkmyUpdatePayload.districtId = this.MkmyUpdateForm.value.districtId;
//                 } else if (this.mkmyApplicationDetails.dcId != null && this.mkmyApplicationDetails.districtId == null) {
//                     this.MkmyUpdatePayload.dcId = this.mkmyApplicationDetails.dcId;
//                     this.MkmyUpdatePayload.districtId = this.MkmyUpdateForm.value.districtId;
//                 } else if (this.mkmyApplicationDetails.dcId == null && this.mkmyApplicationDetails.districtId != null) {
//                     this.MkmyUpdatePayload.districtId = this.mkmyApplicationDetails.districtId;
//                     this.MkmyUpdatePayload.dcId = this.MkmyUpdateForm.value.dcId;
//                 } else {
//                     this.MkmyUpdatePayload.dcId = this.mkmyApplicationDetails.dcId;
//                     this.MkmyUpdatePayload.districtId = this.mkmyApplicationDetails.districtId;
//                 }
//                 if (this.castValue == false) {
//                     this.MkmyUpdatePayload.castCategory = this.MkmyUpdateForm.value.castCategory;
//                 }
//                 if (this.castValue == true) {
//                     this.MkmyUpdatePayload.castCategory = this.MkmyUpdateForm.value.casteCategory;
//                 }
//                 this.MkmyUpdatePayload.aadharNo = this.MkmyUpdateForm.value.aadharNo;
//                 this.MkmyUpdatePayload.address = this.MkmyUpdateForm.value.address;
//                 this.MkmyUpdatePayload.area = this.MkmyUpdateForm.value.area;

//                 this.MkmyUpdatePayload.consumerName = this.MkmyUpdateForm.value.consumerName;
//                 this.MkmyUpdatePayload.guardianName = this.MkmyUpdateForm.value.guardianName;
//                 this.MkmyUpdatePayload.khasra = this.MkmyUpdateForm.value.khasra;
//                 this.MkmyUpdatePayload.loadRequested = this.MkmyUpdateForm.value.loadRequested;
//                 this.MkmyUpdatePayload.loadRequestedId = 3;
//                 this.MkmyUpdatePayload.mobilNo = this.MkmyUpdateForm.value.phoneNumber;
//                 this.MkmyUpdatePayload.natureOfWorkTypeId = 8;
//                 this.MkmyUpdatePayload.pinCode = this.MkmyUpdateForm.value.pinCode;
//                 this.MkmyUpdatePayload.samgraId = this.MkmyUpdateForm.value.samagraId;
//                 this.MkmyUpdatePayload.shortDescriptionOfWork = this.MkmyUpdateForm.value.shortDescription;
//                 this.MkmyUpdatePayload.consumerApplicationNo = this.consumerApplicationDetail.consumerApplicationNo;
//                 // this.MkmyUpdatePayload.mkmyDtrCapacity =  this.empFormForMkmy.value.dtr
//                 // this.MkmyUpdatePayload.mkmyCutPoint = this.empFormForMkmy.value.cutpoint
//                 // this.MkmyUpdatePayload.mkmyDistance = this.empFormForMkmy.value.KvDistance

//                 //consumerApplicationNo

//                 console.log(this.MkmyUpdatePayload, "this.MkmyUpdatePayload....................");

//                 let formData: FormData = new FormData();
//                 formData.append('updateMkmyConsumer', JSON.stringify(this.MkmyUpdatePayload));

//                 this.consumerApplicationService.SubmitMkmyUpdate(formData).subscribe((response: any) => {
//                     console.log(response, "response...mkmy...update..............");
//                     if (response.code == "200") {

//                         this.mainApplicationUpdatedLoadRequested = response.list[0];
//                         this.notificationService.success("Data Updated Successfully");
//                         this.ParentApplicationBoolean = true;
//                         this.checkUpdateBoolean = true;

//                         if (this.individualOrGroupIdVariable == 1) {
//                             this.mkmySurveyForm = this.fb.group({
//                                 loadConfirmationForMkmy: [response.list[0].loadRequested, Validators.required],
//                                 jeLoadUnitNew: ['HP', Validators.required]
//                             })
//                         } else if (this.individualOrGroupIdVariable == 2) {
//                             this.ParentFinalLoad = response.list[0].loadRequested
//                         }
//                     } else {
//                         this.notificationService.warn("Something went wrong !");
//                         this.ParentApplicationBoolean = false;
//                         return
//                     }

//                 })


//             }


//         } else {
//             this.notificationService.error("! Entered Load must be greater than or equal to 3");
//             return
//         }


//     }



//     submitgroupforMkmy() {


//         // console.log(loadAddup, "pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp..........2nd..........");


//         // if(this.consumerApplicationDetail.natureOfWorkType.natureOfWorkTypeId==8 && this.mkmySubmitBoolean==false){
//         //     this.notificationService.error("Choose above form Load and unit first.. !");
//         //     return
//         // }

//         if (this.empFormForMkmy.invalid) {
//             this.notificationService.error('Invalid Group Form !')
//             console.log(this.empFormForMkmy, "this.empFormForMkmy..check...inValid Condition..........................");

//             this.FormArrayBooleanVariableOfMkmy = true;
//             return
//         } else if (this.empFormForMkmy.value.KvDistance > 200 || this.empFormForMkmy.value.KvDistance < 0) {

//             this.notificationService.error('संबंधित दूरी 1m से 200m के मध्य दर्ज करे')
//             this.distanceBoolean = true;
//             return
//             //KvDistance
//         }
//         //  else if (this.empFormForMkmy.value.mkmyLoad < 3 || this.empFormForMkmy.value.mkmyLoad > 100) {
//         //     this.notificationService.error('load must be between 3HP and 100HP ');
//         //     return
//         // }

//         else {
//             this.distanceBoolean = false
//             this.FormArrayBooleanVariableOfMkmy = false;
//             this.MkmySurveyPayload.individualOrGroupId = 2;
//             this.MkmySurveyPayload.mmkyParentChildDto = this.empFormForMkmy.value.employeesForMkmy;
//             // this.MkmySurveyPayload.MmkyLoad = this.empFormForMkmy.value.mkmyLoad; 
//             // this.MkmySurveyPayload.KvDistance = this.empFormForMkmy.value.KvDistance; 
//             // this.MkmySurveyPayload.dtr = this.empFormForMkmy.value.dtr; 

//             console.log(this.empFormForMkmy.value.employeesForMkmy.value, "this.empFormForMkmy.value.employeesForMkmy.value...samsad..");

//             var loadAddup: any;

//             console.log(this.consumerApplicationDetail.consumerApplicationNo, "this.consumerApplicationDetail.consumerApplicationNo");


//             this.consumerApplicationService.getConsumerApplicationDetailsByApplicationNumber(this.consumerApplicationDetail.consumerApplicationNo).subscribe((res: any) => {
//                 console.log(res, "ggggggggggggggttttttttttt////////////////////||||||||||||||||||||||||||");
//                 console.log(this.ParentFinalLoad, "ParentFinalLoad,,,,,,,,,,,,,,,,,,,");

//                 // return
//                 if (res.code == "200") {
//                     loadAddup = res.list[0].loadRequested;
//                     console.log(loadAddup, "rrrrrrrrrrrrrrttttttuuuuuuuuu......................");
//                     console.log(this.empFormForMkmy.value.employeesForMkmy, "controlssssssssssssssssssssssssss");
//                     for (let x = 0; x < this.empFormForMkmy.value.employeesForMkmy.length; x++) {
//                         loadAddup = JSON.parse(loadAddup) + JSON.parse(this.empFormForMkmy.value.employeesForMkmy[x].load);
//                         // this.empFormForMkmy.value.employeesForMkmy.value[x].parentApplicationNumber=this.consumerApplicationDetail.consumerApplicationNo;

//                     }
//                     console.log(loadAddup, "loadAddup.....................");
//                     if (loadAddup < 3 || loadAddup > 100) {
//                         this.notificationService.error("संबंधित भार ३ HP से १०० HP के मध्य दर्ज करे");
//                         return;
//                     }

//                     //संबंधित दूरी 1m से 200m के मध्य दर्ज करे
//                     console.log(loadAddup, "pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp......1st..............");
//                     this.mkmySurveyForm = this.fb.group({
//                         loadConfirmationForMkmy: [loadAddup, Validators.required],
//                         jeLoadUnitNew: ['HP', Validators.required]
//                     })
//                     this.loadAddupVar = loadAddup;

//                     let formData: FormData = new FormData();
//                     formData.append('applicationNumber', this.consumerApplicationDetail.consumerApplicationNo);
//                     formData.append('mmkyParentChildData', JSON.stringify(this.MkmySurveyPayload));
//                     formData.append('MmkyLoad', this.loadAddupVar);
//                     formData.append('KvDistance', this.empFormForMkmy.value.KvDistance);
//                     formData.append('dtr', this.empFormForMkmy.value.dtr);
//                     formData.append('cutPoint', this.empFormForMkmy.value.cutpoint);

//                     //cutPoint

//                     console.log(formData, "formData....////////");



//                     this.consumerApplicationService.SubmitMkmySurvey(formData).subscribe((response: any) => {
//                         console.log(response, "response.............response//////////////////////");
//                         if (response.code == "200") {
//                             this.notificationService.success("Data submitted successfully !");
//                             this.closeWrittenDiv = true;
//                             // this.ParentApplicationBoolean = true;



//                         } else {
//                             this.notificationService.warn("something went wrong !");
//                             this.closeWrittenDiv = false;
//                             // this.ParentApplicationBoolean = false;
//                             return;
//                         }

//                     })

//                     // this.mkmySurveyForm.patchValue({
//                     //     loadConfirmationForMkmy: loadAddup,
//                     //     jeLoadUnitNew: ''
//                     // })
//                 }
//             })



//         }





//     }

//     getSamagraDetails(event: any, e: any) {
//         console.log(event, "evvveeennntntttt");
//         console.log(this.empForm.value, "formValue.....");
//         let smgId = this.empForm.value.employees[e].samagraId;
//         console.log(smgId, "ffffiiiinnnaaallllyyy");


//         console.log(e, "iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii", this.samgraInputNumber, "................");

//         let abc = {
//             memberId: smgId
//         };

//         this.newApplicationService
//             .getMukhyaMantriYojnaConsumerApplicationDetails(abc)
//             .subscribe((data: any) => {
//                 console.log(data, "ddataatata");
//                 // console.log(this.empForm.controls.employees.get('e').value,"this.empForm[e].value????????????????????");
//                 if (data.statusCodeValue == 200) {

//                     console.log("200 aayyyayyaa");
//                     const formArray = this.empForm.get('employees') as FormArray
//                     const formGroup = formArray.at(e) as FormGroup;
//                     console.log(formGroup, "formGroup''''''''''''''''''''''''''''''''''");

//                     formGroup.patchValue({
//                         consumerName: data.body[0].Name,
//                         guardianName: data.body[0].fatherName
//                     })
//                 } else {
//                     const formArray = this.empForm.get('employees') as FormArray
//                     const formGroup = formArray.at(e) as FormGroup;
//                     console.log(formGroup, "formGroup''''''''''''''''''''''''''''''''''");
//                     this.notificationService.warn(" Invalid Samagra-id ! please fill correct samagra id")
//                     formGroup.reset();
//                 }
//             })
//     }

//     GroupPeopleCommonFile(e: any) {
//         console.log(e.target.files[0], "e.target.files[0] for khasra-khatoni file");

//         this.groupPeopleCommonFile = e.target.files[0];
//         //this.khasraKhatonifileLength = e.target.files.length;

//         if (e.target.files[0].type == "application/pdf" && e.target.files[0].size <= 2000000) {
//             this.groupCommonFileBoolean = false;
//         } else {
//             this.groupCommonFileBoolean = true;
//             this.notificationService.warn("please choose file 'pdf' type and size must be less than '2MB'")
//         }
//     }

//     submitgroup() {

//         if (this.groupPeopleCommonFile == undefined) {
//             this.notificationService.error("! Please select file first")
//             return
//         } else if (this.groupCommonFileBoolean == true) {
//             this.notificationService.error("  file must be 'pdf' type and size must be less than '2MB'");
//             return;
//         }
//         this.submitGroupVar = true;
//         if (this.empForm.invalid) {
//             this.notificationService.error('Invalid Group Form !')
//             this.FormArrayBooleanVariable = true;
//             return
//         } else {
//             // let abc = this.selectForm.value.individualOrGroupId;

//             this.FormArrayBooleanVariable = false;
//             this.notificationService.success('group form added successfully');
//             console.log(this.empForm.value.employees, "controlssssssssssssssssssssssssss");
//             this.listOfFormArray = this.empForm.value.employees
//             console.log(" this.listOfFormArray..........", this.listOfFormArray);
//             this.SubmitFormArraySurvey.listofGroupOfChildPeople = this.listOfFormArray;
//             this.SubmitFormArraySurvey.ParentConsumerApplicationNumber = this.consumerApplicationDetail.consumerApplicationNo;
//             console.log(this.SubmitFormArraySurvey, " this.SubmitFormArraySurveyoooooooooooooooooooooooooooooooooo>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
//             this.FormArrayPayload.individualOrGroupId = this.selectForm.value.individualOrGroupId;
//             this.FormArrayPayload.samagraListDto = this.listOfFormArray;
//             //consumerApplicattionMmky
//             //  console.log(this.SubmitFormArraySurvey, " this.SubmitFormArraySurveyoooooooooooooooooooooooooooooooooo>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
//             let formData: FormData = new FormData();
//             formData.append('consumerApplicattionOyt', JSON.stringify(this.FormArrayPayload));
//             formData.append('consumerApplicationNO', this.SubmitFormArraySurvey.ParentConsumerApplicationNumber);
//             formData.append('docGroupPeopleCommonFile', this.groupPeopleCommonFile);

//             console.log(formData, "zzzzzzzzzzzzzzzzzzzzzzz");

//             this.consumerApplicationService.FormArrayPostForOytSurvey(formData).subscribe((response: any) => {
//                 console.log(response, "response");
//                 if (response.code == "200") {
//                     this.notificationService.success("data added successfully");
//                     this.ChooseGroupSubmit = true;
//                 } else {
//                     this.notificationService.warn('somethin went wrong !');
//                     return
//                 }

//             })


//         }
//     }


//     BuildLoadForm() {
//         this.LoadConfirmationForm = this.fb.group({
//             jeLoad: [this.consumerApplicationDetail?.jeLoad, Validators.required],
//             jeLoadUnit: ['', Validators.required],
//             loadConfirmation: ['', Validators.required]
//         })
//     }

//     BuildFormForColonyIlegalLoad() {
//         this.LoadConfirmationForColonyIllegalForm = this.fb.group({
//             loadConfirmationForColonyIllegal: ['', Validators.required],
//             jeLoadUnitNew: ['', Validators.required],
//             loadConfirmation: ['', Validators.required]
//         })
//     }


//     BuildNscLoadEnhancementOytForm() {
//         this.nscLoadEnhancementOytForm = this.fb.group({
//             loadConfirmationForNsc: ['', Validators.required],
//             jeLoadUnitNew: ['', Validators.required]
//         })
//     }

//     BuildMkmyForm() {
//         this.mkmySurveyForm = this.fb.group({
//             loadConfirmationForMkmy: ['', Validators.required],
//             jeLoadUnitNew: ['', Validators.required]
//         })
//     }

//     OnLoadForMkmySubmit() {

//         if (this.checkUpdateBoolean == false) {
//             this.notificationService.error("! Please fill the Main Application Details First");
//             return
//         }

//         if (this.mkmySurveyForm.invalid) {
//             this.notificationService.error('कृपया पहले भार दर्ज कीजिये।');
//             return;
//         }
//         // else if(this.mkmySurveyForm.value.loadConfirmationForMkmy<3 || this.mkmySurveyForm.value.loadConfirmationForMkmy>100){
//         //     this.notificationService.error("! Load must be between 3HP and 100HP ");
//         //     return
//         // }
//         else {

//             if (this.mkmySurveyForm.value.loadConfirmationForMkmy < 3) {
//                 this.notificationService.error("Load can't be negative ! Please Enter Valid Load");
//                 return
//             }

//             //   this.loadPatchValue = this.mkmySurveyForm.value.loadConfirmationForMkmy
//             this.consumerApplicationService.LoadConfirmationSurveySubmit(this.consumerApplicationDetail?.consumerApplicationNo,
//                 this.mkmySurveyForm.value.loadConfirmationForMkmy,
//                 this.mkmySurveyForm.value.jeLoadUnitNew).subscribe((mkmyData: any) => {
//                     console.log(mkmyData, "mkmyData...............///////");
//                     if (mkmyData.code == 200) {
//                         this.notificationService.success('Data Updated Successfully');
//                         this.mkmySubmitBoolean = true;
//                         // this.loadPatchValue = this.mkmySurveyForm.value.loadConfirmationForMkmy;
//                         // this.empFormForMkmy = this.fb.group({
//                         //     mkmyLoad:[this.loadPatchValue,Validators.required],  //mkmySurveyForm  //loadConfirmationForMkmy
//                         //     KvDistance:["",Validators.required],
//                         //     dtr:["",Validators.required],
//                         //     cutpoint:["",Validators.required],
//                         //     employeesForMkmy: this.fb.array([]),
//                         // });

//                     } else {
//                         this.notificationService.warn('something went wrong');
//                         this.mkmySubmitBoolean = false;

//                     }
//                 })
//         }
//     }

//     OnLoadForNscSubmit() {


//         if (this.nscLoadEnhancementOytForm.value.loadConfirmationForNsc < 0) {
//             this.notificationService.error("Load can't be negative ! Please Enter Valid Load");
//             return
//         }
//         if (this.consumerApplicationDetail.natureOfWorkType.natureOfWorkTypeId == 7 && this.LineShiftingReturnAmountFormBoolean == false) {
//             this.notificationService.error("! अगर प्राकलन में वापसी योग्य राशि है तो कृपया राशि दर्ज करे|");
//             return;
//         }
//         if (this.consumerApplicationDetail.natureOfWorkType.natureOfWorkTypeId == 2 && this.LineShiftingReturnAmountFormBoolean == false) {
//             this.notificationService.error("! अगर प्राकलन में वापसी योग्य राशि है तो कृपया राशि दर्ज करे|");
//             return;
//         }
//         if (this.nscLoadEnhancementOytForm.invalid) {
//             this.notificationService.error('form is invalid ! Please choose Load first ');
//             return;
//         } else {
//             this.consumerApplicationService.LoadConfirmationSurveySubmit(this.consumerApplicationDetail?.consumerApplicationNo,
//                 this.nscLoadEnhancementOytForm.value.loadConfirmationForNsc,
//                 this.nscLoadEnhancementOytForm.value.jeLoadUnitNew).subscribe((nscData: any) => {
//                     console.log(nscData, "nscData...............///////");
//                     if (nscData.code == 200) {
//                         this.notificationService.success('Data Updated Successfully');
//                         this.NscSubmitBoolean = true;

//                     }else{
//                         this.notificationService.warn('something went wrong');
                        
//                         this.NscSubmitBoolean = false
//                     }
//                 })
//         }
//     }

//     OnLoadForColonyIllegalSubmit() {
//         console.log(this.LoadConfirmationForColonyIllegalForm.value, "this.LoadConfirmationFormbbbbbbbbbbbbbbbbbbbbbb");

//         if (this.LoadConfirmationForColonyIllegalForm.invalid) {
//             this.notificationService.error('form is invalid ! Please choose Load first ');

//             return
//         }
//         else {

//             if (this.LoadConfirmationForColonyIllegalForm.value.loadConfirmation == "YES" && this.LoadConfirmationForColonyIllegalForm.value.loadConfirmationForColonyIllegal > 400) {
//                 this.notificationService.error("आपके द्वारा भार से संबंधित विकल्प का त्रुटिपूर्ण चयन किया गया है।कृपया सही चयन करे।");
//                 return
//             }
//             if (this.LoadConfirmationForColonyIllegalForm.value.loadConfirmation == "NO" && this.LoadConfirmationForColonyIllegalForm.value.loadConfirmationForColonyIllegal <= 400) {
//                 this.notificationService.error("आपके द्वारा भार से संबंधित विकल्प का त्रुटिपूर्ण चयन किया गया है।कृपया सही चयन करे।");
//                 return
//             } else {

//                 //loadConfirmation
//                 this.consumerApplicationService.LoadConfirmationSurveySubmit(this.consumerApplicationDetail?.consumerApplicationNo,
//                     this.LoadConfirmationForColonyIllegalForm.value.loadConfirmationForColonyIllegal,
//                     this.LoadConfirmationForColonyIllegalForm.value.jeLoadUnitNew).subscribe((data: any) => {
//                         console.log(data, "ttttttttttttt77777777ttttttt777777tttttt");
//                         if (data.code == 200) {
//                             this.notificationService.success('Data Updated Successfully');
//                             this.ShowingErrorVal = true;
//                             this.ShowingErrorValForOtherButtonsCheck = false;

//                         }
//                     })
//             }
//         }
//     }

//     OnLoadSubmit() {
//         console.log(this.LoadConfirmationForm.value, "this.LoadConfirmationFormbbbbbbbbbbbbbbbbbbbbbb");
//         if (this.LoadConfirmationForm.invalid) {
//             this.notificationService.error('form is invalid ! Please fill Load, Select Unit and choose Load Conformation ');
//             return
//         }
//         else {
//             console.log(this.LoadConfirmationForm.value.loadConfirmation, "lllll     ", this.LoadConfirmationForm.value.jeLoad);
//             if (this.LoadConfirmationForm.value.jeLoad < 0) {
//                 this.notificationService.error("Load can't be negative ! Please Enter Valid Load");
//                 return
//             }

//             if (this.LoadConfirmationForm.value.loadConfirmation == "YES" && this.LoadConfirmationForm.value.jeLoad > 1500) {
//                 this.notificationService.error("आपके द्वारा भार से संबंधित विकल्प का त्रुटिपूर्ण चयन किया गया है।कृपया सही चयन करे।");
//                 return
//             }
//             if (this.LoadConfirmationForm.value.loadConfirmation == "NO" && this.LoadConfirmationForm.value.jeLoad <= 1500) {
//                 this.notificationService.error("आपके द्वारा भार से संबंधित विकल्प का त्रुटिपूर्ण चयन किया गया है।कृपया सही चयन करे।");
//                 return
//             } else {
//                 this.consumerApplicationService.LoadConfirmationSurveySubmit(this.consumerApplicationDetail?.consumerApplicationNo, JSON.stringify(this.LoadConfirmationForm.value.jeLoad), this.LoadConfirmationForm.value.jeLoadUnit).subscribe((data: any) => {
//                     console.log(data, "ttttttttttttt77777777ttttttt777777tttttt");
//                     if (data.code == 200) {
//                         this.notificationService.success('Data Updated Successfully');
//                         this.loadConfirmationBoolean = true;
//                         this.ExtraaButtonValidationCheck = false;
//                     }

//                 })

//             }


//         }

//     }


//     loadForm() {
//         this.applicationServeyFg = this.fb.group({
//             consumerApplicationId: ['', Validators.compose([Validators.required])],
//             // isRejected: ['', Validators.compose([Validators.required])],
//             // rejectedRemark: [''],
//             // surveyDate: ['', Validators.required],
//             erpEstimateNo: ['', Validators.required]
//         });

//     }

//     loadForm1() {
//         this.applicationServeyErpFg = this.fb.group({
//             cb: [false],
//             erpNo: ['', Validators.required],

//         });
//         console.log('load Form1 ===============');
//     }

//     loadFormMkmy() {
//         //applicationServeyErpFgOfMkmy
//         this.applicationServeyErpFgOfMkmy = this.fb.group({
//             erpNo: ['', Validators.required],

//         });
//         console.log('load Form1 ===============');   //this.applicationServeyErpFgOfMkmy.value.erpNo
//     }



//     loadFormCheckBox() {
//         this.applicationServeyCheckBoxFg = this.fb.group({
//             cb: [''],
//             estimateFile: ['', Validators.required]

//         });
//     }

//     loadEditForm(consumerSurveyData) {

//         console.log('consumerSurveyData:::', consumerSurveyData);
//         const surveyDateStr = moment(consumerSurveyData['surveyDate'], "DD-MM-YYYY").format();
//         this.applicationServeyFg.controls['surveyDate'].setValue(consumerSurveyData['surveyDate']);

//         if (consumerSurveyData['surveyStatus'] == "REJECTED") {
//             this.applicationServeyFg.controls['isRejected'].setValue('true');
//             this.applicationServeyFg.controls['rejectedRemark'].setValue(consumerSurveyData['rejectedReason']);
//         } else {
//             this.applicationServeyFg.controls['isRejected'].setValue('false');
//         }
//         if (this.crudType == CrudType.update) {
//             this.surveyRequired = false;
//         }

//     }


//     surveyUpload() {
//         if (this.surveyDocElement.nativeElement.files[0] != undefined) {
//             this.surveyDoc = this.surveyDocElement.nativeElement.files[0];
//             this.surveyUploaded = true;
//             this.surveyFileName = this.surveyDoc.name;
//         }
//     }

//     get applicationSurveyFormControls() {
//         return this.applicationServeyFg.controls;
//     }


//     onIsRejectedChange(ob: MatRadioChange) {


//         let mrButton: MatRadioButton = ob.source;

//         var isApplicationRejected: boolean;
//         if (mrButton.value == "true") {
//             isApplicationRejected = true;
//         } else if (mrButton.value == "false") {
//             isApplicationRejected = false;
//         }


//         if (isApplicationRejected) {

//             console.log("true ----gmc changed radio value: " + ob.value);
//             // this.isRejected = true;

//         } else if (!isApplicationRejected) {

//             console.log("false ----gmc changed radio value: " + ob.value);
//             this.applicationServeyFg.controls['rejectedRemark'].clearValidators();
//             this.applicationServeyFg.controls['rejectedRemark'].setValue('');
//             // this.isRejected = false;




//         } else {
//             console.log("some other value:  " + ob.value);
//         }
//     }

//     getFile(uploadId) {

//         console.log("upload Id: " + uploadId);

//         this.consumerApplicationService.getFile(uploadId).pipe(takeUntil(this.unsubscribe$)).subscribe(
//             (file: HttpResponse<Blob>) => {
//                 this.downloadFile(file);
//             }
//         );

//     }

//     downloadFile(file) {
//         if (file.body.size > 3) {
//             window.location.href = file.url
//         } else {
//             this.notificationService.warn('No data available')
//         }
//     }

//     onClose() {
//         this.dialogRef.close();
//     }

//     onSubmit() {
//         console.log('submit button clicked');
//         this.isFormSubmit = true;

//         // if (this.surveyRequired && !this.surveyUploaded) {
//         //     return;
//         // }
//         console.log('this.applicationServeyFg.value', this.applicationServeyFg.value);

//         const applicationServeyData = this.applicationServeyFg.value;
//         console.log('formData :- ', this.applicationServeyFg.value.erpEstimateNo);
//         console.log('consumerApplication id', this.consumerApplicationDetail.consumerApplicationId);
//         this.consumerApplicationService.erpStatusData(this.applicationServeyFg.value.erpEstimateNo, this.consumerApplicationDetail.consumerApplicationId).subscribe(data => {
//             if (data['code'] == "200") {
//                 console.log('111111111111111111111111', data['list']);

//                 this.EstimateStatusList = data['list'];
//                 this.notificationService.success(data['message']);
//             } else if (data['code'] == "406") {

//                 this.notificationService.warn(data['message'])
//                 //    this.EstimateStatusList=data['null'];
//                 //   this.notificationService.error(data['message']);
//                 // this.notificationService.error("Data not found");
//             }

//         }, (error) => {

//         });

//     }

//     async ngOnDestroy() {
//         this.unsubscribe$.next();
//         this.unsubscribe$.complete();
//     }


//     ////////  mkmy start///////

//     erpEstimatGenrateOfMkmy() {

//         if (this.mkmySubmitBoolean == false) {
//             this.notificationService.error(" कृपया पहले लोड भार सबमिट करे ");
//             return
//         }

//         if (this.consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId == 8) {
//             if (this.displayInputFieldValForMkmy == undefined) {
//                 this.notificationService.warn(' कृपया पहले आवेदन का प्रकार का चयन करें !');
//                 return
//             }
//             else if (this.displayInputFieldValForMkmy == 2 && this.closeWrittenDiv == false) {
//                 this.notificationService.error('! Please fill group information first');
//                 return
//             }

//         }

//         console.log(this.applicationServeyErpFgOfMkmy.value.erpNo, "this.applicationServeyErpFgOfMkmy.value.erpNo");

//         if (this.applicationServeyErpFgOfMkmy.invalid) {
//             this.notificationService.error('Invalid Form !');
//             return
//         } else {
//             this.consumerApplicationService.getErpDetailsByErpNumber(JSON.parse(this.applicationServeyErpFgOfMkmy.value.erpNo), this.consumerApplicationDetail?.consumerApplicationNo).subscribe((data: any) => {
//                 console.log(data, "Mkmy........Data.....................");
//                 if (data.code == "200") {
//                     this.erpEstimateDataForMkmyArray = data.list;
//                     this.mkmyerpConfirmationVariable = true
//                     this.erpNoOfMkmyVariable = this.applicationServeyErpFgOfMkmy.value.erpNo;
//                     this.notificationService.success("Data retrive Successfully");
//                 }else if(data.code=="307"){
//                     let messageFirst = "Amount more than the sanction estimate amount 195972 for for 25 DTR";
//                     let messageSecond = "Amount more than the sanction estimate amount 195972 for for 63 DTR";
//                     if(data.message===messageFirst){
//                       this.notificationService.warn("25 डीटीआर के लिए स्वीकृत प्राक्कलन राशि 195972 से अधिक राशि है।")
//                     }
//                     else if(data.message===messageSecond){
//                       this.notificationService.warn('63 डीटीआर के लिए स्वीकृत प्राक्कलन राशि 337173 से अधिक राशि है।')
//                     }
//                     return
//                 }else if(data.code=="406"){
//                     this.notificationService.error("This ERP Number Is Already Associated With Another Application Number.");
//                     return
//                 }
//                  else {
//                     this.notificationService.warn("आपके द्वारा दर्ज ERP No संबंधित स्कीम से संबंधित नही है।");
//                     return;
//                 }
//                 // this.erpEstimateDataForMkmyArray = data.list[0];
//                 // this.mkmyerpConfirmationVariable = true
//                 // this.erpNoOfMkmyVariable = this.applicationServeyErpFgOfMkmy.value.erpNo

//             })
//         }

//     }

//     //////// mkmy end ////////


//     erpEstimatGenrate() {
//         if (this.consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId == 5) {
//             console.log(this.displayInputFieldVal,"this.displayInputFieldVal......");
//             if(this.NscSubmitBoolean == false){
//                 this.notificationService.warn("Please Load Submit First !");
//                 return
//             }
            
//             if (this.displayInputFieldVal == undefined) {
//                 this.notificationService.warn('आवेदन का प्रकार का चयन करें !');
//                 return
//             }
//             else if (this.displayInputFieldVal == 2 && this.ChooseGroupSubmit == false) {
//                 this.notificationService.error('! Please fill group information first');
//                 return
//             }else{

//             }

//         }

//         if (this.consumerApplicationDetail?.natureOfWorkType?.natureOfWorkTypeId == 8) {
//             if (this.displayInputFieldValForMkmy == undefined) {
//                 this.notificationService.warn('आवेदन का प्रकार का चयन करें !');
//                 return
//             }
//             else if (this.displayInputFieldValForMkmy == 2 && this.closeWrittenDiv == false) {
//                 this.notificationService.error('! Please fill group information first');
//                 return
//             }

//         }



//         if (this.consumerApplicationDetail.natureOfWorkType.natureOfWorkTypeId == 8 && this.mkmySubmitBoolean == false) {
//             this.notificationService.error("! Please choose Load first ...");
//             return;
//         }

//         if (this.consumerApplicationDetail.natureOfWorkType.natureOfWorkTypeId == 6 && this.LineShiftingReturnAmountFormBoolean == false) {
//             this.notificationService.error("! अगर प्राकलन में वापसी योग्य राशि है तो कृपया राशि दर्ज करे|");
//             this.ReturnAmtBooleanOpen = true;
//             return
//         }

//         if (this.consumerApplicationDetail.natureOfWorkType.natureOfWorkTypeId == 2 && this.LineShiftingReturnAmountFormBoolean == false) {
//             this.notificationService.error("! अगर प्राकलन में वापसी योग्य राशि है तो कृपया राशि दर्ज करे|");
//             this.ReturnAmtBooleanOpen = true;
//             return
//         }

//         if (this.consumerApplicationDetail.natureOfWorkType.natureOfWorkTypeId == 1 && this.LineShiftingReturnAmountFormBoolean == false) {
//             this.notificationService.error("! अगर प्राकलन में वापसी योग्य राशि है तो कृपया राशि दर्ज करे |");
//             this.ReturnAmtBooleanOpen = true;
//             return
//         }

//         if (this.consumerApplicationDetail.natureOfWorkType.natureOfWorkTypeId == 7 && this.LineShiftingReturnAmountFormBoolean == false) {
//             this.notificationService.error("! अगर प्राकलन में वापसी योग्य राशि है तो कृपया राशि दर्ज करे |");
//             this.ReturnAmtBooleanOpen = true;
//             return
//         }

//         if (this.consumerApplicationDetail.natureOfWorkType.natureOfWorkTypeId == 3 && this.loadConfirmationBoolean == false) {
//             this.notificationService.error('please confirm Load required first');
//             this.ExtraaButtonValidationCheck = true;
//             return
//         } else if (this.consumerApplicationDetail.natureOfWorkType.natureOfWorkTypeId == 4 && this.ShowingErrorVal == false) {
//             this.notificationService.error('please confirm Load required first');
//             this.ShowingErrorValForOtherButtonsCheck = true;
//             return
//         }
//         else if ((this.consumerApplicationDetail.natureOfWorkType.natureOfWorkTypeId == 2 && this.NscSubmitBoolean == false)) {
//             this.notificationService.error('please confirm Load required first');
//             this.ShowingErrorValForOtherButtonsCheckForNsc = true;
//             return
//         }
//         else {
//             this.ReturnAmtBooleanOpen = false;
//             this.ExtraaButtonValidationCheck = false;
//             this.ShowingErrorValForOtherButtonsCheck = false;
//             this.ShowingErrorValForOtherButtonsCheckForNsc = false;
//             console.log(this.applicationServeyErpFg.controls.erpNo.value, "erpEstimatGenrate method  erpEstimatGenrate method");
//             console.log('ccccccccccccccccccccccccccccc', this.consumerApplicationDetail.consumerApplicationId);
//             this.consumerApplicationService.getErpEstimateAmount(this.applicationServeyErpFg.controls.erpNo.value, this.consumerApplicationDetail.consumerApplicationId,1).subscribe(data => {
//                 if (data['code'] == "200") {
//                     console.log('222222222222', data['list']);
//                     this.erpConfirmationVariable = true;
//                     this.storedErpNo = this.applicationServeyErpFg.controls.erpNo.value
//                     this.EstimateAmount = data['list'];
//                     this.notificationService.success(data['message']);
//                 }else if(data['code'] == "406" && data['message']=="Scheme code not matched"){
//                     this.notificationService.error("आपके द्वारा दर्ज ERP No संबंधित स्कीम से संबंधित नही है।");
//                     return
//                 }
//                  else if (data['code'] == "406" && data['message']=="Estimate is wrongly created in ERP") {
//                     this.notificationService.warn("ERP में एस्टीमेट गलत बनाया गया है।");
//                     return
//                 }
//                 else {
//                     this.notificationService.error(data['message']);
//                     return
//                 }
//             }, (error) => {
//             });
//         }
//     }

//     checkboxMkmyChane(e: any) {
//         console.log(e, "wwwwwwwwwweeeeeeeeeeeeeeeee.......................");

//     }

//     checkValue( e: any) {
//         let number = document.getElementById("returnAmount");
//         //number.onkeydown = function(e) {
//         if (
//           !(
//             (e.keyCode > 95 && e.keyCode < 106) ||
//             (e.keyCode > 47 && e.keyCode < 58) ||
//             e.keyCode == 8
//           )
//         ) {
//           return false;
//         }
//         // }
//       }

//     mkmycheckBoxTureCompalsury() {
//         if (this.mkmyValidatedFormForErpEstimate.invalid) {
//             // alert("mkmyEstimateForm is invalid !");
//             this.notificationService.error("! invalid Form");
//             return
//         } else if (this.mkmyFietypeValidators == true) {
//             this.notificationService.error('file must be pdf only');
//             return
//         } else if (this.mkmyFilesizeValidators == true) {
//             this.notificationService.error(' file must be less than 2MB');
//             return
//         }
//         else {
//             // alert("form submitted successfully !");
//             let formData: FormData = new FormData();
//             formData.append("docEstimate", this.mkmyFile);

//             var today = new Date();
//             var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
//             //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//             let hour = today.getHours();
//             // console.log(hour, "hour");
//             const minutes = today.getMinutes();
//             // console.log(minutes, "minutes");
//             const seconds = today.getSeconds();
//             // console.log(seconds, "seconds");
//             let prepand = (hour >= 12) ? "PM" : "AM";
//             hour = (hour >= 12) ? hour - 12 : hour;
//             if (hour === 0 && prepand === 'PM') {
//                 if (minutes === 0 && seconds === 0) {
//                     hour = 12;
//                     prepand = "Noon"
//                 } else {
//                     hour = 12;
//                     prepand = "PM"
//                 }
//             }
//             if (hour === 0 && prepand === 'AM') {
//                 if (minutes === 0 && seconds === 0) {
//                     hour = 12;
//                     prepand = 'Midnight'
//                 } else {
//                     hour = 12;
//                     prepand = "AM"
//                 }
//             }
//             var time = `${hour} ${prepand} : ${minutes} : ${seconds}`
//             // console.log(`current time is => ${hour} ${prepand} : ${minutes} : ${seconds}`);
//             var dateTime = JSON.stringify(date) + ' ' + JSON.stringify(time);
//             // console.log(dateTime);

//             // let scheduleSurveyDate = JSON.stringify(date);
//             // let scheduleSurveyTime = JSON.stringify(time);
//             let scheduleSurveyDate = date;
//             let scheduleSurveyTime = time;
//             console.log(scheduleSurveyDate, "scheduleSurveyDate", scheduleSurveyTime, "scheduleSurveyTime");
//             let surveyorName: any = this.userDataAll.userName
//             let surveyorMobile: any = this.userDataAll.mobileNo;

//             this.consumerApplicationService.updateConsumerApplicationStatus(this.consumerApplicationDetail.consumerApplicationId, scheduleSurveyDate, scheduleSurveyTime, surveyorName, surveyorMobile, formData).subscribe(data => {
//                 if (data['code'] == "200") {
//                     console.log('111111111111111111111111', data['list']);
//                     this.mkmyerpConfirmationVariable = false;
//                     this.notificationService.success(data['message']);
//                     this.mkmyValidatedBoolean = true
//                     this.onClose();
//                 } else {
//                     this.notificationService.error("Data not found");
//                 }
//             }, (error) => {
//                 this.notificationService.warn("Something went wrong !")
//             });
//         }
//     }

//     checkBoxTureCompalsury() {

//         if (this.consumerApplicationDetail.natureOfWorkType.natureOfWorkTypeId == 3 && this.loadConfirmationBoolean == false) {
//             this.notificationService.error('please confirm Load required first');
//             this.ExtraaButtonValidationCheck = true;
//             return
//         } else if (this.consumerApplicationDetail.natureOfWorkType.natureOfWorkTypeId == 4 && this.ShowingErrorVal == false) {
//             this.notificationService.error('please confirm Load required first');
//             this.ShowingErrorValForOtherButtonsCheck = true;
//             return
//         } else if (this.consumerApplicationDetail.natureOfWorkType.natureOfWorkTypeId == 2 && this.NscSubmitBoolean == false) {
//             this.notificationService.error('please confirm Load required first');
//             this.ShowingErrorValForOtherButtonsCheckForNsc = true;
//             return
//         }
//         else {
//             this.ExtraaButtonValidationCheck = false;
//             this.ShowingErrorValForOtherButtonsCheck = false;
//             this.ShowingErrorValForOtherButtonsCheckForNsc = false;
//             if (this.applicationServeyCheckBoxFg.invalid) {
//                 this.notificationService.error('Please choose estimate file first(file must be pdf only and file must be less than 2MB) & Select CheckBox.');
//                 return
//             } else if (this.file == undefined) {
//                 this.notificationService.warn("! Please  choose file first")
//                 return;

//             }
//             else if (this.fietypeValidators == true) {
//                 this.notificationService.error('file must be pdf only');
//                 return
//             } else if (this.filesizeValidators == true) {
//                 this.notificationService.error(' file must be less than 2MB');
//                 return
//             }

//             let formData: FormData = new FormData();
//             formData.append("docEstimate", this.file);





//             // console.log(this.applicationServeyCheckBoxFg.controls.cb.value, 'checkBoxTureCompalsury');
//             if (this.applicationServeyCheckBoxFg.controls.cb.value == false) {
//                 this.notificationService.error('please select check box');
//             } else {
//                 var today = new Date();
//                 var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
//                 //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//                 let hour = today.getHours();
//                 // console.log(hour, "hour");
//                 const minutes = today.getMinutes();
//                 // console.log(minutes, "minutes");
//                 const seconds = today.getSeconds();
//                 // console.log(seconds, "seconds");
//                 let prepand = (hour >= 12) ? "PM" : "AM";
//                 hour = (hour >= 12) ? hour - 12 : hour;
//                 if (hour === 0 && prepand === 'PM') {
//                     if (minutes === 0 && seconds === 0) {
//                         hour = 12;
//                         prepand = "Noon"
//                     } else {
//                         hour = 12;
//                         prepand = "PM"
//                     }
//                 }
//                 if (hour === 0 && prepand === 'AM') {
//                     if (minutes === 0 && seconds === 0) {
//                         hour = 12;
//                         prepand = 'Midnight'
//                     } else {
//                         hour = 12;
//                         prepand = "AM"
//                     }
//                 }
//                 var time = `${hour} ${prepand} : ${minutes} : ${seconds}`
//                 // console.log(`current time is => ${hour} ${prepand} : ${minutes} : ${seconds}`);
//                 var dateTime = JSON.stringify(date) + ' ' + JSON.stringify(time);
//                 // console.log(dateTime);

//                 // let scheduleSurveyDate = JSON.stringify(date);
//                 // let scheduleSurveyTime = JSON.stringify(time);
//                 let scheduleSurveyDate = date;
//                 let scheduleSurveyTime = time;
//                 console.log(scheduleSurveyDate, "scheduleSurveyDate", scheduleSurveyTime, "scheduleSurveyTime");
//                 let surveyorName: any = this.userDataAll.userName
//                 let surveyorMobile: any = this.userDataAll.mobileNo

//                 this.consumerApplicationService.updateConsumerApplicationStatus(this.consumerApplicationDetail.consumerApplicationId, scheduleSurveyDate, scheduleSurveyTime, surveyorName, surveyorMobile, formData).subscribe(data => {
//                     if (data['code'] == "200") {
//                         console.log('111111111111111111111111', data['list']);
//                         this.consumerApplicationService.getErpEstimateAmount(this.storedErpNo, this.consumerApplicationDetail.consumerApplicationId,2).subscribe((resp:any)=>{
//                             console.log(resp,"ressssspppppppppppppppppppppppppppppp.......................................................");
//                             if (resp['code'] == "200"){
//                                 this.erpConfirmationVariable = false;
//                                 this.notificationService.success(data['message']);
//                                 this.onClose();
//                             }else{
//                                 this.notificationService.warn(resp['message'])
//                             }
                            
//                         })
                       
//                     } else {
//                         // this.EstimateStatusList = null;

//                         this.notificationService.error("Data not found");

//                     }

//                 }, (error) => {

//                 });


//             }
//         }



//     }

//     erpEstimatDawnload() {
//         console.log('this.consumerApplicationDetail.erpWorkFlowNumber', this.consumerApplicationDetail.erpWorkFlowNumber)
//         this.consumerApplicationService.getErpEstimatePDF(this.consumerApplicationDetail.erpWorkFlowNumber);
//     }


//     onFileChanged(event: any) {


//         this.file = event.target.files[0];

//         if (
//             this.file.type == "application/pdf"
//         ) {
//             this.fietypeValidators = false;
//         } else {
//             this.fietypeValidators = true;
//         }
//         if (this.file.size > 2000000) {
//             this.filesizeValidators = true;
//         } else {
//             this.filesizeValidators = false;
//         }
//     }

//     onFileChangedMkmy(event: any) {
//         this.mkmyFile = event.target.files[0];

//         if (
//             this.mkmyFile.type == "application/pdf"
//         ) {
//             this.mkmyFietypeValidators = false;
//         } else {
//             this.mkmyFietypeValidators = true;
//         }
//         if (this.mkmyFile.size > 2000000) {
//             this.mkmyFilesizeValidators = true;
//         } else {
//             this.mkmyFilesizeValidators = false;
//         }
//     }

// }












