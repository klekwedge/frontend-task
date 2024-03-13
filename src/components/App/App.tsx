/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import {
  AppRoot,
  Button,
  Div,
  FormItem,
  // FormLayoutGroup,
  Input,
  Panel,
  PanelHeader,
  Spinner,
  View,
} from '@vkontakte/vkui';
// import bridge from '@vkontakte/vk-bridge';

import validationSchema from '../../schemas';
import AgifyService from '../../services/AgifyService';
import CatService from '../../services/CatService';

import './style.css';
import { TNameForm } from '../../types';

// bridge.send('VKWebAppInit');

function App() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TNameForm>({
    resolver: yupResolver(validationSchema)
  });

  const [age, setAge] = useState<number | null>(null);

  const {
    data: catFact,
    isLoading: catFactLoading,
    refetch: refetchCatFact,
  } = useQuery('catFact', CatService.getCatFact);

  const { mutate: fetchAgeMutation, isLoading: ageLoading } = useMutation(AgifyService.getAge, {
    onSuccess: (data) => {
      setAge(data);
    },
  });

  const onSubmitName = handleSubmit(({ name }: { name: string }) => {
    fetchAgeMutation(name);
  });

  return (
    <AppRoot>
      <PanelHeader>Факты о котах</PanelHeader>
      <View activePanel="main" className="main">
        <Panel id="main">
          <form onSubmit={onSubmitName}>
            <FormItem style={{ display: 'flex', gap: '20px' }}>
              <Controller
                name="name"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input {...field} type="text" placeholder="Введите имя" status={errors.name ? 'error' : 'default'} />
                )}
              />
              <Button size="s" type="submit" disabled={ageLoading}>
                Получить возраст
              </Button>
            </FormItem>
            {errors.name && <div>{errors.name.message}</div>}
            {ageLoading && <Spinner size="small" />}
            {!ageLoading && age !== null && <Div>Ваш возраст: {age} лет</Div>}
          </form>

          <Div className="container">
            <Button onClick={() => refetchCatFact()} disabled={catFactLoading}>
              Загрузить факт о котах
            </Button>
            {catFactLoading ? <Spinner size="small" /> : <Div>{catFact}</Div>}
          </Div>
        </Panel>
      </View>
    </AppRoot>
  );
}

export default App;
