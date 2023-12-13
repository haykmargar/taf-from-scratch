import fs from 'fs';
import { LaunchResource } from '@Models/launch.model';

export function getExpectedLaunchesData() {
    const testDataPath = './resources/test-data.json';
    const testDataFile = fs.readFileSync(testDataPath);
    const testData = JSON.parse(testDataFile.toString());

    return testData.content.sort((a: LaunchResource, b: LaunchResource) => { return b.number - a.number; });
}
