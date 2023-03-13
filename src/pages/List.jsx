import { useEffect, useState } from 'react';
import API from '../server/api';
import '../index.css';
import Table from '../components/Table/Table.jsx';
import SearchForm from '../components/SearchForm/SearchForm';
import Modal from '../components/Modal/Modal';

//Главная страницы
export const List = () => {

    const [data, setData] = useState(Array);
    const [date, setDate] = useState(Array);
    const [query, setQuery] = useState(String);
    
    const [isLoadingData, setLoadingData] = useState(Boolean);
    const [isSearching, setSearching] = useState(Boolean);
    const [isSorting, setSorting] = useState(Boolean);

    const [show, setShow] = useState(Boolean);
    const [id, setId] = useState('');

    //Получаем данные
    async function fetchData() { 
        setLoadingData(true);
        const data = await API.getTableData();

        const element = await Promise.all(data.map(async (data_item) => {

            return {
                id: data_item.id,
                username: data_item.username,
                email: data_item.email,
                rating: data_item.rating,
                registration_date: new Date(data_item.registration_date),

            }
        }));

        const date_element = await Promise.all(data.map(async (data_item) => {
            return {
                id: data_item.id,
                registration_date: new Date(data_item.registration_date),
            }
        }));
        
        setDate([...date_element]);
        setData([...element]);
        setLoadingData(false);
    } 

    //Функция поиска в таблице: оставляет только нужные строки
    function search(q) {
        setQuery(q);
        if (q === '') setSearching(false);
        else setSearching(true);

        var filter = q.toUpperCase();
        var rows = document.querySelector(".data__table tbody").rows;
        
        for (var i = 1; i < rows.length; i++) {
            var usernames = rows[i].cells[1].textContent.toUpperCase();
            var emails = rows[i].cells[2].textContent.toUpperCase();
            if ((usernames.indexOf(filter) > -1 || emails.indexOf(filter) > -1) && !(rows[i].classList.contains("deleted"))) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }      
        }
    }

    //Функция для кнопки очистки фильтра
    function clear() {
        setSearching(false);
        setSorting(false);
        search('');
        sortTable(0, false);
    }

    //Функция для получения удобного для сортировки формата даты
    function getDateById(id) {
        var regdate;
        for (const el of date) {
            if (parseInt(el.id) === parseInt(id)) {
                regdate = el.registration_date;
            }
        }
        return regdate.getTime();
    }

    //Функция для сортировки по столбцам
    function sortTable(n, isDate) {
        if (n !== 0) setSorting(true);

        var table, rows
        var isSwitching, shouldSwitch, isAscending, switchcount = 0;
        var i, x, y;
        var x_id, y_id;

        table = document.querySelector(".data__table");
        isSwitching = true;
        isAscending = true;

        while (isSwitching) {
            isSwitching = false;
            rows = table.rows;
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                
                if (isDate) {
                    x_id = rows[i].getElementsByTagName("TD")[0].innerHTML;
                    y_id = rows[i + 1].getElementsByTagName("TD")[0].innerHTML;
                    x = getDateById(x_id);
                    y = getDateById(y_id)
                }
                else {
                    x = rows[i].getElementsByTagName("TD")[n].innerHTML.toLowerCase();
                    y = rows[i + 1].getElementsByTagName("TD")[n].innerHTML.toLowerCase();
                }

                if (isAscending || n === 0) {
                    if (x > y) {
                        shouldSwitch = true;
                        break;
                    }
                } 
                else if (!isAscending) {
                    if (x < y) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                isSwitching = true;
                switchcount++;
            } else {
                if (switchcount === 0 && isAscending) {
                isAscending = false;
                isSwitching = true;
                }
            }
        }
    }

    function deleteElement(id) {
        document.getElementById(id).classList.add("deleted");

        var i = data.length
        while (i--) {
            if (parseInt(data[i].id) === parseInt(id)) { 
                data.splice(i, 1);
            } 
        }
    }
    
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
        <Modal title="Вы уверены, что хотите удалить пользователя?" id={id} show={show} setShow={setShow} deleteElement={deleteElement} onClose={() => {setShow(false); document.body.style.overflow='scroll'}}/>
        <main>
            <div className="title__container">
                <h1 className="page__title">Список пользователей</h1>
            </div>
            <div className="search__container">
                <SearchForm search={search} isSearching={isSearching} isSorting={isSorting} query={query} clear={clear}/>
            </div>

            <div className="sort__container">
                <p>Сортировка: </p>
                <button className="sort__date sort" onClick={q => {q.preventDefault(); sortTable(3, true);}} type="button">Дата регистрации</button>
                <button className="sort__rating sort" onClick={q => {q.preventDefault(); sortTable(4, false);}} type="button">Рейтинг</button>
            </div>
            
            <div className="table__container">
                <Table data={data} setId={setId} deleteElement={deleteElement} setShow={setShow} isLoading={isLoadingData} rowsPerPage={5}/>
            </div>
        </main>
        </>
    )
}


