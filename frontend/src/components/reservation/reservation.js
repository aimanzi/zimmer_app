import "./reservation.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import {
  CCircle,
  Receipt,
  CalendarCheck,
  ArrowReturnRight,
  CurrencyDollar,
  Clock,
} from "react-bootstrap-icons";
import img1 from "../../assets/images/1147204_15112615170038049837.jpg";
import img2 from "../../assets/images/443c20aa-luxury-indoor-swimming-pool.jpg";
import img3 from "../../assets/images/HPIM3254.JPG";
import img4 from "../../assets/images/shree-balaji-lawns-and.jpg";
import img5 from "../../assets/images/villa-4555824_1280.jpg";
import { useEffect, useState } from "react";
import Payment from "../payment/payment";

const Reservation = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [dateGap, setDateGap] = useState(null);
  const [msg, setMsg] = useState("");

  const location = useLocation();
  const zimmerData = location.state || null;
  const navegate = useNavigate();

  const BackToMainPage = () => {
    navegate("/mainpage");
  };

  useEffect(() => {
    if (startDate && endDate) {
      const startDateTime = new Date(startDate).getTime();
      const endDateTime = new Date(endDate).getTime();
      const differenceInMilliseconds = endDateTime - startDateTime;
      const differenceInDays =
        differenceInMilliseconds / (1000 * 60 * 60 * 24) + 1;
      if (differenceInDays <= 0) {
        setMsg("Error Resevation Start Date and End Date ");
        setDateGap(false);
      } else {
        setDateGap(differenceInDays);
        setAmount(differenceInDays * zimmerData.price);
        setMsg("");
      }
    } else {
      setDateGap(null);
    }
  }, [startDate, endDate, zimmerData.price]);

  return (
    <div className="resevation-con">
      <header className="resevatioHeader-con">
        <button type="button" className="btn btn-info" onClick={BackToMainPage}>
          <ArrowReturnRight className="return-con" />
          Back To Main Page
        </button>
      </header>
      <Card>
        <Card.Header className="card-header-con">
          <Card.Title>
            <h4>{zimmerData.name}</h4>
          </Card.Title>
        </Card.Header>
        <Card.Body className="card-body-con">
          <Card.Img
            alt="zimmer img"
            src={zimmerData.img}
            className="card-img-con"
          />
          <Card.Text className="card-text-con">
            <p>{zimmerData.description}</p>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="card-footer-con">
          <h4>
            Price: {zimmerData.price} <CurrencyDollar /> per night
          </h4>
        </Card.Footer>
      </Card>
      <div className="imgs-con">
        <div>
          <img src={img1} alt="img1" />
        </div>
        <div>
          <img src={img2} alt="img2" />
        </div>
        <div>
          <img src={img3} alt="img2" />
        </div>
        <div>
          <img src={img4} alt="img2" />
        </div>
        <div>
          <img src={img5} alt="img2" />
        </div>
      </div>

      <div className="order-header">
        <h4>Order Resevation</h4>
      </div>

      <div className="order-con">
        <div className="startDay-con">
          <CalendarCheck style={{ width: "25px", height: "25px" }} />
          <label>Start Date: </label>
          <input
            type="date"
            value={startDate}
            onChange={(sdte) => setStartDate(sdte.target.value)}
          />
        </div>

        <div className="endDay-con">
          <CalendarCheck style={{ width: "25px", height: "25px" }} />
          <label>End Date: </label>
          <input
            type="date"
            value={endDate}
            onChange={(edte) => setendDate(edte.target.value)}
          />
        </div>
        <div>
          <label>
            <Clock style={{ width: "25px", height: "25px" }} />
            Duration:{dateGap} Days
          </label>
        </div>
        <div className="bill-con">
          <Receipt style={{ width: "25px", height: "25px" }} />{" "}
          <label>
            Total Amount: {`${amount}`}
            <CurrencyDollar
              style={{ width: "20px", height: "20px", marginBottom: "5px" }}
            />
          </label>
        </div>
        <div>
          <label>{msg}</label>
        </div>
        {dateGap ? (
          <div className="sendOrder-con">
            <Payment
              startDate={startDate}
              endDate={endDate}
              amount={amount}
              zimmerdata={zimmerData}
              duration={dateGap}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <footer className="footer-con">
        All Right Reseved To Aiman's Zimmers
        <CCircle />
      </footer>
    </div>
  );
};

export default Reservation;
