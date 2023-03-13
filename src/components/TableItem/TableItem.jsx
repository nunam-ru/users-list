import React from 'react';
import deleteRowImg from '../../media/delete.svg';

const TableItem = ({id, username, email, rating, registration_date, deleteElement, setShow, setId}) => {

    return (
        <tr className="table__row" id={id}>
            <td className="table__id">
                {id}
            </td>
            <td className="table__username">
                {username}
            </td>
            <td className="table__email">
                {email}
            </td>
            <td className="table__regdate">
                {registration_date.toLocaleDateString('ru-RU', {day: "numeric", month: "numeric",year: "2-digit"})}
            </td>
            <td className="table__rating">
                {rating}
            </td>
            <td className="table__delete">
                <button className="row_delete" onClick={() => {setId(id); setShow(true); document.body.style.overflow='hidden'}}>
                    <img src={deleteRowImg} alt="delete" loading="lazy"></img>
                </button>
            </td>
        </tr>
    );
};

export default TableItem;
