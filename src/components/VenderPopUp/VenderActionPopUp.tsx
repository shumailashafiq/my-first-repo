import baseURL from '../../utils/axios';
import axios from 'axios';

const VenderActionPopUp = (props) => {
  const {
    singleVenderActionPopUP,
    setBgColor,
    setDisplay1,
    setevents,
    vendorData,
    setVendorData,
  } = props;

  console.log(baseURL);

  const deleteHandler = (id: number, index: number) => {
    const updatedVendorData = [
      ...vendorData.slice(0, index),
      ...vendorData.slice(index + 1),
    ];

    setBgColor('blur-none');
    setDisplay1('hidden');
    setevents('pointer-events-auto');

    axios
      .delete(baseURL + 'vendor/' + id)
      .then((res) => {
        console.log(res);
        setVendorData(updatedVendorData);
      })
      .catch((error) => {
        console.error('Error deleting vendor:', error);
      });
  };

  const hide = () => {
    setBgColor('blur-none');
    setDisplay1('hidden');
    setevents('pointer-events-auto');
  };

  return (
    <>
      <div className=''>
        <div className="rounded-sm fixed -translate-x-2/4 border border-stroke bg-black text-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <h1 className="flex w-full justify-center rounded  p-2 font-medium text-gray ">
              Are You Sure You Want To Delete ?
            </h1>
            <table className="w-full table-auto mt-4">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Vendor ID
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Vendor Name
                  </th>
                  <th className="min-w-[160px] py-4 px-4 font-medium text-black dark:text-white">
                    Contact
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {singleVenderActionPopUP.map((vendor, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-white dark:text-white">
                        {vendor.vendorId}
                      </h5>
                      {/* <p className="text-sm">${packageItem.price}</p> */}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-white dark:text-white">
                        {vendor.vendor_name}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium`}
                      >
                        {vendor.phone_no}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <p
                          className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium`}
                        >
                          {vendor.email}
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-7 mb-10 flex space-x-5">
              {singleVenderActionPopUP.map((vendor, index) => (
                <button
                  key={index}
                  onClick={() => deleteHandler(vendor.vendorId, index)}
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Delete
                </button>
              ))}
              <button
                onClick={hide}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VenderActionPopUp;
