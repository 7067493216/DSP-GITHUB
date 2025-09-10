import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NewApplicationService } from "../services/new-application.service";
import { NotificationService } from "src/app/shared-services/notification.service";
import { MkmyYojnaPayLoad } from "../../dashboard/models/mkmyYojna";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { analyzeAndValidateNgModules } from "@angular/compiler";

@Component({
  selector: "app-mukhya-mantri-krishak-yojna-form",
  templateUrl: "./mukhya-mantri-krishak-yojna-form.component.html",
  styleUrls: ["./mukhya-mantri-krishak-yojna-form.component.css"],
})
export class MukhyaMantriKrishakYojnaFormComponent {
  @ViewChild("componentView", { static: true }) componentView: ElementRef;
  pmmkyFormSb: FormGroup;
  selectForm: FormGroup;
  empForm: FormGroup;
  payLoadData: MkmyYojnaPayLoad = new MkmyYojnaPayLoad();
  submitted: boolean = false;
  powtibtnHidden: boolean = false;
  loadRequestList: Array<any> = [];
  schemeTypeList: Array<any> = [];
  landAreaUnitList: Array<any> = [];
  districtList: Array<any> = [];
  distributionCenterList: Array<any> = [];
  varonChangeSelectedSchemeType: any;
  varonChangeSelectedLoad: any;
  varonChangelandAreaUnitId: any;
  varonChangeSelectedDistrictType: any;
  consumersDetailsObj: any
  varonChangeDc: any;
  finalFormValue: any;
  submitResult: any;
  displayInput: boolean = false;
  displayinputfield: boolean = false;
  FormArrayBooleanVariable: boolean = false;
  groupSubmitBoolean: boolean = false;
  listOfFormArray: Array<any> = [];
  casttList: Array<any> = [
    { name: 'GENERAL' },
    { name: 'OBC' },
    { name: 'SC' },
    { name: 'ST' },
  ]
  unsubscribe$: Subject<void> = new Subject();

  fixedMobileNumberofConsumer: any;
  DocKhasraKhatoni: any;
  DocSamagraFile: any;
  khasraKhatonifileLength: number = 0;
  samagrafileLength: number = 0;
  districtIdnew: any;
  finalRespnse: any
  displayInputFieldVal: any;
  submitGroupVar: boolean = false;

  displayInputFieldArray: Array<any> = [
    {
      id: 1, name: "Individual"
    },
    {
      id: 2, name: "Group"
    }
  ];

  samgraInputNumber: string = "";
  samagraListData: Array<any> = [];

