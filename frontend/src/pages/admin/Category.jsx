import { useState } from "react"
import { useCreateCategoryMutation, useDeleteCategoryMutation, useFetchCategoriesQuery, useReadCategoryQuery, useUodateCategoryMutation } from "../../redux/api/categoryApiSlice"
import toast from "react-hot-toast"
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Model";


const CategoryList = () => {
const [createCategory] = useCreateCategoryMutation()
const {data: categoriesData} =useFetchCategoriesQuery()
const categories = categoriesData?.categories || [];

const [updateCategory] = useUodateCategoryMutation()
const [deleteCategory] = useDeleteCategoryMutation()
const {data:readCategory} = useReadCategoryQuery()


const [name, setName] = useState("")
const [updatingName,setUpdatingName] = useState("")
const [selectedCategory, setSelectedCategory] = useState(null);
const [modalVisible, setModalVisible] = useState(false);
// const categories = data?.categories || [];
// console.log(categories);

const  handleCreateCategory =async(e)=>{
    e.preventDefault()
    if (!name) {
        toast.error("Name is required")
        return
    }
    try {
        const result = await createCategory({name}).unwrap()
        if (result.error) {
            toast.error(result.error)
        }else{
            setName("")
            toast.success(`${result.name} is created.`)
        }
    } catch (error) {
        console.log(error);
        toast.error("Creating category failed, try again")
        
    }
}
const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Category delection failed. Tray again.");
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row ">
      {/* <AdminMenu /> */}
      <div className="md:w-3/4 p-3">
        <div className="h-12">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />

        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none foucs:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdatingName(category.name);
                  }
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList ;