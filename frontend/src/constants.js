const API_ADDRESS =	 "http://localhost:3001/api/"

const REQUEST_PATH = {
    0: {
        url: API_ADDRESS + "nomenclature", 
        titles: [
            "Артикул", "Наименование", "Тип номенклатуры", 
            "Используется", "Дата ввода в эксплуатацию", "Дата вывода из эксплуатации"
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
            "Номер", "Наименование", "Адрес", "Индекс", "Координата широта", "Координата долгота"
        ]
    },
    4: {
        titles: []
    },
    5: {
        url: API_ADDRESS + "payment",
        titles: [
            "Продолжительност", "Время начала", "Клиент", "Товар", "Скидка", "Тариф", "Итого"
        ]
    },
    6: {
        url: API_ADDRESS + "pricechange",
        titles: [
            "Время", "Старый тариф", "Новый тариф", "Тип номенклатуры"
        ]
    }
}

const getDate = (date_string) => {
    let date = new Date(date_string);
    return date.toLocaleDateString('ru-RU', {day: '2-digit', month: '2-digit', year: 'numeric'});
}
export {API_ADDRESS, REQUEST_PATH, getDate}