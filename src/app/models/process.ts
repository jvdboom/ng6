export class Process {
  ID: number;
  ProcessConfigurationID: number;
  Name: string;
  CurrentProcessStatusID: number;
  CosmosJobID: number;
  FileID: number;
  DataLocationID: number;
  CreatedByCosmosJobID: number;
  MessageGroupID: number;
}

export class ProcessStatus {
  ID: number;
  ProcessID: number;
  StateID: number;
  CreationDateTime: Date;
  ProcessEndState: number;
  DetailInformation: string;
  FollowUp: boolean;
}

export class ProcessDefinition {
  ID: number;
  Name: string;
  Description: string;
  WorkFlowId: string;
  Type: number;
  ImageName: string;
}

export class ProcessParameterDefinition {
  ID: number;
  ProcessDefinitionID: number;
  Name: string;
  DefaultValue: string;
  DTAPstate: string;
}

export class ProcessParameterConfiguration {
  ID: number;
  ProcessParameterDefinitionID: number;
  ProcessConfigurationID: number;
  Name: string;
  Value: string;
  DTAPstate: string;
}

export class ProcessConfiguration {
  ID: number;
  ProcessDefinitionID: number;
  Name: string;
}

export class OutputChannelProcess {
  ID: number;
  Active: boolean;
  ChannelTypeID: number;
  ConnectivityID: number;
  ConnectivityName: string;
  DTAPState: string;
  Description: string;
  IconImage: string;
  Name: string;
  ProcessConfigID: string;
  D_ProcessConfigID: number;
}
