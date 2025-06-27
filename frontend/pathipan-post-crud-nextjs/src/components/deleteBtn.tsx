"use client"

import React from 'react'

interface DeleteBtnProps {
    id: string;
}

function DeleteBtn(params: DeleteBtnProps) {
    const { id } = params;

    const handleDelete = async () => {
        const confirmed = confirm("Are you sure?");
        // console.log("id: ", id);

        if (confirmed) {
            // const query = await fetch(`http://localhost:8080/api/posts?id=${id}`, { 
            //     method: 'DELETE'})
            const res = await fetch(`http://localhost:8080/api/posts/${id}`, {
                method: "DELETE"
            })

            if (res.ok) {
                window.location.reload();
            }
        }
    }

    return (
        <button
            style={{ cursor: "pointer" }}
            onClick={handleDelete}
            className='bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2'>
            Delete
        </button>
    )
}

export default DeleteBtn