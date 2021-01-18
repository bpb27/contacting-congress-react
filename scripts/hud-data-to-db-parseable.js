/*
 Download the zipcode to congressional district (ZIP-CD) file:
 https://www.huduser.gov/portal/datasets/usps_crosswalk.html

 Delete the unnecessary columns
 Save the file as zip-cd-lookup.csv in /data
 Add the zip,cd headers
 Run script
 Look for new JSON file in /data
*/

const csv = require('csvtojson');
const path = require('path');
const fs = require('fs-extra');

const filePathCSV = path.join(__dirname, '../data/zip-cd-lookup.csv');
const filePathJSON = path.join(__dirname, '../data/zip-cd-lookup.json');

const run = async () => {
  const data = await csv().fromFile(filePathCSV);
  const parsed = data.map(({ cd, zip }) => {
    const state = cd.slice(0, 2);
    const district = cd.slice(2, 4);
    return {
      district,
      stateId: Number(state),
      zip,
    };
  });

  try {
    await fs.writeFile(filePathJSON, JSON.stringify(parsed, null, 2));
    console.log('success');
  } catch (error) {
    console.error('error', error);
  }
};

run();
