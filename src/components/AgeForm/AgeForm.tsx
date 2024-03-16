/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
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
    setValue,
    formState: { errors },
  } = useForm<TNameForm>({
    resolver: yupResolver(validationSchema),
  });

  const [lastInputValue, setLastInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const {
    data: age,
    isLoading: ageLoading,
    refetch: refetchAge,
  } = useQuery(['age'], () => AgifyService.getAge(control._formValues.name), {
    enabled: false,
  });

  useEffect(() => {
    let timer: number;
    if (control._formValues.name !== lastInputValue) {
        timer = setTimeout(() => {
        if (isTyping) {
          refetchAge();
          setLastInputValue(control._formValues.name);
          setIsTyping(false);
        }
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [control._formValues.name, isTyping, refetchAge]);

  const onSubmitName = handleSubmit(({ name }: { name: string }) => {
    if (name !== lastInputValue) {
      refetchAge();
      setLastInputValue(name);
      setIsTyping(false);
    }
  });

  const handleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('name', event.target.value);
    setIsTyping(true);
  };

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
              onChange={handleTyping}
            />
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
