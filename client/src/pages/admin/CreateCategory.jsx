import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import CategoryForm from '../../components/Admin/CategoryForm';
import { toast } from 'react-hot-toast';
import { Modal } from 'antd';

const CreateCategory = () => {

    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDeleteCategory, setSelectedDeleteCategory] = useState(null);
    const [selectedUpdatedCategory, setSelectedUpdatedCategory] = useState(null);
    const [updateCategoryName, setUpdateCategoryName] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // get all categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            console.log(data.category)
            setCategories(data.category);
        } catch (err) {
            console.log("error ", err.message);
        }
    }

    // add new category
    const createNewCategory = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name: newCategory });
            const { success, message } = data;
            if (success) {
                setNewCategory("");
                toast.success("new category added")
                getAllCategories()
            } else {
                console.log("error is ", message)
                toast.error(`error ${message}`)
            }
            setIsLoading(false)

        } catch (err) {
            console.log("error is ", err.message);
            toast.error(`Name is Required`)
            setIsLoading(false)
        }
    }


    // delete the category
    const deleteCategory = async (pid) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pid}`);
            const { success, message, err } = data;
            if (success) {
                toast.success(`${selectedDeleteCategory.name} deleted`);
                getAllCategories()
            } else {
                console.log("error is ", err.message)
                toast.error(`error is  ${err.message}`)
            }
        } catch (err) {
            console.log("error is ", err.message)
            toast.error(`error is ${err.message}`)
        }
        setSelectedDeleteCategory(null);
    }

    // update category
    const updateCategory =async (pid) => {
        try{
            const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${pid}`, { name : updateCategoryName});
            const {success, message, category} = data;
            if(success){
                toast.success(`Updated ${selectedUpdatedCategory.name} into ${category.name}`);
                getAllCategories();
            }else{
                toast.error(`error is ${message}`)
            }
        }catch(err){
            console.log("Error ", err.message);
            toast.error(`Error is ${err.message}`)
        }
        setSelectedUpdatedCategory(null);
        setUpdateCategoryName("")
    }

    // cancel the modal
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    // show modal 
    const showModel = () => {
        setIsModalOpen(true)
    }

    // ok click the modal

    const handleOk = () => {
        setIsModalOpen(false)
        if(selectedDeleteCategory){
            deleteCategory(selectedDeleteCategory?._id)
        }else{
            updateCategory(selectedUpdatedCategory?._id)
        }
    }

    // life cycle method
    useEffect(() => {
        getAllCategories()
    }, [])

    return (
        <Layout title={"Create Category - Ecommerce "}>
            <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-md-3">
                        <h3>Admin Panel</h3>
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h2>Manage Category</h2>
                        <CategoryForm value={newCategory} setValue={setNewCategory} onHandleSubmit={createNewCategory} isLoading={isLoading} />
                        <div className="mt-2">
                            <table class="table table-striped">
                                <tbody>
                                    {
                                        categories?.map(c => {
                                            return (
                                                <tr>
                                                    <td style={{ fontWeight: '600', textTransform: 'capitalize' }}>{c.name}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedDeleteCategory(null);
                                                                setUpdateCategoryName(c.name);
                                                                setSelectedUpdatedCategory(c);
                                                                showModel();
                                                            }}
                                                            className='btn btn-info'>
                                                            Edit
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className='btn btn-danger'
                                                            onClick={() => {
                                                                setSelectedUpdatedCategory(null);
                                                                setSelectedDeleteCategory(c);
                                                                showModel();
                                                            }}>Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        {/* Model */}
                        <Modal title={selectedDeleteCategory ? "Delete" : "Update"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            {
                                selectedDeleteCategory ? (<h5>{`Are Sure Want Delete  ${selectedDeleteCategory?.name} ?`}</h5>) :
                                    (
                                        <CategoryForm
                                            value={updateCategoryName}
                                            setValue={setUpdateCategoryName}
                                            update
                                        />
                                    )
                            }
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory
