import { Link } from "react-router-dom";
import './index.scss';

const Detail = (props) => {
  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {props.data.id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {props.data.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: AED. {props.data.price}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {props.data.stock}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail;
