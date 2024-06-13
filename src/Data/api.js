
const baseURL=`https://ccp.zamanigames.com/`;
// const baseURL=`http://192.168.1.21:5450/`

export { baseURL };

const loginApi = `${baseURL}api/login`;
export { loginApi };

const chargingApi = `${baseURL}api/chargingDetails`
export {chargingApi}

const userDetailsApi = `${baseURL}api/userDetails`
export {userDetailsApi}

const deactivateApi = `${baseURL}api/userDeactivate`
export {deactivateApi}