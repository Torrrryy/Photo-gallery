import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import { Car } from './Pages/Car/Car';
import { Navigation } from './Components/Modules/Navigation/Navigation';
import { MountainsPage } from './Pages/Mountains/Mountains';  
import { DogPage } from './Pages/Dogs/Dog';
import "./styles/global.css";
import { Fav } from './Pages/Fav/Fav';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Routes>
        <Route element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path={'/car'} element={<Car />} />
          <Route path={'/mountains'} element={<MountainsPage />} />
          <Route path={'/dog'} element={<DogPage />} />
          <Route path={'/fav'} element={<Fav />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
  
