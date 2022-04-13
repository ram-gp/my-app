import { IBaseObjectType } from './ibase-object-type.model';
import { RawDefinition } from './raw-definition.model';
export class RawApplicationDefinition {

    constructor() {
        // Nothing to here at the moment...
    }


    static getDefinition(trimClient: TrimClient): Array<RawDefinition> {
        return {
            "ObjectDef": [
                ////////////////////////////////////////////
                ////
                //// Check In Style
                //// .CHECKINSTYLE
                "CheckinStyle": {
                    "Id": "CheckinStyle",
                    "RequiredProductFeatureName": ['CheckinStyles'],
                    "CanAnybodyUpdate": true,
                    "UpdateCaption": HP.HPTRIM.Messages.web_update,
                    "CanAnybodyCreate": true,
                    "CanAnybodyDelete": true,

                    "RequiredObjectOnCreate": HP.HPTRIM.BaseObjectTypes.RecordType,

                    "HasReports": false,

                    "standardDataEntryForm": true,
                    "dataEntryForm": "",

                    "ItemListProperties": [
                        {
                            "location": "Icon",
                            "value": "checkinstyle"
                        },
                        {
                            "location": "TopLeft",
                            "property": "CheckinStyleRecordType",
                            "subProperty": "RecordTypeName",
                        },
                        {
                            "location": "TopRight",
                            "property": "CheckinStyleStyleOwner",
                            "subProperty": "LocationFormattedName",

                        },
                        {
                            "location": "Title",
                            "property": "CheckinStyleName"

                        }
                    ],
                    "Trays": [
                        {
                            "pageId": "1",
                            "pageCaption": HP.HPTRIM.Messages.web_general,
                            "pageItems": [
                                {
                                    "name": "myMailboxes",
                                    "caption": HP.HPTRIM.Utils.String.format(HP.HPTRIM.Messages.web_myObject, [HP.HPTRIM.BaseObjectTypes.CheckinStyle.CaptionPlural]),
                                    "query": "owner:" + Messages.bob_sbMe
                                }
                            ]
                        }
                    ],

                    "updateTasks": [],

                    "navigationTasks": [
                    ]

                },

                
                ////////////////////////////////////////////
                ////
                //// Consignment Approver
                //// .CONSIGNMENTAPPROVER
                "ConsignmentApprover": {
                    "Id": "ConsignmentApprover",
                    "RequiredProductFeatureName": ['AdvancedDisposal'],
                    "RequiredPermissions": ['ApproveDisposal'],
                    "CanAnybodyUpdate": true,
                    "UpdateCaption": HP.HPTRIM.Messages.web_update,
                    "CanAnybodyCreate": false,
                    "CanAnybodyDelete": false,

                    "HasReports": false,

                    "PanelCaptionOverride": Messages.web_consignmentsTobeApproved,
                    "NavCaptionOverride": BaseObjectTypes.Consignment.CaptionPlural,

                    "standardDataEntryForm": true,
                    "dataEntryForm": "",

                    "ItemListProperties": [
                        {
                            "location": "Icon",
                            "value": "consignmentapprover",
                        },
                        {
                            "location": "TopRight",
                            "property": "ConsignmentApproverApprover",
                            "subProperty": "LocationFormattedName",
                        },
                        {
                            "location": "TopLeft",
                            "property": "ConsignmentApproverConsignment",
                            "subProperty": "ConsignmentNumber",
                        },
                        {
                            "location": "Title",
                            "property": "ConsignmentApproverConsignment",
                            "subProperty": "ConsignmentDescription"
                        },
                        {
                            "location": "Data",
                            "property": "ConsignmentApproverStatus"
                        },
                        {
                            "location": "Data",
                            "property": "ConsignmentApproverApprovedOn"
                        },
                        {
                            "location": "Data",
                            "value": Messages.web_consignmentNotAbleToBeProcessedFromWeb,
                            "showCaption": false,
                            "preConditions": [{
                                    "property": "ConsignmentApproverConsignment",
                                    "subProperty": "ConsignmentAuthenticateApprovals",
                                    "value": true,
                                },
                            ],
                        },
                    ],
                    "Trays": [
                        {
                            "pageId": "1",
                            "pageCaption": HP.HPTRIM.Messages.web_general,
                            "pageItems": [
                                {
                                    "name": "myConsignmentAprovals",
                                    //"caption": HP.HPTRIM.Utils.String.format(HP.HPTRIM.Messages.web_myObject, [HP.HPTRIM.BaseObjectTypes.Consignment.CaptionPlural]),
                                    "caption": HP.HPTRIM.BaseObjectTypes.Consignment.Caption + " " + HP.HPTRIM.Messages.web_approvals,
                                    "query": "approver:" + Messages.bob_sbMe + " " + Messages.core_and + " status:0",
                                    "isDefault": true,
                                }
                            ]
                        }
                    ],

                    "updateTasks": [
                        {
                            "id": "approveConsigment",
                            "caption": HP.HPTRIM.Messages.web_approve,
                            "tooltip": HP.HPTRIM.Messages.web_approve,
                            "successMessage": HP.HPTRIM.Messages.web_udpatedSuccessfully,
                            "checkForWarnings": true,
                            "icon": "activity_complete_24",
                            "iconSrc": trimClient.getIcon24("CompleteActivity"),
                            "supportsTagged": true,
                            "supportsSingle": true,
                            "returnedType": "ApprovalConsignment",
                            "objectUpdated": true,
                            "objectDeleted": false,
                            "enabledCommandId": "ApproveConsignment",
                            "preConditions": [{
                                "property": "ConsignmentApproverConsignment",
                                "subProperty": "ConsignmentAuthenticateApprovals",
                                "value": false,
                            }],

                            "serviceAction": {
                                "name": "ApproveConsignment",
                                "fullType": "HP.HPTRIM.ServiceModel.ApproveConsignment",
                                "requiredParameters": []
                            },

                            "updatedProperties": [
                                "EnabledCommandIds",
                                "ConsignmentApproverStatus",
                                "ConsignmentApproverApprovedOn",
                            ]
                        },

                        {
                            "id": "rejectConsigment",
                            "caption": HP.HPTRIM.Messages.web_reject + " " + BaseObjectTypes.Consignment.Caption,
                            "tooltip": HP.HPTRIM.Messages.web_reject,
                            "successMessage": HP.HPTRIM.Messages.web_udpatedSuccessfully,
                            "checkForWarnings": true,
                            "icon": "reject",
                            "supportsTagged": true,
                            "supportsSingle": true,
                            "returnedType": "ApprovalConsignment",
                            "objectUpdated": true,
                            "objectDeleted": false,
                            "enabledCommandId": "RejectConsignment",
                            "preConditions": [{
                                "property": "ConsignmentApproverConsignment",
                                "subProperty": "ConsignmentAuthenticateApprovals",
                                "value": false,
                            }],
                            "serviceAction": {
                                "name": "RejectConsignment",
                                "fullType": "HP.HPTRIM.ServiceModel.RejectConsignment",
                                "requiredParameters": [
                                    {
                                        "name": "RejectConsignmentReasonForRejection",
                                        "isMandatory": true,
                                        "type": "string",
                                        "requiresInput": true,
                                        "caption": Messages.web_reason
                                        
                                    }
                                ]
                            },

                            "updatedProperties": [
                                "EnabledCommandIds",
                                "ConsignmentApproverStatus",
                                "ConsignmentApproverApprovedOn",
                            ]
                        },
                    ],

                    "navigationTasks": [
                        {
                            "id": "consignmentRecords",
                            "caption": HP.HPTRIM.Messages.web_showRecords,
                            "tooltip": HP.HPTRIM.Messages.web_showRecords,
                            "supportsTagged": true,
                            "supportsSingle": true,
                            "returnedType": "Record",
                            "icon": "gotorecord_24",
                            "iconSrc": trimClient.getIcon24("YellowFile"),
                            "searchData": {
                                "query": "consignment: {0}",
                                "objectType": "Record",
                                "parameters": [
                                    { "property": "ConsignmentApproverConsignment", "type": "Object" }
                                ]
                            }
                        }, {
                            "id": "consignmentRejections",
                            "caption": HP.HPTRIM.Messages.web_showConsignmentRejections,
                            "tooltip": HP.HPTRIM.Messages.web_showConsignmentRejections,
                            "supportsTagged": true,
                            "supportsSingle": true,
                            "returnedType": "ConsignmentRejection",
                            "icon": "consignmentrejection_24",
                            "iconSrc": trimClient.getIcon24("ConsignmentRejection"),
                            "searchData": {
                                "query": "consignment: {0}",
                                "objectType": "ConsignmentRejection",
                                "parameters": [
                                    { "property": "ConsignmentApproverConsignment", "type": "Object" }
                                ]
                            }
                        },
                    ]

                },



                ////////////////////////////////////////////
                ////
                //// Consignment Rejection
                //// .CONSIGNMENTREJECTION
                "ConsignmentRejection": {
                    "Id": "ConsignmentRejection",
                    "RequiredProductFeatureName": ['AdvancedDisposal'],
                    "RequiredPermissions": ['ApproveDisposal'],
                    "CanAnybodyUpdate": true,
                    "UpdateCaption": HP.HPTRIM.Messages.web_update,
                    "CanAnybodyCreate": false,
                    "CanAnybodyDelete": false,
                    "isHiddenInNavPanel": true,
                    "HasReports": false,
                    
                    "standardDataEntryForm": true,
                    "dataEntryForm": "",

                    "ItemListProperties": [
                        {
                            "location": "Icon",
                            "value": "ConsignmentRejection",
                        },
                        {
                            "location": "TopLeft",
                            "property": "ConsignmentRejectionConsignment",
                            "subProperty": "ConsignmentNumber"
                        },
                        {
                            "location": "TopRight",
                            "property": "ConsignmentRejectionConsignment",
                            "subProperty": "ConsignmentDescription"
                        },
                        {
                            "location": "Title",
                            "property": "ConsignmentRejectionRecord",
                            "subProperty": "RecordNumber"
                        },
                        {
                            "location": "Data",
                            "property": "ConsignmentRejectionRejectReason"
                        },
                        {
                            "location": "Data",
                            "property": "ConsignmentRejectionRejectedOn"
                        },
                        {
                            "location": "Data",
                            "property": "ConsignmentRejectionIsConfirmed"
                        },
                    ],
                    "Trays": [
                        {
                            "pageId": "1",
                            "pageCaption": HP.HPTRIM.Messages.web_general,
                            "pageItems": [
                                {
                                    "name": "myConsignmentRejections",
                                    "caption": HP.HPTRIM.Messages.web_approvals,
                                    "query": "not confirmed and approver:" + Messages.bob_sbMe,
                                    "isDefault": true,
                                }
                            ]
                        }
                    ],

                    "updateTasks": [
                            {
                            "id": "confirmConsignmentRejection",
                            "caption": HP.HPTRIM.Messages.web_confirmRejection,
                            "tooltip": HP.HPTRIM.Messages.web_confirmRejection,
                            "successMessage": HP.HPTRIM.Messages.web_udpatedSuccessfully,
                            "checkForWarnings": true,
                            "icon": "activity_complete_24",
                            "iconSrc": trimClient.getIcon24("CompleteActivity"),
                            "supportsTagged": true,
                            "supportsSingle": true,
                            "returnedType": "ConsignmentRejection",
                            "objectUpdated": true,
                            "objectDeleted": false,
                            "enabledCommandId": "ConfirmRejection",
                            "preConditions": [],

                            "serviceAction": {
                                "name": "ConfirmConsignmentRejection",
                                "fullType": "HP.HPTRIM.ServiceModel.ConfirmConsignmentRejection",
                                "requiredParameters": []
                            },

                            "updatedProperties": [
                                "EnabledCommandIds",
                                "ConsignmentRejectionRejectedOn",
                                "ConsignmentRejectionIsConfirmed",
                            ]
                        },

                        {
                            "id": "cancelConsigmentReject",
                            "caption": HP.HPTRIM.Messages.web_cancelRejection,
                            "tooltip": HP.HPTRIM.Messages.web_cancelRejection,
                            "successMessage": HP.HPTRIM.Messages.web_udpatedSuccessfully,
                            "checkForWarnings": true,
                            "icon": "reject",
                            "supportsTagged": true,
                            "supportsSingle": true,
                            "returnedType": "ConsignmentRejection",
                            "objectUpdated": true,
                            "objectDeleted": true,
                            "enabledCommandId": "CancelRejection",
                            "preConditions": [],
                            "serviceAction": {
                                "name": "CancelConsignmentRejection",
                                "fullType": "HP.HPTRIM.ServiceModel.CancelConsignmentRejection",
                                "requiredParameters": []
                            },

                            "updatedProperties": [
                                "EnabledCommandIds"
                            ]
                        },
                    ],

                    "navigationTasks": [
                        
                    ]

                },

                ////////////////////////////////////////////
                ////
                //// History - audit event
                //// .HISTORY
                "History": {
                    "Id": "History",
                    "RequiredProductFeatureName": [],
                    "RequiredPermissions": ['CanViewAuditEvents'],
                    "CanAnybodyUpdate": false,
                    "UpdateCaption": HP.HPTRIM.Messages.web_update,
                    "CanAnybodyCreate": false,
                    "CanAnybodyDelete": false,
                    "HasReports": true,

                    "standardDataEntryForm": false,
                    "dataEntryForm": "",

                    "isHiddenInNavPanel": true,
                    "ItemListProperties": [
                        {
                            "location": "Icon",
                            "value": "rechistory"
                        },
                        {
                            "location": "TopLeft",
                            "propertyOptions": [
                                { "property": "HistoryRecord", "subProperty": "RecordNumber" },
                                { "property": "HistoryLocation", "subProperty": "LocationFormattedName" },
                                { "property": "HistoryActivity", "subProperty": "ActivityName" },
                                { "property": "HistoryWorkflow", "subProperty": "WorkflowName" },
                                { "property": "HistoryForObjectType" }],
                        },
                        {
                            "location": "TopRight",
                            "property": "HistoryLoginLocation",
                            "subProperty": "LocationFormattedName",

                        },
                        {
                            "location": "Title",
                            "property": "HistoryEventDescription"
                        }

                    ],
                    "Trays": [],

                    "updateTasks": [],
                    "navigationTasks": [
                        {
                            "id": "historyLoginLocation",
                            "caption": HP.HPTRIM.Messages.web_responsibleLoc, //"Responsible location",
                            "tooltip": HP.HPTRIM.Messages.web_responsibleLoc,
                            "icon": "trmlocationsearch_x24",
                            "iconSrc": trimClient.getIcon24("trmlocationsearch"),
                            "supportsTagged": false,
                            "supportsSingle": true,
                            "returnedType": "Location",
                            "searchData": {
                                "query": "Uri: {0}",
                                "objectType": "Location",
                                "parameters": [
                                    { "property": "HistoryLoginLocation", "type": "Object" }
                                ]
                            }
                        },
                        {
                            "id": "historyRecord",
                            "icon": "showrecords_24",
                            "caption": HP.HPTRIM.Messages.web_record, //"Record",
                            "tooltip": HP.HPTRIM.Messages.web_record,
                            "supportsTagged": false,
                            "supportsSingle": true,
                            "returnedType": "Record",
                            "searchData": {
                                "query": "Uri: {0}",
                                "objectType": "Record",
                                "parameters": [
                                    { "property": "HistoryRecord", "type": "Object" }
                                ]
                            },
                            "preConditions": [{
                                "property": "HistoryRecord",
                                "valueType": "Object",
                                "valueRequired": true
                            }],
                        },
                    ]

                },




                ////////////////////////////////////////////
                ////
                //// TODO ITEM
                //// .TODOITEM
                "TodoItem":{
                    "Id": "TodoItem",
                    "RequiredProductFeatureName": ["TodoItems"],

                    "CanAnybodyCreate": true,

                    "CanAnybodyDelete": true,

                    "CanAnybodyUpdate": true,
                    "UpdateCaption": HP.HPTRIM.Messages.web_updateTodoITem,


                    "HasReports": true,

                    "NotesPropertyName": "TodoItemNotes",
                    "CanUpdateNotes": true,
                    "NotesPropertyReadOnly": false,

                    "standardDataEntryForm": true,

                    "ChildObjects": [
                        {
                            "property": "ChildItemReferences",
                            "type": "TodoItemItemReference",
                            "caption": HP.HPTRIM.Messages.web_todoItemReferences,
                            "tooltip": HP.HPTRIM.Messages.web_todoItemReferenceDocuments,
                            "constructorArguments": [
                                {
                                    "type": "enum",
                                    "caption": HP.HPTRIM.Messages.web_todoItemReferenceType,
                                    "enumName": "TodoReferenceType",
                                    "propertyName": "TodoItemItemReferenceReferenceType"
                                },
                                {
                                    "type": "object",
                                    "objectType": "Record",
                                    "caption": HP.HPTRIM.Messages.web_todoItemReferenceRecord,
                                    "propertyName": "TodoItemItemReferenceRecord"
                                }

                            ]
                        }
                    ],

                    "Trays": [
                        {
                            "pageId": "1",
                            "pageCaption": HP.HPTRIM.Messages.web_search,
                            "pageItems": [
                                {
                                    "name": "myTodoItems",
                                    "caption": HP.HPTRIM.Messages.web_myTodoItems,
                                    "query": "assignee:" + Messages.bob_sbMe + " " + Messages.core_and + " " + Messages.web_Not + " done",
                                    "sortBy": ""         //"DueOn+,DueOn-,Priority+,Priority-"
                                }
                            ]
                        }
                    ],

                    "ItemListProperties": [
                        {
                            "location": "Icon",
                            "property": "Icon",
                            "subProperty": "Id"
                        },
                        {
                            "location": "Title",
                            "property": "TodoItemTodo"
                        },
                        {
                            "location": "Data",
                            "property": "TodoItemDateDue",
                            "capitaliseCaption": true,
                            "highlightProperties": [{
                                "property": "TodoItemIsOverdue",
                                "value": true
                            },
                                {
                                    "property": "TodoItemIsComplete",
                                    "value": false
                                }]

                        },
                        {
                            "location": "TopLeft",
                            "property": "TodoItemIsComplete",
                            "showCaption": false,
                            "capitaliseText": true
                        },
                        {
                            "location": "Data",
                            "property": "TodoItemAssignee",
                            "subProperty": "LocationFormattedName",
                            "showCaption": true,
                            "capitaliseCaption": true,

                        },
                        {
                            "location": "DetailData",
                            "property": "TodoItemDateDone",
                            "defaultValue": "",
                        }


                    ],

                    "navigationTasks": [
                        //{
                        //	"id": "todoItemAssignee",
                        //	"caption": HP.HPTRIM.Messages.web_locationContactRecords,
                        //	"tooltip": HP.HPTRIM.Messages.web_locationContactRecords,
                        //	"supportsTagged": true,
                        //	"supportsSingle": true,
                        //	"returnedType": "Location",
                        //	"searchData": {
                        //		"query": "Uri: {0}",
                        //		"objectType": "Location",
                        //		"parameters": [
                        //			{ "property": "TodoItemAssignee", "type": "Object" }
                        //		]
                        //	}
                        //},
                    ],

                    "updateTasks": [
                        {
                            "id": "completeTodoItemTasks",
                            "caption": HP.HPTRIM.Messages.web_complete,
                            "tooltip": HP.HPTRIM.Messages.web_todoItemCompleteToolTip,
                            "successMessage": HP.HPTRIM.Messages.web_udpatedSuccessfully,
                            "checkForWarnings": true,
                            "icon": "activity_complete_24",
                            "iconSrc": trimClient.getIcon24("CompleteActivity"),
                            "supportsTagged": true,
                            "supportsSingle": true,
                            "returnedType": "TodoItem",
                            "objectUpdated": true,
                            "objectDeleted": false,
                            "enabledCommandId": "CompleteTodo",
                            "preConditions": [{
                                "property": "TodoItemIsComplete",
                                "value": false
                            }],
                            "propertiesUpdated": [
                                {
                                    "propertyId": "TodoItemDateDone",
                                    "requiresInput": false,
                                }
                            ],

                            "updatedProperties": [
                                "EnabledCommandIds",
                                "TodoItemIsComplete",
                                "TodoItemDateDone",
                                "DateLastUpdated",
                                "LastUpdatedBy"
                            ]
                        },

                        {
                            "id": "uncompleteTodoItemTasks",
                            "caption": HP.HPTRIM.Messages.web_uncomplete,
                            "tooltip": HP.HPTRIM.Messages.web_todoItemUncompleteToolTip,
                            "successMessage": HP.HPTRIM.Messages.web_udpatedSuccessfully,
                            "checkForWarnings": true,
                            "icon": "uncompleteactivity_x24",
                            "iconSrc": trimClient.getIcon24("UncompleteActivity"),
                            "supportsTagged": true,
                            "supportsSingle": true,
                            "returnedType": "TodoItem",
                            "objectUpdated": true,
                            "objectDeleted": false,

                            "enabledCommandId": "UncompleteTodo",
                            "preConditions": [{
                                "property": "TodoItemIsComplete",
                                "value": true
                            }],
                            "propertiesUpdated": [
                                {
                                    "propertyId": "TodoItemDateDone",
                                    "clearValue": true,
                                    "requiresInput": false,
                                }
                            ],
                            "updatedProperties": [
                                "EnabledCommandIds",
                                "TodoItemIsComplete",
                                "TodoItemDateDone",
                                "DateLastUpdated",
                                "LastUpdatedBy"
                            ]
                        },

                        {
                            "id": "reassignTodoItem",
                            "caption": HP.HPTRIM.Messages.web_reassign,
                            "tooltip": HP.HPTRIM.Messages.web_reassign,
                            "successMessage": HP.HPTRIM.Messages.web_udpatedSuccessfully,
                            "checkForWarnings": true,
                            "icon": "setAssignee",
                            "supportsTagged": true,
                            "supportsSingle": true,
                            "returnedType": "TodoItem",
                            "objectUpdated": true,
                            "objectDeleted": false,
                            "enabledCommandId": "Properties",
                            "requiredProperties": ["TodoItemAssignee"],
                            "propertiesUpdated": [
                                {
                                    "propertyId": "TodoItemAssignee",
                                    "purpose": LocationPurpose.TodoAssignee,
                                    "requiresInput": true,
                                    "allowClearValue": false,
                                }
                            ],
                            "updatedProperties": [
                                "TodoItemAssignee",
                                "DateLastUpdated",
                                "LastUpdatedBy"
                            ]
                        }
                    ],

                    "hasFilters": true,
                    "allowFilterDefaultSave": false,
                    "filterList": [
                        {
                            "caption": HP.HPTRIM.Messages.web_filterCompletedItems,
                            "name": "completedActivities",
                            "clauseId": "TodoItemDone",
                            "clauseString": "done",
                            "format": "boolean",
                            "oneInGroupMustBeOn": false,
                            "reversed": true,
                            "options": [
                                { "caption": HP.HPTRIM.Messages.web_showCompletedActivities, "name": 'showCompleted', "negated": true },
                            ],
                        },
                        {
                            "name": "TodoItemItemPriority",
                            "caption": HP.HPTRIM.Messages.web_selectPriorityTypesToBeFiltered,
                            "clauseId": "TodoItemPriority",
                            "format": "enum",
                            "enumName": "Priority",
                            "clauseString": "priority",
                        }
                    ],

                },

                ////////////////////////////////////////////
                ////
                //// RECORD REQUEST
                //// .REQUEST
                ////
                {
                    "Id": "Request",

                    "RequiredPermissions": ["MakeRequests"],

                    "RequiredProductFeatureName": ["Requests", "AdvancedRequests"],

                    "CanAnybodyCreate": false,

                    "CanAnybodyDelete": true,
                    "DeletePermission": "RequestAdministrator",

                    "CanAnybodyUpdate": false,
                    "UpdatePermission": "RequestAdministrator",

                    "HasReports": true,

                    "standardDataEntryForm": true,

                    "NotesPropertyName": "RequestNotes",
                    "CanUpdateNotes": true,
                    "NotesPropertyReadOnly": true,

                    "dataEntryForm": "",

                    "Trays": [
                        {
                            "pageId": "general",
                            "pageCaption": HP.HPTRIM.Messages.web_general,
                            "pageItems": [
                                {
                                    "name": "general_all",
                                    "query": "all",
                                    "caption": HP.HPTRIM.Messages.web_All
                                },
                                {
                                    "name": "general_highAndMediumPriority",
                                    "query": "status:0,1 " + Messages.core_and + " priority:0,1 " + Messages.core_and + " record:[home:[administeredby:" + Messages.bob_sbMe + "]]",
                                    "caption": HP.HPTRIM.Messages.web_AllHighAndMediumPriority
                                },
                                {
                                    "name": "general_myRecordRequestsNotYetActioned",
                                    "query": "status:1 " + Messages.core_and + " record:[requestor:" + Messages.bob_sbMe + "]",
                                    "caption": HP.HPTRIM.Messages.web_myRecordRequestsNotYetActioned
                                },
                                {
                                    "name": "general_allRequestsAwaitingApproval",
                                    "query": "status:0 " + Messages.core_and + " record:[home:[administeredby:" + Messages.bob_sbMe + "]]",
                                    "caption": HP.HPTRIM.Messages.web_AllRequestsNeedToApprove
                                }
                            ]
                        },
                        {
                            "pageId": "new",
                            "pageCaption": HP.HPTRIM.Messages.web_NewRecordPickups,
                            "pageItems": [
                                {
                                    "name": "new_approvals",
                                    "query": "status:0 " + Messages.core_and + " type:3 " + Messages.core_and + " record:[home:[administeredby:" + Messages.bob_sbMe + "]]",
                                    "caption": HP.HPTRIM.Messages.web_approvals
                                }
                            ]
                        },
                        {
                            "pageId": "returns",
                            "pageCaption": HP.HPTRIM.Messages.web_RecordReturns,
                            "pageItems": [
                                {
                                    "name": "return_approvals",
                                    "caption": HP.HPTRIM.Messages.web_approvals,
                                    "query": "status:0 " + Messages.core_and + " type:4 " + Messages.core_and + " record:[home:[administeredby:" + Messages.bob_sbMe + "]]",
                                    "isDefault": true
                                },
                                {
                                    "name": "return_pickupList",
                                    "caption": HP.HPTRIM.Messages.web_pickups,
                                    "query": "status:1 " + Messages.core_and + " type:3 " + Messages.core_and + " record:[home:[administeredby:" + Messages.bob_sbMe + "]]",
                                }
                            ]
                        },
                        {
                            "pageId": "temp",
                            "pageCaption": HP.HPTRIM.Messages.web_TemporaryRetrievals,
                            "pageItems": [
                                {
                                    "name": "temp_approvals",
                                    "caption": HP.HPTRIM.Messages.web_approvals,
                                    "query": "status:0 " + Messages.core_and + " type:0,1 " + Messages.core_and + " record:[home:[administeredby:" + Messages.bob_sbMe + "]]",
                                },
                                {
                                    "name": "temp_deliveries",
                                    "caption": HP.HPTRIM.Messages.web_deliveries,
                                    "query": "status:1 " + Messages.core_and + " type:0,1 " + Messages.core_and + " record:[home:[administeredby:" + Messages.bob_sbMe + "]] " + Messages.core_and + " record:[atHome]",
                                }
                            ]
                        },
                        {
                            "pageId": "permanent",
                            "pageCaption": HP.HPTRIM.Messages.web_PermanentRetrievals,
                            "pageItems": [
                                {
                                    "name": "permanent_approvals",
                                    "caption": HP.HPTRIM.Messages.web_approvals,
                                    "query": "status:0 " + Messages.core_and + " type:2 " + Messages.core_and + "  record:[home:[administeredby:" + Messages.bob_sbMe + "]]",
                                },
                                {
                                    "name": "permanent_pickupList",
                                    "caption": HP.HPTRIM.Messages.web_pickups,
                                    "query": "status:1 " + Messages.core_and + " type:2 " + Messages.core_and + " record:[home:[administeredby:" + Messages.bob_sbMe + "]] " + Messages.core_and + " record:[atHome]",
                                },
                                {
                                    "name": "permanent_deliveries",
                                    "caption": HP.HPTRIM.Messages.web_deliveries,
                                    "query": "status:1 " + Messages.core_and + " type:2 " + Messages.core_and + " record:[home:[administeredby:" + Messages.bob_sbMe + "]] " + Messages.core_and + " record:[atHome]",
                                },
                                {
                                    "name": "permanent_recordsInCirculation",
                                    "caption": HP.HPTRIM.Messages.web_RecordsInCirculation,
                                    "query": "status:1 " + Messages.core_and + " type:0,1,2 " + Messages.core_and + " record:[home:[administeredby:" + Messages.bob_sbMe + "]] " + Messages.web_Not + " record:[atHome]",
                                }
                            ]
                        }
                    ],

                    "ItemListProperties": [
                        {
                            "location": "Icon",
                            "value": "RecRequests"
                        },
                        {
                            "location": "TopLeft",
                            "property": "RequestRequestType"
                        },
                        {
                            "location": "TopRight",
                            "property": "RequestRecord",
                            "subProperty": "RecordNumber"
                        },
                        {
                            "location": "Title",
                            "property": "RequestRecord",
                            "subProperty": "RecordTitle"
                        },

                        {
                            "location": "Data",
                            "property": "RequestStatus",
                            "capitaliseText": true
                        },
                        {
                            "location": "Data",
                            "property": "RequestRequestor",
                            "subProperty": "LocationFormattedName",
                            "showCaption": true,
                            "capitaliseCaption": true
                        },

                        {
                            "location": "Data",
                            "property": "RequestDueDate",
                            "capitaliseCaption": true

                        },

                        {
                            "location": "DetailData",
                            "property": "RequestDateCompleted",
                            "defaultValue": "",
                        },

                    ],

                    "updateTasks": [

                        {
                            "id": "approveRequest",
                            "caption": HP.HPTRIM.Messages.web_approve,
                            "tooltip": HP.HPTRIM.Messages.web_approve,
                            "successMessage": HP.HPTRIM.Messages.web_udpatedSuccessfully,
                            "checkForWarnings": true,
                            "icon": "accept",
                            "supportsTagged": true,
                            "supportsSingle": true,
                            "returnedType": "Request",
                            "objectUpdated": true,
                            "objectDeleted": false,
                            "preConditions": [{
                                "property": "RequestIsComplete",
                                "value": false
                            },
                                {
                                    "property": "RequestStatus",
                                    "value": "NewAwaitingApproval"
                                }],
                            "enabledCommandId": "ApproveRequest",
                            "propertiesUpdated": [
                                {
                                    "propertyId": "RequestStatus",
                                    "value": "New",
                                    "requiresInput": false,
                                }
                            ],
                            "taggedErrorProperty": "RequestDescription",
                            "updatedProperties": [
                                "RequestStatus",
                                "RequestIsComplete",
                                "EnabledCommandIds",
                                "RequestDateCompleted",
                                "DateLastUpdated",
                                "LastUpdatedBy"
                            ],
                        },
                        {
                            "id": "rejectRequest",
                            "caption": HP.HPTRIM.Messages.web_reject,
                            "tooltip": HP.HPTRIM.Messages.web_reject,
                            "successMessage": HP.HPTRIM.Messages.web_udpatedSuccessfully,
                            "checkForWarnings": true,
                            "icon": "reject",
                            "supportsTagged": true,
                            "supportsSingle": true,
                            "returnedType": "Request",
                            "objectUpdated": true,
                            "objectDeleted": false,
                            "preConditions": [{
                                "property": "RequestIsComplete",
                                "value": false
                            },
                                {
                                    "property": "RequestStatus",
                                    "value": "NewAwaitingApproval"
                                }],
                            "enabledCommandId": "RejectRequest",
                            "propertiesUpdated": [
                                {
                                    "propertyId": "RequestStatus",
                                    "value": "Denied",
                                    "requiresInput": false,
                                }
                            ],
                            "taggedErrorProperty": "RequestDescription",
                            "updatedProperties": [
                                "RequestStatus",
                                "RequestIsComplete",
                                "RequestDateCompleted",
                                "DateLastUpdated",
                                "LastUpdatedBy"
                            ],
                        },
                        {
                            "id": "completeRequestTask",
                            "caption": HP.HPTRIM.Messages.web_complete,
                            "tooltip": HP.HPTRIM.Messages.web_CompleteRequest,
                            "successMessage": HP.HPTRIM.Messages.web_udpatedSuccessfully,
                            "checkForWarnings": true,
                            "icon": "activity_complete_24",
                            "iconSrc": trimClient.getIcon24("CompleteActivity"),
                            "enabledCommandId": "CompleteRequest",
                            "supportsTagged": true,
                            "supportsSingle": true,
                            "returnedType": "Request",
                            "objectUpdated": true,
                            "objectDeleted": false,
                            "preConditions": [{
                                "property": "RequestIsComplete",
                                "value": false
                            }],
                            "serviceAction": {
                                "name": "CompleteRequest",
                                "fullType": "HP.HPTRIM.ServiceModel.CompleteRequest"
                            },

                            "taggedErrorProperty": "RequestDescription",
                            "updatedProperties": [
                                "RequestStatus",
                                "RequestIsComplete",
                                "RequestDateCompleted",
                                "DateLastUpdated",
                                "LastUpdatedBy"
                            ]
                        },
                    ],
                    "navigationTasks": []
                },

                ////////////////////////////////////////////
                ////
                //// TODO ITEM REFERENCE DOCUMENT
                //// .TODOITEMREFERENCE
                {
                    "Id": "TodoItemItemReference",
                    "RequiredProductFeatureName": ["TodoItems"],

                    "ButtonCaption": HP.HPTRIM.Messages.web_todoItemReferences,
                    "ButtonToolTip": HP.HPTRIM.Messages.web_todoItemReferenceDocuments,

                    "CanAnybodyCreate": true,
                    "CanAnybodyUpdate": false,
                    "CanAnybodyDelete": true,

                    "standardDataEntryForm": true,
                    "dataEntryForm": "",

                    "ItemListProperties": [
                        {
                            "location": "Icon",
                            "property": "TodoItemItemReferenceRecord",
                            "subProperty": "Icon",
                            "defaultValue": "utytodoitem_x32"
                        },
                        {
                            "location": "TopLeft",
                            "property": "TodoItemItemReferenceReferenceType"
                        },
                        {
                            "location": "Title",
                            "property": "TodoItemItemReferenceDetails"
                        }
                    ],
                    "Trays": [],
                    "navigationTasks": [
                        {
                            "id": "todoItemItemReferenceLinkedRecord",
                            "caption": HP.HPTRIM.Messages.web_navigateToLinkedRecord,
                            "tooltip": HP.HPTRIM.Messages.web_navigateToLinkedRecord,
                            "icon": "navigateUpFolderIcon",
                            "supportsTagged": false,
                            "supportsSingle": true,
                            "returnedType": "Record",
                            "requiredProperty": "TodoItemItemReferenceRecord",
                            "searchData": {
                                "query": "uri: {0}",
                                "objectType": "Record",
                                "parameters": [
                                    { "property": "TodoItemItemReferenceRecord", "type": "Object" }
                                ]
                            }
                        }
                    ],
                    "updateTasks": [],

                    "viewTask": {
                        "id": "viewTodoItemItemReferenceLinkedRecord",
                        "caption": HP.HPTRIM.Messages.vwr_tbar_view,
                        "tooltip": HP.HPTRIM.Messages.web_viewReferencedDocument,
                        "property": "TodoItemItemReferenceRecord"
                    }
                },

                ////////////////////////////////////////////
                ////
                //// CLASSIFICATION
                //// .CLASSIFICATION
                //{
                //	"Id": "Classification",
                //	"RequiredProductFeatureName": [],

                //	"CanAnybodyCreate": false,
                //	"CreatePermissions": ["ClassificationAdmin"],

                //	"CanAnybodyUpdate": true,
                //	"UpdatePermission": "ClassificationAdmin",
                //	"UpdateCaption": HP.HPTRIM.Messages.web_update,

                //	"CanAnybodyDelete": true,
                //	"DeletePermission": "ClassificationAdmin",
                //	"DeleteCaption": HP.HPTRIM.Messages.web_delete,

                //	"standardDataEntryForm": true,
                //	"dataEntryForm": "",

                //	"ItemListProperties": [
                //		{
                //			"location": "Icon",
                //			"property": "Icon",
                //			"subProperty": "Id"
                //		},
                //		{
                //			"location": "Title",
                //			"property": "ClassificationTitle"
                //		},
                //        {
                //            "location": "TopLeft",
                //            "property": "ClassificationTitle",
                //        },
                //		{
                //			"location": "TopRight",
                //			"property": "ClassificationIdNumber",
                //			"isEmail": false,
                //			"defaultValue": ""
                //		},
                //		{
                //            "location": "Data",
                //            "property": "ClassificationOwnerLocation",
                //			"subProperty": "LocationFormattedName",
                //			"showCaption": true,
                //			"onlyShownInDetailPanel": true,
                //			"defaultValue": ""
                //        },
                //		{
                //			"location": "Data",
                //			"property": "SecurityProfile",
                //			"subProperty": "AsString",
                //			"showCaption": true,
                //			"isEmail": false,
                //			"onlyShownInDetailPanel": true,
                //			"defaultValue": ""
                //		},
                //	],
                //	"Trays": [
                //		{
                //			"pageId": "favoriteClassificationPage",
                //			"pageCaption": HP.HPTRIM.Messages.web_favorites,
                //			"pageItems": [
                //				{
                //					"name": "favoriteClassifications",
                //					"caption": HP.HPTRIM.Messages.web_favorites,
                //					"query": "favorite"
                //				},

                //				{
                //					"name": "topLevelClassifications",
                //					"caption": "Top Level",
                //					"query": "parent:0"
                //				},

                //				{
                //					"name": "classificationsForRecordCreation",
                //					"caption": "For Record Creation",
                //					"query": "recordpattern>''"  //Vernon todo
                //				}
                //			]
                //		},
                //	],
                //	"navigationTasks": [
                //		{
                //			"id": "classificationParent",
                //			"caption": HP.HPTRIM.Messages.web_navigateToParentClassification,
                //			"tooltip": HP.HPTRIM.Messages.web_navigateToParentClassification,
                //			"icon": "navigateUpFolderIcon",
                //    		"supportsTagged": false,
                //			"supportsSingle": true,
                //			"returnedType": "Classification",
                //			"preConditions": [{
                //				"property": "ClassificationParentClassification",
                //				"valueType": "Object",
                //				"value": true
                //			}],
                //			"searchData": {
                //				"query": "uri: {0}",
                //				"objectType": "Classification",
                //				"parameters": [
                //					{ "property": "ClassificationParentClassification", "type": "Object" }
                //				]
                //			}
                //		},
                //		{
                //			"id": "classificationChildern",
                //			"caption": HP.HPTRIM.Messages.web_navigateToSubClassifications,
                //			"icon": "navigateDownFolderIcon",
                //			"supportsTagged": false,
                //			"tooltip": HP.HPTRIM.Messages.web_navigateToSubClassifications,
                //			"supportsSingle": true,
                //			"returnedType": "Classification",
                //			"preConditions": [{
                //				"property": "ClassificationChildLastNumber",
                //				"valueType": "String",
                //				"value": true
                //			}],
                //			"searchData": {
                //				"query": "parent: {0}",
                //				"objectType": "Classification",
                //				"parameters": [
                //					{ "property": "Uri", "type": "Uri" },
                //					{ "property": "ClassificationChildLastNumber", "type": "String" }
                //				]
                //			}
                //		},
                //		{
                //			"id": "classificationRecord",
                //			"caption": HP.HPTRIM.Messages.web_showRecords,
                //			"tooltip": HP.HPTRIM.Messages.web_showRecords,
                //			"icon": "showrecords_32",
                //			"supportsTagged": false,
                //			"supportsSingle": true,
                //			"returnedType": "Record",
                //			"searchData": {
                //				"query": "classification: {0}",
                //				"objectType": "Record",
                //				"parameters": [
                //					{ "property": "Uri", "type": "Uri" },
                //				]
                //			}
                //		},
                //	],
                //	"updateTasks": [
                //		{
                //			"id": "classificationNewRecord",
                //			"caption": HP.HPTRIM.Messages.web_createdRecords,
                //			"tooltip": HP.HPTRIM.Messages.web_createdRecords,
                //			"icon": "newrecord_32",
                //			"supportsTagged": false,
                //			"supportsSingle": true,
                //			"requiredPermission": "RecordAdmin",
                //			"checkForWarnings": true,
                //			"objectType": "Record",
                //			"preConditions": [{
                //				"property": "ClassificationChildLastNumber",
                //				"valueType": "String",
                //				"value": false
                //			}],
                //			"actionHandlerName": "CreateNewRecordHandler",
                //			"actionPanelName": "RecordsDetailComponent",
                //			"actionParameter": [
                //				{ "name": "fileDropped", "value": undefined, "paraType": "DefaultValue"},
                //				{ "name": "recordTypeFilter", "value": undefined, "paraType": "DefaultValue" },
                //				{ "name": "propertyValues", "value": undefined, "paraType": "DefaultValue" },
                //				{ "name": "defaultClassification", "ObjectType": BaseObjectTypes.Classification, "value": "this", "paraType": "DefaultValue"},
                //			]
                //		},
                //	],

                //},

                ////////////////////////////////////////////
                ////
                //// USER LABEL
                //// .USERLABEL
                {
                    "Id": "UserLabel",
                    "RequiredProductFeatureName": ["Labels"],

                    "CanAnybodyCreate": true,

                    "CanAnybodyUpdate": true,
                    "UpdateCaption": HP.HPTRIM.Messages.web_userLabel,

                    "CanAnybodyDelete": true,
                    "DeleteCaption": HP.HPTRIM.Messages.web_delete,

                    "standardDataEntryForm": true,
                    "dataEntryForm": "",

                    "ItemListProperties": [
                        {
                            "location": "Icon",
                            "property": "Icon",
                            "subProperty": "Id"
                        },
                        {
                            "location": "Title",
                            "property": "UserLabelName",
                            "isEmail": false,
                            "defaultValue": ""
                        },
                        {
                            "location": "TopLeft",
                            "property": "UserLabelFullName",
                        },
                        {
                            "location": "TopRight",
                            "property": "UserLabelOwner",
                            "subProperty": "LocationFormattedName",
                            "defaultValue": ""
                        },
                        {
                            "location": "Data",
                            "property": "DateLastUpdated",
                            "onlyShownInDetailPanel": true,
                        },
                    ],
                    "Trays": [
                        {
                            "pageId": "favoriteUserLabelPage",
                            "pageCaption": HP.HPTRIM.Messages.web_favorites,
                            "pageItems": [
                                {
                                    "name": "topLevelUserLabel",
                                    "caption": HP.HPTRIM.Messages.web_topLevel,
                                    "query": "top"
                                },
                            ]
                        },
                    ],
                    "navigationTasks": [
                        {
                            "id": "userLabelParent",
                            "caption": HP.HPTRIM.Messages.web_navigateToParentUserLabel,
                            "tooltip": HP.HPTRIM.Messages.web_navigateToParentUserLabel,
                            "icon": "navigateUpFolderIcon",
                            "requiredProperty": "UserLabelParentLabel",
                            "supportsTagged": false,
                            "supportsSingle": true,
                            "returnedType": "UserLabel",
                            "preConditions": [{
                                "property": "UserLabelParentLabel",
                                "valueType": "Object",
                                "value": true
                            }],
                            "searchData": {
                                "query": "uri: {0}",
                                "objectType": "UserLabel",
                                "parameters": [
                                    { "property": "UserLabelParentLabel", "type": "Object" }
                                ]
                            }
                        },
                        {
                            "id": "userLabelChildern",
                            "caption": HP.HPTRIM.Messages.web_navigateToSubUserLabel,
                            "tooltip": HP.HPTRIM.Messages.web_navigateToSubUserLabel,
                            "icon": "lowerlabel_24",
                            "requiredProperty": "UserLabelParentLabel",
                            "supportsTagged": false,
                            "supportsSingle": true,
                            "returnedType": "UserLabel",
                            "preConditions": [{
                                "property": "PossiblyHasSubordinates",
                                "valueType": "Boolean",
                                "value": true
                            }],
                            "searchData": {
                                "query": "parent: {0}",
                                "objectType": "UserLabel",
                                "parameters": [
                                    { "property": "Uri", "type": "Uri" },
                                ]
                            },
                        },

                        {
                            "id": "userLabelRecords",
                            "caption": HP.HPTRIM.Messages.web_showRecords,
                            "tooltip": HP.HPTRIM.Messages.web_showRecords,
                            "icon": "labels-record_24",
                            "supportsTagged": false,
                            "supportsSingle": true,
                            "returnedType": "Record",
                            "searchData": {
                                "query": "label:{0}",
                                "objectType": "Record",
                                "parameters": [
                                    { "property": "Uri", "type": "Uri" },
                                ]
                            }
                        },

                        {
                            "id": "userLabelLocations",
                            "caption": HP.HPTRIM.Messages.web_showLocations,
                            "tooltip": HP.HPTRIM.Messages.web_showLocations,
                            "icon": "labels-locations_24",
                            "supportsTagged": false,
                            "supportsSingle": true,
                            "returnedType": "Location",
                            "searchData": {
                                "query": "label:{0}",
                                "objectType": "Location",
                                "parameters": [
                                    { "property": "Uri", "type": "Uri" },
                                ]
                            }
                        },
                    ],

                    "updateTasks": [],

                    "createTasks": [
                        {
                            "id": "userLabelNewSubLevel",
                            "caption": HP.HPTRIM.Messages.web_createLowerLevelItem,
                            "tooltip": HP.HPTRIM.Messages.web_createLowerLevelItem,
                            "icon": "newuserlabel_24",
                            "objectType": "UserLabel",
                            "requiredProperties": ["UserLabelFullName"],
                            "returnedType": "UserLabel",
                            "successMessage": Messages.web_userLabelCreated,
                            "defaultValues": [
                                { "name": "UserLabelParentLabel", "type": "object", "displayProperty": "UserLabelFullName", "iconProperty": "Icon" },
                            ],
                        },
                    ],

                },

                ////////////////////////////////////////////
                ////
                //// 
                //// .SearchForm
                {
                    "Id": "SearchForm",
                    "CanAnybodyCreate": false,
                    "CanAnybodyUpdate": false,
                    "UpdateCaption": HP.HPTRIM.Messages.web_update,

                    "CanAnybodyDelete": false,
                    "DeleteCaption": HP.HPTRIM.Messages.web_delete,

                    "standardDataEntryForm": true,
                    "dataEntryForm": "",
                    "isHiddenInNavPanel": true,
                    "ItemListProperties": [
                        {
                            "location": "Icon",
                            "property": "Icon",
                            "subProperty": "Id"
                        },
                        {
                            "location": "Title",
                            "property": "SearchFormName"
                        },
                        {
                            "location": "TopLeft",
                            "property": "SearchFormObjectType"
                        },
                        {
                            "location": "TopRight",
                            "property": "SearchFormName",
                            "subProperty": "SearchFormName",
                            "showCaption": true,
                            "defaultValue": ""
                        },
                        {
                            "location": "Data",
                            "property": "SearchFormDescription",
                            "isEmail": false,
                            "defaultValue": ""
                        },
                        {
                            "location": "Data",
                            "property": "SearchFormName",
                            "subProperty": "AsString",
                            "showCaption": true,
                            "isEmail": false,
                            "defaultValue": ""
                        },
                    ],
                    "Trays": [
                        {
                            "pageId": "favoriteFormSearchPage",
                            "pageCaption": HP.HPTRIM.Messages.web_favorites,
                            "pageItems": [
                                {
                                    "name": "favoriteClassifications",
                                    "caption": HP.HPTRIM.Messages.web_favorites,
                                    "query": "favorite"
                                },

                                {
                                    "name": "topLevelClassifications",
                                    "caption": Messages.web_allSearchForms,
                                    "query": "all"
                                }
                            ]
                        },
                    ],
                    "navigationTasks": [

                    ],
                    "updateTasks": [

                    ],

                },

                ////////////////////////////////////////////
                //// 
                //// LOCATION
                //// .LOCATION
                ////
                {

                    "Id": "Location",

                    "CanAnybodyCreate": true,
                    "CreatePermissions": ["CreateInternalLocation", "CreateExternalLocation"],

                    "CanAnybodyUpdate": true,
                    "UpdatePermission": "LimitedModInternalLocation",
                    "UpdateCaption": HP.HPTRIM.Messages.web_updateLocationCaption,

                    "CanAnybodyDelete": true,
                    "DeletePermission": "DeleteInternalLocation",

                    "HasReports": true,

                    "NotesPropertyName": "LocationNotes",
                    "CanUpdateNotes": true,
                    "NotesPropertyReadOnly": false,

                    "standardDataEntryForm": false,

                    "mandatoryProperties": ["LocationIsWithin"],

                    "ChildObjects": [
                    ],
                    "ItemListProperties": [
                        {
                            "location": "Icon",
                            "property": "Icon",
                            "subProperty": "Id"
                        },
                        {
                            "location": "Title",
                            "property": "LocationFormattedName"
                        },
                        {
                            "location": "TopLeft",
                            "property": "LocationTypeOfLocation"
                        },
                        {
                            "location": "TopRight",
                            "property": "LocationPhoneNumber",
                            "defaultValue": "",
                        },
                        {
                            "location": "Data",
                            "property": "LocationInternetMailAddress",
                            "isEmail": true,
                            "defaultValue": "",
                        },
                        {
                            "location": "DetailData",
                            "property": "LocationJobDescription",
                            "defaultValue": "",
                        },
                        {
                            "location": "DetailData",
                            "property": "LocationFormattedAddress",
                            "defaultValue": "",
                        },
                        {
                            "location": "DetailData",
                            "property": "LocationWebPage",
                            "defaultValue": "",
                        },
                        {
                            "location": "DetailDataRight",
                            "property": "LocationUserType",
                            "requiredPermission": "ViewProfile",
                            "defaultValue": ""
                        },
                    ],
                    "Trays": [
                        {
                            "pageId": "generalLocation",
                            "pageCaption": HP.HPTRIM.Messages.web_general,
                            "pageItems": [
                                {
                                    "name": "favoriteLocations",
                                    "caption": HP.HPTRIM.Messages.web_favorites,
                                    "query": "favorite"
                                }

                            ]
                        }

                    ],
                    "navigationTasks": [
                        {
                            "id": "recordGroup",
                            "isGroup": true,
                            "caption": HP.HPTRIM.Messages.web_locationShowCaption,
                            "tooltip": HP.HPTRIM.Messages.web_locationShowToolTip,
                            "tasks": [
                                {
                                    "id": "contactRecords",
                                    "caption": HP.HPTRIM.Messages.web_locationContactRecords,
                                    "tooltip": HP.HPTRIM.Messages.web_locationContactRecords,
                                    "supportsTagged": true,
                                    "supportsSingle": true,
                                    "returnedType": "Record",
                                    "searchData": {
                                        "query": "contact: {0}",
                                        "objectType": "Record",
                                        "parameters": [
                                            { "property": "Uri", "type": "Uri" }
                                        ]
                                    }
                                },
                                {
                                    "id": "assignedRecords",
                                    "caption": HP.HPTRIM.Messages.web_locationAssignedRecords,
                                    "tooltip": HP.HPTRIM.Messages.web_locationAssignedRecords,
                                    "supportsTagged": true,
                                    "supportsSingle": true,
                                    "returnedType": "Record",
                                    "searchData": {
                                        "query": "assignee: {0}",
                                        "objectType": "Record",
                                        "parameters": [
                                            { "property": "Uri", "type": "Uri" }
                                        ]
                                    }
                                },
                                {
                                    "id": "createdRecords",
                                    "caption": HP.HPTRIM.Messages.web_locationCreatedRecords,
                                    "tooltip": HP.HPTRIM.Messages.web_locationCreatedRecords,
                                    "supportsTagged": true,
                                    "supportsSingle": true,
                                    "returnedType": "Record",
                                    "searchData": {
                                        "query": "creator: {0}",
                                        "objectType": "Record",
                                        "parameters": [
                                            { "property": "Uri", "type": "Uri" }
                                        ]
                                    }
                                },
                                {
                                    "id": "ownedRecords",
                                    "caption": HP.HPTRIM.Messages.web_locationOwnedRecords,
                                    "tooltip": HP.HPTRIM.Messages.web_locationOwnedRecords,
                                    "supportsTagged": true,
                                    "supportsSingle": true,
                                    "returnedType": "Record",
                                    "searchData": {
                                        "query": "owner: {0}",
                                        "objectType": "Record",
                                        "parameters": [
                                            { "property": "Uri", "type": "Uri" }
                                        ]
                                    }
                                },
                                {
                                    "id": "checkedOutRecords",
                                    "caption": HP.HPTRIM.Messages.web_locationCheckedOutRecords,
                                    "tooltip": HP.HPTRIM.Messages.web_locationCheckedOutRecords,
                                    "supportsTagged": true,
                                    "supportsSingle": true,
                                    "returnedType": "Record",
                                    "searchData": {
                                        "query": "checkedOutBy: {0}",
                                        "objectType": "Record",
                                        "parameters": [
                                            { "property": "Uri", "type": "Uri" }
                                        ]
                                    }
                                },
                                {
                                    "id": "assignedActivities",
                                    "caption": HP.HPTRIM.Messages.web_activities,
                                    "tooltip": HP.HPTRIM.Messages.web_activities,
                                    "supportsTagged": true,
                                    "supportsSingle": true,
                                    "returnedType": "Activity",
                                    "searchData": {
                                        "query": "assignee: {0}",
                                        "objectType": "Activity",
                                        "parameters": [
                                            { "property": "Uri", "type": "Uri" }
                                        ]
                                    }
                                },
                                {
                                    "id": "assignedTodoitems",
                                    "caption": HP.HPTRIM.Messages.web_todoItems,
                                    "tooltip": HP.HPTRIM.Messages.web_todoItems,
                                    "supportsTagged": true,
                                    "supportsSingle": true,
                                    "returnedType": "TodoItem",
                                    "searchData": {
                                        "query": "assignee: {0}",
                                        "objectType": "TodoItem",
                                        "parameters": [
                                            { "property": "Uri", "type": "Uri" }
                                        ]
                                    }
                                },
                                {
                                    "id": "forRequests",
                                    "caption": HP.HPTRIM.Messages.web_locationRequestsFor,
                                    "tooltip": HP.HPTRIM.Messages.web_locationRequestsFor,
                                    "supportsTagged": true,
                                    "supportsSingle": true,
                                    "returnedType": "Request",
                                    "searchData": {
                                        "query": "by: {0}",
                                        "objectType": "Request",
                                        "parameters": [
                                            { "property": "Uri", "type": "Uri" }
                                        ]
                                    }
                                },
                                {
                                    "id": "requestsBy",
                                    "caption": HP.HPTRIM.Messages.web_locationRequestsBy,
                                    "tooltip": HP.HPTRIM.Messages.web_locationRequestsBy,
                                    "supportsTagged": true,
                                    "supportsSingle": true,
                                    "returnedType": "Request",
                                    "searchData": {
                                        "query": "serviceLocation: {0}",
                                        "objectType": "Request",
                                        "parameters": [
                                            { "property": "Uri", "type": "Uri" }
                                        ]
                                    }
                                }
                            ]
                        }

                    ],
                    "updateTasks": [
                        {
                            "id": "setActiveDateRangeTask",
                            "caption": HP.HPTRIM.Messages.web_locationDateRangeToolTip,
                            "tooltip": HP.HPTRIM.Messages.web_locationDateRangeToolTip,
                            "successMessage": HP.HPTRIM.Messages.web_udpatedSuccessfully,
                            "icon": "setactivedaterange_24",
                            "enabledCommandId": "SetActiveDates",
                            "checkForWarnings": true,
                            "supportsTagged": true,
                            "supportsSingle": true,
                            "returnedType": "Location",
                            "objectUpdated": true,
                            "objectDeleted": false,
                            "serviceAction": {
                                "name": "SetActiveDateRange",
                                "fullType": "HP.HPTRIM.ServiceModel.SetActiveDateRange",
                                "requiredParameters": [
                                    {
                                        "name": "SetActiveDateRangeValidFromDate",
                                        "type": "Datetime",
                                        "property": "LocationActiveFrom",
                                        "caption": HP.HPTRIM.Messages.web_activedateFrom,
                                        "defaultClear": true,
                                        "isMandatory": false,
                                    },
                                    {
                                        "name": "SetActiveDateRangeValidToDate",
                                        "type": "Datetime",
                                        "property": "LocationActiveTo",
                                        "caption": HP.HPTRIM.Messages.web_activedateTo,
                                        "defaultClear": true,
                                        "isMandatory": false,
                                    },
                                ]
                            },
                            "updatedProperties": [
                                "LocationIsActive",
                                "LocationActiveTo",
                                "LocationActiveFrom",
                                "DateLastUpdated",
                                "LastUpdatedBy"
                            ]
                        },
                        //{
                        //	"id": "userLabelGroup",
                        //	"isGroup": true,
                        //	"caption": HP.HPTRIM.Messages.web_userLabel,
                        //	"tooltip": HP.HPTRIM.Messages.web_userLabelToolTip,
                        //	"tasks": [
                        //		{
                        //			"id": "setUserLAbel",
                        //			"caption": HP.HPTRIM.Messages.web_addToUserLabel,
                        //			"tooltip": HP.HPTRIM.Messages.web_addToUserLabelToolTip,
                        //			"completeMessage": HP.HPTRIM.Messages.web_addToUserLabelSuccess,
                        //			"icon": "set_active_date_range_24",
                        //			"enabledCommandId": "AddToUserLabel",
                        //			"supportsTagged": true,
                        //			"supportsSingle": true,
                        //			"returnedType": "Location",
                        //			"objectUpdated": true,
                        //			"objectDeleted": false,
                        //			"serviceAction": {
                        //				"name": "SetUserLabel",
                        //				"fullType": "HP.HPTRIM.ServiceModel.SetUserLabel",
                        //				"requiredParameters": [
                        //					{
                        //						"name": "SetUserLabelUserLabelToApply",
                        //						"type": "object",
                        //						"objectType": "UserLabel",
                        //						"caption": HP.HPTRIM.Messages.web_selectUserLabel,
                        //						"defaultClear": true,
                        //						"allowClear": false,
                        //						"defaultQuery": "top",
                        //						"filter": "not stuckon:Location,{0}",
                        //						"filterParameters": [
                        //							{ "property": "Uri", "type": "Uri" }
                        //						]
                        //					},
                        //				]
                        //			},
                        //			"updatedProperties": [
                        //				"DateLastUpdated",
                        //				"LastUpdatedBy"
                        //			]
                        //		},

                        //		{
                        //			"id": "removeUserLabel",
                        //			"caption": HP.HPTRIM.Messages.web_removeUserLabel,
                        //			"tooltip": HP.HPTRIM.Messages.web_removeUserLabelToolTip,
                        //			"completeMessage": HP.HPTRIM.Messages.web_removeUserLabelSuccess,
                        //			"icon": "set_active_date_range_24",
                        //			"enabledCommandId": "RemoveFromUserLabel",
                        //			"supportsTagged": true,
                        //			"supportsSingle": true,
                        //			"returnedType": "Location",
                        //			"objectUpdated": true,
                        //			"objectDeleted": false,
                        //			"serviceAction": {
                        //				"name": "RemoveUserLabel",
                        //				"fullType": "HP.HPTRIM.ServiceModel.RemoveUserLabel",
                        //				"requiredParameters": [
                        //					{
                        //						"name": "RemoveUserLabelUserLabelToDetach",
                        //						"type": "object",
                        //						"objectType": "UserLabel",
                        //						"caption": HP.HPTRIM.Messages.web_selectUserLabel,
                        //						"defaultClear": true,
                        //						"allowClear": false,
                        //						"defaultQuery": "all",
                        //						"filter": "stuckon:Location,{0}",
                        //						"filterParameters": [
                        //							{ "property": "Uri", "type": "Uri" }
                        //						]
                        //					},
                        //				]
                        //			},
                        //			"updatedProperties": [
                        //				"DateLastUpdated",
                        //				"LastUpdatedBy"
                        //			]
                        //		},
                        //	]
                        //},
                        {
                            "id": "detailGroup",
                            "isGroup": true,
                            "caption": HP.HPTRIM.Messages.web_details,
                            "tooltip": HP.HPTRIM.Messages.web_details,
                            "subTasks": [
                                {
                                    "id": "setGPSLocation",
                                    "caption": HP.HPTRIM.Messages.web_GPSLocation,
                                    "tooltip": HP.HPTRIM.Messages.web_GPSLocation,
                                    "completeMessage": HP.HPTRIM.Messages.web_udpatedSuccessfully,
                                    "icon": "setactivedaterange_24",
                                    "enabledCommandId": "LocOtherFields",
                                    "supportsTagged": true,
                                    "supportsSingle": true,
                                    "returnedType": "Location",
                                    "requiredFeature": "GeoLocations",
                                    "objectUpdated": true,
                                    "objectDeleted": false,
                                    "requiredProperties": ["LocationGpsLocation"],
                                    "propertiesUpdated": [
                                        {
                                            "propertyId": "LocationGpsLocation",
                                            "requiresInput": true,
                                        }
                                    ],
                                    "updatedProperties": [
                                        "DateLastUpdated",
                                        "LastUpdatedBy",
                                        "LocationGPSLocation",
                                    ]
                                },
                            ]
                        },
                    ],


                    "hasFilters": true,
                    "filterList": [
                        {
                            "name": "LocationType",
                            "caption": HP.HPTRIM.Messages.web_selectLocationTypesToBeFiltered,
                            "clauseId": "LocationType",
                            "format": "enum",
                            "enumName": "LocationType",
                            "clauseString": "type",
                        },
                        {
                            "caption": Messages.bob_objectIsActive,
                            "name": "active",
                            "clauseId": "Active",
                            "clauseString": "active",
                            "format": 'boolean',
                            "oneInGroupMustBeOn": true,
                            "options": [
                                { "caption": Messages.bob_objectIsActive, "name": 'active', "negated": false },
                                { "caption": Messages.web_locationActiveFilterInactive, "name": 'inactive', "negated": true }
                            ]
                        },
                        {
                            "name": "LoctionInternal",
                            "caption": Messages.web_locationInternalFilter,
                            "clauseId": "LocationInternal",
                            "format": 'boolean',
                            "oneInGroupMustBeOn": true,
                            "clauseString": "internal",
                            "options": [
                                { "caption": Messages.web_locationInternalFilter, "name": 'internal', "negated": false },
                                { "caption": Messages.web_locationInternalFilterExternal, "name": 'external', "negated": true }
                            ]
                        },
                        {
                            "caption": Messages.web_locationCanUseFilter,
                            "name": "withCanUse",
                            "clauseId": "Usable",
                            "clauseString": "usable",
                            "format": 'boolean',
                            "oneInGroupMustBeOn": false,
                            "reversed": true,
                            "options": [
                                { "caption": Messages.web_showWothoutCanUse, "name": 'showWithoutCanUse', "negated": false },
                            ]
                        }
                    ],
                },



                ////////////////////////////////////////////
                ////
                //// SAVED SEARCH
                //// .SAVEDSEARCH
                ////
                {
                    "Id": "SavedSearch",
                    "RequiredProductFeatureName": [],

                    "CanAnybodyCreate": false,

                    "CanAnybodyUpdate": true,
                    "UpdateCaption": HP.HPTRIM.Messages.web_savedSearches,

                    "CanAnybodyDelete": true,

                    "HasReports": false,

                    "standardDataEntryForm": true,
                    "dataEntryForm": "",

                    "mandatoryProperties": ["SavedSearchOwner",
                        // Get possible search options
                        // TODO - this should be provided more differently somehow.
                        "SavedSearchAnyWordContents",
                        "SavedSearchAnyWordNotes",
                        "SavedSearchAnyWordTitle",
                        "SavedSearchAssigneeSearchIncludesAuthorisation",
                        "SavedSearchAssigneeSearchIncludesDelegates",
                        "SavedSearchAssigneeSearchIncludesEscalated",
                        "SavedSearchAssigneeSearchIncludesGroups",
                        "SavedSearchAssigneeSearchIncludesPosition",
                        "SavedSearchDefaultIncludesContent",
                        "SavedSearchDefaultIncludesNotes",
                        "SavedSearchDefaultIncludesNumber",
                        "SavedSearchDefaultIncludesTitle",
                        "SavedSearchExtendedIDOLOptimization",
                        "SavedSearchIdolSearchStyle",
                        "SavedSearchDescription",
                    ],

                    "ItemListProperties": [
                        {
                            "location": "Icon",
                            "value": 'savesearch'
                        },
                        {
                            "location": "TopLeft",
                            "property": "SavedSearchObjectType"
                        },
                        {
                            "location": "Title",
                            "property": "SavedSearchName"
                        },
                        {
                            "location": "TopRight",
                            "property": "SavedSearchOwner",
                            "subProperty": "LocationFormattedName",
                            "showCaption": true,
                            "defaultValue": HP.HPTRIM.Messages.web_public,
                        },
                        {
                            "location": "Data",
                            "property": "SavedSearchDescription",
                            "showCaption": true,
                            "capitaliseCaption": true,
                            "defaultValue": ""

                        },
                        {
                            "location": "DetailData",
                            "property": "SavedSearchQueryString",
                            "defaultValue": "-",
                        }
                    ],

                    "Trays": [
                        {
                            "pageId": "1",
                            "pageCaption": HP.HPTRIM.Messages.web_general,
                            "pageItems": [
                                {
                                    "name": "Favorites",
                                    "caption": HP.HPTRIM.Messages.web_favorites,
                                    "query": "favorite",
                                    "default": true,
                                },

                                {
                                    "name": "public",
                                    "caption": HP.HPTRIM.Messages.web_public,
                                    "query": "public",
                                },

                                {
                                    "name": "private",
                                    "caption": HP.HPTRIM.Messages.web_private,
                                    "query": "owner:[default:" + Messages.bob_sbMe + "]",
                                },

                            ]
                        }
                    ],

                    "updateTasks": [],
                    "navigationTasks": [],

                    "searchTask": {
                        "objectSearchQeryProperty": "SavedSearchQueryString",
                        "objectSearchDescriptionProperty": "SavedSearchDescriptionString",
                        "objectFilterProperty": "SavedSearchFilterString",
                        "objectSortProperty": "SavedSearchSortString",
                        "objectTypeNameProperty": "SavedSearchObjectType",
                        "searchDefinitionProperty": "SearchDefinition",
                        "searchIsOldFormatProperty": "SavedSearchIsOldFormat",
                    }

                },



                ////////////////////////////////////////////
                ////
                //// RECORD ACTION
                //// .RECORDACTION
                {
                    "Id": "RecordAction",
                    "RequiredProductFeatureName": ['Actions'],
                    "CanAnybodyCreate": false,
                    "CanAnybodyUpdate": false,
                    "UpdateCaption": HP.HPTRIM.Messages.web_update,
                    "CanAnybodyDelete": false,
                    "HasReports": false,

                    "NotesPropertyName": "RecordActionNotes",
                    "CanUpdateNotes": true,
                    "NotesPropertyReadOnly": false,

                    "standardDataEntryForm": true,
                    "dataEntryForm": "",
                    "ItemListProperties": [
                        {
                            "location": "Icon",
                            "property": "Icon",
                            "subProperty": "Id"
                        },
                        {
                            "location": "TopLeft",
                            "property": "RecordActionRecord",
                            "subProperty": "RecordNumber",
                            "defaultValue": ""
                        },
                        {
                            "location": "TopRight",
                            "property": "RecordActionRecord",
                            "subProperty": "RecordTitle",
                            "defaultValue": ""
                        },
                        {
                            "location": "Title",
                            "property": "RecordActionActionName"
                        },

                        {
                            "location": "Data",
                            "property": "RecordActionResponsibility",
                            "subProperty": "LocationFormattedName",
                        },
                        {
                            "location": "Data",
                            "property": "RecordActionStatus"
                        },
                        {
                            "location": "Data",
                            "property": "RecordActionDueDate"
                        }
                    ],

                    "Trays": [
                        {
                            "pageId": "1",
                            "pageCaption": HP.HPTRIM.Messages.web_general,
                            "pageItems": [
                                {
                                    "name": "dueActions",
                                    "caption": HP.HPTRIM.Messages.web_activitiesReadyToStart,
                                    "query": "assignee:" + Messages.bob_sbMe + " " + Messages.core_and + " canStart"
                                }
                            ]
                        }
                    ],

                    "updateTasks": [
                        {
                            "id": "completeRecordActionTask",
                            "caption": HP.HPTRIM.Messages.web_complete,
                            "tooltip": HP.HPTRIM.Messages.web_complete,
                            "title": HP.HPTRIM.Messages.web_complete + ": {0}",
                            "titleProperty": "RecordActionActionName",
                            "successMessage": HP.HPTRIM.Messages.web_udpatedSuccessfully,
                            "checkForWarnings": true,
                            "icon": "activity_complete_24",
                            "iconSrc": trimClient.getIcon24("CompleteActivity"),
                            "enabledCommandId": "CompleteAction",
                            "supportsTagged": false,
                            "supportsSingle": true,
                            "returnedType": "RecordAction",
                            "objectUpdated": true,
                            "objectDeleted": false,
                            "serviceAction": {
                                "name": "Complete",
                                "fullType": "HP.HPTRIM.ServiceModel.CompleteRecordAction",
                                "requiredParameters": [
                                    {
                                        "name": "CompleteRecordActionCompletionDate",
                                        "type": "Datetime",
                                        "caption": HP.HPTRIM.Messages.web_completionDateTime,
                                        "isMandatory": true,
                                    },
                                    {
                                        "name": "CompleteRecordActionCompletePrevious",
                                        "type": "Boolean",
                                        "caption": HP.HPTRIM.Messages.web_completeAllPreviousIncompleteRecordActions,
                                        "isMandatory": false,
                                        "defaultClear": true
                                    },
                                ]
                            },
                            "updatedProperties": [
                                "RecordActionPercentComplete",
                                "RecordActionOverdue",
                                "RecordActionDone",
                                "RecordActionCompletedOnTime",
                                "RecordActionCompletedBy",
                                "RecordActionActualDuration"
                            ]
                        },
                        {
                            "id": "uncompleteRecordActionTask",
                            "caption": HP.HPTRIM.Messages.web_uncomplete,
                            "tooltip": HP.HPTRIM.Messages.web_uncomplete,
                            "successMessage": HP.HPTRIM.Messages.web_udpatedSuccessfully,
                            "checkForWarnings": true,
                            "icon": "uncompleteactivity_x24",
                            "iconSrc": trimClient.getIcon24("UncompleteActivity"),
                            "enabledCommandId": "UncompleteAction",
                            "supportsTagged": false,
                            "supportsSingle": true,
                            "returnedType": "RecordAction",
                            "objectUpdated": true,
                            "objectDeleted": false,
                            "serviceAction": {
                                "name": "Uncomplete",
                                "fullType": "HP.HPTRIM.ServiceModel.UncompleteRecordAction",
                            },
                            "updatedProperties": [
                                "RecordActionPercentComplete",
                                "RecordActionOverdue",
                                "RecordActionDone",
                                "RecordActionCompletedOnTime",
                                "RecordActionCompletedBy",
                                "RecordActionActualDuration"
                            ]
                        },
                        {
                            "id": "reassignRecordActionTask",
                            "caption": HP.HPTRIM.Messages.web_reassign,
                            "tooltip": HP.HPTRIM.Messages.web_reassign,
                            "successMessage": HP.HPTRIM.Messages.web_udpatedSuccessfully,
                            "checkForWarnings": true,
                            "icon": "activity_reassign_24",
                            "iconSrc": trimClient.getIcon24("ReassignActivity"),
                            "enabledCommandId": "ReassignAction",
                            "supportsTagged": true,
                            "supportsSingle": true,
                            "returnedType": "RecordAction",
                            "objectUpdated": true,
                            "objectDeleted": false,
                            "serviceAction": {
                                "name": "setAssignee",
                                "fullType": "HP.HPTRIM.ServiceModel.ReassignRecordAction",
                                "requiredParameters": [
                                    {
                                        "name": "ReassignRecordActionNewAssignee",
                                        "type": "object",
                                        "objectType": BaseObjectTypes.Location.Name,
                                        "caption": HP.HPTRIM.Messages.web_newAssignee,
                                        "requiresInput": true,
                                        "purpose": LocationPurpose.WorkflowAssignee,
                                        "property": "RecordActionResponsibility",
                                    }
                                ]
                            },
                            "updatedProperties": [
                                "RecordActionResponsibility"
                            ]
                        },

                        {
                            "id": "updateCostActionTask",
                            "caption": HP.HPTRIM.Messages.web_updateCost,
                            "tooltip": HP.HPTRIM.Messages.web_updateCost,
                            "successMessage": HP.HPTRIM.Messages.web_udpatedSuccessfully,
                            "checkForWarnings": true,
                            "icon": "currency_x24",
                            "iconSrc": trimClient.getIcon24("Currency"),
                            "enabledCommandId": "ActionCost",
                            "supportsTagged": true,
                            "supportsSingle": true,
                            "returnedType": "RecordAction",
                            "objectUpdated": true,
                            "objectDeleted": false,
                            "requiredProperties": ["RecordActionCost", "RecordActionRecord"],
                            "serviceAction": {
                                "name": "SetRecordActionCost",
                                "fullType": "HP.HPTRIM.ServiceModel.SetRecordActionCost",
                                "requiredParameters": [
                                    {
                                        "name": "SetRecordActionCostnewCost",
                                        "type": "currency",
                                        "requiresInput": true,
                                        "caption": Messages.web_newCost,
                                        "property": "RecordActionCost",
                                    }
                                ]
                            },

                            "updatedProperties": [
                                "RecordActionCost",
                                "EnabledCommandIds",
                                "RecordActionResponsibility",
                                "DateLastUpdated",
                                "LastUpdatedBy"
                            ]
                        },
                    ],

                    "navigationTasks": [

                        {
                            "id": "recordAppliesTo",
                            "caption": HP.HPTRIM.Messages.web_record,
                            "tooltip": HP.HPTRIM.Messages.web_record,
                            "icon": "navigateUpFolderIcon",
                            "supportsTagged": false,
                            "supportsSingle": true,
                            "returnedType": "Record",
                            "requiredProperty": "RecordActionRecord",
                            "searchData": {
                                "query": "uri:{0}",
                                "parameters": [
                                    { "property": "RecordActionRecord", "type": "Object" }
                                ]
                            }
                        },
                        {
                            "id": "responsibleLocation",
                            "caption": HP.HPTRIM.Messages.web_responsibleLoc,
                            "tooltip": HP.HPTRIM.Messages.web_responsibleLoc,
                            "icon": "locperson_x24",
                            "iconSrc": trimClient.getIcon24("locperson"),
                            "supportsTagged": false,
                            "supportsSingle": true,
                            "returnedType": "Location",
                            "requiredProperty": "RecordActionResponsibility",
                            "searchData": {
                                "query": "uri:{0}",
                                "parameters": [
                                    { "property": "RecordActionResponsibility", "type": "Object" }
                                ]
                            }
                        }
                    ],
                },

                ////////////////////////////////////////////
                ////
                //// RECORD TYPE
                ////
                {
                    "Id": "RecordType",

                    "RequiredProductFeatureName": [],

                    "CanAnybodyCreate": false,
                    "CanAnybodyUpdate": false,
                    "UpdatePermission": "RecordAdmin",
                    "UpdateCaption": HP.HPTRIM.Messages.web_update,

                    "CanAnybodyDelete": false,
                    "DeletePermission": "RecordAdmin",

                    "standardDataEntryForm": false,

                    "ItemListProperties": [
                        {
                            "location": "Icon",
                            "property": "Icon",
                            "subProperty": "Id"
                        },
                        {
                            "location": "Data",
                            "property": "RecordTypeHomeLocation",
                            "subProperty": "LocationFormattedName",
                            "showCaption": true,
                            "defaultValue": "-",
                        },
                        {
                            "location": "Data",
                            "property": "RecordTypeOwnerLocation",
                            "subProperty": "LocationFormattedName",
                            "showCaption": true,
                            "defaultValue": "-",
                        },
                        {
                            "location": "Title",
                            "property": "RecordTypeName"
                        }
                    ],
                    "Trays": [
                        {
                            "pageId": "1",
                            "pageCaption": HP.HPTRIM.Messages.web_general,
                            "pageItems": [
                                {
                                    "name": "allRecordTypes",
                                    "caption": HP.HPTRIM.Messages.web_allRecordTypes,
                                    "query": "all"
                                }
                            ]
                        }
                    ],

                    "updateTasks": [],
                    "navigationTasks": []
                },
                ////////////////////////////////////////////
                ////
                //// Workflow
                //// .Workflow
                ////
                {
                    "Id": "Workflow",
                    "RequiredProductFeatureName": ['Workflow'],
                    "CanAnybodyCreate": true,
                    "CanAnybodyUpdate": false,
                    "CanAnybodyDelete": false,
                    "standardDataEntryForm": true,
                    "dataEntryForm": "",
                    //"RequiredObjectOnCreate": HP.HPTRIM.BaseObjectTypes.WorkflowTemplate,	
                    "ChildObjects": [							
                    ],
                    "Trays": [
                        {
                            "pageId": "generalWorkflow",
                            "pageCaption": HP.HPTRIM.Messages.web_workflow,
                            "pageItems": [
                                {
                                    "name": "generalWorkflow",
                                    "caption": HP.HPTRIM.Messages.web_workflow,
                                    "query": "supervisor:Me Or creator:Me",
                                    "isDefault": true
                                }

                            ]
                        }							
                    ],

                    "ItemListProperties": [
                        {
                            "location": "Icon",
                            "property": "Icon",
                            "subProperty": "Id"
                        },
                        {
                            "location": "Title",
                            "property": "WorkflowName"
                        },
                        {
                            "location": "TopLeft",
                            "property": "WorkflowWorkflowPriority"
                        },
                        {
                            "location": "TopRight",
                            "property": "WorkflowPercentageCompleted"
                        }

                    ],

                    "updateTasks": [],
                    "createTasks": [
                        
                    ],
                    "navigationTasks": [
                        {
                            "id": "workflowActivity",
                            "caption": HP.HPTRIM.Messages.web_activities,
                            "tooltip": HP.HPTRIM.Messages.web_activities,
                            "supportsTagged": false,
                            "supportsSingle": true,
                            "returnedType": "Activity",
                            "searchData": {
                                "query": "Workflow: {0}",
                                "objectType": "Activity",
                                "parameters": [
                                    { "property": "Uri", "type": "Uri" }
                                ]
                            }
                        },
                        {
                            "id": "workflowRecord",
                            "caption": HP.HPTRIM.Messages.web_record,
                            "tooltip": HP.HPTRIM.Messages.web_record,
                            "supportsTagged": false,
                            "supportsSingle": true,
                            "returnedType": "Record",
                            "searchData": {
                                "query": "Workflow: {0}",
                                "objectType": "Record",
                                "parameters": [
                                    { "property": "Uri", "type": "Uri" }
                                ]
                            }
                    }]
                },
                ////////////////////////////////////////////
                ////
                //// Activity
                //// .Activity
                ////
                {
                    "Id": "Activity",
                    "RequiredProductFeatureName": ['Workflow'],
                    "CanAnybodyCreate": false,
                    "CanAnybodyUpdate": true,
                    "CanAnybodyDelete": false,
                    "UpdateCaption": HP.HPTRIM.Messages.web_update,

                    
                    "NotesPropertyName": "ActivityNotes",
                    "CanUpdateNotes": true,
                    "NotesPropertyReadOnly": false,

                    "standardDataEntryForm": false,
                    "dataEntryForm": "",	
                    "ChildObjects": [
                    ],
                    "Trays": [														
                        {
                            "pageId": "activites",
                            "pageCaption": HP.HPTRIM.Messages.web_activities,
                            "objectType": "Activity",
                            "pageItems": [
                                {
                                    "name": "activities_ready",
                                    "caption": HP.HPTRIM.Messages.web_activitiesReadyToStart,
                                    "query": "assignee:Me " + Messages.core_and + " canStart ",
                                    'baseObjectType': BaseObjectTypes.Activity,
                                    "isDefault": true
                                },
                                {
                                    "name": "activities_incomplete",
                                    "caption": HP.HPTRIM.Messages.web_activitiesIncomplete ,
                                    "query": "assignee:Me " + Messages.core_and + " Not done",
                                    'baseObjectType': BaseObjectTypes.Activity,
                                }
                            ]
                        },
                                                    
                    ],

                    "ItemListProperties": [
                        {
                            "location": "Icon",
                            "property": "Icon",
                            "subProperty": "Id"
                        },
                        {
                            "location": "Title",
                            "property": "ActivityName"
                        },
                        {
                            "location": "TopLeft",
                            "property": "ActivityState"
                        },
                        {
                            "location": "TopRight",
                            "property": "ActivityWorkflow",
                            "subProperty": "WorkflowName"
                        },{
                            "location": "Data",
                            "property": "ActivityDateDue",
                            "showCaption": true,
                            "capitaliseCaption": true,
                            "defaultValue": ""
                            //"subProperty": "WorkflowName",
                        },
                        {
                            "location": "Data",
                            "property": "ActivityAssignedTo",
                            "subProperty": "LocationFormattedName",
                            "showCaption": true,
                            "capitaliseCaption": true,
                            "defaultValue": ""
                        }

                    ],

                    "updateTasks": [{
                        "id": "completeActivityTasks",
                        "caption": HP.HPTRIM.Messages.web_complete + ' ' + HP.HPTRIM.Messages.web_activity,
                        "tooltip":  HP.HPTRIM.Messages.web_complete + ' ' + HP.HPTRIM.Messages.web_activity,
                        "title":  HP.HPTRIM.Messages.web_complete + ' ' + HP.HPTRIM.Messages.web_activity,
                        "successMessage": HP.HPTRIM.Messages.web_udpatedSuccessfully,
                        "checkForWarnings": true,
                        "icon": "activity_complete_24",
                        "iconSrc": trimClient.getIcon24("CompleteActivity"),
                        "enabledCommandId": "CompleteActivity",
                        "supportsTagged": false,
                        "supportsSingle": true,
                        "returnedType": "Activity",
                        "objectUpdated": true,
                        "objectDeleted": false,
                        "preConditions": [{
                            "property": "ActivityIsComplete",
                            "value": false
                        }],
                        "serviceAction": {
                            "name": "CompleteActivity",
                            "fullType": "HP.HPTRIM.ServiceModel.CompleteActivity",								
                        },
                        "requiredProperties": ["ActivityAssignedTo","ActivityIsComplete","SingleResultOnly","ChildDocuments","ChildResults","ActivityResultWasReached","RollbackToId","ActivityResultName","ActivityResultDescription","ActivityResultRollbackToId","ActivityResultWasReached","ActivityIsReadyToStart"],	
                        "requireCustomForm": true,						
                        "updatedProperties": [								
                            "EnabledCommandIds",
                            "ActivityIsComplete",
                            "ActivityDateCompleted",
                            "ChildResults",
                            "DateLastUpdated",
                            "LastUpdatedBy",
                            "ActivityResultWasReached",
                            "RollbackToId",
                            "ActivityResultName",
                            "ActivityResultDescription",
                            "ActivityResultRollbackToId",
                            "ActivityIsReadyToStart",
                            "SingleResultOnly",
                            "ActivityAssignedTo",
                            "Icon"
                        ]
                    },
                    {
                        "id": "uncompleteActivityItemTasks",
                        "caption": HP.HPTRIM.Messages.web_uncomplete + ' ' + HP.HPTRIM.Messages.web_activity,
                        "title":HP.HPTRIM.Messages.web_uncomplete + ' ' + HP.HPTRIM.Messages.web_activity,
                        "tooltip": HP.HPTRIM.Messages.web_uncomplete,
                        "successMessage": HP.HPTRIM.Messages.web_udpatedSuccessfully,
                        "checkForWarnings": false,
                        "icon": "uncompleteactivity_x24",
                        "iconSrc": trimClient.getIcon24("UncompleteActivity"),
                        "supportsTagged": false,
                        "supportsSingle": true,
                        "returnedType": "Activity",
                        "objectUpdated": true,
                        "objectDeleted": false,

                        "enabledCommandId": "UncompleteActivity",
                        "preConditions": [{
                            "property": "ActivityIsComplete",
                            "value": true
                        }],
                        "propertiesUpdated": [],
                        "serviceAction": {
                            "name": "UncompleteActivity",
                            "fullType": "HP.HPTRIM.ServiceModel.UncompleteActivity",
                            "requiredParameters": [
                                {
                                    "name": "UncompleteActivityReason",
                                    "type": "text",										
                                    "caption": HP.HPTRIM.Messages.web_reason,
                                    "isMandatory": true,
                                }	
                            ]
                        },
                        "updatedProperties": [
                            "EnabledCommandIds",
                            "ActivityIsComplete",
                            "ActivityDateCompleted",
                            "DateLastUpdated",
                            "LastUpdatedBy",
                            "Icon"
                        ]
                    },

                    {
                        "id": "reassignActivity",
                        "caption": HP.HPTRIM.Messages.web_reassign,
                        "tooltip": HP.HPTRIM.Messages.web_reassign,
                        "successMessage": HP.HPTRIM.Messages.web_udpatedSuccessfully,
                        "checkForWarnings": true,
                        "icon": "setAssignee",
                        "supportsTagged": false,
                        "supportsSingle": true,
                        "returnedType": "Activity",
                        "objectUpdated": true,
                        "objectDeleted": false,
                        "enabledCommandId": "Properties",
                        "requiredProperties": ["ActivityAssignedTo"],
                        "preConditions": [{
                            "property": "ActivityIsComplete",
                            "value": false
                        }],
                        "propertiesUpdated": [
                            {
                                "propertyId": "ActivityAssignedTo",
                                "purpose": LocationPurpose.WorkflowAssignee,
                                "requiresInput": true,
                                "allowClearValue": false,
                            }
                        ],
                        "updatedProperties": [
                            "ActivityAssignedTo",
                            "DateLastUpdated",
                            "LastUpdatedBy"
                        ]
                    }
                ],
                    "navigationTasks": []
                },					

            ]
        }
    }

}