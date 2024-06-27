import { useEffect, useState } from "react";

export default function TablePagination({data, setData, numPageEntities}){
    const numPages = Math.ceil(data.length / numPageEntities);
    const pages = Array.from({length: numPages}, (_, i) => i + 1);
    const [active, setActive] = useState(0);
    
    function pageData(){
        const filteredData = data.map((data, index) => {
            return {...data, display: index >= active * numPageEntities && index < (active + 1) * numPageEntities}
        });
        
        setData(filteredData);
    }

    useEffect(() => {
        pageData();
    }, [active, numPageEntities]);
    
    return (
        <div className="flex flex-row justify-center items-center mt-4">
            {active != 0 && <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke={'currentColor'} 
            onClick={() => setActive(active - 1)}
            className={`size-6 mr-2 hover:bg-gray-100 p-1 cursor-pointer`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>}

            {pages.map((page, index) => {
                return (
                    
                    <button 
                        onClick={() => setActive(index)}
                        className={`rounded-md text-gray-400 px-3 py-1 mx-1 cursor-pointer hover:bg-gray-100 
                            ${active == index ? 'cursor-default bg-gray-100 text-black' : ''}`} 

                        style={{'font-family' : 'Calibri'}}> 
                    
                        {page}
                    
                    </button>
                )
            })}

            {active != pages.length - 1 && <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke={`${active == pages.length - 1 ? 'grey' : 'black'}`} 
            onClick={() => setActive(active + 1)}
            className="size-6 ml-2 hover:bg-gray-100 p-1 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>}

        </div>
    );
}