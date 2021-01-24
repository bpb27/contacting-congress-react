import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LEGISLATORS } from '../api';
import styled from 'styled-components';

const Container = styled.div``;

const Search = () => {
  const [zipCode, setZipCode] = useState('');
  const [name, setName] = useState('');
  const { error, data, loading, refetch } = useQuery(GET_LEGISLATORS);

  useEffect(() => {
    refetch({
      name,
      zipCode: zipCode.length === 5 ? zipCode : '',
    });
  }, [name, zipCode]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong...</p>;
  return (
    <Container>
      <h1>Search</h1>
      <input
        onChange={ev => setZipCode(ev.target.value)}
        placeholder="90210"
        value={zipCode}
      />
      <br/>
      <input
        onChange={ev => setName(ev.target.value)}
        placeholder="Bernard"
        value={name}
      />
      { data.legislators.map(person => (
        <p key={person.id}>
          { person.fullName } - { person.party} - { person.state }
        </p>
      ))}
    </Container>
  );
};

export default Search;
