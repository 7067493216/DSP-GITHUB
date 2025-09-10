export class GatePassPayload {

    gatePassChallan: any
    materialDetail: MaterialDetail[];
    verifierGatekeeper: any
    verifierIssuingAuthority: any
    verifierBy: any

}


export class GatePassChallan {
  id: any
  outwardQuantity:any
  manualDINo:any
  nameOfEntity: any
  loaOrderNo:any
  loaOrderDate: any
  itemnName: any
  itemCode: any
  materialType:any
  serialNo:any
  dtrCapacity:any
  invoiceNo: any
  yearOfMenufacture: any
  manufacturerFirmName: any
  descriptionOfItem: any
  driverName: any
  diNo: any
  driverContactNo: any
  issuedTo: any
  issueDate: any
  receiverEntityName:any
  receiverDetails:any
  contactPerson: any
  contactNo: any
  consumerApplicationNumber: any
  divisionName: any
  DC_NAME: any
  consumerName: any
  address: any
  contractorAuthenticationNo: any
  workOrderNumber: any
  circleName: any
  workOrderDate:any
  vendorName:any
  nisthaLab:any
  vehicleName:any
  vehicleNNumber:any
  veriferCode:any
  
}


export class MaterialDetail {
    materialDetailsId: any
    serialNo: any
    materialSerialNo: any
    batchNo: any
    finalRemark: any
    consumerApplicationNumber: any
}

export class VerifierGatekeeper {
    verifierGatekeeperId: any
    name: any
    designation: any
}

export class VerifierIssuingAuthority {
    verifierIssuingAuthorityId: any
    name: any
    designation: any
}

export class VerifierBy {
    verifierById: any
    name: any
    designation: any
}












