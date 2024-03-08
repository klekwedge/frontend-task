import { useState } from 'react';
import * as yup from 'yup';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z]+$/, 'Имя должно состоять только из букв')
    .required('Введите имя'),
});

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
  const {
    handleSubmit: submitName,
    control: nameControl,
    errors: nameErrors,
  } = useForm({
    validationSchema,
  });
  const { data: catFact, isLoading: catFactLoading, refetch: refetchCatFact } = useQuery('catFact', fetchCatFact);
  const [age, setAge] = useState<number | null>(null);

  return <div>{catFact}</div>;
}

export default App;
