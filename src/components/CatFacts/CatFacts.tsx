import { Button, Div, Spinner, Textarea } from '@vkontakte/vkui';
import { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import CatService from '../../services/CatService';

function CatFacts() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const {
    data: catFact,
    isLoading: catFactLoading,
    refetch: refetchCatFact,
  } = useQuery('catFact', CatService.getCatFact, {
    enabled: false,
  });

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [catFact]);

  return (
    <Div className="container">
      <Button onClick={() => refetchCatFact()} disabled={catFactLoading}>
        Загрузить факт о котах
      </Button>
      {catFactLoading ? (
        <Spinner size="small" />
      ) : (
        <Textarea
          getRef={textAreaRef}
          value={catFact}
          onFocus={(e) => {
            const firstSpaceIndex = (e.target.value || '').indexOf(' ');
            if (firstSpaceIndex !== -1) {
              e.target.setSelectionRange(firstSpaceIndex + 1, firstSpaceIndex);
            }
          }}
          style={{ width: '400px', minHeight: '80px' }}
        />
      )}
    </Div>
  );
}

export default CatFacts;
