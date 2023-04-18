import axios from "axios";
import React, { useEffect, useState } from "react";
import { Puff } from "react-loader-spinner";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products`).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setData(res.data);
        setLoading(false);
      }
    });
  }, []);

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
        <h3 className="text-center text-3xl font-bold mt-5 mb-4">
          Product List
        </h3>
        <section class="container mx-auto p-6">
          <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
            <div class="w-full overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="text-md font-semibold tracking-wide text-center text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th class="px-4 py-3">Title</th>
                    <th class="px-4 py-3">Category</th>
                    <th class="px-4 py-3">Image</th> 
                    <th class="px-4 py-3">Description</th>
                    <th class="px-4 py-3">Price</th>
                   
                  </tr>
                </thead>
                <tbody class="bg-white">
                  {data?.slice(0, 10).map((d) => (
                    <tr class="text-gray-700">
                      <td class="px-4 py-3 text-sm border">{d?.title}</td>
                      <td class="px-4 py-3 text-sm border">{d?.category}</td>
                      <td class="px-4 py-3 text-sm border text-blue">
                        <a
                          className="text-blue-700 hover:text-red-600 cursor-pointer"
                          href={d?.image}
                        >
                          View
                        </a>
                      </td>
                      <td class="px-4 py-3 text-sm border">{d?.description}</td>

                      <td class="px-4 py-3 text-sm border">${d?.price}</td>

                     
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
