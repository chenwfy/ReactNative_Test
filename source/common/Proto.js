export const ProtoContent = `
message RequestBase
{
	optional string Command = 1;
	optional bytes Data = 2;
}

message RespondBase
{
	optional Status Status = 1[default=Succeed];
	optional string Message = 2;
	optional bytes Data = 3;
}

enum Status
{
	Failed = 0;
	Succeed = 1;
}

message NewsInfo
{
	optional uint32 NewsId = 1;
	optional string Title = 2;
	optional string SubTitle_Cn = 3;
	optional string SubTitle_En = 4;
	optional string ImageUrl = 5;
	optional string Content = 6;
	optional uint32 Target = 7;
	optional string CategoryName = 8;
}

message SentenceList
{
	repeated NewsInfo DataList = 1;
}
`;