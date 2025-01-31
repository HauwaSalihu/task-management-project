import { Link } from "react-router";

function Home() {
  return (
    <section className="container mx-auto flex flex-col lg:flex-row justify-around items-center">
      <div className="text-center lg:w-[40%] flex flex-col h-screen lg:h-auto place-items-center gap-5">
        <h1 className="text-3xl lg:text-5xl font-bold text-blue-400">
          Monitor, Organize and Implement
        </h1>
        <p className="text-lg lg:text-xl font-medium text-gray-600">
          All your tasks in one place
        </p>
        <Link
          to="/tasks"
          className="bg-blue-500 hover:bg-blue-700 w-fit text-white font-bold py-2 px-4 rounded"
        >
          Get Started
        </Link>
      </div>
      <div className="w-full lg:w-[60%] flex justify-center">
        <img
          src="/Done-rafiki.png"
          className="h-[300px] lg:h-[700px] object-contain"
          alt="Task Management Illustration"
        />
      </div>
    </section>
  );
}

export default Home;
