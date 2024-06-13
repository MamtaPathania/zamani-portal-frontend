import React, { useState,useEffect} from 'react';
import Layout from '../components/Layout';
import { FaMobileAlt } from 'react-icons/fa';
import { chargingApi } from '../Data/api';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CheckLogin from './Auth';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
// import { ToastContainer, toast } from 'react-toastify';


const Charging = () => {
  // const notifyError = (result) => toast.error(result);

  const [input, setInput] = useState({
    number: '',
    start_date: '',
    end_date: '',
  });
  const [charging, setCharging] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false); 
console.log(charging,"charging")
  const navigate=useNavigate()

 useEffect(() => {
  if (!CheckLogin('true')) {
    navigate('/Login');
  }
}, [navigate]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const service = localStorage.getItem('service');
    console.log(service,"service")
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      setLoading(true); 
      const res = await axios.post(`${chargingApi}`, {
        ani: input.number,
        from: input.start_date,
        to: input.end_date,
        serviceName: service,
      });
      console.log(res.data.result, 'charging response');
      setCharging(res?.data?.result);
      setShowTable(true); 
      setLoading(false)
     

    } catch (error) {
      console.error(error, 'error');
      setLoading(false)
      // notifyError(error.response.data.message);

    } 
  };

  return (
    <>
    <Layout>
    {/* <ToastContainer/> */}

      <div className="dark:text-white flex flex-col px-2 w-full">
        <div className='lg:hidden md:hidden'>
        <h1 className="flex justify-center items-center text-gray-600 underline font-bold text-lg">{service}</h1>

        </div>

        <h1 className="flex justify-center items-center text-emerald-600 font-bold text-lg">Billing Success Details</h1>

        <form onSubmit={handleSubmit} className="flex justify-center items-center">
          <div className="lg:mt-4 flex flex-col mt-2 justify-center items-center bg-green-50 shadow-2xl lg:w-[400px] lg:h-[300px] w-[250px] h-[340px] rounded-lg">
            <div className="flex flex-col">
              <label className="lg:mt-2 mt-3 items-start font-medium text-gray-900">Enter Number</label>
              <div className="flex flex-row relative">
                <FaMobileAlt className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black" />
                <input
                  placeholder="Enter Number"
                  name="number"
                  value={input.number}
                  onChange={handleChange}
                  className="border-1 border-gray-100 text-black bg-white rounded-lg lg:px-3 lg:py-2 px-4 py-2 lg:w-[200px] w-[180px]"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="block lg:mt-2 mt-3 text-sm font-medium text-gray-900">Date From</label>
              <input
                name="start_date"
                onChange={handleChange}
                value={input.start_date}
                type="date"
                className="border-1 border-gray-100 bg-white rounded-lg lg:px-3 lg:py-2 px-4 py-2 lg:w-[200px] w-[180px]"
                required=""
              />
            </div>

            <div className="flex flex-col">
              <label className="block lg:mt-2 mt-3 text-sm font-medium text-gray-900">Date To</label>
              <input
                name="end_date"
                value={input.end_date}
                onChange={handleChange}
                type="date"
                className="border-1 border-gray-100 bg-white rounded-lg lg:px-3 lg:py-2 px-4 py-2 lg:w-[200px] w-[180px]"
              />
            </div>

            <div className="lg:mt-6 mt-8 bg-emerald-600 text-white rounded-lg lg:px-3 lg:py-2 px-3 py-1">
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
        {loading ? (
          <div>
            <Loader/>
            </div>
        ):(
          showTable && (
            <>
            {service ===  "Zgames" && (
              <DataTable className='mt-10 shadow-xl shadow-gray-100 rounded-lg bg-green-50 text-[14px]' value={charging} stripedRows tableStyle={{ minWidth: '50rem' }} footer={charging.length === 0 ? 'No data found' : null}>
              <Column field="ANI" header="NUMBER" headerStyle={{ backgroundColor: '#EFFFF0' }}></Column>
              <Column field="amount" header="DEDUCTED_AMOUNT" headerStyle={{ backgroundColor: '#EFFFF0' }}
             body= {(rowData) => {
              return rowData.amount === 'OPEMM0660' ? 200 : 50

             }
                }
>
              </Column>
              {/* <Column field="date" header="DATE" body={(rowData) => new Date(rowData.date).toLocaleDateString()} headerStyle={{ backgroundColor: '#EFFFF0' }}></Column> */}
              <Column field="PROCESS_DATETIME" header="DATE" headerStyle={{backgroundColor:'#e9f7f1'}}
                            body={(rowData) => {
                              return rowData.PROCESS_DATETIME ? rowData.PROCESS_DATETIME.split('T')[0].split('-').join('/') : '';
                            }} 
                          />
              <Column field="TYPE_EVENT" header="ACTION" headerStyle={{ backgroundColor: '#EFFFF0' }}></Column>
              <Column field="pack_type" header="PACK_TYPE" headerStyle={{ backgroundColor: '#EFFFF0' }}></Column>
            </DataTable>
            ) }

             {service ===  "Zcomedy" && (
              <DataTable className='mt-10 shadow-xl shadow-gray-100 rounded-lg bg-green-50 text-[14px]' value={charging} stripedRows tableStyle={{ minWidth: '50rem' }} footer={charging.length === 0 ? 'No data found' : null}>
              <Column field="ani" header="NUMBER" headerStyle={{ backgroundColor: '#EFFFF0' }}></Column>
              <Column field="amount" header="DEDUCTED_AMOUNT" headerStyle={{ backgroundColor: '#EFFFF0' }}
             body= {(rowData) => {
              return rowData.amount === 'OPEMM0660' ? 200 : 50

             }
                }
>
              </Column>
              {/* <Column field="date" header="DATE" body={(rowData) => new Date(rowData.date).toLocaleDateString()} headerStyle={{ backgroundColor: '#EFFFF0' }}></Column> */}
              <Column field="DATE" header="DATE" headerStyle={{backgroundColor:'#e9f7f1'}}
                            body={(rowData) => {
                              return rowData.date ? rowData.date.split('T')[0].split('-').join('/') : '';
                            }} 
                          />
              <Column field="type" header="ACTION" headerStyle={{ backgroundColor: '#EFFFF0' }}></Column>
              <Column field="packType" header="PACK_TYPE" headerStyle={{ backgroundColor: '#EFFFF0' }}></Column>
            </DataTable>
            ) }
            
            </>
          )
        )}

        

      </div>
    </Layout>
    </>
  );
};

export default Charging;
