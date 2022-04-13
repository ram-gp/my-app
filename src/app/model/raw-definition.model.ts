import { IBaseObjectType } from './ibase-object-type.model';

export interface RawDefinition {
        "Id": string;
		"RequiredProductFeatureName"?: Array<string>;
		"RequiredPermissions"?: Array<string>;

		"CanAnybodyUpdate": boolean;
		"UpdatePermission"?: string;
		"UpdateCaption"?: string;

		"CanAnybodyCreate": boolean;
		"CreatePermissions"?: Array<String>;

		"CanAnybodyDelete": boolean;
		"DeletePermission"?: string;
		"DeleteCaption"?: string;

		"isHiddenInNavPanel"?: boolean;

		"NavCaptionOverride"?: string;
		"PanelCaptionOverride" ?: string;

		"HasReports"?: boolean;

		"mandatoryProperties"?: Array<string>;

		"NotesPropertyName"?: string;
		"NotesPropertyReadOnly"?: boolean;
		"CanUpdateNotes"?: boolean;

		
		"hasFilters"?: boolean;
		"allowFilterDefaultSave"?: boolean;
		"filterList"?: Array<RawFilter>;

		"standardDataEntryForm": boolean;
		"dataEntryForm"?: string;
		"ItemListProperties": Array<RawItemListProperty>;
		"Trays": Array<any>;
		"createTasks"?: Array<any>;
		"updateTasks": Array<any>;
		"navigationTasks": Array<any>;
		"ChildObjects"?: Array<any>;

		//On creating an object of this type, do we need to specify base object or type eg: new record needs RecordType, new Location need location type etc..
		"RequiredObjectOnCreate"?: IBaseObjectType;	

		"viewTask"?: {
			"id": string;
			"caption": string;
			"tooltip": string;
			"property": string;
		}

		"searchTask"?: {
            "objectSearchQeryProperty": string;
            "objectSearchDescriptionProperty": string;
			"objectFilterProperty": string;
			"objectSortProperty": string;
			"objectTypeNameProperty": string;
			"searchDefinitionProperty": string;
			"searchIsOldFormatProperty": string;
		}

		//Child objects
		"ButtonCaption"?: string;
		"ButtonToolTip"?: string;
}
export type RawFilter = {
    "name": string;
    "caption": string;
    "clauseId": string;
    "format": "enum" | "boolean";
    "enumName"?: string;
    "clauseString": string;
    "oneInGroupMustBeOn"?: boolean;
    "reversed"?: boolean;
    "options"?: Array<{ "caption"?: string, "name"?: string, "negated"?: boolean }>;
}
export type RawItemListProperty = {
    "location": string;
    "property"?: string;
    "subProperty"?: string;
    "value"?: string;
    "propertyOptions"?: Array<{ "property": string, subProperty?: string }>;
    "capitaliseCaption"?: boolean,
    "highlightProperties"?: Array<{ "property": string; "value": any }>;
    "showCaption"?: boolean;
    "capitaliseText"?: boolean;
    "defaultValue"?: string;
    "isEmail"?: boolean;
    "onlyShownInDetailPanel"?: boolean;
    "requiredPermission"?: string;
    "customisedValue"?: boolean;
    "preConditions"?: Array<{property: string; subProperty?: string; value?: any}>;
}