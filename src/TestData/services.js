import { putData } from "./dbfunctions";

const updateUserData = async (pk_user, payload) => {
    const result = await putData(`http://localhost:3001/updateUser/${pk_user}`, payload);
}

const formatDate = (date) => {
    const time_stamp_sections = date.toString().split(" ");
            
    const month = time_stamp_sections[1];
    const day = time_stamp_sections[2];
    const year = time_stamp_sections[3];
    const hour = date.toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'});

    return [month, day, year, hour];
}

export {updateUserData, formatDate}