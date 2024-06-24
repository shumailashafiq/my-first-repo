import React from 'react';
import baseURL from '../../utils/axios';
const SingleBanner = (props) => {
  let { singleBannerData, setBgColor, setDisplay, setevents } = props;

  const hide = () => {
    setBgColor('blur-none');
    setDisplay('hidden');
    setevents('pointer-events-auto');
  };
  return (
    <>
      <div>
        <div className="rounded-sm fixed -translate-x-2/4  translate-y-1/2 z-20 border border-stroke bg-black text-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[0px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Banner ID
                  </th>
                  <th className="py-4 [190px] mr-[90px] px-4 font-medium text-black dark:text-white">
                    Date
                  </th>
                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                    Images
                  </th>
                  <th className="min-w-[130px] py-4 px-4 font-medium text-black dark:text-white">
                    target Url
                  </th>
                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                    Title
                  </th>
                </tr>
              </thead>
            </table>
            <tbody>
              {singleBannerData.map((banner, key) => (
                <tr key={key}>
                  <td className="border-b min-w-[150px]  border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-white dark:text-white">
                      {banner?.id}
                    </h5>
                  </td>

                  <td className="border-b min-w-[180px] border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-white dark:text-white">{banner?.date}</p>
                  </td>

                  <td className="border-b min-w-[150px]  border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="h-[50px] w-[70px] relative overflow-hidden rounded">
                      <img
                        className=" h-[50px] w-[70px] object-cover"
                        src={baseURL + banner?.imageUrl}
                        alt=""
                      />
                    </div>
                  </td>

                  <td className="border-b min-w-[150px]  border-[#eee] py-5 px-4 dark:border-strokedark">
                     <div className="h-[50px] w-[70px] relative overflow-hidden rounded">
                     <a href={ banner?.targetUrl}>{banner?.targetUrl}</a>
                    </div>
                  </td>

                  <td className="border-b  min-w-[190px]  border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium`}
                      >
                        {banner?.bannerTitle}
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </div>

          <button
            onClick={hide}
            className="shadow-black left-[100%] bottom-[100%] bg-white shadow text-black  p-4 rounded font-bold mt-1 absolute"
          >
            X
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleBanner;
