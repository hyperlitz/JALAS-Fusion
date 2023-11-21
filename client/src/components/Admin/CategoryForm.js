import React from 'react'

const CategoryForm = ({ onHandleSubmit, value, setValue, isLoading, update }) => {
    return (
        <div className='category-form'>
            <form onSubmit={onHandleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter New Category"
                        onChange={(e) => setValue(e.target.value)}
                        value={value} />
                    {
                        !update && (<button class={isLoading ? "btn btn-primary mt-2 disabled" : "btn btn-primary mt-2"} type="submit">
                            {
                                isLoading ? (<><span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                </>) : "ADD"
                            }
                        </button>)
                    }
                </div>
            </form>

        </div>
    )
}

export default CategoryForm
