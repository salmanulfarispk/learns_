import { useEffect, useState } from "react";
import { useNavigate,useLocation} from "react-router-dom"



const backendUrl= import.meta.env.VITE_BACKEND_URL;

function App() {

  const [users,setUsers]=useState([])
  const [totalPage, setTotalPage] = useState();
  const[count,setCount]=useState()
  const navigate=useNavigate()
  const location=useLocation()


  const queryParams= new URLSearchParams(location.search)
  const initialPage= parseInt(queryParams.get('page')) || 1 ;
  const [currentPage,setCurrentPage]=useState(initialPage)



  useEffect(()=>{
    AllUsers(currentPage)
  },[currentPage])

  const AllUsers=async(page)=>{

    const response=await fetch(backendUrl+`/allusers?page=${page}`)

    const data=await response.json()
    if(data.success){
     setUsers(data.Alluser)
     setTotalPage(data.totalPages);
     setCount(data.totalUsers)
    }
    
  }


  const handlePageChange=(page)=>{
    setCurrentPage(page)
    navigate(`?page=${page}`)
  }
   

  return (
    <div className="p-20">
      <div className="mb-7 w-full flex justify-between ">
        <h1 className="font-semibold text-3xl">All users ({count})</h1>
        <button className="p-3 rounded-md bg-green-700 text-white cursor-pointer" onClick={()=> navigate("/message")}>
          To Mesage
        </button>
      </div>
      
  
      

      {/**cards */}
      <div className="mb-7 max-h-[500px] overflow-y-scroll space-y-4">
      {users.map((user)=>(
      <article className="rounded-xl border-2 border-gray-100 bg-white" key={user._id}>
     <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
    <a href="#" className="block shrink-0">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
        className="size-14 rounded-lg object-cover"
      />
    </a>

    <div>
      <h3 className="font-medium sm:text-lg">
        <a href="#" className="hover:underline">{user.name} </a>
      </h3>

      <p className="line-clamp-2 text-sm text-gray-700">
         {user.email} sit amet consectetur adipisicing elit. Accusamus, accusantium temporibus
        iure delectus ut totam natus nesciunt ex? Ducimus, enim.
      </p>

      <div className="mt-2 sm:flex sm:items-center sm:gap-2">
        <div className="flex items-center gap-1 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
            />
          </svg>

          <p className="text-xs">14 comments</p>
        </div>

        <span className="hidden sm:block" aria-hidden="true">&middot;</span>

        <p className="hidden sm:block sm:text-xs sm:text-gray-500">
          Posted by
          <a href="#" className="font-medium underline hover:text-gray-700"> {user.name} </a>
        </p>
      </div>
    </div>
  </div>

  <div className="flex justify-end">
    <strong
      className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-green-600 px-3 py-1.5 text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="size-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>

      <span className="text-[10px] font-medium sm:text-xs">Solved!</span>
    </strong>
  </div>
</article>
 ))}  
      </div>


      <div className="w-full flex items-center justify-center">

      {/**pagination */}
      <div className="inline-flex items-center justify-center gap-3">
  <button
    onClick={() => handlePageChange(currentPage - 1)} 
    disabled={currentPage === 1}
    className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
  >
    <span className="sr-only">Prev Page</span>
    <svg xmlns="http://www.w3.org/2000/svg" className="size-3" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  </button>

  <p className="text-xs text-gray-900">
     {currentPage}
    <span className="mx-0.25">/</span>
     {totalPage}
  </p>

  <button
     onClick={() => handlePageChange(currentPage + 1)} 
     disabled={currentPage === totalPage}
    className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
  >
    <span className="sr-only">Next Page</span>
    <svg xmlns="http://www.w3.org/2000/svg" className="size-3" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  </button>
</div>
</div>

    </div>
  )
}

export default App
