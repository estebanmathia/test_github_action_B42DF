////////////////////////////////////////////////////////////////////////////////////////////////////////
//// Class to cast object for yaml files

import { Alert } from "./alert.models";
import { Rules } from "./rules.models";

////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface SettingFile {
    version: string;
    date: string;
    alert: Alert;
    rules:Rules[];
}