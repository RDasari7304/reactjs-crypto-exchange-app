import { putData } from "./dbfunctions";

const updateUserData = async (pk_user, payload) => {
    const result = await putData(`http://localhost:3001/updateUser/${pk_user}`, payload);
    console.log(result);
}

export {updateUserData}