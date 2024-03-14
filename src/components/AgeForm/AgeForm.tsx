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
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TNameForm>({
    resolver: yupResolver(validationSchema),
  });

  const [age, setAge] = useState<number | null>(null);
  const { mutate: fetchAgeMutation, isLoading: ageLoading } = useMutation(AgifyService.getAge, {
    onSuccess: (data) => {
      setAge(data);
    },
  });

  const onSubmitName = handleSubmit(({ name }: { name: string }) => {
    fetchAgeMutation(name);
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
      {!ageLoading && age !== null && <Div>Ваш возраст: {age} лет</Div>}
    </form>
  );
}

export default AgeForm;