function RegisterForm() {
    return (
        <>
<h1>Cadastre-se</h1>
    <br></br>

    <form>
  <div class="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email: </label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Senha: </label>
    <input type="password" className="form-control" id="exampleInputPassword1"/>
  </div>

  
  <p className="mt-3">
  
    <button type="submit" className="btn btn-primary">
        <a href="components/LoginForm">Cadastrar</a>
    </button>
</p>
</form>


</>
         )
}   

    export default RegisterForm;