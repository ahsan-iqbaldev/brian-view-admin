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
import { addPost, getPost, updatePost } from "../store/action/postingAction";
import { useDispatch, useSelector } from "react-redux";
import { addBanner, getBanner } from "../store/action/bannerAction";

const Banner = () => {
  const dispatch = useDispatch();
  const { banner } = useSelector((state) => state.banners);

  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    banner: "",
  });

  const toggle = () => {
    setModal(!modal);
  };
  const handleEdit = (post) => {
    setFormData(post);
    toggle();
    console.log(post, "byahsabniqbal");
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
      // dispatch(updatePost(formData));
    } else {
      dispatch(addBanner(formData));
    }
    toggle();
    setFormData({
      banner: "",
    });
  };

  useEffect(() => {
    dispatch(getBanner());
  }, []);

  return (
    <>
      <div className="flex items-center T-header justify-between pb-9">
        <h2 className="text-white font-bold text-2xl">Add New Banner</h2>
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
                Banner
              </th>
            </tr>
          </thead>
          <tbody>
            {banner?.map((post, index) => (
              <tr
                className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600"
                key={index + 100}
              >
                <td className="px-6 py-4">
                  <img
                    src={post.banner}
                    className="rounded d-block"
                    height={"100%"}
                    width={"100%"}
                    alt="ahsan"
                  />
                </td>
                {/* <td className="px-6 py-4 text-right">
                  <Button
                    onClick={() => handleEdit(post)}
                    className="font-medium text-blue-500 hover:underline"
                  >
                    Edit
                  </Button>
                </td> */}
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
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Banner
                </label>
                <input
                  type="file"
                  id="image"
                  name="banner"
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
    </>
  );
};

export default Banner;
