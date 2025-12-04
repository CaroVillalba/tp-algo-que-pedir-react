import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import 'primereact/resources/themes/lara-light-blue/theme.css'  
import 'primereact/resources/primereact.min.css'                
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './App.css'

import { LayoutMain } from './main/LayoutMain'
import { LayoutAuth } from './main/LayoutAuth'
import { ProfileView } from './main/pages/ProfileView/ProfileView'
import { RestaurantMenuView } from './main/pages/RestaurantMenuView/RestaurantMenuView'
import { OrderCheckoutView } from './main/pages/OrderCheckoutView/OrderCheckoutView'
import { Login } from './main/pages/AuthView/Login/LoginView'
import { Register } from './main/pages/AuthView/Register/RegisterView'
import { StoreSearch } from './main/pages/HomeView/StoreSearch'
import { SearchCriteria } from './main/pages/ProfileView/SearchCriteria/SearchCriteria'
import { ReviewsView } from './main/pages/ReviewsView/ReviewsView'
import { ReviewRestorantView } from './main/pages/ReviewRestorantView/ReviewRestorantView'
import { LayoutProfile } from './main/pages/ProfileView/LayoutProfile'
import { OrderView } from './main/pages/OrderView/OrderView'
import { IngredientsAvoid } from './main/pages/ProfileView/Ingredients/IngredientsAvoid'
import { IngredientsPreffered } from './main/pages/ProfileView/Ingredients/IngredientsPreffered'
import { OrderDetailsView } from './main/pages/OrderDetailsView/OrderDetailsView'
import { LayoutCart } from './main/pages/LayoutCart'

function AppContent() {
  return (
      <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route element={<LayoutAuth/>}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route path='/' element={<LayoutMain/>}>
                <Route path='home' element={<LayoutCart/>}>
                  <Route index element={<StoreSearch />} /> 
                  <Route path="restaurant-menu/:id" element={<RestaurantMenuView />} />
                  <Route path="order-checkout/:id" element={<OrderCheckoutView />} />
                </Route>
                <Route path="orders" element={<OrderView />} />
                <Route path="orders/:id" element={<OrderDetailsView/>} />
                <Route path="review" element={<ReviewsView />} />
                <Route path="review/:id" element={<ReviewRestorantView/>} />
                <Route path='profile' element={<LayoutProfile/>}>
                  <Route index element={<ProfileView />} />
                  <Route path="criteria" element= {<SearchCriteria/>} />
                  <Route path= "ingredients-avoid" element= {<IngredientsAvoid/>}/>
                  <Route path= "ingredients-preffered" element= {<IngredientsPreffered/>}/>
                </Route>
            </Route>


            
          </Routes>
            

      </div>
    )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
