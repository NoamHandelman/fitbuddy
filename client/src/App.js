import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components';
import { Landing, Home, Profiles, Error } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route element={<Navbar />}>
          <Route path='/home' element={<Home />} />
          <Route path='/profiles' element={<Profiles />} />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
