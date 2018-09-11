## classificador-sexo-ml
API utilizando algoritmo naive bayes para classificar sexo através de altura, tamanho do pé e peso de alguma pessoa baseado na monografia da professora Priscilla Labanca (Computação Forense à Luz da Inteligência Artificial). 
Os resultados não são precisos por causa da pequena base de treinamento, mas serve de estudo do algoritmo de naive bayes


## Estudos Fatec - Prof.Leonardo Villani - 6° Ciclo ADS - Inteligência Artificial

### Métodos probabilísticos
Utilizamos probabilidades quando precisamos lidar com incertezas, onde não temos todos os atributos para compor um exemplo
Modela o grau de crença de um agente sobre a ocorrência de um evento

#### Espaço amostral
- é o conjunto estabelecido por todos os possíveis resultados de um experimento. 
Probabilidade incondicional - Priori
- Grau de crença para um evento na ausência de quaisquer outras informações(evidências)

#### Calculo de Priori
- E um evento
- n(E) o número de elementos em E
- S um espaço amostral não vazio
- n(S) o número de elementos em S

Fórmula
- P(E) = n(E)/n(S)
   
### Princípio fundamental da contagem

#### Probabilidade Condicional
-> Modela o grau de crença de um agente dadas as evidênciais disponíveis
-> O grau de crença muda quando novas evidências surgem
-> P(A|B) A probabilidade de A dado que B. Exemplo: qual a probabilidade de A dado que eu sei B

Exemplo dado em aula:
  Qual a probabilida de alguém ter cárie dado que a pessoa possui fortes dores no dente

#### Fórmula condicional
P(A|B) = P(A U B)/P(B)
-->Lembre-se da interssecção entre os eventos (A(AB)B)

Exemplo prático:
 - 8 instâncias que tiveram jogo de tênis
 - 4 instâncias quentes
 - 14 instâncias ao todo

P(tenis|quente) = P(tenis U quente)/P(quente)

Probabilidade de ter jogo de tênis dado que está quente = (Probabilidade de ter tenis * probabilidade de estar quente) / probabilidade de estar quente

Probabilidade de ter jogo de tênis dado que está quente = (8/14 * 4/14)/ (4/14)

### Naive Bayes

Naive bayes assume que os valores(atributos) de um evento(exemplo) são independentes entre si
Fórmula

Precisamos descobrir a probabilidade dele pertencer a cada uma das características

Exemplo prático. Qual a probabilidade de jogar tênis dado que {ensolarado, temperatura fria, umidade alta, vento forte}

- P(de ter jogo) * P(do dia estar ensolarado | verdadeiro) * P(do dia estar nublado | verdadeiro) ... = Algum coeficiente de sim
- 9/14           *  2/9                                    * 3/9  ...    
___________________________________________________________________________________________________

- P(de não ter jogo) * P(do dia estar ensolarado | falso) * P( do dia estar nublado | falso) ... = Algum coeficiente para não
- 5/14               * 3/5                                * 1/5   ...

Pergunta qual das duas classes resultou no maior produtório?
A maior probabilidade no caso é não ter jogo de tênis 






