

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import axios from 'axios';
import { setContext } from '@apollo/client/link/context';


const authLink = setContext((_, { headers }) => {
    // Obtener el token del localStorage 
    const token = localStorage.getItem('token');
    // Retornar los headers modificados
    return {
        headers: {
            ...headers,
            // authorization: token ? `Bearer ${token}` : ''
            authorization: token
        }
    }
});

const client = new ApolloClient({
    cache: new InMemoryCache(),

    link: authLink.concat(httpLink),
    // Si se desea usar axios para las peticiones
    axios
})

export default client;