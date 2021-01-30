import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Search from 'components/search';
import { API_URL } from '../constants';
import styled from 'styled-components';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${API_URL}/graphql`,
});

const Container = styled.div`
  font-family: 'Roboto';
`;

const App = () => (
  <ApolloProvider client={client}>
    <Container>
      <Search/>
    </Container>
  </ApolloProvider>
);

export default App;
