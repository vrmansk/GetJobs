import React from "react"
import apiJoblist from '../api/api-joblist';
import Navbar from "./Navbar"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

export default function JobDetail() {
    const [detail, setDetail] = useState([])

    const { id } = useParams()
    //console.log(id);


    useEffect(() => {
        apiJoblist.detail(id).then(data => {
            setDetail(data)
        })
    }, [])

    //console.log(text);
    return (
        <>

            <Navbar />

            <div className=" border-2  bg-slate-400/25">
                <div className="p-4">
                    <Link to="/home" className="font-semibold text-xl text-slate-400 hover:text-blue-700 group " href="#">⬅<span className=" m-2 text-blue-500 group-hover:text-blue-700">Back</span></Link>
                </div>
                <div className="mx-4 px-4 border-2 border-slate-400 ">
                    <div className="w-full py-2 border-b-2 border-slate-400/20">
                        <h4 className="-mb-1 text-md text-slate-600">{detail.type}/{detail.location}</h4>
                        <h1 className="mt-0 font-bold text-lg">{detail.title}</h1>
                    </div>
                    <div class="mt-2  md:grid  md:grid-cols-3 md:grid-flow-col md:gap-4 ">
                        <div dangerouslySetInnerHTML={{ __html: detail.description }} class="sm:row-span-3 sm:col-span-2">

                        </div>
                        <div class=" mt-4  border-2 border-slate-500/50 rounded-md bg-slate-100 outline outline-4 outline-slate-500/25">
                            <div className="p-1 flex justify-between border-b-2 border-slate-400 ">
                                <h3 className="font-semibold">{detail.company}</h3>
                                <h3 className=" bg-slate-400 text-blue-500 font-semibold rounded-md text-sm py-1 px-2">1 other job</h3>
                            </div>
                            <div className="border-2 border-slate-300 rounded-md bg-white m-1 h-48">
                            </div>
                            <p></p>
                            <a className=" m-1 underline text-blue-500 hover:text-blue-600 focus:text-blue-800" href="https://www.sweetrush.com/" target="_blank">{detail.company_url}</a>
                        </div>
                        <div class="p-2 mt-6 border-2 border-amber-300/25 rounded-md bg-amber-100/75 outline outline-4 outline-amber-300/25">
                            <h2 className="p-1 mb-2 font-semibold border-b-2 border-slate-400">How to apply</h2>
                            <div className="">
                                <p className="overflow-hidden" dangerouslySetInnerHTML={{ __html: detail.how_to_apply }}>

                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}