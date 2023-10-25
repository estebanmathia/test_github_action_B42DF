import { Rules } from "../../../models/settingFile/rules.models";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false){
    let link = "https://" + objectContent?.Region + ".console.aws.amazon.com/";
    let webLink = `Id : <a href="`;
    let fullLink;
    if (isSms)
        fullLink = link;
    else
        fullLink = webLink.concat(link.toString());
    switch (rule?.objectName) {
        case "ec2Volume":
            return fullLink + `ec2/home?region=` + objectContent?.Region + `#VolumeDetails:volumeId=`+ objectContent?.VolumeId + (isSms ? ' ' : '">') + objectContent?.VolumeId + (isSms ? `.` : `</a>`)
        case "ec2SG":
            return fullLink + `ec2/home?region=` + objectContent?.Region + `#SecurityGroup:groupId=`+ objectContent?.GroupId + (isSms ? ' ' : '">') + objectContent?.GroupId + (isSms ? `.` : `</a>`)
        case "ec2Instance":
            return fullLink + `ec2/home?region=` + objectContent?.Region + `#InstanceDetails:instanceId=`+ objectContent?.Instances[0]?.InstanceId + (isSms ? ' ' : '">') + objectContent?.Instances[0]?.InstanceId + (isSms ? `.` : `</a>`)
        case "rds":
            return fullLink + `rds/home?region=` + objectContent?.Region + `#InstanceDetails:instanceId=`+ objectContent?.Instances[0]?.InstanceId + (isSms ? ' ' : '">') + objectContent?.Instances[0]?.InstanceId + (isSms ? `.` : `</a>`)
        case "tagsValue":
            return fullLink + `resource-groups/tag-editor/find-resources?region=` + objectContent?.Region + (isSms ? ' ' : '">') + objectContent?.name + (isSms ? `.` : `</a>`)
        case "ecrRepository":
            return fullLink + objectContent?.repositoryUri + (isSms ? ' ' : '">') + objectContent?.repositoryName + (isSms ? `.` : `</a>`)
        case "ecsCluster":
            return 'ClusterArn :' + objectContent?.clusterArn;
        case "resourceGroups":
            return 'GroupArn :' + objectContent?.GroupArn;
        default:
            return 'AWS Scan : Id : ' + objectContent.id;
    }
}

function cutAWSAvailabilityToRegion(inputString: string): string {
    const regionNumber = inputString.search(/\d+(?![\d])/);
    if (regionNumber !== -1) {
        console.log("Region AWS : " + inputString.substring(0, regionNumber + 1));
        return inputString.substring(0, regionNumber + 1);
    }
    return inputString;
}