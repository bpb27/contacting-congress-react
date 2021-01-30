import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
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
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Container>
        <Search/>
      </Container>
    </ApolloProvider>
  </BrowserRouter>
);

export default App;
