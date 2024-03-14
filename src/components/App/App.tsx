/* eslint-disable react/jsx-props-no-spreading */
import {
  AppRoot,
  Panel,
  PanelHeader,
  View,
} from '@vkontakte/vkui';

import CatFacts from '../CatFacts/CatFacts';
import AgeForm from '../AgeForm/AgeForm';

import './style.css';

function App() {

  return (
    <AppRoot>
      <PanelHeader>Факты о котах</PanelHeader>
      <View activePanel="main" className="main">
        <Panel id="main">
          <AgeForm />
          <CatFacts />
        </Panel>
      </View>
    </AppRoot>
  );
}

export default App;
