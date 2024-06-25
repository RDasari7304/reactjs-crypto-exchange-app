import { useEffect, useState } from "react";

export default function SearchBar({data, setData}){
    const [originalData, setOriginalData] = useState([]);

    useEffect(() => setOriginalData(data), []);

    function filterData(startingVal){

        const filteredData = [...originalData].filter((data) => {
            const lowercase_name = data.name.toLowerCase();
            const lowercase_symbol = data.abr.toLowerCase();
            const lowercase_query = startingVal.toLowerCase();

            return lowercase_name.startsWith(lowercase_query) || lowercase_symbol.startsWith(lowercase_query);
        });

        setData(filteredData);
    }

    return (
        <div className="relative w-full flex justify-center mt-8">
            <div className="relative w-full max-w-xl">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                
                <input onChange={(e) => {filterData(e.target.value)}}type='search' 
                className="w-full focus:outline-none focus:ring-yellow-500 focus:border-yellow-300 text-md ps-10 p-3 border border-gray-200 rounded-xl bg-gray-50" 
                placeholder="Search"/>

            </div>
        </div>
    );
}