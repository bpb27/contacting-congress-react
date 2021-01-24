import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import styled from 'styled-components';
import Search from 'components/search';
import { API_URL } from '../constants';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${API_URL}/graphql`,
});

const Container = styled.div`
  font-family: monospace;
`;

const App = () => (
  <ApolloProvider client={client}>
    <Container>
      <Search/>
    </Container>
  </ApolloProvider>
);

export default App;
