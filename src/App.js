import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { AiFillCloseCircle, AiFillGithub } from "react-icons/ai";

function App() {
  const [endPoint, setEndPoint] = useState("");
  const [container, setContainer] = useState([]);
  const [finalPoint, setFinalPoint] = useState("");
  const [hideFooter, setHideFooter] = useState(false);

  useEffect(() => {
    fetchMe();
  }, [finalPoint]);

  const fetchMe = () => {
    const options = {
      method: "GET",
      url: "https://imdb8.p.rapidapi.com/auto-complete",
      params: { q: `${endPoint}` },
      headers: {
        "X-RapidAPI-Key": "f1351fb9bamsh12fb4e391eee091p19d417jsn4da151df0439",
        "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
      },
    };

    Axios.request(options)
      .then(function (response) {
        console.log(response.data.d);
        setContainer(response.data.d);
        return response.data.d;
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setFinalPoint(endPoint);
  };
  const onChangeHandler = (e) => {
    setEndPoint(e.target.value);
  };

  const closeFooter = () => {
    setHideFooter(true);
  };

  return (
    <div className=" min-h-screen bg-black text-white">
      <div>
        <form
          onSubmit={submitHandler}
          className=" flex items-center justify-center sticky top-0 z-10 bg-transparent backdrop-blur-3xl"
        >
          <input
            type="text"
            value={endPoint}
            onChange={onChangeHandler}
            className=" border-2 border-black rounded-md m-5 px-3 py-1 text-black"
          />
          <button
            type="submit"
            className=" bg-teal-500 px-3 py-1 rounded-md hover:bg-teal-600 hover:text-white transition-all duration-300"
          >
            Submit
          </button>
        </form>

        <div className=" flex flex-wrap justify-center hover:scale-100">
          {container?.map((item, index) => {
            return (
              <div
                key={index}
                className=" relative m-3 my-3 md:w-1/3 mx-auto rounded-full"
              >
                <img
                  src={item.i.imageUrl}
                  alt=""
                  className=" block h-5/6 mx-auto"
                />

                <div className="  absolute top-0 left-0 w-full h-full hover:cursor-pointer bg-[#00000051] backdrop-blur-sm flex flex-col items-center justify-center text-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className=" ">
                    <p className=" text-2xl font-bold my-12">{item.l}</p>
                    <p className=" text-xl my-1">{item.s}</p>
                    <p className=" capitalize font-bold">{item.qid}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <footer
        className={` fixed bottom-0 w-full ${hideFooter ? "hidden" : ""}`}
      >
        <div className="  flex justify-around items-center md:px-40 md:py-5 bg-gradient-to-r from-[#4B79A1] to-[#283E51]">
          <p className=" mx-5 text-xs w-52 md:text-base md:w-auto">
            Note: This is a free API, so it can only be fetched 500 times a
            month!
          </p>
          <p className=" mx-5 text-xs md:text-base">Made by Shivam Kumar</p>
          <a
            href="https://github.com/Shivam020202"
            target="_blank"
            rel="noopener noreferrer"
            className=" flex items-center gap-2 justify-center"
          >
            Source Code:
            <AiFillGithub className=" text-3xl hover:text-black duration-300 ease-in-out" />
          </a>
          <button
            className=" absolute right-[0.7rem] bottom-10"
            onClick={closeFooter}
          >
            <AiFillCloseCircle />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
