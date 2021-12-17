const NOMENCLATURE_TAB = 0;
const MY_TAB = 1;
const USER_TAB = 2;
const API_ADDRESS = "http://localhost:3001/api/";

const HEADER_STYLE = {
    1: "VIP", 2: "USUAL", 3: "OFTEN", 4: "STANDART", 5: "NEW"
}

const getBG = status => {
    return HEADER_STYLE[status]
}

export {NOMENCLATURE_TAB, MY_TAB, USER_TAB, API_ADDRESS, getBG}