import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './router'
import "./index.css";
import client from './config/apollo';
import { ApolloProvider } from '@apollo/client';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>

      <Router />

    </ApolloProvider>
  </StrictMode>,
)
