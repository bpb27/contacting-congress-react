const camelize = require('camelcase-keys');

const populate = async (cache, db) => {
  console.time('populate cache');

  const [
    { rows: zips },
    { rows: states },
    { rows: legislators },
  ] = await Promise.all([
    db.query('SELECT * FROM zipcode_districts'),
    db.query('SELECT * FROM states'),
    db.query('SELECT * FROM legislators'),
  ]);

  const stateIdToAbbr = states.reduce((hash, s) => ({
    ...hash,
    [s.id]: s.abbreviation,
  }), {});

  const zipToDistricts = zips.reduce((hash, { district, state_id, zipcode }) => {
    const value = `${stateIdToAbbr[state_id]}-${district}`;
    if (hash[zipcode]) hash[zipcode].push(value);
    else hash[zipcode] = [value];
    return hash;
  }, {});

  const cacheZipToDistricts = Object.keys(zipToDistricts).map(zip => ({
    key: zip,
    val: zipToDistricts[zip],
  }));

  const cacheLegislators = {
    key: 'legislators',
    val: legislators.map(camelize),
  };

  const cacheStates = {
    key: 'states',
    val: states.map(camelize),
  };

  cache.mset([
    cacheZipToDistricts,
    cacheLegislators,
    cacheStates
  ].flat());

  console.timeEnd('populate cache');
};

module.exports = populate;
