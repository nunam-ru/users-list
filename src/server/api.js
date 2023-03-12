class API {
    /**
     * Функция отправки запроса по ссылке 
     * @param {string} link - Ссылка на API-метод
     * @returns {any} Данные с сервера 
     */
    async fetchElement(link) {
        try {
            const response = await fetch(link);
            const data = await response.json();
            return data;
        }
        catch (err) {
            alert(err.message + " - please reload the page");
            return err.message;
        }
    }

    /**
     * Функция получения данных таблицы
     * @returns {any} Данные с сервера 
     */
    getTableData() {
        return this.fetchElement("https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users");
    }

}

export default new API();