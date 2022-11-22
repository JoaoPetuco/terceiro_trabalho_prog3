import { app, setup } from "../../index";
import { afterAll, describe, expect, test } from "@jest/globals";
import supertest from "supertest";
import { getConnection } from "typeorm";

describe("persistence test", () => {
  afterAll(async () => {
    await getConnection().close();
  });

  beforeAll(async () => {
    await setup();
  });

  it("teste /artefato/list e /artefato/delete", async () => {
    var agent = supertest(app);
    const postList = await agent.get("/municoes");
    expect(postList.statusCode).toEqual(200);
    if (postList.body.length > 0) {
      for (const e of postList.body) {
        const data = { id: e.id };
        console.log("Encontrou o artefato: ");
        console.log(data);

        const postDelete = await agent.delete("/municoes").send(data);

        console.log("Removeu o artefato: ");
        console.log(data);

        expect(postDelete.statusCode).toEqual(204);
      }
    } else {
      const artefato = {
        nome: "Ak-47",
        peso: 7,
        valor: 50,
        explosiva: true,
        calibre: "08",
      };
      const postCreate = await agent.post("/municoes").send(artefato);

      console.log("Cadastrou o artefato: ");
      console.log(postCreate);

      expect(postCreate.statusCode).toEqual(200);
    }
  });

////////////////////////////////////////////////////////////////////////


  it("teste /itens_compra/list e /itens_compra/delete", async () => {
    var agent = supertest(app);
    const ret = await agent.get("/itens_compras");
    expect(ret.statusCode).toEqual(200);

    if (ret.body.length > 0) {
      console.log(`Encontrou ${ret.body.length} itens_compras cadastradas.`);

      for (const p of ret.body) {
        const data = { id: p.id };
        console.log(`Removendo o itens_compra ${data.id}.`);
        const postDeleteCompra = await agent
          .delete("/itens_compras")
          .send(data);
        expect(postDeleteCompra.statusCode).toEqual(204);
      }
    } else {
      const ret_compra = await agent.get("/compras");
      expect(ret_compra.statusCode).toEqual(200);
      if (ret_compra.body.length > 0) {
        const ret_artefato = await agent.get("/municoes");
        expect(ret_artefato.statusCode).toEqual(200);
        if (ret_artefato.body.length > 0) {
          console.log(
            "Não encontrou compras cadastrados, cadastrando novo jogador e itens da compra."
          );
          const postCreateItensCompra = await agent
            .post("/itens_compras")
            .send({
              compra: ret_compra.body[0].id,
              artefato: ret_artefato.body[0].id,
              quantidade: "0",
              valor: "0",
            });
          expect(postCreateItensCompra.statusCode).toEqual(200);
        }
      }
    }
  });


/////////////////////////////////////////////////////////////////////

  it("teste /compra/list e /compra/delete", async () => {
    var agent = supertest(app);
    const postList = await agent.get("/compras");
    expect(postList.statusCode).toEqual(200);
    if (postList.body.length > 0) {
      for (const e of postList.body) {
        const data = { id: e.id };
        console.log("Encontrou a compra: ");
        console.log(data);

        
        

        

          for (const it of e.itens) {
            const data = { id: it.id };
            console.log(`itens_compra ${data.id}.`);
            const postDeleteCompra = await agent.delete("/itens_compras").send(data);
            expect(postDeleteCompra.statusCode).toEqual(204);
          }
        
        //for para listar e remover os itens da compra

        const postDelete = await agent.delete("/compras").send(data);

        console.log("Removeu a compra: ");
        console.log(data);

        expect(postDelete.statusCode).toEqual(204);
      }
    } else {
      const compra = { total: 0, jogador: "teste" };
      const postCreate = await agent.post("/compras").send(compra);

      console.log("Cadastrou a compra: ");
      console.log(postCreate);

      //cadastarar um iten_compra.

        const ret_artefato = await agent.get("/municoes");
        expect(ret_artefato.statusCode).toEqual(200);
        if (ret_artefato.body.length > 0) {
          console.log(
            "Não encontrou compras cadastrados, cadastrando novo jogador e itens da compra."
          );
          const postCreateItensCompra = await agent
            .post("/itens_compras")
            .send({
              compra: postCreate.body.id,
              artefato: ret_artefato.body[0].id,
              quantidade: "0",
              valor: "0",
            });
          expect(postCreateItensCompra.statusCode).toEqual(200);
        }
      

      expect(postCreate.statusCode).toEqual(200);
    }
  });
});
