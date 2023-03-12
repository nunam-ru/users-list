import React from 'react';
import clean from '../../media/clean.svg';
//import search from '../../media/search.svg';

//Поисковая строка
const SearchForm = (props) => {
    
    return (
            <form className="search__form">
                <input className="search__field" value={props.query} onChange={q => {props.search(q.target.value);}} type="text" name="q" placeholder="Поиск по имени или e-mail" required=""></input>
                {(props.isSearching || props.isSorting)
                ? <button className="search__reset" type="button" onClick={q => {q.preventDefault(); props.clear();}}>
                    <img src={clean} className="img__clean" alt="clean" loading="lazy"></img>
                    Очистить фильтр
                </button>
                : ''}
            </form>
    );
};

export default SearchForm;
