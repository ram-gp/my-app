export interface ITrimEnum {
    name: string;
}
export interface IBaseObjectType {
    name: string;
    path: string;
    nameProperty: string;
    Abbreviation ? : string;
    AvailableOffline ? : boolean;
    Caption ? : string;
    CaptionPlural ? : string;
    CopiedACLEnum ? : string;
    HasAudit ? : boolean;
    HasBarcode ? : boolean;
    HasContextMenu ? : boolean;
    HasCopiedACL ? : boolean;
    HasCopiedSecurity ? : boolean;
    HasFavorites ? : boolean;
    HasHierarchy ? : boolean;
    HasLabels ? : boolean;
    HasNotes ? : boolean;
    HasPrimaryACL ? : boolean;
    HasSecurity ? : boolean;
    HasUserFields ? : boolean;
    HasValidDateRange ? : boolean;
    HierarchySearchClauseId ? : string;
    Icon ? : string;
    Id ? : string;
    InXMLSchema ? : boolean;
    IsChild ? : boolean;
    Name ? : string;
    NamePropertyId ? : string;
    NotesPropertyId?: string;
    PossiblyHasSubordinates?: boolean;
    PrefixPropertyId ? : string;
    PrefixSearchClauseId ? : string;
    PrimaryACLEnum ? : string;
    ToolTipPropertyId ? : string;
}

export class BaseObjectTypes {
    
    /*[[[cog	
    
    # Load XML representation of data dictionary.
    import xml.etree.cElementTree as ET
    root = ET.parse('TRIMObjectModel.xml').getroot()

    cog.outl()
    objList = root.findall('Objects/Object')[1:]
    objList = [ x for x in objList if x.find('InDotNet').text == '1' and x.get('isMainObj') == 'true' ]		
    objList = [ x for x in objList if x.get('objName') != 'database' ]		
    for obj in objList:
        name = obj.find('CsName').text
        path = obj.find('CsName').text
        namePropertyInternal = obj.find('NameProp').text.split('::')[-1]
        nameProp = [ x for x in obj.findall('Properties/Property') if x.find('CppEnumId').text == namePropertyInternal][0]
        nameProp = nameProp.find('CppName').text
        #nameProp = nameProp[0].upper() + nameProp[1:]
        
        # Not sure why a couple of these don't follow the pattern.
        if name == 'AutoPartRule':
            nameProp = 'AutoPartRuleAprName' 
        elif name == 'ZipCode':
            nameProp = 'ZipCodeName'
        else:
            nameProp = name + nameProp
        
        cog.outl("static {0}: IBaseObjectType = {{name:'{0}', path: '{1}', nameProperty: '{2}'}};".format(name, path, nameProp))
        
    cog.outl()
    
    ]]]*/

