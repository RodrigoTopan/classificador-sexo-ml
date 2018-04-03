module.exports = function (altura,pe,peso){
            //CRIANDO MATRIZ BIDIMENSIONAL COM 4 LINHAS E 4 COLUNAS
            // ALIMENTANDO matriz de treino com altura em cm, tamanho do pé e peso(em vareiro),
            //1 para BRANCO, 2 para PARDO, 3 para NEGRO 
            //1 para HOMEM e 0 para MULHER, 
            // 4 exercicios de treino
            //matriz = new Array();
            matriz = [
            [180, 42, 66, 1 ], 
            [167, 41, 79, 1 ],
            [160, 37, 60, 0 ], 
            [150, 35, 50, 0 ],
            [162, 36, 51, 0 ],
            [163, 37, 60, 0 ],
            [160, 37, 60, 0 ],
            [165, 39, 67, 1 ],
            [180, 42, 60, 1 ],
            [182, 43, 65, 1 ],
            [185, 32, 78, 1 ]
            ];



        var linhas = 9;//Alterar esse valor conforme o número de linhas no treinamento
        var cont_m = 0;//Contador de amostras masculinas
        var cont_f = 0;//Contador de amostras femininas


        //MASCULINO
        var acum_alt_M = 0;
        var acum_pe_M = 0;
        var acum_peso_M = 0;
        var x_barra_altura_M = 0;
        var x_barra_pes_M = 0;
        var x_barra_peso_M = 0;
        var variancia_alt_M = 0;
        var variancia_pes_M = 0;
        var variancia_peso_M = 0;

        //FEMININO
        var acum_alt_F = 0;
        var acum_pe_F = 0;
        var acum_peso_F = 0;
        var x_barra_altura_F = 0;
        var x_barra_pes_F = 0;
        var x_barra_peso_F = 0;
        var variancia_alt_F = 0;
        var variancia_pes_F = 0;
        var variancia_peso_F = 0;


        //RACIOCINIO
        //TEREMOS QUE CALCULAR A VARIANCIA DE ALTURAS, PÉS E PESOS
        //SE A VARIANCIA FOR PEQUENA, CONTABILIZAR AS QUANTIDADES DE OCORRENCIAS


        for (var i=0;i<linhas;i++)
        {
            
            //MASCULINO
            if (matriz[i][3] == 1)
            {
               
                cont_m++;
                //SOMANDO ALTURAS
                acum_alt_M = acum_alt_M + matriz[i][0];

                //SOMANDO PÉS
                acum_pe_M = acum_pe_M + matriz[i][1];

                //SOMANDO PESOS
                acum_peso_M = acum_peso_M + matriz[i][2];
            }
            else if (matriz[i][3] == 0) {//FEMININO

                cont_f++;
                //SOMANDO ALTURAS
                acum_alt_F = acum_alt_F + matriz[i][0];

                //SOMANDO PÉS
                acum_pe_F = acum_pe_F + matriz[i][1];

                //SOMANDO PESOS
                acum_peso_F = acum_peso_F + matriz[i][2];
            }

        }

        //========================================  MASCULINO ==========================
        //CALCULANDO MÉDIA ARITMÉTICA DA AMOSTRAGEM DE ALTURAS
        x_barra_altura_M = acum_alt_M / cont_m;
        console.log(x_barra_altura_M);
        //MÉDIA ARITM. DE PÉS
        x_barra_pes_M = acum_pe_M / cont_m;

        //MÉDIA ARITM. DE PESOS
        x_barra_peso_M = acum_peso_M / cont_m;
        //========================================= FEMININO ============================

        //CALCULANDO MÉDIA ARITMÉTICA DA AMOSTRAGEM DE ALTURAS
        x_barra_altura_F = acum_alt_F / cont_f;

        //MÉDIA ARITM. DE PÉS
        x_barra_pes_F = acum_pe_F / cont_f;

        //MÉDIA ARITM. DE PESOS
        x_barra_peso_F = acum_peso_F / cont_f;




        //PERCORRENDO MATRIZ
        // CALCULANDO Xi - X_BARRA
        for (var i=0;i<linhas;i++)
        {
            //MASCULINO
            if (matriz[i][3] == 1)
            {
                //CALCULO DE ALTURA
                variancia_alt_M = variancia_alt_M + (Math.pow((matriz[i][0]-x_barra_altura_M), 2));//elevando ao quadrado


                //CALCULO DE PÉS
                variancia_pes_M = variancia_pes_M + Math.pow((matriz[i][1] - x_barra_pes_M), 2);


                //CALCULO DE PESO
                variancia_peso_M = variancia_peso_M + Math.pow((matriz[i][2] - x_barra_peso_M), 2);
            }//FEMININO
            else if (matriz[i][3] == 0)
                {//FEMININO
                    //CALCULO DE ALTURA
                    variancia_alt_F = variancia_alt_F + Math.pow((matriz[i][0] - x_barra_altura_F), 2);//elevando ao quadrado


                    //CALCULO DE PÉS
                    variancia_pes_F = variancia_pes_F + Math.pow((matriz[i][1] - x_barra_pes_F), 2);


                    //CALCULO DE PESO
                    variancia_peso_F = variancia_peso_F + Math.pow((matriz[i][2] - x_barra_peso_F), 2);

                }
                
            }



            // ======================== MASCULINO =======================
            //dividindo pelo numero de treinos -1;
            variancia_alt_M = variancia_alt_M / (cont_m-1);
            variancia_pes_M = variancia_pes_M / (cont_m - 1);
            variancia_peso_M = variancia_peso_M / (cont_m - 1);
            //========================= FEMININO =======================
            //dividindo pelo numero de treinos -1;
            variancia_alt_F = variancia_alt_F / (cont_f - 1);
            variancia_pes_F = variancia_pes_F / (cont_f - 1);
            variancia_peso_F = variancia_peso_F / (cont_f - 1);



            //NOVA MATRIZ CRIADA PELA DISTRIBUIÇÃO GAUSSIANA A PARTIR DO CONJUNTO DE TREINO
            // MÉDIA DA ALTURA, VARIANCIA ALTURA, MEDIA PÉS , VARIANCIA PÉS, MÉDIA PESO, VARIANCIA PESO, 1=HOMEM 0 = MULHER
            var treino = [ 
                [x_barra_altura_M, variancia_alt_M, x_barra_pes_M, variancia_pes_M, x_barra_pes_M, variancia_peso_M, 1 ],
                [x_barra_altura_F, variancia_alt_F, x_barra_pes_F, variancia_pes_F, x_barra_peso_F, variancia_peso_F, 0 ],
            ];


        //TESTE
        //ENTRADAS
        //var altura = 167;
        //var pe = 42;
        //var peso = 79;



        // VARIAVEIS PARA CALCULO DA POSTERIORI MASCULINA
        var posteriori_M;
        var p_M=0.5;//inicialmente 50% para cada
        var p_altura_M;
        var p_peso_M;
        var p_pe_M;


        // VARIAVEIS PARA CALCULO DA POSTERIORI FEMININA
        var posteriori_F;
        var p_F=0.5;//inicialmente 50% para cada
        var p_altura_F;
        var p_peso_F;
        var p_pe_F;





        //calculos das probabilidades masculinas

        p_altura_M = 1 / (2 * (Math.PI) * variancia_alt_M);
        p_altura_M = p_altura_M * (Math.pow(Math.E, -((Math.pow((altura-x_barra_altura_M), 2))/ (Math.pow((2 * variancia_alt_M),2)))));

        p_peso_M = 1 / (2 * (Math.PI) * variancia_peso_M);
        p_peso_M = p_peso_M * (Math.pow(Math.E, -((Math.pow((peso-x_barra_peso_M), 2)) / (Math.pow((2 * variancia_peso_M),2)))));

        p_pe_M = 1 / (2 * (Math.PI) * variancia_pes_M);
        p_pe_M = p_pe_M * (Math.pow(Math.E, -((Math.pow((pe-x_barra_pes_M), 2))/ (Math.pow((2 * variancia_pes_M),2)))));


        //calculos das probabilidades femininas

        p_altura_F = 1 /(2 * (Math.PI) * variancia_alt_F);
        p_altura_F = p_altura_F * (Math.pow(Math.E, -((Math.pow((altura - x_barra_altura_F), 2)) / (Math.pow((2 * variancia_alt_F), 2)))));

        p_peso_F = 1 /(2 * (Math.PI) * variancia_peso_F);
        p_peso_F = p_peso_F * (Math.pow(Math.E, -((Math.pow((peso - x_barra_peso_F), 2)) / (Math.pow((2 * variancia_peso_F), 2)))));

        p_pe_F = 1 /(2 * (Math.PI) * variancia_pes_F);
        p_pe_F = p_pe_F * (Math.pow(Math.E, -((Math.pow((pe - x_barra_pes_F), 2)) / (Math.pow((2 * variancia_pes_F), 2)))));




        var evidencia;
        evidencia = (p_M * p_altura_M * p_peso_M * p_pe_M) / (p_F * p_altura_F * p_peso_F * p_pe_F);



        //POSTERIORI MASCULINA
        posteriori_M = (p_M * p_altura_M * p_peso_M * p_pe_M) / evidencia;

        //POSTERIORI FEMININA
        posteriori_F = (p_F * p_altura_F* p_peso_F * p_pe_F) / evidencia;


        console.log("======================== POSTERIORIS =====================");
        console.log("Posteriori Masculina: "+posteriori_M);
        console.log("Posteriori Feminina: "+posteriori_F);

        console.log("A análise aponta para: ");
        if (posteriori_M > posteriori_F)
        {
            var p = 'homem';
            console.log("Homem");
        }
        else {
            var p = "Mulher";
            console.log("Mulher");
        }
        return {'sexo': p};
    }

 