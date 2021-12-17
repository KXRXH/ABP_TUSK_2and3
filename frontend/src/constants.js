const API_ADDRESS =	 "http://localhost:3001/api/"

const REQUEST_PATH = {
    0: {
        url: API_ADDRESS + "nomenclature", 
        titles: [
            "Артикул", "Наименование", "Тип номенклатуры", 
            "Дата ввода в эксплуатацию", "Дата вывода из эксплуатации", "Сдаётся"
        ]
    },
    1: {
        url: API_ADDRESS + "nomenclature_type",
        titles: [
            "Тип номенклатуры", "Тариф"
        ]
    },
    2: {
        url: API_ADDRESS + "user",
        titles: [
            "Фамилия", "Имя", "Отчество", "Телефон", "Эл. почта", "дата рождения", "статус"
        ]
    },
    3: {
        url: API_ADDRESS + "base",
        titles: [
            "Номер", "Наименование", "Адрес", "Индекс", "Координаты, широта и долгота"
        ]
    },
    4: {
        titles: []
    },
    5: {
        url: API_ADDRESS + "payment",
        titles: [
            "Продолжительность", "Время начала", "Клиент", "Товар", "Скидка", "Тариф", "Итого"
        ]
    },
    6: {
        url: API_ADDRESS + "pricechange",
        titles: [
            "Время", "Старый тариф", "Новый тариф", "Тип номенклатуры"
        ]
    },
    9: {
        url: API_ADDRESS + "rent_start",
        titles: [
            "Пользователь", "Станция", "Продукт", "Время"
        ]
    },
    10: {
        url: API_ADDRESS + "rent_finish",
        titles: [
            "Пользователь", "Станция", "Продукт", "Время"
        ]
    }}

const getDate = (date_string) => {
    let date = new Date(date_string);
    return date.toLocaleDateString('ru-RU', {day: '2-digit', month: '2-digit', year: 'numeric'});
}

const ADMIN = 1;
const MANAGER = 2;
const OPERATOR = 3;
const MASTER = 4;

const NOMENCLATURE = 0;

const getCurrentDate = () => {
    let d = new Date();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
}

export {API_ADDRESS, REQUEST_PATH, getDate, ADMIN, MANAGER, OPERATOR, MASTER}
export {NOMENCLATURE, getCurrentDate}