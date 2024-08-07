import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashCategory() {
  const { currentUser } = useSelector((state) => state.user);
  const [userCategory, setUserCategory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState('');

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`/api/category/getcategory?userId=${currentUser._id}`);
        const data = await res.json();
        console.log('API Response:', data); // Log the response
        if (res.ok) {
          setUserCategory(data.category);
        }
      } catch (error) {
        console.log('Error fetching categories:', error.message);
      }
    };

    if (currentUser && currentUser.isAdmin) {
      fetchCategory();
    }
  }, [currentUser, currentUser._id]);

  const handleDeleteCategory = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/category/deletecategory/${categoryIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserCategory((prev) =>
          prev.filter((category) => category._id !== categoryIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      <div className="my-2 text-end">
        <Link to='/create-Category'>
          <span className='px-4 py-2 text-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
            Create Category
          </span>
        </Link>
      </div>
      {currentUser.isAdmin && userCategory.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Category image</Table.HeadCell>
              <Table.HeadCell>Category Name</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userCategory.map((category) => (
              <Table.Body className='divide-y' key={category._id}>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(category.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    
                      <img
                        src={category.image}
                        alt={category.name}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                  </Table.Cell>
                  <Table.Cell>
                    
                      {category.name}
                  </Table.Cell>
                  <Table.Cell>
                    <span onClick={() => {
                        setShowModal(true);
                        setCategoryIdToDelete(category._id);
                      }} className='font-medium text-red-500 hover:underline cursor-pointer'>
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='text-teal-500 hover:underline'
                      to={`/update-category/${category._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>You have no category yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this category?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteCategory}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
