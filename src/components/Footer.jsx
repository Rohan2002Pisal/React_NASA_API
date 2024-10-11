

function Footer(props) {

const {showModel ,  handleToggleModel , data} = props;

  return (

<footer>

    <div className="bgGradient"></div>

    <div>

         <h1> Avengers assemble </h1>

         <h2> {data?.title} </h2>
    </div>

     <button onClick={handleToggleModel}>
       <i className="fa-solid fa-circle-info"></i>
     </button>

   

</footer>

  )
}

export default Footer