    static ActionDef: IBaseObjectType = {name:'ActionDef', path: 'ActionDef', nameProperty: 'ActionDefActionName'};
    static Activity: IBaseObjectType = {name:'Activity', path: 'Activity', nameProperty: 'ActivityName'};
    static AgendaItem: IBaseObjectType = {name:'AgendaItem', path: 'AgendaItem', nameProperty: 'AgendaItemNumber'};
    static AgendaItemType: IBaseObjectType = {name:'AgendaItemType', path: 'AgendaItemType', nameProperty: 'AgendaItemTypeName'};
    static Alert: IBaseObjectType = {name:'Alert', path: 'Alert', nameProperty: 'AlertTitle'};
    static ArchiveEvent: IBaseObjectType = {name:'ArchiveEvent', path: 'ArchiveEvent', nameProperty: 'ArchiveEventTitle'};
    static AutoPartRule: IBaseObjectType = {name:'AutoPartRule', path: 'AutoPartRule', nameProperty: 'AutoPartRuleAprName'};
    static Census: IBaseObjectType = {name:'Census', path: 'Census', nameProperty: 'CensusName'};
    static CheckinPlace: IBaseObjectType = {name:'CheckinPlace', path: 'CheckinPlace', nameProperty: 'CheckinPlaceName'};
    static CheckinStyle: IBaseObjectType = {name:'CheckinStyle', path: 'CheckinStyle', nameProperty: 'CheckinStyleName'};
    static Classification: IBaseObjectType = {name:'Classification', path: 'Classification', nameProperty: 'ClassificationIdNumber'};
    static Communication: IBaseObjectType = {name:'Communication', path: 'Communication', nameProperty: 'CommunicationDescription'};
    static Consignment: IBaseObjectType = {name:'Consignment', path: 'Consignment', nameProperty: 'ConsignmentNumber'};
    static ConsignmentApprover: IBaseObjectType = {name:'ConsignmentApprover', path: 'ConsignmentApprover', nameProperty: 'ConsignmentApproverDescription'};
    static ConsignmentIssue: IBaseObjectType = {name:'ConsignmentIssue', path: 'ConsignmentIssue', nameProperty: 'ConsignmentIssueRecord'};
    static ConsignmentRejection: IBaseObjectType = {name:'ConsignmentRejection', path: 'ConsignmentRejection', nameProperty: 'ConsignmentRejectionDescription'};
    static ConsignmentTemplate: IBaseObjectType = {name:'ConsignmentTemplate', path: 'ConsignmentTemplate', nameProperty: 'ConsignmentTemplateDescription'};
    static DocumentQueue: IBaseObjectType = {name:'DocumentQueue', path: 'DocumentQueue', nameProperty: 'DocumentQueueName'};
    static ElectronicStore: IBaseObjectType = {name:'ElectronicStore', path: 'ElectronicStore', nameProperty: 'ElectronicStoreName'};
    static ExternalIcon: IBaseObjectType = {name:'ExternalIcon', path: 'ExternalIcon', nameProperty: 'ExternalIconName'};
    static ExternalLink: IBaseObjectType = {name:'ExternalLink', path: 'ExternalLink', nameProperty: 'ExternalLinkLinkName'};
    static ExternalWorkflow: IBaseObjectType = {name:'ExternalWorkflow', path: 'ExternalWorkflow', nameProperty: 'ExternalWorkflowSlipId'};
    static ExternalWorkflowTask: IBaseObjectType = {name:'ExternalWorkflowTask', path: 'ExternalWorkflowTask', nameProperty: 'ExternalWorkflowTaskDescription'};
    static ExternalWorkflowType: IBaseObjectType = {name:'ExternalWorkflowType', path: 'ExternalWorkflowType', nameProperty: 'ExternalWorkflowTypeName'};
    static FieldDefinition: IBaseObjectType = {name:'FieldDefinition', path: 'FieldDefinition', nameProperty: 'FieldDefinitionName'};
    static History: IBaseObjectType = {name:'History', path: 'History', nameProperty: 'HistoryEventDescription'};
    static Hold: IBaseObjectType = {name:'Hold', path: 'Hold', nameProperty: 'HoldName'};
    static HtmlLayout: IBaseObjectType = {name:'HtmlLayout', path: 'HtmlLayout', nameProperty: 'HtmlLayoutName'};
    static Jurisdiction: IBaseObjectType = {name:'Jurisdiction', path: 'Jurisdiction', nameProperty: 'JurisdictionName'};
    static Keyword: IBaseObjectType = {name:'Keyword', path: 'Keyword', nameProperty: 'KeywordName'};
    static Location: IBaseObjectType = {name:'Location', path: 'Location', nameProperty: 'LocationSortName'};
    static LookupItem: IBaseObjectType = {name:'LookupItem', path: 'LookupItem', nameProperty: 'LookupItemFullDescription'};
    static LookupSet: IBaseObjectType = {name:'LookupSet', path: 'LookupSet', nameProperty: 'LookupSetName'};
    static MailTemplate: IBaseObjectType = {name:'MailTemplate', path: 'MailTemplate', nameProperty: 'MailTemplateName'};
    static Meeting: IBaseObjectType = {name:'Meeting', path: 'Meeting', nameProperty: 'MeetingName'};
    static MeetingType: IBaseObjectType = {name:'MeetingType', path: 'MeetingType', nameProperty: 'MeetingTypeName'};
    static MetadataRule: IBaseObjectType = {name:'MetadataRule', path: 'MetadataRule', nameProperty: 'MetadataRuleMessage'};
    static MinuteItem: IBaseObjectType = {name:'MinuteItem', path: 'MinuteItem', nameProperty: 'MinuteItemDescription'};
    static MinuteItemType: IBaseObjectType = {name:'MinuteItemType', path: 'MinuteItemType', nameProperty: 'MinuteItemTypeName'};
    static OfflineRecord: IBaseObjectType = {name:'OfflineRecord', path: 'OfflineRecord', nameProperty: 'OfflineRecordTitle'};
    static Origin: IBaseObjectType = {name:'Origin', path: 'Origin', nameProperty: 'OriginName'};
    static OriginHistory: IBaseObjectType = {name:'OriginHistory', path: 'OriginHistory', nameProperty: 'OriginHistoryName'};
    static Record: IBaseObjectType = {name:'Record', path: 'Record', nameProperty: 'RecordNumber'};
    static RecordAction: IBaseObjectType = {name:'RecordAction', path: 'RecordAction', nameProperty: 'RecordActionActionName'};
    static RecordType: IBaseObjectType = {name:'RecordType', path: 'RecordType', nameProperty: 'RecordTypeName'};
    static Report: IBaseObjectType = {name:'Report', path: 'Report', nameProperty: 'ReportName'};
    static ReportBitmap: IBaseObjectType = {name:'ReportBitmap', path: 'ReportBitmap', nameProperty: 'ReportBitmapName'};
    static Request: IBaseObjectType = {name:'Request', path: 'Request', nameProperty: 'RequestRecord'};
    static Revision: IBaseObjectType = {name:'Revision', path: 'Revision', nameProperty: 'RevisionDescription'};
    static SavedSearch: IBaseObjectType = {name:'SavedSearch', path: 'SavedSearch', nameProperty: 'SavedSearchFullName'};
    static Schedule: IBaseObjectType = {name:'Schedule', path: 'Schedule', nameProperty: 'ScheduleName'};
    static ScheduledTask: IBaseObjectType = {name:'ScheduledTask', path: 'ScheduledTask', nameProperty: 'ScheduledTaskDescription'};
    static SearchForm: IBaseObjectType = {name:'SearchForm', path: 'SearchForm', nameProperty: 'SearchFormName'};
    static SecurityCaveat: IBaseObjectType = {name:'SecurityCaveat', path: 'SecurityCaveat', nameProperty: 'SecurityCaveatName'};
    static SecurityGuide: IBaseObjectType = {name:'SecurityGuide', path: 'SecurityGuide', nameProperty: 'SecurityGuideEntryReference'};
    static SecurityLevel: IBaseObjectType = {name:'SecurityLevel', path: 'SecurityLevel', nameProperty: 'SecurityLevelName'};
    static SharePointItem: IBaseObjectType = {name:'SharePointItem', path: 'SharePointItem', nameProperty: 'SharePointItemUniqueId'};
    static Space: IBaseObjectType = {name:'Space', path: 'Space', nameProperty: 'SpaceNumber'};
    static StopWord: IBaseObjectType = {name:'StopWord', path: 'StopWord', nameProperty: 'StopWordName'};
    static StorePool: IBaseObjectType = {name:'StorePool', path: 'StorePool', nameProperty: 'StorePoolName'};
    static TodoItem: IBaseObjectType = {name:'TodoItem', path: 'TodoItem', nameProperty: 'TodoItemDescription'};
    static UserLabel: IBaseObjectType = {name:'UserLabel', path: 'UserLabel', nameProperty: 'UserLabelFullName'};
    static Workflow: IBaseObjectType = {name:'Workflow', path: 'Workflow', nameProperty: 'WorkflowName'};
    static WorkflowTemplate: IBaseObjectType = {name:'WorkflowTemplate', path: 'WorkflowTemplate', nameProperty: 'WorkflowTemplateName'};
    static WorkingCopy: IBaseObjectType = {name:'WorkingCopy', path: 'WorkingCopy', nameProperty: 'WorkingCopyTitle'};
    static ZipCode: IBaseObjectType = {name:'ZipCode', path: 'ZipCode', nameProperty: 'ZipCodeName'};

    //[[[end]]]
   
}
