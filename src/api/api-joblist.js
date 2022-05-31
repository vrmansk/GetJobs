import axios from "axios";

const list = async () => {
    try {
        const result = await axios.get(`http://dev3.dansmultipro.co.id/api/recruitment/positions.json`)
        return result.data;
    } catch (error) {
        return await error.message
    }
}

const detail = async (id) => {
    try {
        const result = await axios.get(`http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`, id);
        return result.data;
    } catch (error) {
        return await error
    }
}


export default {
    list,
    detail,

}