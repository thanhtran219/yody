import { format } from "date-fns";
import { sql } from "../config/database.mjs";

const getHomePage = async (req) => {
};

const convertedDateList = (list) => {
  return list.map((item) => ({
    ...item,
    CreatedDate: format(new Date(item.CreatedDate), "dd-MM-yyyy"),
    ModifiedDate: format(new Date(item.ModifiedDate), "dd-MM-yyyy"),
  }));
};

const homeModel = {
};

export default homeModel;
