import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../helper/api";
import { useState } from "react";
import Resizer from "react-image-file-resizer";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const token = localStorage.getItem("token");
  const handleAdd = async (e) => {
    e.preventDefault();
    const data = {
      name,
      quantity,
      image,
    };
    await axios
      .post(baseUrl + "/products", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res?.data?.message);
          setName("");
          setImage("");
          setQuantity("");
        } else {
          toast.success(res?.data?.message);
        }
      });
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    Resizer.imageFileResizer(
      file,
      400, // Max width
      400, // Max height
      "JPEG", // Output format
      60, // Quality
      0, // Rotation
      (base64Image) => {
        setImage(base64Image);
      },
      "base64" // Output type
    );
  };
  return (
    <>
      <div className="flex min-h-full items-center justify-center px-4 py-24 sm:px-6 lg:px-8 ">
        <div className="w-full max-w-md space-y-8 bg-zinc-100 p-4 rounded">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 ">
              Add A New Product
            </h2>
          </div>
          <form onSubmit={handleAdd} className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className=" rounded-md shadow-sm">
              <div className="mb-4">
                <label htmlFor="name" className="sr-only">
                  Product Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="relative block w-full border-0 p-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Product Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="quantity" className="sr-only">
                  Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="text"
                  autoComplete="quantity"
                  required
                  className="relative block w-full border-0 p-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="file"
                  type="file"
                  //   autoComplete="current-password"
                  required
                  className="relative block w-full  border-0 p-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Upload image"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
