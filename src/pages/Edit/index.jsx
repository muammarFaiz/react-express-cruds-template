import Input from "../../components/Input";
import react from 'react';
import axios from 'axios';

const Edit = (props) => {
  const [status, setstatus] = react.useState('sending');
  const neverclicked = react.useRef(true);
  const [product, setproduct] = react.useState(props.data);
  const idforfilter = react.useRef(props.data._id);

  // axios after sent
  react.useEffect(() => {
    if(status === 'sent') {
      console.log('axios after sent');
      axios({
        url: 'http://localhost:3001/updateproduct',
        method: 'get',
        params: {id: props.data._id}
      }).then(res => {
        console.log(res.data);
        setproduct(res.data);
        idforfilter.current = res.data._id;
      }, err => {
        console.log(err);
      });
    }
  }, [status]);

  function notif() {
    if(!neverclicked.current) {
      if(status === 'sent') {
        return <h1>Sent</h1>;
      } else {
        return <h1>Sending...</h1>;
      }
    } else {
      return null;
    }
  }

  // axios on submit
  function handleSubmit(val) {
    console.log('axios on submit');
    val.preventDefault();
    neverclicked.current = false;
    setstatus('sending');
    const v = val.target;
    axios({
      url: `http://localhost:3001/updateproduct`,
      method: 'PATCH',
      params: {
        filter: idforfilter.current,
        name: v.name.value,
        price: v.price.value,
        stock: v.stock.value,
        status: v.status.checked
      }
    }).then(res => {
      console.log(res.data);
      setstatus('sent');
    })
  }

  // add onChange inside the input so the input is editable, therefore the product useRef should be replaced with useState so
  // the component will re-render each change.
  // does repetitive render from onChange will affect the axios and other things?
  // when the update is submited and success the input value should be updated with axios get method.


  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={val => handleSubmit(val)}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" value={product.name}
          onChange={
            val => setproduct(prev => {
              console.log(prev);
              return {...prev, name: val.target.value}
            })
          }/>
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={product.price}
          onChange={
            val => setproduct(prev => {
              return {...prev, price: val.target.value}
            })
          }/>
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" value={product.stock}
          onChange={
            val => setproduct(prev => {
              return {...prev, stock: val.target.value}
            })
          }/>
          <Input name="status" type="checkbox" label="Active" defaultChecked/>
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
        {notif()}
      </div>
    </div>
  )
}

export default Edit;
