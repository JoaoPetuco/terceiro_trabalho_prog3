import {app, setup} from "../../index"
import { afterAll, describe, expect, test } from "@jest/globals";
import supertest from "supertest";
import { getConnection} from "typeorm"

describe("persistence test", () => {

    afterAll(async () => {
        await getConnection().close()
    });

    beforeAll(async () => {
        await setup()
    });


    it('teste /artefato/list e /artefato/delete', async () => {
        var agent = supertest(app);
        const postList = await agent.get('/municoes');
        expect(postList.statusCode).toEqual(200);
        if (postList.body.length > 0){
        for(const e of postList.body){
           
            const data = { "id" : e.id };
            console.log("Encontrou o artefato: ");
            console.log(data);
            
            const postDelete = await agent.delete('/municoes').send(data);
            
            console.log("Removeu o artefato: ");
            console.log(data);

            expect(postDelete.statusCode).toEqual(204);
        }
        }else{
            const artefato = { "nome": "Ak-47",  "peso":7, "valor":50, "explosiva": true, "calibre":"08" };
            const postCreate = await agent.post('/municoes').send(artefato);
            
            console.log("Cadastrou o artefato: ");
            console.log(postCreate);

            expect(postCreate.statusCode).toEqual(200);
        }
    });


    it('teste /itens_compra/list e /itens_compra/delete', async () => {
        var agent = supertest(app);
        const ret = await agent.get('/itens_compras');
        expect(ret.statusCode).toEqual(200);

        if (ret.body.length > 0){
            console.log(`Encontrou ${ret.body.length} compras cadastradas.`);
            
            for(const p of ret.body){
            
                const data = { "id" : p.id };
                console.log(`Removendo os itens da compra ${data.id}.`);
                const postDeleteCompra = await agent.delete('/itens_compras').send(data);
                expect(postDeleteCompra.statusCode).toEqual(204);
                //esse remocao pode gerar alguma violacao de chave, caso o endereco esteja sendo referenciado por outro jogador.
                //ou aplicar a estratégia de cascade no ManytoOne
                if(typeof p.compras != 'undefined' && typeof p.artefatos != 'undefined'){

                    console.log(`Removendo as compras ${p.compras.id}.`);
                    const postDeleteCompra = await agent.delete('/compra').send({ "id" : p.compras.id});
                    expect(postDeleteCompra.statusCode).toEqual(204);

                    
                }
                
            }
        }else{
            console.log("Não encontrou compras cadastrados, cadastrando novo jogador e itens da compra.");
            const postCreateItensCompra = await agent.post('/itens_compras').send({"compra_id":"", "artefato_id":"", "quantidade":"0", "valor":"0"});
            expect(postCreateItensCompra.statusCode).toEqual(200);
            const postFindItensCompra = await agent.get('/enderecos').send({"compra_id":"", "artefato_id":"", "quantidade":"0", "valor":"0"});
            expect(postFindItensCompra.statusCode).toEqual(200);
            
            const data = {"nickname": "t@g1.com",
                          "senha": "11111",
                          "pontos": 10,
                          "endereco" : postFindItensCompra.body[0]
                        };

            const postCreateJogador = await agent.post('/jogadores').send(data);
            expect(postCreateJogador.statusCode).toEqual(200);
        }
        });





});

