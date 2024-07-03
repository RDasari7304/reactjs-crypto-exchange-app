import { useEffect, useState, useRef } from "react";
import BrowserTable from "../PortfolioPage/BrowserComponents/BrowserTable";

export default function PriceSearch({data, setData, setHideScreen}){
    const [searchKey, setSearchKey] = useState("");
    const [foundResults, setFoundResults] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        setFoundResults(false);
        const results = data.map((data) => {
            const lowercase_symbol = data.abr.toLowerCase();
            const lowercase_name = data.name.toLowerCase();
            const lowercase_key = searchKey.toLowerCase();

            const shouldDisplay = searchKey != ""  &&  (lowercase_symbol.startsWith(lowercase_key) || lowercase_name.startsWith(lowercase_key));
            if(shouldDisplay) setFoundResults(true);

            return {...data, 'display': shouldDisplay}
        });

        setData(results);
        setHideScreen(searchKey);
    }, [searchKey])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(containerRef.current && !containerRef.current.contains(event.target)){
                setSearchKey("");
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [containerRef]);

    return (
        <div className="relative w-full flex justify-center mt-8"  ref={containerRef}>
            <div className="relative w-full max-w-xl">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                
                <input onClick= {(e) => setSearchKey(e.target.value)} onChange={(e) => setSearchKey(e.target.value)} type='search' 
                className="w-full focus:outline-none focus:ring-yellow-500 focus:border-yellow-300 text-md ps-10 p-3 border border-gray-200 rounded-xl bg-gray-50" 
                placeholder="Search"/>
                
                {searchKey != "" &&
                    <div className="absolute rounded-lg shadow-xl bg-white w-full p-4 mt-1 z-10 overflow-y-auto max-h-96 flex justify-center"> 
                            {foundResults ? 
                                <BrowserTable data= {data} customizable={false} />
                                :
                                <p style={{'fontFamily' : 'Calibri'}}> No results found </p>
                            }
                    </div>
                }
            </div>


        </div>
    );
}