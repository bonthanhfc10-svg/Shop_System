import { Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import Products from '../pages/admin/Products';
import ProductCreate from '../pages/admin/ProductCreate';
import ProductEdit from '../pages/admin/ProductEdit';
import ProductVariants from '../pages/admin/ProductVariants';
import Categories from '../pages/admin/Categories';
import Brands from '../pages/admin/Brands';
import Colors from '../pages/admin/Colors';
import Sizes from '../pages/admin/Sizes';
import Orders from '../pages/admin/Orders';
import OrderDetails from '../pages/admin/OrderDetails';
import Payments from '../pages/admin/Payments';
import Users from '../pages/admin/Users';
import Coupons from '../pages/admin/Coupons';
import Reviews from '../pages/admin/Reviews';
import Wishlists from '../pages/admin/Wishlists';
import Logs from '../pages/admin/Logs';
import Settings from '../pages/admin/Settings';
import ProtectedRoute from '../components/ProtectedRoute';

export default function AdminRoutes() {
  return (
    <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="products/create" element={<ProductCreate />} />
        <Route path="products/:id/edit" element={<ProductEdit />} />
        <Route path="products/:id/variants" element={<ProductVariants />} />
        <Route path="categories" element={<Categories />} />
        <Route path="brands" element={<Brands />} />
        <Route path="colors" element={<Colors />} />
        <Route path="sizes" element={<Sizes />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:id" element={<OrderDetails />} />
        <Route path="payments" element={<Payments />} />
        <Route path="users" element={<Users />} />
        <Route path="coupons" element={<Coupons />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="wishlists" element={<Wishlists />} />
        <Route path="logs" element={<Logs />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Route>
  );
}
