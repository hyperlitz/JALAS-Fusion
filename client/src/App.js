import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Policy from './pages/Policy';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Dashboard from './pages/user/Dashboard';
import Login from './pages/Login';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Users from './pages/admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/admin/Products';
import UpdateProduct from './pages/admin/UpdateProduct';
import Search from './pages/Search'
import MoreDetails from './pages/MoreDetails';
import CategoryProducts from './pages/CategoryProducts';
import Categories from './pages/Categories';
import CartPage from './pages/CartPage';
import AdminOrder from './pages/admin/Orders';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/policy' element={<Policy/>}/>
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound/>}/>
        <Route path='/search/:keyword' element={<Search/>}/>
        <Route path='/more-details/:slug' element={<MoreDetails/>} />
        <Route path='/category/:slug' element={<CategoryProducts/>}/>
        <Route path='/cart' element={ <CartPage/>} />
        <Route path='/categories' element={<Categories/>}/>
        <Route path='/dashboard' element={<PrivateRoute/>}>
          <Route path='user'  element={<Dashboard/>}/>
          <Route path='user/orders' element={<Orders/>}/>
          <Route path='user/profile' element={<Profile/>}/>
        </Route>
        <Route path='/dashboard' element={<AdminRoute/>}>
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<CreateCategory/>}/>
          <Route path='admin/create-product' element={<CreateProduct/>}/>
          <Route path='admin/users' element={<Users/>}/>
          <Route path='admin/orders' element={<AdminOrder />} />
          <Route path='admin/update-product/:slug' element={<UpdateProduct/>} />
          <Route path='admin/products' element={<Products />} />
        </Route>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>} />
      </Routes>
    </>
  );
}

export default App;
