import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getTicket,
  reset,
  closeTicket,
} from "../features/tickets/ticketSlice.js";
import { useParams, useNavigate } from "react-router-dom";
import Backbutton from "../components/BackButton";
import Spinner from "../components/Spinner";

const Ticket = () => {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => {
      return state.tickets;
    }
  );
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    //eslint-disable-next-line
  }, [isError, message, ticketId]);

  // Close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket Closed");
    navigate("/tickets");
  };

  if (isLoading) {
    <Spinner />;
  }

  if (isError) {
    return <h3>Somthing went wrong</h3>;
  }
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <Backbutton url="/tickets" />
        <h2>
          Ticket ID:{ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>Date Submitted: user</h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
      {ticket.status !== "closed" && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
