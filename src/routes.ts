import {Router} from 'express';
import JogadorController from  './app/controllers/JogadorController';
import EnderecoController from './app/controllers/EnderecoController';
import CompraController from './app/controllers/CompraController';
import MunicaoController from './app/controllers/MunicaoController';
import ItensComprasController from './app/controllers/ItensComprasController';


const router = Router();

//criando  rotas para /jogadores.
router.post('/jogadores', JogadorController.store);//define uma rota vai método post para chamar o método store da classe JogadorController
router.get('/jogadores', JogadorController.list);//define uma rota ...
router.put('/jogadores', JogadorController.update);//define uma rota ...
router.delete('/jogadores', JogadorController.delete);//define uma rota ...

//criando rotas para /compras
router.post('/compras', CompraController.store);//define uma rota vai método post para chamar o método store da classe CompraController
router.get('/compras', CompraController.list);//define uma rota ...
router.put('/compras', CompraController.update);//define uma rota ...
router.delete('/compras', CompraController.delete);//define uma rota ...

//criando rotas para Itens_Compras
router.post('/itens_compras', ItensComprasController.store);//define uma rota vai método post para chamar o método store da classe CompraController
router.get('/itens_compras', ItensComprasController.list);//define uma rota ...
router.put('/itens_compras', ItensComprasController.update);//define uma rota ...
router.delete('/itens_compras', ItensComprasController.delete);//define uma rota ...

//cirando rotas para /municoes
router.post('/municoes', MunicaoController.store);//define uma rota vai método post para chamar o método store da classe MunicaoController
router.get('/municoes', MunicaoController.list);//define uma rota ...
router.put('/municoes', MunicaoController.update);//define uma rota ...
router.delete('/municoes', MunicaoController.delete);//define uma rota ...

//criando  rotas para /enderecos.
router.post('/enderecos', EnderecoController.store);//define uma rota vai método post para chamar o método store da classe EnderecoController
router.get('/enderecos', EnderecoController.list);//define uma rota ...
router.delete('/enderecos', EnderecoController.delete);//define uma rota ...



export default router;

