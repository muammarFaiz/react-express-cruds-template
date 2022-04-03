
import Input from '../../components/Input';
import './index.scss';
import react from 'react';
import axios from 'axios';

const Tambah = () => {
  const [status, setstatus] = react.useState('sending');
  const neversubmit = react.useRef(true);
  // const [data, setdata] = react.useState('');

  function notif() {
    if(!neversubmit.current) {
      if(status === 'sending') {
        return <h1>Sending...</h1>
      } else {
        return <h1>Sent</h1>
      }}
    }

  function handleSubmit(val) {
    val.preventDefault();
    neversubmit.current = false;
    setstatus('sending');
    console.log(val.target.name.value);
    const v = val.target;
    axios({
      url: 'http://localhost:3001/updatetable',
      method: 'post',
      data: { name: v.name.value, price: v.price.value, stock: v.stock.value, status: v.status.checked }
    }).then(res => {
      console.log(res.data);
      // setdata(res.data);
      setstatus('sent');
    }, err => {
      console.log(err);
    });
  }
  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={val => handleSubmit(val)}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama"/>
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga"/>
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock"/>
          <Input name="status" type="checkbox" label="Active" defaultChecked/>
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
        {notif()}
      </div>
    </div>
  )
}

export default Tambah;
