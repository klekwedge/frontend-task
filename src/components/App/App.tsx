import { useState } from 'react';
import { useQuery } from 'react-query';

const fetchCatFact = async () => {
  const response = await fetch('https://catfact.ninja/fact');
  const data = await response.json();
  return data.fact;
};

const fetchAge = async (name: string) => {
  const response = await fetch(`https://api.agify.io/?name=${name}`);
  const data = await response.json();
  return data.age;
};

function App() {
  const { data: catFact, isLoading: catFactLoading, refetch: refetchCatFact } = useQuery('catFact', fetchCatFact);
  const [age, setAge] = useState<number | null>(null);

  return <div>{catFact}</div>;
}

export default App;
