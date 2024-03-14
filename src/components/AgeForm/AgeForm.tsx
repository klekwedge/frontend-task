/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import { Button, Div, FormItem, Input, Spinner } from '@vkontakte/vkui';
import { yupResolver } from '@hookform/resolvers/yup';
import AgifyService from '../../services/AgifyService';
import validationSchema from '../../schemas';
import { TNameForm } from '../../types';

function AgeForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TNameForm>({
    resolver: yupResolver(validationSchema),
  });

  const [lastInputValue, setLastInputValue] = useState<string>('');

  const {
    data: age,
    isLoading: ageLoading,
    refetch: refetchAge,
  } = useQuery(['age', control._formValues.name], () => AgifyService.getAge(control._formValues.name), {
    enabled: false,
  });

  const onSubmitName = handleSubmit(({ name }: { name: string }) => {
    if (name !== lastInputValue) {
      refetchAge();
      setLastInputValue(name);
    }
  });

  return (
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
      {!ageLoading && age && !errors.name && <Div>Ваш возраст: {age} лет</Div>}
    </form>
  );
}

export default AgeForm;
