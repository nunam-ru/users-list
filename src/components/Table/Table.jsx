import React from 'react';
import { useState } from 'react';
import TableItem from "../TableItem/TableItem";
import useTable from "../../hooks/useTable";
import TableFooter from "../TableFooter/TableFooter";

const Table = ({data, isLoading, rowsPerPage}) => {

    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);
    
    return (
        <>  <table className="data__table">
                <tbody className="table__body">
                            <tr className="table__header">
                                <th className="table__id">id</th>
                                <th>Имя пользователя</th>
                                <th>E-mail</th>
                                <th>Дата регистрации</th>
                                <th>Рейтинг</th>
                            </tr>
                {isLoading 
                    ?   <tr className="table__row">
                            <td className="table__username">
                                Loading
                            </td>
                            <td className="table__email">
                                Loading
                            </td>
                            <td className="table__regdate">
                                Loading
                            </td>
                            <td className="table__rating">
                                Loading
                            </td>
                        </tr>
                    : slice.map((element) =>
                        <TableItem
                        key={element.id}
                        id={element.id}
                        username={element.username}
                        email={element.email}
                        registration_date={element.registration_date}
                        rating={element.rating}
                        />
                )
                }
                </tbody>
            </table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </>
    );
};

export default Table;
