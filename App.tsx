import React from 'react';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import { HomePage } from './src/components/homepage'

export const App = () => {
  return (
    <TailwindProvider utilities={utilities}>
      <HomePage />
    </TailwindProvider>
  );
}
