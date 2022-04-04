// import { IBaseObjectType } from './ibase-object-type.model';
export interface SearchClause {
    NeedsSubQueryObjectTypeParameter?: string;
    NeedsAccessControlTypeParameter?: string;
    //ParameterFormat?: string; 307008: ParameterFormat has been deprecated in CM 10.  It is replaced by SearchParameterFormat
    MethodGroup?: string;
    BasedOnProperty?: string;
    OnlyForType?: string;
    Caption: string;
    InternalName: string;
    Icon?: string;
    Name?: string;
    Id?: string;
    CanSort?: boolean;
    ObjectTypeParameter?: string;
    ToolTip?: string;
    ParametersTooltip?: string;
    EnumTypeParameter?: string;
    //replaced from ParameterFormat
    SearchParameterFormat?:string; 
    //Aditional Field CanSearch array - for blocked UDF search
    CanSearch: Array<string>;


    //Additional Property Set in Phoenix - which objectype this search clause is used for. 
    BaseObjectTypes?: any;//IBaseObjectType; 

    // Following members are used for additional fields.
    Uri?: string;
    LookupSet?: any;
    minValue?: number;
    maxValue?: number;
    maxLength?: number;
    MandatoryOptionValue?: any;
}