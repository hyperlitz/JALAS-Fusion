import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <>
            <div className="card p-3">
                <div class="list-group user-menu" id="list-tab" role="tablist">
                    <NavLink to="/dashboard/user/profile" class="list-group-item list-group-item-action" >Profile</NavLink>
                    <NavLink to="/dashboard/user/orders" class="list-group-item list-group-item-action">Orders</NavLink>
                </div>
            </div>
        </>
    )
}

export default UserMenu
