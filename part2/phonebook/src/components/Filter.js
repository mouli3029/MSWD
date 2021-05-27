import React from 'react';

const Filter = ({setSearch,search}) => {
    return(
    <form>
       filter shown with <input type='text' onChange={(e)=>setSearch(e.target.value)} value={search}/>
    </form>
    )
}
export default Filter