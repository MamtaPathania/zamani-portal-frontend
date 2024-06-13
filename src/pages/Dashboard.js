import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { FaMobileAlt } from "react-icons/fa";
import { userDetailsApi } from "../Data/api";
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CheckLogin from "./Auth";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false); 
  const [input, setInput] = useState({
    number: '',
    logs: 'Active'
  });
  console.log(input,"inputs")
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  console.log(tableData,"tabledata")
  useEffect(() => {
    if (!CheckLogin('true')) {
      navigate('/Login');
    }
  }, [navigate]);

  
 

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const service = localStorage.getItem('service');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await axios.post(`${userDetailsApi}`, {
        ani: input.number,
        serviceName: service,
        logs: input.logs
      });
      console.log(res.data.result, "response"); // Log the data returned from the API
      setTableData(res.data.result);
      setShowTable(true);
      setLoading(false)
    } catch (error) {
      console.error(error, "error");
      setLoading(false)
    }
  };

  return (
    <Layout>
      <div className="dark:text-white flex flex-col px-2 w-full">
      <div className='lg:hidden md:hidden'>
        <h1 className="flex justify-center items-center text-gray-600 underline font-bold text-lg">{service}</h1>

        </div>
                <h1 className="flex justify-center items-center text-emerald-600 font-bold text-lg">User Status</h1>
        <form onSubmit={handleSubmit} className="flex justify-center items-center">
          <div className="flex flex-col mt-2 justify-center items-center bg-green-50 shadow-2xl lg:w-[400px] lg:h-[250px] w-[250px] h-[280px] rounded-lg">
            <div className="flex flex-col">
              <label className="lg:mt-2 mt-3 items-start">Enter Number</label>
              <div className="flex flex-row relative">
                <FaMobileAlt className='absolute top-1/2 right-3 transform -translate-y-1/2 text-black'/>
                <input
                  placeholder='Enter Number'
                  name='number'
                  value={input.number}
                  onChange={handleChange}
                  className="border-1 border-gray-100 bg-white rounded-lg lg:px-3 lg:py-2 px-4 py-2 lg:w-[200px] w-[180px]"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="lg:mt-2 mt-3 items-start">Select</label>
              <select 
                name="logs"
                value={input.logs}
                onChange={handleChange}
                className="border-1 border-gray-100 bg-white rounded-lg lg:px-3 lg:py-2.5 px-4 py-2.5 lg:w-[200px] w-[180px]"
              >
                {/* <option>select option</option> */}
                <option value='Active'>Activation Logs</option>
                <option value='Deactivate'>Deactivation Logs</option>
              </select>
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
        ):
        (
          showTable && (
            <>
              {service === "Zgames" && input.logs === "Active" && (
                <DataTable
                  className='mt-10 shadow-lg shadow-gray-100 text-black border border-black bg-green-50 text-[14px]'
                  value={tableData}
                  stripedRows
                  tableStyle={{ minWidth: '50rem' }}
                  footer={tableData.length === 0 ? 'No data found' : null}
                >
                          <Column field="service_type" header="SERVICE" headerStyle={{backgroundColor:'#e9f7f1',}}></Column>
          
                  <Column field="ani" header="ANI" headerStyle={{backgroundColor:'#e9f7f1'}}></Column>
                  {/* <Column field="sub_date_time" header="SUB Date" headerStyle={{backgroundColor:'#e9f7f1'}}
                   body={(rowData) => {
                    const dateParts = rowData.sub_date_time.split('T')[0].split('-');
                    return `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
                  }} 
                  ></Column> */}
                   <Column field="sub_date_time" header="SUB DATE" headerStyle={{backgroundColor:'#e9f7f1'}}
                            body={(rowData) => {
                              return rowData.sub_date_time ? rowData.sub_date_time.split('T')[0].split('-').join('/') : '';
                            }} 
                          />
                       <Column field="pack_type" header="PACK TYPE" headerStyle={{backgroundColor:'#e9f7f1'}}></Column>

                  <Column field="m_act" header="Mode of Activation" headerStyle={{backgroundColor:'#e9f7f1'}}></Column>
                </DataTable>
              )}
              {service === "Zgames" && input.logs === "Deactivate" && (
                <DataTable
                  className='mt-10 shadow-lg shadow-gray-100 border-black text-black bg-green-50 text-[14px]'
                  value={tableData}
                  stripedRows
                  tableStyle={{ minWidth: '50rem' }}
                  footer={tableData.length === 0 ? 'No data found' : null}
                >
                         <Column field="service_type" header="SERVICE" headerStyle={{backgroundColor:'#e9f7f1'}}></Column>
          
                  <Column field="ANI" header="ANI" headerStyle={{backgroundColor:'#e9f7f1'}}></Column>
                  {/* <Column field="unsub_date_time" header="UNSUB DATE" headerStyle={{backgroundColor:'#e9f7f1'}}
                   body={(rowData) => {
                    const dateParts = rowData.unsub_date_time.split('T')[0].split('-');
                    return `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
                  }} ></Column> */}
                  <Column field="unsub_date_time" header="UNSUB DATE" headerStyle={{backgroundColor:'#e9f7f1'}}
                            body={(rowData) => {
                              return rowData.unsub_date_time ? rowData.unsub_date_time.split('T')[0].split('-').join('/') : '';
                            }} 
                          />
                 <Column field="packType" header="PACK TYPE" headerStyle={{backgroundColor:'#e9f7f1'}}></Column>

                  <Column field="m_deact" header="Mode of Deactivation" headerStyle={{backgroundColor:'#e9f7f1'}}></Column>
                </DataTable>
              )}
              {service === "Zcomedy" && input.logs === "Active" && (
                <DataTable
                  className='mt-10 shadow-lg shadow-gray-100 border border-black text-black bg-green-50 text-[14px]'
                  value={tableData}
                  stripedRows
                  tableStyle={{ minWidth: '50rem' }}
                  footer={tableData.length === 0 ? 'No data found' : null}
                >
                         <Column field="service" header="SERVICE" headerStyle={{backgroundColor:'#e9f7f1'}}></Column>
          
                  <Column field="ani" header="ANI" headerStyle={{backgroundColor:'#e9f7f1'}}></Column>
                  {/* <Column 
                    field="subDate" 
                    header="SUB Date" headerStyle={{backgroundColor:'#e9f7f1'}}
                    body={(rowData) => {
                      const dateParts = rowData.subDate.split('T')[0].split('-');
                      return `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
                    }} 
                  /> */}
                   <Column field="subDate" header="SUB DATE" headerStyle={{backgroundColor:'#e9f7f1'}}
                            body={(rowData) => {
                              return rowData.subDate ? rowData.subDate.split('T')[0].split('-').join('/') : '';
                            }} 
                          />
          
                  {/* <Column field="subDate" header="DATE" body={(rowData) => new Date(rowData.subDate).toLocaleDateString()}></Column> */}
                  <Column field="packType" header="PACK TYPE" headerStyle={{backgroundColor:'#e9f7f1'}}></Column>
          
                  <Column field="mAct" header="MODE OF ACTIVATION" headerStyle={{backgroundColor:'#e9f7f1'}}></Column>
          
                </DataTable>
              )}
              {service === "Zcomedy" && input.logs === "Deactivate" && (
                <DataTable
                  className='mt-10 shadow-lg shadow-gray-100 border border-black text-black bg-green-50 text-[14px]'
                  value={tableData}
                  stripedRows
                  tableStyle={{ minWidth: '50rem' }}
                  footer={tableData.length === 0 ? 'No data found' : null}
                >
                  {/* Columns for Zcomedy Deactivate */}
                  <Column field="service" header="SERVICE" headerStyle={{backgroundColor:'#e9f7f1'}}></Column>
          
                  <Column field="ani" header="ANI" headerStyle={{backgroundColor:'#e9f7f1'}}></Column>
                  <Column field="unsubDate" header="UNSUB DATE" headerStyle={{backgroundColor:'#e9f7f1'}}
                            body={(rowData) => {
                              return rowData.unsubDate ? rowData.unsubDate.split('T')[0].split('-').join('/') : '';
                            }} 
                          />
                  {/* <Column 
                    field="unsubDate" 
                    header="UNSUB Date" headerStyle={{backgroundColor:'#e9f7f1'}}
                    body={(rowData) => {
                      const dateParts = rowData.unsubDate.split('T')[0].split('-');
                      return `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
                    }} 
                  />    */}
                                    <Column field="packType" header="PACK TYPE" headerStyle={{backgroundColor:'#e9f7f1'}}></Column>
   
                    <Column field="mDeact" header="Mode of Deactivation" headerStyle={{backgroundColor:'#e9f7f1'}}></Column>
                </DataTable>
                
              )}
            </>
          )
        )}
       


      </div>
    </Layout>
  );
};

export default Dashboard;
