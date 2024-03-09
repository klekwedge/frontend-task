import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation, useQuery } from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import { AppRoot, Button, FormLayoutGroup, Input, Panel, PanelHeader, Spinner, View } from '@vkontakte/vkui';
import './style.css';

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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [age, setAge] = useState<number | null>(null);

  const { data: catFact, isLoading: catFactLoading, refetch: refetchCatFact } = useQuery('catFact', fetchCatFact);
  const { mutate: fetchAgeMutation, isLoading: ageLoading } = useMutation(fetchAge);

  const onSubmitName = async ({ name }: { name: string }) => {
    try {
      await fetchAgeMutation(name);
    } catch (error) {
      console.error('Ошибка при получении возраста:', error);
    }
  };

  return (
    <AppRoot>
      <PanelHeader>Факты о котах</PanelHeader>
      <View activePanel="main" className='main'>
        <Panel id="main">
          <FormLayoutGroup onSubmit={submitName(onSubmitName)}>
            <Controller
              name="name"
              control={nameControl}
              defaultValue=""
              render={({ onChange, value }) => (
                <Input
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  status={errors.name ? 'error' : undefined}
                />
              )}
            />
            <Button size="l" type="submit" disabled={ageLoading}>
              Получить возраст
            </Button>
            {ageLoading && <Spinner size="small" />}
            {age !== null && <div>Ваш возраст: {age} лет</div>}
          </FormLayoutGroup>

          <div className="container">
            <Button onClick={() => refetchCatFact()} disabled={catFactLoading}>
              Загрузить факт о котах
            </Button>
            {catFactLoading ? <Spinner size="small" /> : <div>{catFact}</div>}
          </div>
        </Panel>
      </View>
    </AppRoot>
  );
}

export default App;
