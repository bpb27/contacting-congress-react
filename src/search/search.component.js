import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LEGISLATORS } from '../api';
import { states } from '../constants';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const Container = styled.div``;

const useStyles = makeStyles(() => ({
  formControl: {
    margin: 5,
    minWidth: 120,
  },
}));

const Search = () => {
  const classes = useStyles();
  // useReducer
  const [zipCode, setZipCode] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [party, setParty] = useState('');
  const [usState, setUsState] = useState('');
  const { error, data, loading, refetch } = useQuery(GET_LEGISLATORS);

  useEffect(() => {
    refetch({
      gender: gender || null,
      name: name || null,
      party: party || null,
      state: usState || null,
      zipCode: zipCode.length === 5 ? zipCode : null,
    });
  }, [gender, name, party, usState, zipCode]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong...</p>;
  return (
    <Container>
      <h1>{ data.legislators.length } Members of Congress</h1>
      <FormControl className={classes.formControl}>
        <TextField
          id="zipCode"
          label="Zip code"
          onChange={ev => setZipCode(ev.target.value)}
          type="text"
          value={zipCode}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          id="name"
          label="Name"
          onChange={ev => setName(ev.target.value)}
          type="text"
          value={name}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          id="gender"
          label="Gender"
          onChange={ev => setGender(ev.target.value)}
          value={gender}
        >
          <MenuItem value="">Any</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="male">Male</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="party-label">Party</InputLabel>
        <Select
          labelId="party-label"
          id="party"
          label="Party"
          onChange={ev => setParty(ev.target.value)}
          value={party}
        >
          <MenuItem value="">Any</MenuItem>
          <MenuItem value="democrat">Democrat</MenuItem>
          <MenuItem value="independent">Independent</MenuItem>
          <MenuItem value="republican">Republican</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="us-state-label">State</InputLabel>
        <Select
          labelId="us-state-label"
          id="us-state"
          label="Party"
          onChange={ev => setUsState(ev.target.value)}
          value={usState}
        >
          <MenuItem value="">Any</MenuItem>
          { states.map(({ label, value }) => (
            <MenuItem key={value} value={value}>{ label }</MenuItem>
          ))}
        </Select>
      </FormControl>
      { data.legislators.map(person => (
        <p key={person.id}>
          { formatName(person) } - { person.party} - { formatDistrict(person) }
        </p>
      ))}
    </Container>
  );
};

const formatName = ({ chamber, fullName }) => (
  `${chamber === 'senate' ? 'Sen' : 'Rep'}. ${fullName}`
);

const formatDistrict = ({ district, state }) => (
  district ? `${state}-${district}` : state
);

export default Search;
