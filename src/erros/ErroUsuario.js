class ErroUsuario extends Error {
    constructor(message) {
      super(message);
      this.name = "ErroUsuario";
      this.statusCode = 400; 
    }
  }
  
  export default ErroUsuario;
  