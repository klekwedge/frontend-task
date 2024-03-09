/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import { AppRoot, Button, FormLayoutGroup, Input, Panel, PanelHeader, Spinner, View } from '@vkontakte/vkui';

import validationSchema from '../../schemas';
import AgifyService from '../../services/AgifyService';
import CatService from '../../services/CatService';

import './style.css';


function App() {
  const {
    handleSubmit: submitName,
    control: nameControl,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [age, setAge] = useState<number | null>(null);

  const { data: catFact, isLoading: catFactLoading, refetch: refetchCatFact } = useQuery('catFact', CatService.getCatFact);
  const { mutate: fetchAgeMutation, isLoading: ageLoading } = useMutation(AgifyService.getAge, {
    onSuccess: (data) => {
      setAge(data);
    },
  });

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
      <View activePanel="main" className="main">
        <Panel id="main">
          <FormLayoutGroup onSubmit={submitName(onSubmitName)}>
            <Controller
              name="name"
              control={nameControl}
              defaultValue=""
              render={({ field }) => (
                <Input {...field} type="text" placeholder="Введите имя" status={errors.name ? 'error' : undefined} />
              )}
            />
            {errors.name && <div>{errors.name.message}</div>}
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
