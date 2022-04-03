import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navigation from './components/Navigation';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Home from './pages/Home';
import Tambah from './pages/Tambah';
import react from 'react';

const App = () => {
  const data = react.useRef('');
  const [search, setsearch] = react.useState('');

  function setdata(c, d) {
    switch(c) {
      case 'data':
        data.current = d;
        break;
      case 'search':
        setsearch(d);
    }
  }

  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/" exact children={() => <Home setdata={setdata} search={search} />} />
          <Route path="/detail" children={() => <Detail data={data.current} />} />
          <Route path="/edit" children={() => <Edit data={data.current} />} />
          <Route path="/tambah" children={() => <Tambah />} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
