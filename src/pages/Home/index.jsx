import { Link } from 'react-router-dom';
import react from 'react';
import axios from 'axios';
import './index.scss';

const Home = (props) => {
  const [dt, setdt] = react.useState('');

  react.useEffect(() => {
    // useEffect only on first render
    console.log('first render');
    getdata();
  }, []);

  function getdata() {
    axios({
      url: 'https://eduwork-expressside-mongoatlas.herokuapp.com/getall',
      method: 'get',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    }).then(resp => {
      console.log(resp.data);
      setdt(resp.data);
    });
  }

  function send_data(index) {
    props.setdata('data', dt[index]);
  }

  function del_product(url) {
    axios({
      url: url,
      method: 'delete'
    }).then(res => {
      console.log(res.data);
      getdata();
    }, err => console.log(err));
  }

  function rows(key) {
    if(dt) {
      console.log(key);
      return(
        dt.map((item, index) => {
          if(item.name.match(RegExp(key, 'g'))) {
            return(
              <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td className="text-right">{item.price}</td>
              <td className="text-center">
              <Link to="/detail" onClick={() => send_data(index)} className="btn btn-sm btn-info">Detail</Link>
              <Link to="/edit" onClick={() => send_data(index)} className="btn btn-sm btn-warning">Edit</Link>
              <Link to='/' onClick={val => del_product(`https://eduwork-expressside-mongoatlas.herokuapp.com/updatetable?id=${item._id}`)}
                className="btn btn-sm btn-danger">Delete</Link>
              </td>
              </tr>
            )
          } else { return null }
        }))}
  }
  
  return(
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..." onChange={val => {
          props.setdata('search', val.target.value);
        }}
          value={props.search}/>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows(props.search)}
        </tbody>
      </table>
      {
        !dt ?
        <h1>Loading...</h1> :
        null
      }
    </div>
  )
}

export default Home;
