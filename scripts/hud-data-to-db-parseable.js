/*
 Download the zipcode to congressional district (ZIP-CD) file:
 https://www.huduser.gov/portal/datasets/usps_crosswalk.html

 Delete the unnecessary columns
 Save the file as zip-cd-lookup.csv in /data
 Add the zip,cd headers
 Run script
 Look for the upload file in /data
 Import to Postico
*/

const csv = require('csvtojson');
const path = require('path');
const fs = require('fs-extra');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// ingest from HUD
const filePathCSV = path.join(__dirname, '../data/zip-cd-lookup.csv');
// export JSON (not really used)
const filePathJSON = path.join(__dirname, '../data/zip-cd-lookup.json');
// export CSV for DB upload
const filePathCSVUpload = path.join(__dirname, '../data/zip-cd-lookup-upload.csv');

const csvWriter = createCsvWriter({
  path: filePathCSVUpload,
  header: [
    {id: 'district', title: 'district'},
    {id: 'stateId', title: 'state_id'},
    {id: 'zip', title: 'zip'},
  ]
});

const run = async () => {
  const data = await csv().fromFile(filePathCSV);
  const parsed = data
    .map(({ cd, zip }) => ({
      // some districts show up as 00 but should be 01
      district: Number(cd.slice(2, 4) === '00' ? '01' : cd.slice(2, 4)),
      stateId: normalizeHudStateMap[Number(cd.slice(0, 2))],
      zip,
    }))
    .filter(item => item.stateId && item.district && item.zip);

  try {
    await fs.writeFile(filePathJSON, JSON.stringify(parsed, null, 2));
    await csvWriter.writeRecords(parsed);
    console.log('success');
  } catch (error) {
    console.error('error', error);
  }
};

run();

const normalizeHudStateMap = {
  1: 1, // AL
  2: 2, // AK
  3: undefined, // AS
  4: 3, // AZ
  5: 4, // AR
  6: 5, // CA
  7: undefined, // unknown
  8: 6, // CO
  9: 7, // CT
  10: 8, // DE
  11: undefined, // DC
  12: 9, // FL
  13: 10, // GA
  14: undefined, // unknown
  15: 11, // HI
  16: 12, // ID
  17: 13, // IL
  18: 14, // IN
  19: 15, // IA
  20: 16, // KS
  21: 17, // KY
  22: 18, // LA
  23: 19, // ME
  24: 20, // MD
  25: 21, // MA
  26: 22, // MI
  27: 23, // MN
  28: 24, // MS
  29: 25, // MO
  30: 26, // MT
  31: 27, // NE
  32: 28, // NV
  33: 29, // NH
  34: 30, // NJ
  35: 31, // NM
  36: 32, // NY
  37: 33, // NC
  38: 34, // ND
  39: 35, // OH
  40: 36, // OK
  41: 37, // OR
  42: 38, // PA
  43: undefined, // unknown
  44: 39, // RI
  45: 40, // SC
  46: 41, // SD
  47: 42, // TN
  48: 43, // TX
  49: 44, // UT
  50: 45, // VT
  51: 46, // VA
  52: undefined, // unknown
  53: 47, // WA
  54: 48, // WV
  55: 49, // WI
  56: 50, // WY
};
