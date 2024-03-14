import React from 'react';
import { useQuery } from 'react-query';
import { Button, Div, Spinner } from '@vkontakte/vkui';
import CatService from '../../services/CatService';

function CatFacts() {
  const {
    data: catFact,
    isLoading: catFactLoading,
    refetch: refetchCatFact,
  } = useQuery('catFact', CatService.getCatFact);

  return (
    <Div className="container">
      <Button onClick={() => refetchCatFact()} disabled={catFactLoading}>
        Загрузить факт о котах
      </Button>
      {catFactLoading ? <Spinner size="small" /> : <Div>{catFact}</Div>}
    </Div>
  );
}

export default CatFacts;
