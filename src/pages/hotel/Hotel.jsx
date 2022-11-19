import "./hotel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";
import Navbar from '../../components/navbar/Navbar'
const Hotel = () => {
    const location =  useLocation();
    const id = location.pathname.split("/")[2]
    const [slideNumber, setslideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const {data, loading, error} = useFetch(`/hotels/find/${id}`)
    const navigate = useNavigate();
    const {dates,options} = useContext(SearchContext);
    const {user} = useContext(AuthContext)
    const MILLISECONDSPERDAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1,date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime())
        const diffDays = Math.ceil(timeDiff / MILLISECONDSPERDAY)
        return diffDays
    }
    const days = dayDifference(dates[0].endDate, dates[0].startDate)
    const handleOpen = (i)=>{
        setslideNumber(i)
        setOpen(true)
    }
    const handleMove = (direction)=>{
        let newSlideNumber;
        if (direction === "1") {
            newSlideNumber= slideNumber === 0 ? 5 : slideNumber - 1
        } else {
            newSlideNumber= slideNumber === 5 ? 0 : slideNumber + 1
            
        }
        setslideNumber(newSlideNumber)
    }
     const handleClick = () =>{
        if (user) {
            setOpenModal(true)
        } else {
            navigate("/")
        }
     }
  return (
    <div>
      
        <Navbar />
       { loading ? "Loading..." :( <div className="hotelContainer">
        
            { open && <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={()=>setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={()=>handleMove("1")}
              />
              <div className="sliderWrapper">
                <img
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                onClick={()=>handleMove("r")}
                className="arrow"
              />
            </div>}
         
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location {data.distance} from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over  at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a -night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
        </div>
        )}
      
    </div>
  );
};

export default Hotel;