function consultarCep() {
  const cep = document.getElementById("cep").value.replace(/\D/g, "");

  if (cep.length !== 8) {
    alert("CEP inválido! Deve conter 8 dígitos.");
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro na consulta do CEP.");
      }
      return response.json();
    })
    .then(data => {
      if (data.erro) {
        alert("CEP não encontrado.");
        return;
      }

      console.log(data);
      adicionarValoresNosCamposViaCep(data);
      document.getElementById("resultado").classList.remove("hidden");
    })
    .catch(error => {

      if (error.message.includes("Failed to fetch")) {
        fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`)
          .then(response => {
            if (!response.ok) {
              throw new Error("Erro na consulta do CEP.");
            }
            return response.json();
          })
          .then(data => {
            if (data.erro) {
              alert("CEP não encontrado.");
              return;
            }
            console.log(data);
            adicionarValoresNosCamposBrasilapi(data);
            document.getElementById("resultado").classList.remove("hidden");
          })  .catch(error => {
          alert("Erro ao buscar o CEP: " + error.message);
        });
      } else {
        alert("Erro: " + error.message);
      }
    });
}

function adicionarValoresNosCamposViaCep(data) {
  document.getElementById("cepResp").textContent = data.cep;
  document.getElementById("logradouro").textContent = data.logradouro;
  document.getElementById("bairro").textContent = data.bairro;
  document.getElementById("localidade").textContent = data.localidade;
  document.getElementById("uf").textContent = data.uf;
  document.getElementById("ibge").textContent = data.ibge;
}

function adicionarValoresNosCamposBrasilapi(data) {
  document.getElementById("cepResp").textContent = data.cep;
  document.getElementById("logradouro").textContent = data.street;
  document.getElementById("bairro").textContent = data.neighborhood;
  document.getElementById("localidade").textContent = data.city;
  document.getElementById("uf").textContent = data.state;
}
