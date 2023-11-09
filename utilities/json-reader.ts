import fs from 'fs';

export function getExpectedLaunchesData() {
    const testDataPath = './resources/test-data.json';
    const testDataFile = fs.readFileSync(testDataPath);
    const testData = JSON.parse(testDataFile.toString());

    return testData.content.sort((a, b) => { return b.number - a.number; });
}
