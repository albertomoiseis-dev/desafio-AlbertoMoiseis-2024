export class Zoologico {
  constructor() {
    this.animais = {
      LEAO: { carnivoro: true, espacoPorAnimal: 5, bioma: "savanna" },
      MACACO: { carnivoro: false, espacoPorAnimal: 2, bioma: "floresta" },
      CROCODILO: { carnivoro: true, espacoPorAnimal: 3, bioma: "pantano" },
    };

    this.recintos = [
      { id: 1, bioma: "floresta", espacoTotal: 10, animaisNoRecinto: [] },
      { id: 2, bioma: "floresta", espacoTotal: 5, animaisNoRecinto: [] },
      { id: 3, bioma: "pantano", espacoTotal: 7, animaisNoRecinto: [] },
      { id: 4, bioma: "pantano", espacoTotal: 8, animaisNoRecinto: [] },
    ];
  }

  verificarRecintosDisponiveis(especieAnimal, quantidade) {
    const especieInvalida = !this.animais[especieAnimal];
    const quantidadeInvalida = quantidade <= 0;

    if (especieInvalida) {
      return { erro: "Espécie de animal inválida", recintosDisponiveis: null };
    }

    if (quantidadeInvalida) {
      return {
        erro: "Quantidade de animais inválida",
        recintosDisponiveis: null,
      };
    }

    const espacoNecessario =
      this.animais[especieAnimal].espacoPorAnimal * quantidade;
    const biomaAnimal = this.animais[especieAnimal].bioma;

    const recintosViaveis = this.recintos.filter((recinto) => {
      const espacoLivre =
        recinto.espacoTotal -
        recinto.animaisNoRecinto.length *
          this.animais[especieAnimal].espacoPorAnimal;
      const biomaCompativel = recinto.bioma === biomaAnimal;
      const recintoSeguro = recinto.animaisNoRecinto.every(
        (animal) =>
          !this.animais[animal.especie].carnivoro ||
          this.animais[animal.especie] === this.animais[especieAnimal]
      );

      return (
        espacoLivre >= espacoNecessario && biomaCompativel && recintoSeguro
      );
    });

    if (recintosViaveis.length === 0) {
      return {
        erro: "Não há recintos viáveis disponíveis",
        recintosDisponiveis: null,
      };
    }

    return {
      erro: null,
      recintosDisponiveis: recintosViaveis.map(
        (recinto) =>
          `Recinto ${recinto.id} (espaço livre: ${recinto.espacoTotal} total: ${recinto.espacoTotal})`
      ),
    };
  }
}
