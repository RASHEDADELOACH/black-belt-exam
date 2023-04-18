import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { baseUrl } from "../../helper/api";
import { toast } from "react-toastify";
import { Puff } from "react-loader-spinner";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);
  const [refetch, setRefetch] = useState(0);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const handleClose = () => setOpen(false);
  const handleShow = () => setOpen(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(baseUrl + "/products", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res?.data?.status) {
          setProducts(res?.data?.data);
          setLoading(false);
          if (res?.data?.data?.length === 0) {
            setAlert(true);
          }
        } else {
          toast.error(res.data.message);
        }
      });
  }, [refetch, token]);

  const handleDelete = async (id) => {
    await axios
      .delete(baseUrl + `/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res?.data?.message);
          setRefetch(refetch + 1);
        } else {
          toast.success(res?.data?.message);
        }
      });
  };

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  useEffect(() => {
    axios
      .get(baseUrl + `/products/${selectedId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res?.data?.status) {
          setName(res?.data?.data?.name);
          setQuantity(res?.data?.data?.quantity);
        } else {
          toast.error(res.data.message);
        }
      });
  }, [selectedId, token]);
  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {
      name,
      quantity,
    };
    await axios
      .patch(baseUrl + `/products/${selectedId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res?.data?.message);
          setRefetch(refetch + 1);
          handleClose();
        } else {
          toast.success(res?.data?.message);
        }
      });
  };
  if (loading)
    return (
      <div className="w-full mx-auto flex justify-center mt-24">
        <Puff
        height="80"
        width="80"
        radius={1}
        color="#4fa94d"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        
      />
      </div>
    );
  return (
    <div>
      <div className="container mx-auto">
        <div className="grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
          {products?.map((p) => (
            <div className="border-2 border-indigo-500 rounded">
              <div>
                <img
                  className="w-[100%] h-[250px]"
                  src={p?.image}
                  alt="hello"
                />
              </div>
              <div className="p-3 text-start">
                <h1 className="text-2xl"> Name: {p?.name}</h1>
                <p> Quantity: {p?.quantity}</p>
              </div>
              <div className="flex p-3 justify-around	">
                <button
                  onClick={() => {
                    handleShow();
                    setSelectedId(p?._id);
                  }}
                  className=" bg-blue-700 text-white px-[45px] py-[5px] rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p?._id)}
                  className=" bg-red-700 text-white px-[45px] py-[5px] rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="w-full  bg-zinc-100 p-4 rounded">
                    <div>
                      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 ">
                        Add A New Product
                      </h2>
                    </div>
                    <form onSubmit={handleUpdate} className="mt-8 space-y-6">
                      <input
                        type="hidden"
                        name="remember"
                        defaultValue="true"
                      />
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
                            value={name}
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
                            value={quantity}
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default Products;
