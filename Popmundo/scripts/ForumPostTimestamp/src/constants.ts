/// <reference path="./types/enums.ts"/>
const timeRegex = /(?<day>\d{1,2})\.(?<month>\d{1,2})\.(?<year>\d{4}),\s(?<hour>\d{1,2}):(?<minute>\d{1,2})/;
const displayPreference: TimeStampVisiblePreferences = TimeStampVisiblePreferences.onTimeText;