import ParticlesComponent from "./Particles";
import Images from "./Images";
import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {BsSearch} from 'react-icons/bs'
import { BsFilterRight } from "react-icons/bs";

const Search = () => {
    const [openFilter, setOpenFilter] = useState(false)
    const [fromYear, setFromYear] = useState('');
    const [toYear, setToYear] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
  // const headings = [
  //     {logo: `${Images.sortingArrows}`,
  //      title: "Name"},
  //     {logo: Images.sortingArrows,
  //     title: "Year Of Strike"},
  //     {logo: Images.sortingArrows,
  //     title: "Mass Range"},
  //     {logo: Images.exportLogo,
  //     title: "Export"}]

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Year Of Strike",
      selector: (row) => {
    // Parse the date and format it as 'YYYY' (year)
      const date = new Date(row.year);
      const year = date.getFullYear();
      return year;
      },
      sortable: true,
    },
    {
      name: "Mass Range",
      selector: "mass",
      sortable: true,
    },
  ];
  const customStyles = {
    table: {
      style: {
        border: "1px solid black",
        borderRadius: "15px",
        backgroundColor: "transparent",
        color: "#ffffff",
        textAlign: "center",
        overflow: "hidden"
      },
    },
    rows: {
      style: {
        minHeight: "72px", // override the row height
        backgroundColor: "transparent",
        color: "#ffffff",
        textAlign: "center",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        backgroundColor: "#000000",
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: "18px",
        textAlign: "center",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        backgroundColor: "transparent",
        textAlign: "center",
      },
    },
  };

  const handleSort = (column, sortDirection) => {
    setSortColumn(column.selector);
    setSortDirection(sortDirection);

    const sortedData = [...filteredData].sort((a, b) => {
        const aValue = typeof column.selector === 'function' ? column.selector(a) : a[column.selector];
        const bValue = typeof column.selector === 'function' ? column.selector(b) : b[column.selector];

        if (column.selector === 'mass') {
            const aMass = parseInt(aValue);
            const bMass = parseInt(bValue);

            return sortDirection === 'asc' ? aMass - bMass : bMass - aMass;
        }

        // For other columns, use default string comparison
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    setFilteredData(sortedData);
};




  const handleFilter = (e) => {
    const searchTerm = e.target.value.toString().toLowerCase();
    const filtered = data.filter((row) => {
      const nameMatch = row.name && row.name.toString().toLowerCase().includes(searchTerm);
      const yearMatch = row.year && row.year.toString().toLowerCase().includes(searchTerm);
      const massMatch = row.mass && row.mass.toString().toLowerCase().includes(searchTerm);
      return nameMatch || yearMatch || massMatch;
    });
    setFilteredData(filtered);
  };



  const handleApplyFilter = () => {
    if (fromYear !== '' && toYear !== '') {
        const filtered = data.filter(item => {
            const itemYear = parseInt(item.year);
            return itemYear >= parseInt(fromYear) && itemYear <= parseInt(toYear);
        });
        setFilteredData(filtered);
        setOpenFilter(false)
    }
};

  const stopPropagation = e => {
    e.stopPropagation();
};

  useEffect(() => {
    axios.get("https://data.nasa.gov/resource/gh4g-9sfh.json").then((res) => {
      console.log(res);
      setData(res.data);
        setFilteredData(res.data); // Set initial listing to all data
    });
  }, []);

  
  return (
    <div className='search w-full h-full  flex flex-col items-center relative'>
      <ParticlesComponent />
      <div className='content-search flex flex-col items-center absolute top-[7em] w-full h-full z-50 gap-[1em]'>
        <h2 className='text-white text-center text-[.8rem] font-light'>
          Dive into detailed data and statistics about meteor impacts, from mass
          ranges to composition classifications.
        </h2>
        <div className="flex items-center justify-center relative">
        <input
          type='text'
          className='w-[300px] px-[15px] py-[6px] text-black font-light rounded-xl relative'
          placeholder='Search'
          onChange={handleFilter}
        />
        <BsSearch className="absolute top-1 right-2 text-[30px]"/>
        </div>

        <div
         onClick={()=>setOpenFilter(!openFilter)}
         className="filter-btn rounded-xl bg-white text-black font-light px-[15px] py-[6px] relative w-[200px] cursor-pointer">
          <p >Filter</p>
          <BsFilterRight className="absolute top-1 right-2 text-[30px]"/>

          {openFilter && 
                   
                   <div onClick={stopPropagation} className="w-[50vw] z-10 absolute left-[-100%] rounded-2xl bg-slate-50 px-[16px] py-[15px] flex flex-col gap-[1rem]">
                  
                 <h4 className="text-md text-gray-600 font-semibold">Filter by Year</h4>
                   <div className="px-[6px] flex gap-[1rem]">
                     <div className="flex gap-[.5rem]">
                     <label htmlFor="fromYear" className="text-sm font-semibold">from</label>
                     <input id="fromYear" value={fromYear} type="number" min={860} max={2013} className="text-center border-black border-2 rounded-xl h-[2rem] w-[5rem]"
                     onChange={e => 
                      setFromYear(e.target.value)}/>
                     </div>
                     <div className="flex gap-[.5rem]">
                     <label htmlFor="toYear" className="text-sm font-semibold">to</label>
                     <input id="toYear"
                value={toYear}
                onChange={e => setToYear(e.target.value)} type="number" min={860} max={2013} className=" text-center border-black border-2 rounded-xl h-[2rem] w-[5rem]" />
                     </div>
                     </div>
                     <h4 className="text-md font-semibold text-gray-600">Filter by Mass range</h4>
                     <div>
                       <input type="number" className=" text-center border-black border-2 rounded-xl h-[2rem] w-[5rem]"/>
                     </div>
                     <div className="flex gap-3">
                     <div
                     onClick={handleApplyFilter} 
                     className="cursor-pointer text-center py-1 px-3 border-black border-2 rounded-xl h-[2rem] w-[5rem] bg-black text-white text-sm font-semibold">Apply</div>
                       <div className="absolute right-2 text-sm font-semibold hover:text-gray-500"
                   onClick={()=>{
                    setFromYear(''); 
                    setToYear('');
                    setFilteredData(data);
                    setOpenFilter(false)
                    }}>Remove filters</div>
                     </div>
                     
                 </div>}
 
        </div>



        <div className='table w-full px-[1em] py-[2em] rounded-lg bg-transparent'>
          {/* <table className="w-full text-white text-center border-collapse ">
                    <thead className="sticky z-20">
                        <tr className="bg-black">
                        <th>Name</th>
                        <th>Year Of Strike</th>
                        <th>Mass Range</th>
                        <th>Export</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(asteroid => (
                            <tr key={asteroid.id} >
                                <td>{asteroid.name}</td>
                                <td>{asteroid.year}</td>
                                <td>{asteroid.mass}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> */}
          {filteredData.length > 0 ? (
            <DataTable
              columns={columns}
              data={filteredData}
              pagination
              customStyles={customStyles}
              onSort={handleSort}
              sortServer
            />
          ) : (
            <div>Loading....</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
