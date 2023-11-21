import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    return (
        <>
            <div className="card p-3">
                <div class="list-group admin-menu" id="list-tab" role="tablist">
                    <NavLink to="/dashboard/admin/create-category" class="list-group-item list-group-item-action" >Create Category</NavLink>
                    <NavLink to="/dashboard/admin/create-product" class="list-group-item list-group-item-action">Create Product</NavLink>
                    <NavLink to="/dashboard/admin/products" class="list-group-item list-group-item-action">Products</NavLink>
                    <NavLink to="/dashboard/admin/orders" class="list-group-item list-group-item-action">Orders</NavLink>
                    <NavLink to="/dashboard/admin/users" class="list-group-item list-group-item-action" >Users</NavLink>
                </div>
            </div>
        </>
    )
}

export default AdminMenu
