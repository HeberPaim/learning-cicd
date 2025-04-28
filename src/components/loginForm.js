import React, { Component } from "react";
import "../App.css";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      senha: "",
      estadoAcesso: "",
    };
    this.muda = this.muda.bind(this);
    this.valida = this.valida.bind(this);
  }
  muda(event) {
    console.log(event.target);
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    this.setState({ estadoAcesso: "" });
  }

  valida(e) {
    e.preventDefault();
    let resp = "";
    if (
      this.state.email === "eduardo.lino@pucpr.br" &&
      this.state.senha === "123456"
    ) {
      resp = "Acessado com sucesso!";
    } else {
      resp = "Usuário ou senha incorretos!";
    }
    this.setState({ estadoAcesso: resp });
  }
  render() {
    return (
      <form className="form">
        <h1>Login</h1>
        <label for="email">Email</label>
        <input
          id="email"
          type="text"
          size="20"
          name="email"
          onChange={(e) => this.muda(e)}
        />
        <label for="senha">Senha</label>
        <input
          id="senha"
          type="password"
          size="20"
          name="senha"
          onChange={(e) => this.muda(e)}
        />
        <br />
        <button className="button" onClick={this.valida}>
          {" "}
          Acessar{" "}
        </button>
        <h5>{this.state.estadoAcesso}</h5>
      </form>
    );
  }
}

export default Form;
