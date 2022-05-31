const Navbar = () => {
    return (
        <nav class="relative w-full flex flex-wrap items-center justify-between py-3 bg-blue-800 ">
            <div class="container-fluid w-full flex flex-wrap items-center justify-between px-6">
                <div class="container-fluid">
                    <a class="text-xl text-white" href="#"> <span class="font-bold">Get</span>Jobs</a>
                </div>
                <div class="container-fluid">
                    <a class="text-md text-white" href="#">Logout</a>
                </div>

            </div>
        </nav>
    )
}

export default Navbar