const filterByChamber = (list, { chamber }) => {
  if (!chamber) return list;
  if (chamber === 'senate') return list.filter(i => i.type === 'sen');
  if (chamber === 'house') return list.filter(i => i.type === 'rep');
  return list;
};

const filterByGender = (list, { gender }) => {
  if (!gender) return list;
  if (gender === 'male') return list.filter(i => i.gender === 'M');
  if (gender === 'female') return list.filter(i => i.gender === 'F');
  return list;
};

const filterByName = (list, { name }) => {
  if (!name) return list;
  return list.filter(i => i.fullName.toLowerCase().includes(name.toLowerCase()));
};

const filterByParty = (list, { party }) => {
  if (!party) return list;
  return list.filter(i => i.party.toLowerCase().includes(party.toLowerCase()));
};

const filterByState = (list, { state }) => {
  if (!state) return list;
  return list.filter(i => i.state === state);
};

const filterByZip = (list, { zipCode }, { cache }) => {
  if (!zipCode) return list;
  const districts = cache.get(zipCode);
  const numbers = districts.map(d => Number(d.split('-')[1]));
  const state = districts[0].split('-')[0];
  return list
    .filter(p => p.state === state)
    .filter(p => p.type === 'sen' ? true : numbers.includes(p.district));
};

module.exports = {
  filterByChamber,
  filterByGender,
  filterByName,
  filterByParty,
  filterByState,
  filterByZip,
};
