import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import {
  addPost,
  deletePost,
  getPost,
  updatePost,
} from "../store/action/postingAction";
import { useDispatch, useSelector } from "react-redux";

const Posting = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posting);

  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [handleDeletePost, sethandleDeletePost] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subtitle: "",
    description: "",
    thumbnail: "",
    backgroundImg: "",
    outherimage: "",
    video: "",
  });

  const toggle = () => {
    setModal(!modal);
  };

  const toggleDelete = () => {
    setModalDelete(!modalDelete);
  };

  const handleEdit = (post) => {
    setFormData(post);
    toggle();
    console.log(post, "byahsabniqbal");
  };

  const handleDelete = (id) => {
    toggleDelete();
    sethandleDeletePost(id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const file = e.target.type === "file" ? e.target.files[0] : null;

    setFormData((prevData) => ({
      ...prevData,
      [name]: file || value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id) {
      dispatch(updatePost(formData));
    } else {
      dispatch(addPost(formData));
    }
    toggle();
    setFormData({
      title: "",
      category: "",
      subtitle: "",
      description: "",
      thumbnail: "",
      backgroundImg: "",
      video: "",
    });
  };

  useEffect(() => {
    dispatch(getPost());
  }, []);

  return (
    <>
      <div className="flex items-center T-header justify-between pb-9">
        <h2 className="text-white font-bold text-2xl">Add New Trailer</h2>
        <button
          onClick={toggle}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="button"
        >
          Add New
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-400">
          <thead className="text-xs  uppercase  bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Movie Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                SubTitle
              </th>
              <th scope="col" className="px-6 py-3">
                thumbnail
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="">Edit</span>
                <span className="ms-5">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post, index) => (
              <tr
                className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600"
                key={index + 100}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                >
                  {post.title}
                </th>
                <td className="px-6 py-4">{post.category}</td>
                <td className="px-6 py-4">{post.subtitle}</td>
                <td className="px-6 py-4">
                  <img
                    src={post.thumbnail}
                    className="rounded d-block"
                    height={"80px"}
                    width={"80px"}
                    alt="ahsan"
                  />
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    onClick={() => handleEdit(post)}
                    className="font-medium text-blue-500 hover:underline"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(post.id)}
                    className="font-medium text-red-500 hover:underline ms-5"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* //////Modal Box ////////// */}

      {modal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-96 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Add New Trailer</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Movie Name
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="mt-1 p-2 w-full border rounded-md text-black outline-none"
                  placeholder="Enter movie name"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  value={formData.category}
                  className="mt-1 p-2 w-full border rounded-md text-black outline-none"
                >
                  <option>Select</option>
                  <option>Recommended</option>
                  <option>brian</option>
                  <option>trending</option>
                  <option>original</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="subtitle"
                  className="block text-sm font-medium text-gray-700"
                >
                  SubTitle
                </label>
                <input
                  type="text"
                  id="subtitle"
                  name="subtitle"
                  className="mt-1 p-2 w-full border rounded-md text-black outline-none"
                  placeholder="Enter category"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="mt-1 p-2 w-full border rounded-md text-black outline-none"
                  placeholder="Enter category"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Video Url
                </label>
                <input
                  type="text"
                  id="video"
                  name="video"
                  className="mt-1 p-2 w-full border rounded-md text-black outline-none"
                  placeholder="Enter Video URL"
                  value={formData.video}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Thumbnail
                </label>
                <input
                  type="file"
                  id="image"
                  name="thumbnail"
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Outer Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="outherimage"
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Background Img
                </label>
                <input
                  type="file"
                  id="image"
                  name="backgroundImg"
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={handleInputChange}
                />
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-md mr-2"
                >
                  Post
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 p-2 rounded-md"
                  onClick={toggle}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}

      {modalDelete && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-96 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-red-500">
              Do you want to delete this Post?
            </h2>
            <div className="flex float-end gap-3">
              {" "}
              <Button
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="button"
                onClick={toggleDelete}
              >
                Cancel
              </Button>
              <Button
                className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="button"
                onClick={() => {
                  dispatch(deletePost(handleDeletePost), toggleDelete());
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Posting;