  smgBooleanFile: boolean = false;
  khsrkhtnBooleanFile: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<MukhyaMantriKrishakYojnaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private newApplicationService: NewApplicationService,
    private notificationService: NotificationService
  ) {
    console.log(data, "data..........................");
    //objecOfConsumers
    this.consumersDetailsObj = JSON.parse(sessionStorage.getItem('objecOfConsumers'));
    console.log(this.consumersDetailsObj, "this.consumersDetailsObj...............................");
    this.fixedMobileNumberofConsumer = this.consumersDetailsObj?.consumerLoginId;
    //consumerLoginId
  }

  ngOnInit() {
    this.BuildMkkyForm();

    this.newApplicationService
      .getloadRequested()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.loadRequestList = data["list"];
        console.log("this.loadRequestList", this.loadRequestList);
      });

    this.newApplicationService
      .getSchemeTypeList()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.schemeTypeList = data["list"];
      });

    this.newApplicationService
      .getLandAreaUnit()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.landAreaUnitList = data["list"];
        console.log("land Area List", this.landAreaUnitList);
      });

    this.newApplicationService
      .getDistrictList()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.districtList = data["list"];
        console.log("this.districtList", this.districtList);
      });

    this.empForm = this.fb.group({
      employees: this.fb.array([]),
    });
    this.selectForm = this.fb.group({
      individualOrGroupId: ["", Validators.required],
      numberofgroup: ["", [Validators.required]],
    });

  }

  employees(): FormArray {
    return this.empForm.get("employees") as FormArray;
  }
  newEmployee(): FormGroup {
    return this.fb.group({
      samagraId: ["", Validators.required],
      consumerName: ["", Validators.required],
      guardianName: ["", Validators.required],
      khasraNo: ["", Validators.required],
      loadRequested: ["", Validators.required]
    });
  }
  add() {
    console.log(this.newEmployee(), "this.newEmployee()this.newEmployee()this.newEmployee()^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");

    this.employees().push(this.newEmployee());
  }
  remove(empIndex: number) {
    this.employees().removeAt(empIndex);
  }
  onSubmitsam() {
    console.log(this.empForm.value);
  }
  generateBlocks() {
    console.log(this.employees().length, "this.employees()this.employees()this.employees()this.employees()this.employees()", typeof (this.employees()));

    const formArray = this.empForm.get('employees') as FormArray;
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }

    // this.employees().reset();
    // this.displayinputfield = false;
    // alert(this.selectForm.value.numberofgroup);
    if (this.selectForm.value.numberofgroup <= 10) {
      this.displayInput = true;
      for (let index = 0; index < this.selectForm.value.numberofgroup; index++) {
        this.add();
      }
    } else {
      this.notificationService.warn("१०  से कम संख्या दर्ज करे");
      return
    }

    this.selectForm.value.numberofgroup = 0;

  }
  resetAllBlocks() {
    //reset blocks generated by generateBlocks method
    for (
      let index = 0;
      index < this.selectForm.value.numberofgroup - 1;
      index++
    ) {
      console.log(index, "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");

      this.remove(index);
    }
    this.selectForm.reset();
  }

  displayInputField(event: any) {
    this.empForm.reset();
    console.log(".........................", event);
    this.displayInputFieldVal = event.target.value;
    if (event.target.value == 2) {
      this.displayInput = true;
      if (this.displayInput === true) {
        //  this.add();
        this.displayinputfield = true;
      }
    } else {
      this.displayInput = false;
      this.displayinputfield = false;
    }
  }



  getSamagraDetails(event: any, e: any) {
    console.log(event, "evvveeennntntttt");
    console.log(this.empForm.value, "formValue...111111..");
    console.log(this.empForm.value.employees, "formValue....222222222222.");
    let smgId = this.empForm.value.employees[e].samagraId;
    console.log(smgId, "ffffiiiinnnaaallllyyy");
    let count = 0;
    for (let x = 0; x < this.empForm.value.employees.length; x++) {
      if (this.empForm.value.employees[x].samagraId == smgId) {
        count += 1;
      } else {

      }
    }

    if (count > 1) {
      this.notificationService.error("you have already added this Samagra number. ! Please Enter Different Samagra Number");
      return;
    }
    console.log(e, "iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii", this.samgraInputNumber, "................");

    let abc = {
      memberId: smgId
    };

    this.newApplicationService
      .getMukhyaMantriYojnaConsumerApplicationDetails(abc)
      .subscribe((data: any) => {
        console.log(data, "ddataatata");
        // console.log(this.empForm.controls.employees.get('e').value,"this.empForm[e].value????????????????????");
        if (data.statusCodeValue == 200) {

          console.log("200 aayyyayyaa");
          const formArray = this.empForm.get('employees') as FormArray
          const formGroup = formArray.at(e) as FormGroup;
          console.log(formGroup, "formGroup''''''''''''''''''''''''''''''''''");

          formGroup.patchValue({
            consumerName: data.body[0].Name,
            guardianName: data.body[0].fatherName
          })
        } else {
          const formArray = this.empForm.get('employees') as FormArray
          const formGroup = formArray.at(e) as FormGroup;
          console.log(formGroup, "formGroup''''''''''''''''''''''''''''''''''");
          this.notificationService.warn(" Invalid Samagra-id ! please fill correct samagra id")
          formGroup.reset();

        }

      })

  }

  onChangeSelectedDistrictType(value) {
    console.log(
      "onChangeSelectedDistrictType",
      "get distribution list by district id",
      value
    );
    this.varonChangeSelectedDistrictType = value;
    if (value) {
      console.log(value, "in if condition......");

      this.districtIdnew = value
      this.pmmkyFormSb.value.dcId = '';
      this.newApplicationService
        .getDistributionByID(value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data) => {
          console.log(data, "shamshad check districtId.................");

          this.distributionCenterList = data["list"][0];
        });
    } else {
      this.distributionCenterList = null;
    }
  }

  onChangeDc(value) {
    console.log("onChangeDc call !!! & value:-", value);
    this.varonChangeDc = value.target.value;
  }

  submitgroup() {
    this.submitGroupVar = true;
    if (this.empForm.invalid) {
      this.notificationService.error('Invalid Group Form !')
      this.FormArrayBooleanVariable = true;
      return
    } else {
      this.FormArrayBooleanVariable = false;
      this.notificationService.success('group form added successfully');
      console.log(this.empForm.value.employees, "controlssssssssssssssssssssssssss");
      this.groupSubmitBoolean = true;
      this.listOfFormArray = this.empForm.value.employees
    }

  }

  get mmkyFormControls() {
    return this.pmmkyFormSb.controls;
  }

  BuildMkkyForm() {
    this.pmmkyFormSb = this.fb.group({
      natureOfWorkTypeId: ["मुख्यमंत्री कृषक मित्र योजना", Validators.required], //natureOfWorkType.natureOfWorkTypeId
      avedakKaPrakar: ['Private Entity', Validators.required],
      avedakRemark: ['', Validators.required],
      loadRequested: ["", Validators.required],
      loadRequestedId: ['HP', Validators.required], //loadRequestedId.loadRequestedId
      schemeTypeId: ["Deposit", Validators.required], //schemeTypeId
      consumerName: [this.data?.Name, Validators.required],
      guardianName: [this.data?.fatherName, Validators.required],
      address: [this.data?.homeAddress, Validators.required],
      khasra: [this.data?.khasra, Validators.required],
      // khatoni:[this.data?.khatoni],
      area: [this.data?.area, Validators.required],
      landAreaUnitId: ["Hectare", Validators.required], //landAreaUnitId
      pinCode: [this.data?.Pincode, Validators.required], //***************done**********************/
      districtId: ["", Validators.required], //districtId
      dcId: ["", Validators.required], //dcId
      shortDescriptionOfWork: ["", Validators.required],
      aadharNo: [this.data?.aadharNo, Validators.required],
      castCategory: ["", Validators.required],
      contact: [this.fixedMobileNumberofConsumer, Validators.required],
      samagraNumber: [this.data?.MemberID],
      // individualOrGroupId:["",Validators.required]
      // docKhasraKhatoni:['',Validators.required],
      // docSamagraFile:['',Validators.required]

      //contact
    });
  }

  onChangeSelectedLoad(e: any) {
    console.log(e, "onChangeSelectedLoad........");
    this.varonChangeSelectedLoad = e.value;
  }

  onChangeSelectedSchemeType(e: any) {
    console.log(e, "onChangeSelectedSchemeType is call !!!");
    this.varonChangeSelectedSchemeType = e.value;
  }

  onChangelandAreaUnitId(e: any) {
    console.log(e, "888888888888888888888888888888888onChangelandAreaUnitId8");
    this.varonChangelandAreaUnitId = e.value;
  }

  selectOnDocKhasraKhatoni(e: any) {
    console.log(e.target.files[0], "e.target.files[0] for khasra-khatoni file");

    this.DocKhasraKhatoni = e.target.files[0];
    this.khasraKhatonifileLength = e.target.files.length;

    if (e.target.files[0].type == "application/pdf" && e.target.files[0].size <= 2000000) {
      this.khsrkhtnBooleanFile = false;
    } else {
      this.khsrkhtnBooleanFile = true;
      this.notificationService.warn("please choose file 'pdf' type and size must be less than '2MB'")
    }


  }

  selectOndocSamagraFile(e: any) {
    console.log(e.target.files[0], "e.target.files[0] for samagra-id-file");
    this.DocSamagraFile = e.target.files[0];
    this.samagrafileLength = e.target.files.length;

    if (e.target.files[0].type == "application/pdf" && e.target.files[0].size <= 2000000) {
      this.smgBooleanFile = false;
    } else {
      this.smgBooleanFile = true;
      this.notificationService.warn("please choose file 'pdf' type and size must be less than '2MB'")
    }

  }


  onSubmit() {
    console.log(this.pmmkyFormSb.value, "eeeeeeeeeeeeeeeeeeeeee.............");
    this.finalFormValue = this.pmmkyFormSb.value;
    console.log(this.DocKhasraKhatoni, "this.DocKhasraKhatoni///////////////", this.DocSamagraFile, "this.DocSamagraFile///////////////");
    if (this.displayInputFieldVal == 2 && this.groupSubmitBoolean == false) {
      this.notificationService.error("! Please submit group form first ")
      return
    }
    else if (this.DocKhasraKhatoni == undefined && this.DocSamagraFile == undefined) {
      this.notificationService.error("! Please select both khasra-khatoni-file and samagra-id-file first")
      return
    } else if (this.DocKhasraKhatoni == undefined && this.DocSamagraFile != undefined) {
      this.notificationService.error("! Please select  khasra-khatoni-file first")
      return
    } else if (this.DocKhasraKhatoni != undefined && this.DocSamagraFile == undefined) {
      this.notificationService.error("! Please select samagra-id-file first")
      return
    } else if (this.smgBooleanFile == true) {
      this.notificationService.error(" samagra file must be 'pdf' type and size must be less than '2MB'");
      return;
    } else if (this.khsrkhtnBooleanFile == true) {
      this.notificationService.error("khasra-khatoni file must be 'pdf' type and size must be less than '2MB'");
      return
    }
    else if (this.pmmkyFormSb.value.loadRequested < 0) {
      this.notificationService.error("Load must be greater than zero !");
      return

    }

    if (this.pmmkyFormSb.invalid) {
      console.log(this.pmmkyFormSb, "this.pmmkyFormSbthis.pmmkyFormSbthis.pmmkyFormSbthis.pmmkyFormSb####################################");

      this.notificationService.error("invalid form");
      return;
    } else {

      let pl: any = {
        "natureOfWorkTypeId": 8,
        "avedakKaPrakar": this.pmmkyFormSb.value.avedakKaPrakar,
        "avedakRemark": this.pmmkyFormSb.value.avedakRemark,
        "address": this.pmmkyFormSb.value.address,
        "area": this.pmmkyFormSb.value.area,
        "castCategory": this.pmmkyFormSb.value.castCategory,
        "consumerName": this.pmmkyFormSb.value.consumerName,
        "dcId": this.pmmkyFormSb.value.dcId,
        "districtId": this.districtIdnew,
        "guardianName": this.pmmkyFormSb.value.guardianName,
        "khasra": this.pmmkyFormSb.value.khasra,
        "landAreaUnitId": 1,
        "loadRequested": JSON.stringify(this.pmmkyFormSb.value.loadRequested),
        "loadRequestedId": 3,
        "pinCode": this.pmmkyFormSb.value.pinCode,
        "schemeTypeId": 2,
        "shortDescriptionOfWork": this.pmmkyFormSb.value.shortDescriptionOfWork,
        "mobilNo": this.pmmkyFormSb.value.contact,
        "samgraId": this.data?.MemberID,
        "individualOrGroupId": this.displayInputFieldVal,
        "samagraListDto": this.listOfFormArray,
        "aadharNo": this.pmmkyFormSb.value.aadharNo


      }
      console.log(pl, "pppppaaayyylloooaadd..");


      let formData: FormData = new FormData();
      formData.append('docKhasraKhatoni', this.DocKhasraKhatoni);
      formData.append('docSamagraFile', this.DocSamagraFile);
      formData.append('consumerApplicattionMmky', JSON.stringify(pl));

      let tok: string = sessionStorage.getItem('consumertoken')

      console.log(this.payLoadData, "gggggggggggggggggggggggggggggssssss");

      this.newApplicationService
        .SubmitMkmy(formData)
        .subscribe((data: any) => {
          console.log(data, "hhhhhhhhhhhjjjjjjjjjjjjjjjlllllllllllllllll");
          if (data["code"] == "200") {
            this.samagraListData = data.list[0].listData
            this.submitted = true;
            this.notificationService.success("बहुत बहुत बधाई ! आपका आवेदन क्रमांक:" + data.list[0].formData.consumerApplicationNo + "मुख्यमंत्री कृषक मित्र योजना के लिए स्वीकृत कर दिया है और कार्यस्थल के सर्वे के लिए उपाय (UPAY) पर अग्रेषित कर दिया गया है | आपसे अनुरोध है कि दर्ज किए हुए मोबाइल नंबर से उपाय(UPAY) पर लॉगिन करके कार्यस्थल की फोटो अपलोड करे।");
            this.finalRespnse = data.list[0].formData
            console.log(this.finalRespnse, "jjjjjjjjjjjjjjjjhhhhhhhhhhffffffffffffff");

            this.submitResult = data.list[0].formData.consumerApplicationNo;
          } else {
            this.notificationService.warn("Something went wrong");
          }
        });
    }
  }



  downloadHtmlView() {
    this.powtibtnHidden = true;
    // alert("done");
    const htmlContent = this.componentView.nativeElement.innerHTML;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    console.log(url, "iiiiiiiiiiiiiiiiiiiiiiiiiiiiiii", a);

    a.download = "componentView.html";
    a.click();
    URL.revokeObjectURL(url);
    this.dialogRef.close();
  }
}
