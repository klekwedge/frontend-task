/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import { Button, Div, FormItem, Input, Spinner } from '@vkontakte/vkui';
import { yupResolver } from '@hookform/resolvers/yup';
import AgifyService from '../../services/AgifyService';
import validationSchema from '../../schemas';
import { TNameForm } from '../../types';

function AgeForm() {
  const [lastInputValue, setLastInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TNameForm>({
    resolver: yupResolver(validationSchema),
  });

  const {
    data: age,
    isLoading: ageLoading,
    refetch: refetchAge,
  } = useQuery('age', () => AgifyService.getAge(control._formValues.name), {
    enabled: false,
  });

  const getAgeSuffix = (value: number): string => {
    const lastDigit = value % 10;
    const lastTwoDigits = value % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return 'лет';
    }

    if (lastDigit === 1) {
      return 'год';
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      return 'года';
    }

    return 'лет';
  };

  const onSubmitName = handleSubmit(({ name }: { name: string }) => {
    if (name !== lastInputValue) {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      refetchAge();
      setLastInputValue(name);
      setIsTyping(false);
    }
  });

  useEffect(() => {
    let timer: number;
    if (control._formValues.name !== lastInputValue) {
      timer = setTimeout(() => {
        if (isTyping) {
          onSubmitName();
        }
      }, 3000);
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      clearTimeout(timer);
    };
  }, [control._formValues.name, isTyping]);

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
      {!ageLoading && age && !errors.name && (
        <Div>
          Ваш возраст: {age} {getAgeSuffix(age)}
        </Div>
      )}
      {!ageLoading && !errors.name && age === null && <Div>Невозможно определить возраст по имени</Div>}
    </form>
  );
}

export default AgeForm;
