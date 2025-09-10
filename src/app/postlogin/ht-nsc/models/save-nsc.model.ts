 export interface SaveNscData {
            agreementDate: Date;
            areaColony: string;
            areaColony1: string;
            areaTowns: string;
            areaType: string;
            billCycle: string;
            block: number;
            calculatedGmc: number;
            circle: number;
            city: number;
            city1: number;
            configuration: number;
            connectionCategory: string;
            connectionDate: Date;
            connectionType: number;
            contractDemand: string;
            contractDemand1: number;
            ctManufacturer: number;
            ctModel: number;
            ctParameter: number;
            ctParameterValue: number;
            ctSerialNo: string;
            dc: number;
            dedicatedFeeder: string;
            departmentName: number;
            dialMF: string;
            disconnectionDate: Date;
            district: number;
            district1: number;
            division: number;
            documents: Document[];
            edutyApplicability: string;
            effectiveDate1: Date;
            email: string;
            feeder: number;
            feederMaintenanceCharge: number;
            gmc: number;
            govtType: number;
            houseNo: string;
            houseStreetNo1: string;
            imsiCode: string;
            initialKVAHRead: string;
            initialKWHRead: string;
            initialNormalRead: string;
            initialOnpeakRead: string;
            initialTOD1ExportRead: string;
            initialTOD2ExportRead: string;
            initialTOD3ExportRead: string;
            initialoffPeakRead: string;
            kvahExportRead: string;
            kwhExportRead: string;
            mailingAddress: boolean;
            manufacture: number;
            meterAccuracy: string;
            meterCTRatio: number;
            meterCapacity: string;
            meterModel: number;
            meterOwner: string;
            meterPTRatio: number;
            meterRentType: number;
            meterSecurityDeposit: string;
            meterSecurityDepositeAmount: number;
            meterSerial: string;
            meterType: number;
            mf: number;
            mobile: string;
            modemManufacturer: number;
            modemModel: number;
            modemSerialNo: string;
            nameTypes: NameType[];
            nscApplicationDate: Date;
            nscApplicationNo: string;
            nscTransferred: string;
            oldAccountId: string;
            pdcConsumer: string;
            pinCode: string;
            plantCapacity: string;
            premiseType: string;
            ptManufacturer: number;
            ptModel: number;
            ptParameter: number;
            ptParameterValue: number;
            ptSerialNo: string;
            purpose: number;
            purposeGMC1: number;
            purposeOfGmcId: number;
            regFeeRefundRequired: string;
            regPaymentDate: Date;
            regReferenceNo: string;
            regRefundAmount: number;
            region: number;
            registrationAmount: number;
            relation: string;
            relationName: string;
            requiredAdditionalLoad: boolean;
            revenueCategoryId: number;
            sanctionLoad: string;
            seasonalEndDate: Date;
            seasonalStartDate: Date;
            secondryEmail: string;
            secondryMobile: string;
            securityDeposit: SecurityDeposit[];
            simId: number;
            state: number;
            subDivision: number;
            subStation: number;
            supplyVoltage: string;
            tehsil: number;
            tehsil1: number;
            tempConnectionPeriodDays: number;
            tempContractDemand: string;
            userType: string;
        }
        export interface Document {
            docType: string;
            documentNumber: string;
            documentTypeId: number;
        }
    
        export interface NameType {
            name: string;
            nameType: string;
            // nameTypeId: number;
        }
    
        export interface SecurityDeposit {
            sdAmount: number;
            sdReferenceDate: Date;
            sdReferenceNo: string;
            // securityDepositId: number;
        }

    
    