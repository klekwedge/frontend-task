/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import { Button, Div, FormItem, Input, Spinner } from '@vkontakte/vkui';
import { yupResolver } from '@hookform/resolvers/yup';
import AgifyService from '../../services/AgifyService';
import validationSchema from '../../schemas';
import { TNameForm } from '../../types';

function AgeForm() {
  const [age, setAge] = useState<number | null>(null);
  const [lastInputValue, setLastInputValue] = useState<string>('');

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TNameForm>({
    resolver: yupResolver(validationSchema),
  });

  const { mutate: fetchAgeMutation, isLoading: ageLoading } = useMutation(AgifyService.getAge, {
    onSuccess: (data) => {
      console.log('request');
      setAge(data);
    },
  });

  const onSubmitName = handleSubmit(({ name }: { name: string }) => {
    if (name !== lastInputValue) {
      fetchAgeMutation(name);
      setLastInputValue(name);
    }
  });

  // const handleInputChange = () => {
  //   setTimeout(() => {
  //     onSubmitName();
  //   }, 3000);
  // };

  return (
    <form onSubmit={onSubmitName}>
      <FormItem style={{ display: 'flex', gap: '20px' }}>
        <Controller
          name="name"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              placeholder="Введите имя"
              status={errors.name ? 'error' : 'default'}
              // onChangeCapture={handleInputChange}
            />
          )}
        />
        <Button size="s" type="submit" disabled={ageLoading}>
          Получить возраст
        </Button>
      </FormItem>
      {errors.name && <div>{errors.name.message}</div>}
      {ageLoading && <Spinner size="small" />}
      {!ageLoading && age !== null && !errors.name && <Div>Ваш возраст: {age} лет</Div>}
    </form>
  );
}

export default AgeForm;
