const populate = async (cache, db) => {
  console.time('populate cache');
  const [
    { rows: zips },
    { rows: states },
    { rows: people },
  ] = await Promise.all([
    db.query('SELECT * FROM zipcode_districts'),
    db.query('SELECT * FROM states'),
    db.query('SELECT * FROM legislators'),
  ]);

  const stateIdToAbbr = states.reduce((hash, s) => ({
    ...hash,
    [s.id]: s.abbreviation,
  }), {});

  // zips should return an array, can be multiple districts
  const cacheZips = zips.map(({ district, state_id, zipcode }) => ({
    key: zipcode,
    val: `${stateIdToAbbr[state_id]}-${district}`,
  }));

  const cacheReps = people
    .filter(p => p.type === 'rep')
    .map(p => ({
      key: `${p.state}-${p.district}`,
      val: p,
    }));

  const cacheSens = states
    .map(s => ({
      key: s.abbreviation,
      val: people.filter(p => p.type === 'sen' && p.state === s.abbreviation),
    }));

  const success1 = cache.mset(cacheZips);
  const success2 = cache.mset(cacheReps);
  const success3 = cache.mset(cacheSens);
  console.log(success1, success2, success3);
  console.timeEnd('populate cache');
};

module.exports = populate;
