/* eslint-disable react/jsx-props-no-spreading */
import { AppRoot, Div, Panel, PanelHeader, View } from '@vkontakte/vkui';

import CatFacts from '../CatFacts/CatFacts';
import AgeForm from '../AgeForm/AgeForm';

function App() {
  return (
    <AppRoot>
      <PanelHeader>Тестовое задание</PanelHeader>
      <View activePanel="main" className="main">
        <Panel id="main">
          <Div style={{ display: 'flex', flexDirection: 'column', gap: '50px', alignItems: 'center' }}>
            <AgeForm />
            <CatFacts />
          </Div>
        </Panel>
      </View>
    </AppRoot>
  );
}

export default App;
