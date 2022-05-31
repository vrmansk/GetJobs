import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiJoblist from '../api/api-joblist';
import Navbar from './Navbar';

export default function Joblist() {

    let [joblist, setJoblist] = useState([])
    const [visible, setVisible] = useState(5)
    const [searchJob, setSearchJob] = useState([])
    //const [filter, setFilter] = useState("")
    const [filter, setFilter] = useState({
        inputDesc: '',
        inputLoc: '',
        checked: false
    })
    // const handleChange = event => {
    //     setFilter(event.target.value);
    // };

    const handleChange = (name) => (event) => {
        setFilter({ ...filter, [name]: event.target.value });

    };

    const onChange = (e) => {
        setFilter({ ...filter, [e.target.value]: e.target.checked });

    };

    useEffect(() => {
        apiJoblist.list().then(data => {
            setJoblist(data)
        })
    }, [])


    useEffect(() => {
        setSearchJob(
            Array.isArray(joblist) && joblist.filter(data => (
                (data.title.toLowerCase().includes(filter.inputDesc.toLowerCase()) ||
                    data.location.toLowerCase().includes(filter.inputDesc.toLowerCase())) &&
                (data.location.toLowerCase().includes(filter.inputLoc.toLowerCase()))
            ))
        )
    }, [joblist]);



    const onSearch = event => {
        event.preventDefault();
        setSearchJob(
            Array.isArray(joblist) && joblist.filter(data => (
                (data.title.toLowerCase().includes(filter.inputDesc.toLowerCase()) ||
                    data.location.toLowerCase().includes(filter.inputDesc.toLowerCase())) &&
                (data.location.toLowerCase().includes(filter.inputLoc.toLowerCase())) &&
                (data.type.toLowerCase().includes(filter.checked))
            ))
        )
    }
    console.log(searchJob)


    const ShowMoreJob = () => {
        setVisible((prevValue) => prevValue + 5)
    }

    return (
        <>
            <Navbar />
            <div class="m-3  sm:flex sm:flex-wrap md:justify-center ">
                <div class="my-2 mx-3 sm:basis-1/2 sm:mx-0 sm:px- md:basis-1/3 md:mx-1 lg:mx-2 xl:w-96 ">
                    <label for="exampleSearch1" class="form-label text-gray-700 text-sm font-semibold lg:text-lg">Job Description</label>
                    <input
                        type="text"
                        onChange={handleChange('inputDesc')}
                        class="
                    form-control
                    block mt-1
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                        id="exampleSearch2"
                        placeholder="filter by title and company"
                    />
                </div>
                <div class="mb-2 mx-3 sm:basis-1/2 sm:mx-0 sm:px-2 sm:mt-2 md:basis-1/3 md:mx-1 lg:mx-2 xl:w-96">
                    <label for="exampleSearch2" class="form-label mb-2 text-gray-700 text-sm font-semibold lg:text-lg">Location</label>
                    <input
                        type="text"
                        onChange={handleChange('inputLoc')}
                        class="
                             form-control
                             block
                             w-full
                             px-3 mt-1
                             py-1.5
                             text-base
                             font-normal
                           text-gray-700
                           bg-white bg-clip-padding
                             border border-solid border-gray-300
                             rounded
                             transition
                             ease-in-out
                             m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                        "
                        id="exampleSearch2"
                        placeholder="filter by location"
                    />
                </div>
                <div class="form-check mx-3 mb-2 md:mt-10 md:shrink md:m-0 lg:mx-1 lg:mt-12 ">
                    <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none focus:border-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="fulltime" name="filter" checked={filter.fulltime} onChange={onChange} id="flexCheckDefault" />
                    <label class="form-check-label text-sm text-gray-800 font-semibold lg:text-base" for="flexCheckDefault">
                        FullTime Only
                    </label>

                </div>
                <div class="mx-4 mb-2 sm:basis-full md:basis-1 md:mx-1 md:mt-10 lg:mx-4 ">
                    <button type="submit" onClick={onSearch} class="w-full px-6 py-2 border-2 rounded-md border-slate-400 bg-slate-500/75 text-white font-md text-xs lg:text-base leading-tight uppercase hover:bg-slate-600 focus:bg-slate-700 focus:ring-slate-600">Search</button>
                </div>
            </div>
            <div className='mb-4 mx-6 sm:border-4 sm:border-slate-400/50 p-2'>
                <h1 className='font-bold border-b-2 mb-2 pb-2 lg:text-lg'>Job List</h1>
                <div className="bg-white divide-y divide-gray-100">
                    {searchJob && searchJob.slice(0, visible).map((job) => (

                        <div className='p-2 sm:flex sm:justify-between '>
                            <div className="">
                                <div className="text-sm font-bold text-blue-700/75 lg:text-base">
                                    <Link to={`/detail/${job.id}`}>{job.title}</Link>
                                </div>
                                <div className="text-xs text-gray-500 lg:text-sm">{job.company} - <span className='font-semibold text-green-500'>{job.type}</span></div>
                            </div>
                            <div className="text-xs text-gray-900 sm:text-right">
                                <div className="mt-1 font-semibold">{job.location} </div>
                                <div className="italic">{job.created_at}</div>
                            </div>
                        </div>
                    ))}

                    {/* <button onClick={ShowMoreJob} className="mt-2 bg-blue-600 rounded-md w-full text-white text-base lg:text-lg hover:bg-blue-800" >More Jobs</button> */}

                </div>

                {searchJob.length === 0 ?
                    <div className='px-6 py-3 text-center whitespace-nowrap text-sm font-medium text-gray-900'> Data Not Found...</div>
                    : <button onClick={ShowMoreJob} className="mt-2 bg-blue-600 rounded-md w-full text-white text-base lg:text-lg hover:bg-blue-800" >More Jobs</button>}

                {/* {searchJob.length === 0 &&
                    <div className='px-6 py-3 text-center whitespace-nowrap text-sm font-medium text-gray-900'> Data Not Found...</div>} */}
            </div >


        </>
    )

}
