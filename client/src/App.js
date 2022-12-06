import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components';
import { Landing, Home, Profile, Error } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route element={<Navbar />}>
          <Route path='/home' element={<Home />} />
          <Route path='/profile:id' element={<Profile />} />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
